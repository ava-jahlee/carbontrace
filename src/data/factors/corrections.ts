/**
 * corrections.ts — 원본 xlsm 오류 정정 및 최신 국가값 override.
 *
 * carbontrace 는 세 가지 데이터 프로파일을 지원한다:
 *
 *   1) "xlsm-original" (기본): 원본 xlsm 값 그대로 (파리티 보존)
 *   2) "xlsm-corrected"      : xlsm 원본 오류만 정정
 *                              - 등유·항공유 T2 tC/CO2 뒤바꿈 (별표 12 표 B 기준)
 *                              - T2 CH4/N2O 오작성 (IPCC Table 2.5 기준)
 *   3) "gir22-latest"        : xlsm-corrected + GIR 2022.1 공표 최신값
 *
 * 각 override 는 lookup key (fuel.<fuelId>.ef.t2.<field>) 로 값 대체.
 * calc 함수가 이 override 를 우선 적용.
 */

import type { Measurement } from "@/data/factors/types";
import { GIR_EF_2022, IPCC_2006_VOL2_CH2, KETS_ANNEX_12 } from "@/data/sources";

export type DataProfile = "xlsm-original" | "xlsm-corrected" | "gir22-latest";

export const DATA_PROFILE_LABELS: Record<DataProfile, string> = {
  "xlsm-original": "원본 xlsm (파리티 · 기본)",
  "xlsm-corrected": "xlsm 오류 정정",
  "gir22-latest": "GIR 2022.1 최신",
};

export const DATA_PROFILE_DESC: Record<DataProfile, string> = {
  "xlsm-original":
    "원본 xlsm (GHGCalc_V0m_lja) 이 저장한 값 그대로. 파리티 테스트 통과 상태. xlsm 원본 오류 (등유·항공유 뒤바꿈 등) 도 함께 유지되지만 UI 에는 ⚠ warning 배지가 표시된다.",
  "xlsm-corrected":
    "xlsm 원본이 잘못 넣은 값들을 정정. 등유·항공유 T2 tC 뒤바꿈 원상복구 + T2 CH4/N2O 오작성을 IPCC Table 2.5 값으로 정정. 국가고유 배출계수 자체는 xlsm 이 담은 판 (GIR 2017년 승인) 유지.",
  "gir22-latest":
    "xlsm 정정 + GIR 2022.1 공표 최신 국가고유 배출계수 반영. 경유 20.111 → 20.090 · 도시가스LNG 15.272 → 15.236 등 최신값 25개 반영. 배출권거래제 최신 실무에 가장 부합.",
};

/** override 는 값 하나만 바꾸는 게 아니라 primarySource 도 새로 지정. */
export interface Override {
  value: number;
  unit: string;
  primarySource: Measurement["primarySource"];
}

/** 각 lookup key 에 대한 profile-별 override. */
export type OverrideMap = Record<string, Override>;

// ─────────────────────────────────────────────────────────────
// Profile: xlsm-corrected
// ─────────────────────────────────────────────────────────────

/** 등유·항공유 T2 tC 뒤바꿈 정정 (별표 12 표 B 기준). */
const CORRECTED_KEROSENE_JET: OverrideMap = {
  "fuel.등유-기타-등유.ef.t2.tC_per_TJ": {
    value: 19.969,
    unit: "tC/TJ",
    primarySource: {
      ...KETS_ANNEX_12,
      maturity: "verified",
      row: "표 B · 석유(16) · 등유 · 정정판",
      page: "3",
      note: "xlsm 원본 오작성 정정: 저자가 등유·항공유 값을 뒤바꿔 넣은 것을 원상 복구. 별표 12 표 B 등유 정확값 = 19,969 kgC/TJ.",
      reviewedAt: "2026-09-04",
    },
  },
  "fuel.등유-기타-등유.ef.t2.CO2": {
    value: 73152.66666666667,
    unit: "kgGHG/TJ",
    primarySource: {
      ...KETS_ANNEX_12,
      maturity: "verified",
      row: "표 B · 석유(16) · 등유 · CO2 파생값",
      page: "3",
      note: "정정된 tC (19.969) × 44/12 × 1000 = 73,153 kgCO2/TJ (표 표시값 73,200).",
      reviewedAt: "2026-09-04",
    },
  },
  "fuel.제트용-등유-항공유.ef.t2.tC_per_TJ": {
    value: 19.931,
    unit: "tC/TJ",
    primarySource: {
      ...KETS_ANNEX_12,
      maturity: "verified",
      row: "표 B · 석유(16) · 항공유(JET-A1) · 정정판",
      page: "3",
      note: "xlsm 원본 오작성 정정: 저자가 등유·항공유 값을 뒤바꿔 넣은 것을 원상 복구. 별표 12 표 B 항공유 정확값 = 19,931 kgC/TJ.",
      reviewedAt: "2026-09-04",
    },
  },
  "fuel.제트용-등유-항공유.ef.t2.CO2": {
    value: 73080.33333333333,
    unit: "kgGHG/TJ",
    primarySource: {
      ...KETS_ANNEX_12,
      maturity: "verified",
      row: "표 B · 석유(16) · 항공유 · CO2 파생값",
      page: "3",
      note: "정정된 tC (19.931) × 44/12 × 1000 = 73,080 kgCO2/TJ (표 표시값 73,000).",
      reviewedAt: "2026-09-04",
    },
  },
};

