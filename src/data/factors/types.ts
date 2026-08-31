/**
 * carbontrace — 감사 근거를 항상 함께 갖고 다니는 계수 타입.
 *
 * 이 도구의 정체성:
 *   "이 숫자가 왜 그 값인가?" 를 언제든 셀 팝오버로 보여줄 수 있어야 한다.
 *   그래서 모든 계수는 value 뿐 아니라 sourceCell, sourceDoc 도 함께 나른다.
 */

export type Tier = "T1" | "T2" | "T3";
export type GhgSpecies = "CO2" | "CH4" | "N2O";
export type FuelState = "고체" | "액체" | "기체";

/** 값 하나 + 그 값의 출처(감사 근거). */
export interface Measurement {
  /** 수치 값. 원본에 값이 없으면 이 필드 자체가 없거나 null. */
  value: number;
  /** 단위 문자열 (예: "kgCO2/TJ", "MJ/kg", "-"). */
  unit: string;
  /** 원본 xlsm 상의 셀 주소. UI 팝오버가 이걸 그대로 표시한다. */
  sourceCell: string;
  /** 사람이 읽는 근거 문서. (예: "IPCC 2006 GL, Table 1.4", "GIR 국가고유 배출계수 (17년)") */
  sourceDoc: string;
}

/** 값이 없을 수도 있는 계수 필드 (원본 xlsm 의 "-"). */
export type MaybeMeasurement = Measurement | null;

/** Tier 별 배출계수 세트 (연료 하나에 대해). */
export interface EmissionFactorSet {
  /** VLOOKUP 시 참조하는 배출계수 열의 단위 (예: "kgGHG/TJ"). */
  t1_unit: string;
  t2_unit: string;
  t1: {
    tC_per_TJ: MaybeMeasurement;
    CO2: MaybeMeasurement;
    CH4: MaybeMeasurement;
    N2O: MaybeMeasurement;
  };
  t2: {
    /** 국가고유 배출계수에서의 연료 분류 (예: "석유", "천연가스", "LPG"). */
    group?: string | null;
    tC_per_TJ: MaybeMeasurement;
    CO2: MaybeMeasurement;
    CH4: MaybeMeasurement;
    N2O: MaybeMeasurement;
  };
}

/** 연료 하나. */
export interface Fuel {
  /** URL / 코드에서 쓸 slug (한글 유지). */
  id: string;
  /** 대분류 (석유류/석탄류/가스류/기타 화석연료/바이오매스). */
  category: string | null;
  /** 표시 이름 (예: "도시가스(LNG)"). */
  name: string;
  /** 상온 상태. 산화계수 T2 조회에 쓰인다. */
  state: FuelState | string | null;
  /** 사용자가 입력하는 사용량의 기본 단위 (예: "ton-연료", "천m³-연료", "kL-연료"). */
  activityUnit: string | null;
  heat: {
    /** 열량계수의 단위 (예: "MJ/kg", "MJ/L", "MJ/Nm3"). */
    unit: string | null;
    t1_net: MaybeMeasurement;
    t1_gross: MaybeMeasurement;
    t2_net: MaybeMeasurement;
  };
  ef: EmissionFactorSet;
  /** 이 연료의 원본 xlsm 행을 대표하는 셀 주소 (연료명 셀). */
  _rowSource: string;
}

/** 산화계수 (상온 × Tier). CH4·N2O 는 산화계수를 적용하지 않는다. */
export type OxidationTable = Record<
  FuelState,
  {
    t1: MaybeMeasurement;
    t2: MaybeMeasurement;
  }
>;

/** GWP 세트 하나 (예: SAR / AR4 / AR5 / AR6). */
export interface GwpSet {
  label: string;
  CO2: number;
  CH4: number;
  N2O: number;
  source: string;
}

export type GwpTables = Record<"SAR" | "AR4" | "AR5" | "AR6", GwpSet>;
