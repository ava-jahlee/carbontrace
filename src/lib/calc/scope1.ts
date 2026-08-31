/**
 * carbontrace — Scope 1 (연료 연소) 계산 엔진.
 *
 * 원본 xlsm (GHGCalc_V0m_lja) 의 Main 시트 계산 로직을 재현하되,
 * 모든 중간값이 값 + 수식 + 대입된 근거를 함께 반환한다.
 *
 * IPCC 2006 GL 관례 (K-ETS 지침과 동일):
 *   배출량[tGHG] = 사용량 × 열량계수 × 배출계수 × 산화계수 × 10⁻⁶
 *     - CO2 만 산화계수 적용, CH4/N2O 는 산화계수 미적용
 *     - 10⁻⁶ 은 (MJ → TJ) × (사용량 단위 스케일링 관례) 를 한 번에 커버
 *   tCO2eq = tGHG × GWP
 *
 * 사용량 단위별 관례 (열량계수 단위와 짝을 맞춤):
 *   ton-연료 × MJ/kg    → 결과 tGHG (사용량이 kg 이 아닌 ton 인 것을 관례로 흡수)
 *   천m³-연료 × MJ/Nm³  → 결과 tGHG
 *   kL-연료   × MJ/L    → 결과 tGHG
 */

import type {
  Calculated,
  CalculatedInput,
  GhgSpecies,
  MaybeCalculated,
  Scope1Input,
  Scope1Result,
  Scope1SpeciesResult,
  Tier,
} from "./types";
import type { Fuel, FuelState, MaybeMeasurement, Measurement } from "@/data/factors/types";
import { FUELS } from "@/data/factors/fuels.gen";
import { OXIDATION } from "@/data/factors/oxidation.gen";
import { GWP } from "@/data/factors/gwp.gen";

// ─────────────────────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────────────────────

export function findFuel(fuelId: string): Fuel | undefined {
  return FUELS.find((f) => f.id === fuelId);
}

function measurementInput(label: string, m: Measurement): CalculatedInput {
  return { kind: "measurement", label, measurement: m };
}

function userInput(label: string, value: number, unit: string, note?: string): CalculatedInput {
  return { kind: "user", label, value, unit, note };
}

function constantInput(label: string, value: number, unit: string, note?: string): CalculatedInput {
  return { kind: "constant", label, value, unit, note };
}

function derivedInput(label: string, from: Calculated): CalculatedInput {
  return { kind: "derived", label, value: from.value, unit: from.unit, from };
}

// ─────────────────────────────────────────────────────────────
// 열량계수 선택 (Tier 반영)
// ─────────────────────────────────────────────────────────────

function pickHeatFactor(
  fuel: Fuel,
  tier: Tier,
  overrideValue: number | undefined,
  warnings: string[],
): MaybeCalculated {
  if (tier === "T3") {
    if (overrideValue === undefined) {
      warnings.push(`열량계수 T3 를 선택했으나 사용자 입력값이 없습니다.`);
      return null;
    }
    return {
      value: overrideValue,
      unit: fuel.heat.unit ?? "MJ/kg",
      formula: "사용자 직접 입력",
      inputs: [userInput("열량계수 (T3 직접 입력)", overrideValue, fuel.heat.unit ?? "MJ/kg", "사업자 실측치")],
    };
  }
  const m = tier === "T1" ? fuel.heat.t1_net : fuel.heat.t2_net;
  if (!m) {
    // Fall back
    const fallback = tier === "T1" ? fuel.heat.t2_net : fuel.heat.t1_net;
    if (fallback) {
      warnings.push(
        `${fuel.name}: 열량계수 ${tier} 값이 원본에 없어 ${tier === "T1" ? "T2" : "T1"} 로 대체했습니다.`,
      );
      return { value: fallback.value, unit: fallback.unit, formula: `조회 → ${fallback.sourceCell}`, inputs: [measurementInput(`열량계수 (대체)`, fallback)] };
    }
    warnings.push(`${fuel.name}: 열량계수 ${tier} / 대체값 모두 없음.`);
    return null;
  }
  return {
    value: m.value,
    unit: m.unit,
    formula: `조회 → ${m.sourceCell}`,
    inputs: [measurementInput(`열량계수 (${tier}, 순발열량)`, m)],
  };
}

