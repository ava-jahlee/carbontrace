/**
 * carbontrace — Scope 2 (외부 공급 전기·열) 계산 엔진.
 *
 * 원본 xlsm Main D42~E42 수식 재현:
 *   전기(소비단): tGHG = 사용량[MWh] × 전력배출계수[kg/MWh] × 0.001
 *   전기(발전단): tGHG = 사용량[MWh] × 전력배출계수[kg/MWh] × 0.001
 *   열:           tGHG = 사용량[TJ]  × 열배출계수[kg/TJ]    × 0.001
 *   tCO2eq = tGHG × GWP (CH4/N2O 는 GWP 곱해서 CO2 환산)
 *
 * Scope 2 는 산화계수 없음 (외부 공급 에너지의 배출은 공급자가 이미 산정).
 */

import type {
  Calculated,
  CalculatedInput,
  GhgSpecies,
  GwpStandard,
  MaybeCalculated,
} from "./types";
import type { Measurement } from "@/data/factors/types";
import { GWP } from "@/data/factors/gwp.gen";
import {
  POWER,
  HEAT_KDHC,
  HEAT_NATIONAL,
  type KdhcDistrict,
  type KdhcPhase,
  type PowerLocation,
  type PowerVintage,
  type HeatKind,
} from "@/data/factors/scope2.gen";

// ─────────────────────────────────────────────────────────────
// 입력 · 출력 타입
// ─────────────────────────────────────────────────────────────

export type Scope2SourceKind = "power" | "heat-kdhc" | "heat-national";

export interface Scope2InputPower {
  kind: "power";
  /** 사용량 (MWh). */
  amount: number;
  vintage: PowerVintage;      // 2017 or 2022
  location: PowerLocation;    // 발전단 or 소비단
  gwpStandard: GwpStandard;
}

export interface Scope2InputHeatKdhc {
  kind: "heat-kdhc";
  /** 사용량 (TJ). */
  amount: number;
  phase: KdhcPhase;           // 3기 or 4기
  district: KdhcDistrict;
  gwpStandard: GwpStandard;
}

export interface Scope2InputHeatNational {
  kind: "heat-national";
  /** 사용량 (TJ). */
  amount: number;
  heatKind: HeatKind;         // 열전용 · 열병합 · 열평균
  gwpStandard: GwpStandard;
}

export type Scope2Input = Scope2InputPower | Scope2InputHeatKdhc | Scope2InputHeatNational;

export interface Scope2SpeciesResult {
  species: GhgSpecies;
  emissionFactor: Calculated;
  tGhg: Calculated;
  gwp: Calculated;
  tCo2eq: Calculated;
}