/** T2 CH4/N2O helper — IPCC Table 2.5 정확값으로 정정. */
function fixCh4N2O(
  fuelId: string,
  ch4: number,
  n2o: number,
  category: string,
): OverrideMap {
  return {
    [`fuel.${fuelId}.ef.t2.CH4`]: {
      value: ch4,
      unit: "kgGHG/TJ",
      primarySource: {
        ...IPCC_2006_VOL2_CH2,
        maturity: "verified",
        row: `Table 2.5 · ${category} · CH4 · 정정판`,
        page: "2.22–2.23",
        note: `IPCC Vol.2 Ch.2 Table 2.5 (Residential and Agriculture) ${category} 정확값 = ${ch4} kg/TJ. xlsm 원본 오분류 정정.`,
        reviewedAt: "2026-09-04",
      },
    },
    [`fuel.${fuelId}.ef.t2.N2O`]: {
      value: n2o,
      unit: "kgGHG/TJ",
      primarySource: {
        ...IPCC_2006_VOL2_CH2,
        maturity: "verified",
        row: `Table 2.5 · ${category} · N2O · 정정판`,
        page: "2.22–2.23",
        note: `IPCC Vol.2 Ch.2 Table 2.5 ${category} 정확값 = ${n2o} kg/TJ. xlsm 원본 오분류 정정.`,
        reviewedAt: "2026-09-04",
      },
    },
  };
}

/** N2O 만 정정 (석탄 N2O = 1.4 → 1.5 · CH4 = 300 은 유지). */
function fixN2OOnly(fuelId: string, n2o: number, category: string): OverrideMap {
  return {
    [`fuel.${fuelId}.ef.t2.N2O`]: {
      value: n2o,
      unit: "kgGHG/TJ",
      primarySource: {
        ...IPCC_2006_VOL2_CH2,
        maturity: "verified",
        row: `Table 2.5 · ${category} · N2O · 정정판`,
        page: "2.22–2.23",
        note: `IPCC Vol.2 Ch.2 Table 2.5 ${category} N2O 정확값 = ${n2o} kg/TJ. xlsm 은 Peat (1.4) 값을 다른 석탄에도 오적용한 것을 정정.`,
        reviewedAt: "2026-09-04",
      },
    },
  };
}

const CORRECTED_CH4_N2O: OverrideMap = {
  // ── 석탄류 N2O 정정 (xlsm 1.4 → Table 2.5 = 1.5, Peat 제외) ── 13개
  ...fixN2OOnly("국내-무연탄", 1.5, "Anthracite"),
  ...fixN2OOnly("연료용-수입-무연탄", 1.5, "Anthracite"),
  ...fixN2OOnly("원료용-수입-무연탄", 1.5, "Anthracite"),
  ...fixN2OOnly("원료용-유연탄-점결탄", 1.5, "Coking Coal"),
  ...fixN2OOnly("연료용-유연탄-기타-유연탄", 1.5, "Other Bituminous Coal"),
  ...fixN2OOnly("아역청탄-하위-유연탄", 1.5, "Sub-Bituminous Coal"),
  ...fixN2OOnly("갈탄", 1.5, "Lignite"),
  ...fixN2OOnly("유혈암-및-역청암", 1.5, "Oil Shale and Tar Sands"),
  ...fixN2OOnly("갈색-연탄", 1.5, "Brown Coal Briquettes"),
  ...fixN2OOnly("특허-연료", 1.5, "Patent Fuel"),
  ...fixN2OOnly("코크스로-코크스-석탄", 1.5, "Coke Oven Coke"),
  ...fixN2OOnly("가스-공장-코크스-가스-코크스", 1.5, "Gas Coke"),
  ...fixN2OOnly("콜타르", 1.5, "Coal Tar"),

  // ── 가스류 정정 (xlsm 300/(1.4 or 4) → Table 2.5 기체 5/0.1) ── 7개
  ...fixCh4N2O("가스공장-가스", 5, 0.1, "Gas Works Gas"),
  ...fixCh4N2O("코크스로-가스", 5, 0.1, "Coke Oven Gas"),
  ...fixCh4N2O("고로가스", 5, 0.1, "Blast Furnace Gas"),
  ...fixCh4N2O("산소-강철로-가스", 5, 0.1, "Oxygen Steel Furnace Gas"),
  ...fixCh4N2O("매립지-가스", 5, 0.1, "Landfill Gas"),
  ...fixCh4N2O("슬러지-가스", 5, 0.1, "Sludge Gas"),
  ...fixCh4N2O("기타-바이오가스", 5, 0.1, "Other Biogas"),

  // ── 아황산염 잿물 (xlsm 300/4 → Table 2.5 = 3/2 · 특수 화학연료) ──
  ...fixCh4N2O("아황산염-잿물", 3, 2, "Sulphite Lyes (Black Liquor)"),
};