// ─────────────────────────────────────────────────────────────
// 배출계수 선택
// ─────────────────────────────────────────────────────────────

function pickEmissionFactor(
  fuel: Fuel,
  species: GhgSpecies,
  tier: Tier,
  override: number | undefined,
  warnings: string[],
): MaybeCalculated {
  if (tier === "T3") {
    if (override === undefined) {
      warnings.push(`배출계수 T3 (${species}) 를 선택했으나 사용자 입력값이 없습니다.`);
      return null;
    }
    return {
      value: override,
      unit: "kgGHG/TJ",
      formula: "사용자 직접 입력",
      inputs: [userInput(`배출계수 ${species} (T3 직접 입력)`, override, "kgGHG/TJ", "사업자 실측치")],
    };
  }
  const set = tier === "T1" ? fuel.ef.t1 : fuel.ef.t2;
  const m = set[species];
  if (!m) {
    // Fall back to other tier
    const otherTier: Tier = tier === "T1" ? "T2" : "T1";
    const otherSet = otherTier === "T1" ? fuel.ef.t1 : fuel.ef.t2;
    const fallback = otherSet[species];
    if (fallback) {
      warnings.push(
        `${fuel.name}: 배출계수 ${species} ${tier} 값이 원본에 없어 ${otherTier} 로 대체했습니다.`,
      );
      return {
        value: fallback.value,
        unit: fallback.unit,
        formula: `조회 → ${fallback.sourceCell} (대체)`,
        inputs: [measurementInput(`배출계수 ${species} (${otherTier}, 대체)`, fallback)],
      };
    }
    warnings.push(`${fuel.name}: 배출계수 ${species} ${tier}/대체 모두 없음.`);
    return null;
  }
  return {
    value: m.value,
    unit: m.unit,
    formula: `조회 → ${m.sourceCell}`,
    inputs: [measurementInput(`배출계수 ${species} (${tier})`, m)],
  };
}

// ─────────────────────────────────────────────────────────────
// 산화계수 선택 (연료 상태별 표 참조)
// ─────────────────────────────────────────────────────────────

function pickOxidation(
  fuel: Fuel,
  tier: Tier,
  override: number | undefined,
  warnings: string[],
): MaybeCalculated {
  const state = fuel.state as FuelState | null;
  if (tier === "T3") {
    if (override === undefined) {
      warnings.push(`산화계수 T3 를 선택했으나 사용자 입력값이 없습니다.`);
      return null;
    }
    return {
      value: override,
      unit: "-",
      formula: "사용자 직접 입력",
      inputs: [userInput("산화계수 (T3 직접 입력)", override, "-", "사업자 실측치")],
    };
  }
  if (!state || !(state in OXIDATION)) {
    warnings.push(`${fuel.name}: 상온(고체/액체/기체) 정보가 없어 산화계수를 정할 수 없습니다.`);
    return null;
  }
  const row = OXIDATION[state as FuelState];
  const m: MaybeMeasurement = tier === "T1" ? row.t1 : row.t2;
  if (!m) {
    warnings.push(`${fuel.name}: 산화계수 ${tier} 값 없음.`);
    return null;
  }
  return {
    value: m.value,
    unit: m.unit,
    formula: `조회 → ${m.sourceCell}`,
    inputs: [measurementInput(`산화계수 (${state}, ${tier})`, m)],
  };
}

// ─────────────────────────────────────────────────────────────
// tGHG · tCO2eq 계산
// ─────────────────────────────────────────────────────────────

/**
 * 배출량[tGHG] = 사용량 × 열량계수 × 배출계수 × (산화계수 or 1) × 10⁻⁶
 */
