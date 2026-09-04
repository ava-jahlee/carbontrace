/**
 * carbontrace — 계산 엔진 공통 타입.
 *
 * 이 도구의 계산 엔진은 값만 반환하지 않는다.
 * 모든 결과에 "왜 그 값인가" 를 설명하는 근거(inputs, formula) 가 함께 붙는다.
 * UI 의 <Cell /> 이 이 근거를 그대로 열어 보여 준다.
 */

import type { Measurement } from "@/data/factors/types";

/**
 * 계산된 값 한 조각.
 * value 는 최종 숫자, formula 는 수식 문자열, inputs 는 그 수식에 대입된 각 계수(근거) 목록.
 */
export interface Calculated {
  value: number;
  /** 표시용 단위. */
  unit: string;
  /** 사람이 읽는 수식. 예: "사용량 × 열량계수 × 배출계수 × 산화계수 × 10⁻⁶". */
  formula: string;
  /** 수식에 대입된 각 인자. 감사자가 이 목록을 보고 셀을 역추적한다. */
  inputs: CalculatedInput[];
  /** 부가 설명 (선택). */
  notes?: string[];
}

/** Calculated 의 인자 하나. Measurement (근거 있는 계수) 이거나 순수 사용자 입력값이거나. */
export type CalculatedInput =
  | {
      kind: "measurement";
      /** 수식 안에서의 역할 이름. 예: "열량계수 (T1, 순발열량)". */
      label: string;
      /** Measurement 자체 (value + unit + primarySource). */
      measurement: Measurement;
    }
  | {
      kind: "user";
      label: string;
      value: number;
      unit: string;
      /** 사용자가 직접 입력한 값임을 표시. */
      note?: string;
    }
  | {
      kind: "derived";
      label: string;
      value: number;
      unit: string;
      /** 이 파생값을 계산한 하위 Calculated 로 파고들 수 있게. */
      from: Calculated;
    }
  | {
      kind: "constant";
      label: string;
      value: number;
      unit: string;
      note?: string;
    };

/** 값이 없을 수도 있는 계산 결과. */
export type MaybeCalculated = Calculated | null;

// ─────────────────────────────────────────────────────────────
// Scope 1 (연료 연소) 계산 입출력
// ─────────────────────────────────────────────────────────────

export type Tier = "T1" | "T2" | "T3";
export type GhgSpecies = "CO2" | "CH4" | "N2O";
export type GwpStandard = "SAR" | "AR4" | "AR5" | "AR6";

/** 사용자가 T3 (직접 입력) 을 선택했을 때 입력하는 값. */
export interface T3Overrides {
  /** 열량계수 (사용자 직접 측정값). 단위는 연료의 heat.unit 과 같아야 함. */
  heatFactor?: number;
  /** 배출계수 (CO2/CH4/N2O 각각). 단위 kgGHG/TJ. */
  efCO2?: number;
  efCH4?: number;
  efN2O?: number;
  /** 산화계수 (0~1 사이). */
  oxidation?: number;
}

/** Scope 1 계산 입력 한 세트 (연료 하나에 대해). */
export interface Scope1Input {
  fuelId: string;
  /** 사용자 입력 사용량. 단위는 fuel.activityUnit. */
  amount: number;
  /** 열량계수 Tier. */
  heatTier: Tier;
  /** 배출계수 Tier. 산화계수 Tier 도 이걸로 따라간다 (Main!F15 = E15). */
  efTier: Tier;
  /** GWP 기준. */
  gwpStandard: GwpStandard;
  /** T3 직접 입력값. */
  overrides?: T3Overrides;
  /**
   * 데이터 프로파일. 지정하지 않으면 "xlsm-original" (파리티 보존).
   *   - "xlsm-original"  : 원본 xlsm 값 그대로 (기본, 파리티 보존)
   *   - "xlsm-corrected" : xlsm 원본 오류 (등유·항공유 뒤바꿈 · T2 CH4/N2O 오작성) 정정
   *   - "gir22-latest"   : xlsm-corrected + GIR 2022.1 공표 최신 국가값 반영
   */
  dataProfile?: import("@/data/factors/corrections").DataProfile;
}

export interface Scope1SpeciesResult {
  species: GhgSpecies;
  /** 배출계수 (선택된 Tier). */
  emissionFactor: MaybeCalculated;
  /** tGHG 배출량. */
  tGhg: MaybeCalculated;
  /** GWP. */
  gwp: Calculated;
  /** tCO2eq 배출량. */
  tCo2eq: MaybeCalculated;
}

export interface Scope1Result {
  fuelId: string;
  fuelName: string;
  /** 실제 사용된 열량계수 (Tier 반영). */
  heatFactor: MaybeCalculated;
  /** 실제 사용된 산화계수. CH4/N2O 에는 적용되지 않는다. */
  oxidation: MaybeCalculated;
  /** 각 GHG 종별 결과. */
  co2: Scope1SpeciesResult;
  ch4: Scope1SpeciesResult;
  n2o: Scope1SpeciesResult;
  /** ∑tCO2eq (CO2 + CH4 + N2O). */
  totalCo2eq: Calculated;
  /** 계산 중 발생한 경고 (예: "T2 값 없음, T1 로 대체"). */
  warnings: string[];
}