// ─────────────────────────────────────────────────────────────
// Profile: gir22-latest (xlsm-corrected + GIR 2022.1 25개 최신값)
// ─────────────────────────────────────────────────────────────

function girLatest(fuelId: string, tC: number, fuelLabel: string): OverrideMap {
  const co2 = (tC * 44 * 1000) / 12;
  return {
    [`fuel.${fuelId}.ef.t2.tC_per_TJ`]: {
      value: tC,
      unit: "tC/TJ",
      primarySource: {
        ...GIR_EF_2022,
        row: `GIR 2022.1 공표 · ${fuelLabel}`,
        note: `GIR 승인 국가고유 배출계수 · 2022.1 공표 (연료연소 부문 25개) · ${fuelLabel} = ${tC} kgC/TJ.`,
        reviewedAt: "2026-09-04",
      },
    },
    [`fuel.${fuelId}.ef.t2.CO2`]: {
      value: co2,
      unit: "kgGHG/TJ",
      primarySource: {
        ...GIR_EF_2022,
        row: `GIR 2022.1 공표 · ${fuelLabel} · CO2 파생값`,
        note: `GIR 2022.1 tC (${tC}) × 44/12 × 1000 = ${Math.round(co2)} kgCO2/TJ.`,
        reviewedAt: "2026-09-04",
      },
    },
  };
}

/** GIR 2022.1 공표 25개 값 중 우리 fuel 매핑이 확실한 것들. */
const GIR22_UPDATES: OverrideMap = {
  ...girLatest("경유-가스디젤-오일", 20.09, "경유"),
  ...girLatest("도시가스LNG", 15.236, "도시가스(LNG)"),
  ...girLatest("천연가스LNG", 15.281, "천연가스(LNG)"),
  ...girLatest("휘발유-자동차용-가솔린", 19.731, "휘발유"),
  ...girLatest("등유-기타-등유", 19.926, "등유"),
  ...girLatest("제트용-등유-항공유", 19.956, "항공유(JET-A1)"),
  ...girLatest("B-A유", 20.44, "B-A유"),
  ...girLatest("B-B유", 20.9, "B-B유"),
  ...girLatest("B-C유-잔여-석유연료", 21.249, "B-C유"),
  ...girLatest("프로판LPG1호", 17.63, "프로판(LPG1호)"),
  ...girLatest("부탄LPG3호", 18.094, "부탄(LPG3호)"),
  ...girLatest("국내-무연탄", 29.705, "국내무연탄"),
  ...girLatest("연료용-수입-무연탄", 27.32, "수입무연탄(연료용)"),
};

// ─────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────

const CORRECTED_PROFILE: OverrideMap = {
  ...CORRECTED_KEROSENE_JET,
  ...CORRECTED_CH4_N2O,
};

const GIR22_PROFILE: OverrideMap = {
  ...CORRECTED_PROFILE,
  ...GIR22_UPDATES,
};

const PROFILES: Record<DataProfile, OverrideMap> = {
  "xlsm-original": {},
  "xlsm-corrected": CORRECTED_PROFILE,
  "gir22-latest": GIR22_PROFILE,
};

/** 주어진 profile 에서 특정 lookup key 의 override 반환. 없으면 undefined. */
export function getOverride(profile: DataProfile, lookupKey: string): Override | undefined {
  return PROFILES[profile][lookupKey];
}

/** 주어진 profile 의 전체 override 수 (UI 표시용). */
export function countOverrides(profile: DataProfile): number {
  return Object.keys(PROFILES[profile]).length;
}