export interface Scope2Result {
  sourceKind: Scope2SourceKind;
  sourceLabel: string;
  activityUnit: string;
  co2: Scope2SpeciesResult;
  ch4: Scope2SpeciesResult;
  n2o: Scope2SpeciesResult;
  totalCo2eq: Calculated;
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────────────────────

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

function sourceLabel(m: Measurement): string {
  const ps = m.primarySource;
  const parts: string[] = [ps.publisher || ps.doc];
  if (ps.edition) parts.push(ps.edition);
  return parts.join(" · ");
}

// ─────────────────────────────────────────────────────────────
// 배출계수 조회
// ─────────────────────────────────────────────────────────────

function pickPowerEf(
  vintage: PowerVintage,
  location: PowerLocation,
  species: GhgSpecies,
): Measurement {
  const row = POWER.find((p) => p.vintage === vintage && p.location === location);
  if (!row) throw new Error(`전력 배출계수 없음: ${vintage} · ${location}`);
  return row.ef[species];
}

function pickKdhcEf(
  phase: KdhcPhase,
  district: KdhcDistrict,
  species: GhgSpecies,
): Measurement {
  const row = HEAT_KDHC.find((h) => h.phase === phase && h.district === district);
  if (!row) throw new Error(`KDHC 열 배출계수 없음: ${phase} · ${district}`);
  return row.ef[species];
}

function pickHeatNationalEf(kind: HeatKind, species: GhgSpecies): Measurement {
  const row = HEAT_NATIONAL.find((h) => h.kind === kind);
  if (!row) throw new Error(`국가 통합 열 배출계수 없음: ${kind}`);
  return row.ef[species];
}

// ─────────────────────────────────────────────────────────────
// 배출량 계산
// ─────────────────────────────────────────────────────────────

/** tGHG = 활동량 × 배출계수 × 0.001 (활동량 단위와 배출계수 단위가 짝을 맞춤). */
function calcTGhg(
  amount: number,
  activityUnit: string,
  ef: Measurement,
): Calculated {
  const value = amount * ef.value * 0.001;
  return {
    value,
    unit: "tGHG",
    formula: "활동량 × 배출계수 × 10⁻³",
    inputs: [
      userInput("활동량", amount, activityUnit),
      measurementInput("배출계수", ef),
      constantInput("단위환산", 0.001, "-", "kg → t 단위환산"),
    ],
  };
}

function calcTCo2eq(tGhg: Calculated, gwp: Calculated): Calculated {
  return {
    value: tGhg.value * gwp.value,
    unit: "tCO2eq",
    formula: "tGHG × GWP",
    inputs: [derivedInput("tGHG", tGhg), derivedInput("GWP", gwp)],
  };
}

function gwpFor(standard: GwpStandard, species: GhgSpecies): Calculated {
  const table = GWP[standard];
  const m = table[species];
  return {
    value: m.value,
    unit: "-",
    formula: `조회 → GWP[${standard}][${species}]`,
    inputs: [measurementInput(`GWP ${species} (${table.label})`, m)],
  };
}

function efAsCalculated(species: GhgSpecies, ef: Measurement): Calculated {
  return {
    value: ef.value,
    unit: ef.unit,
    formula: `조회 → ${sourceLabel(ef)}`,
    inputs: [measurementInput(`배출계수 ${species}`, ef)],
  };
}

// ─────────────────────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────────────────────

export function calculateScope2(input: Scope2Input): Scope2Result | { error: string } {
  const speciesList: GhgSpecies[] = ["CO2", "CH4", "N2O"];
  const warnings: string[] = [];

  let sourceLabelText: string;
  let activityUnit: string;
  const efLookup: Record<GhgSpecies, Measurement> = {} as Record<GhgSpecies, Measurement>;

  try {
    if (input.kind === "power") {
      sourceLabelText = `전력 (${input.location}, GIR ${input.vintage}년 승인)`;
      activityUnit = "MWh";
      for (const sp of speciesList) {
        efLookup[sp] = pickPowerEf(input.vintage, input.location, sp);
      }
    } else if (input.kind === "heat-kdhc") {
      sourceLabelText = `열/스팀 KDHC (${input.district}, 계획기간 ${input.phase})`;
      activityUnit = "TJ";
      for (const sp of speciesList) {
        efLookup[sp] = pickKdhcEf(input.phase, input.district, sp);
      }
    } else {
      sourceLabelText = `열/스팀 국가 통합 (${input.heatKind})`;
      activityUnit = "TJ";
      warnings.push(`국가 통합 열 배출계수 (${input.heatKind}) 는 원출처 미상 (asserted). 감사 시 KDHC 지사별 값 사용 권장.`);
      for (const sp of speciesList) {
        efLookup[sp] = pickHeatNationalEf(input.heatKind, sp);
      }
    }
  } catch (e) {
    return { error: (e as Error).message };
  }

  const results: Record<GhgSpecies, Scope2SpeciesResult> = {} as Record<
    GhgSpecies,
    Scope2SpeciesResult
  >;
  for (const sp of speciesList) {
    const ef = efLookup[sp];
    const efCalc = efAsCalculated(sp, ef);
    const tGhg = calcTGhg(input.amount, activityUnit, ef);
    const gwp = gwpFor(input.gwpStandard, sp);
    const tCo2eq = calcTCo2eq(tGhg, gwp);
    results[sp] = { species: sp, emissionFactor: efCalc, tGhg, gwp, tCo2eq };
  }

  const totalValue =
    results.CO2.tCo2eq.value +
    results.CH4.tCo2eq.value +
    results.N2O.tCo2eq.value;

  const totalCo2eq: Calculated = {
    value: totalValue,
    unit: "tCO2eq",
    formula: "tCO2eq(CO2) + tCO2eq(CH4) + tCO2eq(N2O)",
    inputs: speciesList.map((sp) => derivedInput(`tCO2eq (${sp})`, results[sp].tCo2eq)),
  };

  return {
    sourceKind: input.kind,
    sourceLabel: sourceLabelText,
    activityUnit,
    co2: results.CO2,
    ch4: results.CH4,
    n2o: results.N2O,
    totalCo2eq,
    warnings,
  };
}
