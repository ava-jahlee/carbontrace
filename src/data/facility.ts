/**
 * Facility (시설 · 사업장) · 원 xlsm Main 시트의 진입 정보를 그대로 재현.
 *
 * 원본 · GHGCalc_V0m_lja.xlsm · Main!C3 · H3 · G5 · F5 · D14/E14/F14
 * 근거 문서 · K-ETS 별표 5 (시설규모 · 등급 기준) · 별표 6 (최소 Tier)
 *
 * 이 xlsm 은 처음부터 1A4 (기타 · 고정연소 · 건물 부문) 전용이다.
 * 따라서 분야·부문은 고정 · 사용자 선택은 3 개:
 *   1. 현장명 (site name · 자유 입력)
 *   2. 용도 (usage · 상업용/공공 · 주거용)
 *   3. 연간 GHG 배출량 (annualGhgMTons · 만ton/yr)
 *
 * 등급 (F5) 과 각 계수의 최소 Tier (D14/E14/F14) 는 자동 산정된다.
 */

/** 시설 용도 · Main!H3 dropdown · _Law&GL22!F23:F24 */
export type FacilityUsage = "residential" | "commercial-public";

export const FACILITY_USAGE_LABELS: Record<FacilityUsage, { ko: string; en: string; ipccCode: string }> = {
  "residential": {
    ko: "주거용",
    en: "Residential",
    ipccCode: "1A4b",
  },
  "commercial-public": {
    ko: "상업용 · 공공",
    en: "Commercial / Institutional",
    ipccCode: "1A4a",
  },
};

/** K-ETS 별표 5 · 시설규모 등급 */
export type FacilityGrade = "A" | "B" | "C";

/** 등급 기준 (연간 GHG 만ton/yr) · _Law&GL22!B109:C111 */
export const FACILITY_GRADE_THRESHOLDS = [
  { grade: "A" as const, gteMTons: 0, ltMTons: 5 },
  { grade: "B" as const, gteMTons: 5, ltMTons: 50 },
  { grade: "C" as const, gteMTons: 50, ltMTons: Infinity },
] as const;

export const FACILITY_GRADE_DESC: Record<FacilityGrade, string> = {
  A: "0 이상 · 5 미만 만ton/yr · 소규모 사업장",
  B: "5 이상 · 50 미만 만ton/yr · 중규모 사업장",
  C: "50 이상 만ton/yr · 대규모 사업장",
};

/** 최소 Tier · Main!D14/E14/F14 → 등급별 매핑 */
export type Tier = "T1" | "T2" | "T3";

export interface MinTiers {
  /** 열량계수 (heat / calorific) · D14 */
  heat: Tier;
  /** 배출계수 (emission factor) · E14 */
  ef: Tier;
  /** 산화계수 (oxidation) · F14 */
  ox: Tier;
}

export const MIN_TIERS_BY_GRADE: Record<FacilityGrade, MinTiers> = {
  A: { heat: "T2", ef: "T1", ox: "T1" },
  B: { heat: "T2", ef: "T2", ox: "T2" },
  C: { heat: "T3", ef: "T3", ox: "T3" },
};

/**
 * Facility 엔티티 · localStorage 에 저장되는 최상위 시설 정보.
 * IPCC 코드·분야·부문은 이 xlsm 이 1A4 전용이라 고정.
 */
export interface Facility {
  /** 사업장·현장명 · Main!C3 · 자유 입력 */
  siteName: string;
  /** 용도 · Main!H3 · dropdown 2 개 */
  usage: FacilityUsage;
  /** 연간 GHG 배출량 · Main!G5 · 만ton/yr · > 0 */
  annualGhgMTons: number;
  /** 스키마 버전 · 마이그레이션용 */
  schemaVersion: 1;
  /** 생성일자 · ISO 8601 */
  createdAt: string;
  /** 수정일자 · ISO 8601 */
  updatedAt: string;
}

/** 이 도구 전체가 고정으로 다루는 IPCC 카테고리 · 참고용 */
export const FIXED_IPCC_CATEGORY = {
  sector: "1A. 에너지",
  sectorEn: "1A. Energy",
  subSector: "1A4. 기타",
  subSectorEn: "1A4. Other Sectors",
} as const;
