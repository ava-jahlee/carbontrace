/**
 * carbontrace — 감사 근거를 항상 함께 갖고 다니는 계수 타입.
 *
 * 이 도구의 정체성:
 *   "이 숫자가 왜 그 값인가?" 를 언제든 셀 팝오버로 보여줄 수 있어야 한다.
 *   따라서 모든 값은 primarySource (진짜 원문서) 를 함께 나른다.
 */

import type { PrimarySource } from "@/data/sources";

export type Tier = "T1" | "T2" | "T3";
export type GhgSpecies = "CO2" | "CH4" | "N2O";
export type FuelState = "고체" | "액체" | "기체";

/** 값 하나 + 그 값의 진짜 원문서 근거. */
export interface Measurement {
  /** 수치 값. */
  value: number;
  /** 단위 문자열 (예: "kgCO2/TJ", "MJ/kg", "-"). */
  unit: string;
  /** 원문서 참조 — 감사자가 이걸 따라 역추적한다. */
  primarySource: PrimarySource;
}

export type MaybeMeasurement = Measurement | null;

/** Tier 별 배출계수 세트 (연료 하나에 대해). */
export interface EmissionFactorSet {
  t1_unit: string;
  t2_unit: string;
  t1: {
    tC_per_TJ: MaybeMeasurement;
    CO2: MaybeMeasurement;
    CH4: MaybeMeasurement;
    N2O: MaybeMeasurement;
  };
  t2: {
    group?: string | null;
    tC_per_TJ: MaybeMeasurement;
    CO2: MaybeMeasurement;
    CH4: MaybeMeasurement;
    N2O: MaybeMeasurement;
  };
}

/** 연료 하나. */
export interface Fuel {
  id: string;
  category: string | null;
  name: string;
  state: FuelState | string | null;
  activityUnit: string | null;
  heat: {
    unit: string | null;
    t1_net: MaybeMeasurement;
    t1_gross: MaybeMeasurement;
    t2_net: MaybeMeasurement;
  };
  ef: EmissionFactorSet;
}

/** 산화계수 (상온 × Tier). */
export type OxidationTable = Record<
  FuelState,
  {
    t1: MaybeMeasurement;
    t2: MaybeMeasurement;
  }
>;

export interface GwpSet {
  label: string;
  CO2: Measurement;
  CH4: Measurement;
  N2O: Measurement;
}

export type GwpTables = Record<"SAR" | "AR4" | "AR5" | "AR6", GwpSet>;
