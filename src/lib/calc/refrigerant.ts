/**
 * carbontrace — 냉매 (Scope 1 fugitive) 배출량 계산 엔진.
 *
 * IPCC 2006 Vol.3 Ch.7 Section 7.5 (Refrigeration and Air Conditioning) 기반.
 *
 * Tier 1a (screening approach):
 *   유출량 (kg) × GWP-100 (kgCO2eq/kg) × 10⁻³ = tCO2eq
 *
 * 유출량은 사용자 직접 입력 (연간 재충전량 · 폐기 시 손실량 실측).
 * 물질수지법 (Tier 2/3) 은 향후 추가 예정.
 */

import type {
  Calculated,
  CalculatedInput,
  MaybeCalculated,
} from "./types";
import type { Measurement } from "@/data/factors/types";
import type { GwpAssessment } from "@/data/factors/refrigerants.gen";
import { findRefrigerant } from "@/data/factors/refrigerants.gen";
import { IPCC_2006_VOL3_CH7 } from "@/data/sources";

export interface RefrigerantInput {
  /** 냉매 ID (예: "HFC-134a", "R-410A"). */
  refrigerantId: string;
  /** 유출량 (kg). */
  leakedKg: number;
  /** GWP 판. */
  gwpAssessment: GwpAssessment;
}

export interface RefrigerantResult {
  refrigerantId: string;
  refrigerantName: string;
  group: string;
  application: string;
  gwp: Calculated;
  tCo2eq: Calculated;
  methodology: Calculated;   // Tier 1a 방법론 명시 (감사용)
  warnings: string[];
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

export function calculateRefrigerant(
  input: RefrigerantInput,
): RefrigerantResult | { error: string } {
  const refr = findRefrigerant(input.refrigerantId);
  if (!refr) return { error: `냉매를 찾을 수 없습니다: ${input.refrigerantId}` };

  const gwpMeasurement = refr.gwp100[input.gwpAssessment];
  if (!gwpMeasurement) {
    return { error: `${refr.name} 는 ${input.gwpAssessment} 판에 정의되지 않았습니다.` };
  }

  const warnings: string[] = [];
  if (refr.group === "NF3") {
    warnings.push("NF3 는 반도체 IPPU 배출로 건물 계산과 무관합니다. 참고용.");
  }

  const gwp: Calculated = {
    value: gwpMeasurement.value,
    unit: "kgCO2eq/kg",
    formula: `조회 → IPCC ${input.gwpAssessment} · ${refr.name}`,
    inputs: [measurementInput(`GWP-100 (${input.gwpAssessment})`, gwpMeasurement)],
  };

  const tCo2eqValue = input.leakedKg * gwpMeasurement.value * 1e-3;
  const tCo2eq: Calculated = {
    value: tCo2eqValue,
    unit: "tCO2eq",
    formula: "유출량 × GWP-100 × 10⁻³",
    inputs: [
      userInput("유출량", input.leakedKg, "kg", "연간 재충전량 또는 폐기 시 손실 (사업자 실측)"),
      derivedInput("GWP-100", gwp),
      constantInput("단위환산", 1e-3, "-", "kg → t 단위환산"),
    ],
  };

  const methodology: Calculated = {
    value: 1,
    unit: "-",
    formula: "IPCC 2006 GL Vol.3 Ch.7 · Tier 1a screening",
    inputs: [
      measurementInput(
        "산정 방법론 근거",
        {
          value: 1,
          unit: "-",
          primarySource: {
            ...IPCC_2006_VOL3_CH7,
            note: `${IPCC_2006_VOL3_CH7.note} 실무 적용: 사업자 실측 재충전량·폐기량이 없을 때만 Tier 1a screening 사용.`,
          },
        } satisfies Measurement,
      ),
    ],
    notes: [
      "Tier 1a: 초기 충전량 × 기본 유출률 (연간 · 폐기 시).",
      "Tier 2/3: 물질수지법 (사업장 실측치 우선 사용).",
    ],
  };

  return {
    refrigerantId: refr.id,
    refrigerantName: refr.name,
    group: refr.group,
    application: refr.application,
    gwp,
    tCo2eq,
    methodology,
    warnings,
  };
}

/** 여러 냉매의 배출량을 합산해서 총 tCO2eq 반환. */
export function sumRefrigerants(results: RefrigerantResult[]): MaybeCalculated {
  if (results.length === 0) return null;
  const value = results.reduce((s, r) => s + r.tCo2eq.value, 0);
  return {
    value,
    unit: "tCO2eq",
    formula: results.map((r) => `${r.refrigerantId}`).join(" + "),
    inputs: results.map((r) => derivedInput(r.refrigerantName, r.tCo2eq)),
  };
}