function calcTGhg(
  species: GhgSpecies,
  amount: number,
  activityUnit: string,
  heat: MaybeCalculated,
  ef: MaybeCalculated,
  oxidation: MaybeCalculated,
): MaybeCalculated {
  if (!heat || !ef) return null;
  const useOxidation = species === "CO2";
  const oxidationValue = useOxidation ? (oxidation?.value ?? 1) : 1;
  const value = amount * heat.value * ef.value * oxidationValue * 1e-6;

  const inputs: CalculatedInput[] = [
    userInput("사용량", amount, activityUnit),
    derivedInput("열량계수", heat),
    derivedInput("배출계수", ef),
  ];
  if (useOxidation && oxidation) {
    inputs.push(derivedInput("산화계수", oxidation));
  } else if (useOxidation) {
    inputs.push(constantInput("산화계수 (없음)", 1, "-", "산화계수 정보 없음 → 1 로 처리"));
  } else {
    inputs.push(constantInput("산화계수 (미적용)", 1, "-", `${species} 는 관례상 산화계수를 적용하지 않는다 (IPCC 2006 GL)`));
  }
  inputs.push(constantInput("단위환산", 1e-6, "-", "MJ→TJ 및 사용량 스케일 관례 (원본 xlsm 수식과 일치)"));

  return {
    value,
    unit: "tGHG",
    formula: useOxidation
      ? "사용량 × 열량계수 × 배출계수 × 산화계수 × 10⁻⁶"
      : "사용량 × 열량계수 × 배출계수 × 10⁻⁶",
    inputs,
  };
}

function calcTCo2eq(tGhg: MaybeCalculated, gwp: Calculated): MaybeCalculated {
  if (!tGhg) return null;
  const value = tGhg.value * gwp.value;
  return {
    value,
    unit: "tCO2eq",
    formula: "tGHG × GWP",
    inputs: [derivedInput("tGHG", tGhg), derivedInput("GWP", gwp)],
  };
}

function gwpFor(standard: Scope1Input["gwpStandard"], species: GhgSpecies): Calculated {
  const table = GWP[standard];
  const value = table[species];
  return {
    value,
    unit: "-",
    formula: `조회 → GWP[${standard}][${species}]`,
    inputs: [
      constantInput(
        `GWP ${species} (${table.label})`,
        value,
        "-",
        table.source,
      ),
    ],
  };
}

// ─────────────────────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────────────────────

export function calculateScope1(input: Scope1Input): Scope1Result | { error: string } {
  const fuel = findFuel(input.fuelId);
  if (!fuel) return { error: `연료를 찾을 수 없습니다: ${input.fuelId}` };

  const warnings: string[] = [];
  const activityUnit = fuel.activityUnit ?? "ton-연료";

  const heat = pickHeatFactor(fuel, input.heatTier, input.overrides?.heatFactor, warnings);
  const oxidation = pickOxidation(fuel, input.efTier, input.overrides?.oxidation, warnings);

  const speciesList: GhgSpecies[] = ["CO2", "CH4", "N2O"];
  const results: Record<GhgSpecies, Scope1SpeciesResult> = {} as any;
  for (const sp of speciesList) {
    const override = sp === "CO2" ? input.overrides?.efCO2 : sp === "CH4" ? input.overrides?.efCH4 : input.overrides?.efN2O;
    const ef = pickEmissionFactor(fuel, sp, input.efTier, override, warnings);
    const tGhg = calcTGhg(sp, input.amount, activityUnit, heat, ef, oxidation);
    const gwp = gwpFor(input.gwpStandard, sp);
    const tCo2eq = calcTCo2eq(tGhg, gwp);
    results[sp] = { species: sp, emissionFactor: ef, tGhg, gwp, tCo2eq };
  }

  const totalValue =
    (results.CO2.tCo2eq?.value ?? 0) +
    (results.CH4.tCo2eq?.value ?? 0) +
    (results.N2O.tCo2eq?.value ?? 0);

  const totalCo2eq: Calculated = {
    value: totalValue,
    unit: "tCO2eq",
    formula: "tCO2eq(CO2) + tCO2eq(CH4) + tCO2eq(N2O)",
    inputs: speciesList
      .filter((sp) => results[sp].tCo2eq !== null)
      .map((sp) => derivedInput(`tCO2eq (${sp})`, results[sp].tCo2eq as Calculated)),
  };

  return {
    fuelId: fuel.id,
    fuelName: fuel.name,
    heatFactor: heat,
    oxidation,
    co2: results.CO2,
    ch4: results.CH4,
    n2o: results.N2O,
    totalCo2eq,
    warnings,
  };
}
