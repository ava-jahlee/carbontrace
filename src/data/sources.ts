/**
 * carbontrace — Primary Source 문서 카탈로그.
 *
 * 이 파일이 정의하는 것: "우리가 어떤 원문서에서 값을 가져왔다고 주장하는가."
 *
 * 각 Measurement 는 이 카탈로그의 문서 하나를 참조한다.
 * 감사자는 이 참조를 따라 원문서로 역추적해서 값을 검증할 수 있어야 한다.
 *
 * ─────────────────────────────────────────────────────────────
 * 성숙도 (maturity) 표기 규칙
 *
 *   verified  : 문서 확인 완료, 표·페이지·행까지 명시됨
 *   documented: 문서 확인 완료, 표까지 명시 (페이지·행은 추후)
 *   asserted  : 문서명·표는 알지만 원문 재확인 필요
 *   pending   : 조사 미완료. 이 값은 원본 xlsm 에서 파생됐지만 원문서 재추적 필요.
 *
 * v0.1 은 대부분 asserted 상태로 시작. 조사 릴리스에서 verified 로 승격.
 * ─────────────────────────────────────────────────────────────
 */

export type SourceMaturity = "verified" | "documented" | "asserted" | "pending";

export type SourceKind =
  | "ipcc-2006"        // IPCC 2006 Guidelines for National GHG Inventories
  | "ipcc-ar"          // IPCC Assessment Reports (SAR/AR4/AR5/AR6)
  | "gir"              // 온실가스종합정보센터 (Greenhouse Gas Inventory & Research Center of Korea)
  | "kets-guideline"   // 온실가스 배출권거래제의 배출량 보고 및 인증에 관한 지침 (환경부 고시)
  | "national-inventory" // 국가 온실가스 인벤토리 보고서 (NIR)
  | "kdhc"             // 한국지역난방공사 (Korea District Heating Corporation)
  | "user-input"       // 사업자 T3 직접 입력
  | "constant"         // 물리 상수 / 단위 환산 계수
  | "convention";      // IPCC 관례 (예: CH4·N2O 는 산화계수 미적용)

export interface PrimarySource {
  /** 문서 카테고리. */
  kind: SourceKind;

  /** 카탈로그 내 문서 고유 ID (예: "ipcc-2006-vol2-ch1"). */
  docId: string;

  /** 문서 정식 이름. */
  doc: string;

  /** 문서 발행처. */
  publisher: string;

  /** 판 · 년도. */
  edition?: string;

  /** 문서 내 위치 (예: "Volume 2 (Energy), Chapter 1"). */
  part?: string;

  /** 표 번호 (예: "Table 1.4"). */
  table?: string;

  /** 페이지 (예: "1.24"). documented 이상에서 채워짐. */
  page?: string;

  /** 표 내부의 행 라벨 (예: "Sub-bituminous Coal"). verified 에서 채워짐. */
  row?: string;

  /** 원문서 URL. 감사자가 클릭해서 갈 수 있는 링크. */
  url?: string;

  /** 조사 성숙도. */
  maturity: SourceMaturity;

  /** 마지막 조사·확인 일자 (YYYY-MM-DD). */
  reviewedAt?: string;

  /** 추가 메모 (예: "국가 인벤토리는 SAR GWP 사용 채택"). */
  note?: string;
}

// ─────────────────────────────────────────────────────────────
// 카탈로그 — 이번 릴리스에서 참조하는 문서들
// ─────────────────────────────────────────────────────────────

/**
 * IPCC 2006 Guidelines for National GHG Inventories · Volume 2 (Energy)
 * · Chapter 1 (Introduction) : Table 1.2, 1.4 — 기본(default) 배출계수 (T1)
 * · Chapter 2 (Stationary Combustion) : 연료 열량계수 · 산화계수 (T1)
 */
export const IPCC_2006_VOL2_CH1: PrimarySource = {
  kind: "ipcc-2006",
  docId: "ipcc-2006-vol2-ch1",
  doc: "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  publisher: "IPCC",
  edition: "2006",
  part: "Volume 2 (Energy), Chapter 1 (Introduction)",
  table: "Table 1.2 / Table 1.4 (Default Emission Factors)",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  maturity: "asserted",
  reviewedAt: "2026-08-31",
  note: "T1 CO2/CH4/N2O 배출계수 기본값. 값 단위 페이지·행 매핑 조사 필요.",
};

export const IPCC_2006_VOL2_CH2: PrimarySource = {
  kind: "ipcc-2006",
  docId: "ipcc-2006-vol2-ch2",
  doc: "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  publisher: "IPCC",
  edition: "2006",
  part: "Volume 2 (Energy), Chapter 2 (Stationary Combustion)",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol2.html",
  maturity: "asserted",
  reviewedAt: "2026-08-31",
  note: "고정 연소 관련 방법론·기본값.",
};

/**
 * 온실가스 배출권거래제 지침 · 별첨6 (연료별 산화계수)
 * 환경부 고시.
 */
export const KETS_ANNEX_6: PrimarySource = {
  kind: "kets-guideline",
  docId: "kets-annex-6",
  doc: "온실가스 배출권거래제의 배출량 보고 및 인증에 관한 지침 · 별첨6",
  publisher: "환경부",
  edition: "최신 고시",
  part: "별첨6 (연료별 산화계수)",
  maturity: "asserted",
  reviewedAt: "2026-08-31",
  note: "상온(고체/액체/기체) × Tier(T1/T2) 별 산화계수. 고시 개정 이력 확인 필요.",
};

/**
 * 온실가스 배출권거래제 지침 · 별첨12 (연료별 국가고유 발열량)
 */
export const KETS_ANNEX_12: PrimarySource = {
  kind: "kets-guideline",
  docId: "kets-annex-12",
  doc: "온실가스 배출권거래제의 배출량 보고 및 인증에 관한 지침 · 별첨12",
  publisher: "환경부",
  edition: "최신 고시",
  part: "별첨12 (연료별 국가고유 발열량)",
  maturity: "asserted",
  reviewedAt: "2026-08-31",
  note: "T2 열량계수 (국가고유 발열량). 17년 · 22년 개정판 각각 별도 매핑 필요.",
};

/**
 * GIR 국가고유 배출계수 · 2017년 개정본
 * 온실가스종합정보센터.
 */
export const GIR_EF_2017: PrimarySource = {
  kind: "gir",
  docId: "gir-ef-2017",
  doc: "국가 고유 배출계수 (2017년 개정)",
  publisher: "온실가스종합정보센터 (GIR)",
  edition: "2017 개정",
  url: "http://www.gir.go.kr",
  maturity: "asserted",
  reviewedAt: "2026-08-31",
  note: "현재 xlsm 이 참조하는 국가고유 T2 배출계수의 근거. 실제 공식 pdf 재확보 필요.",
};

/**
 * GIR 국가고유 배출계수 · 2022년 개정본
 * (v0.1 에는 아직 데이터 병합 안 됨)
 */
export const GIR_EF_2022: PrimarySource = {
  kind: "gir",
  docId: "gir-ef-2022",
  doc: "국가 고유 배출계수 (2022년 개정)",
  publisher: "온실가스종합정보센터 (GIR)",
  edition: "2022 개정",
  url: "http://www.gir.go.kr",
  maturity: "pending",
  reviewedAt: "2026-08-31",
  note: "다음 릴리스에서 병합 예정. 현재는 참조되지 않음.",
};

/**
 * 국가 온실가스 인벤토리 보고서 (NIR)
 * 매년 발간. SAR GWP 채택 근거.
 */
export const NATIONAL_INVENTORY_REPORT: PrimarySource = {
  kind: "national-inventory",
  docId: "national-inventory",
  doc: "국가 온실가스 인벤토리 보고서",
  publisher: "온실가스종합정보센터 (GIR)",
  edition: "최신 보고서",
  url: "http://www.gir.go.kr",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "한국은 GWP 로 SAR (IPCC 1995) 을 국가 인벤토리에 채택함. 이 값이 K-ETS 계산에 사용됨.",
};

/**
 * IPCC Second Assessment Report (SAR, 1995)
 * — 국가 인벤토리가 채택한 GWP 원출처.
 */
export const IPCC_SAR: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-sar-1995",
  doc: "IPCC Second Assessment Report",
  publisher: "IPCC",
  edition: "1995",
  part: "Working Group I, Chapter 2 (GWP 100-year values)",
  url: "https://www.ipcc.ch/report/climate-change-1995-the-science-of-climate-change/",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "CO2=1, CH4=21, N2O=310. 한국 국가 인벤토리 · K-ETS 채택 GWP.",
};

export const IPCC_AR4: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar4-2007",
  doc: "IPCC Fourth Assessment Report",
  publisher: "IPCC",
  edition: "2007",
  part: "Working Group I, Chapter 2 (Table 2.14, 100-year GWP)",
  url: "https://www.ipcc.ch/report/ar4/wg1/",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "CO2=1, CH4=25, N2O=298.",
};

export const IPCC_AR5: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar5-2014",
  doc: "IPCC Fifth Assessment Report",
  publisher: "IPCC",
  edition: "2014",
  part: "Working Group I, Chapter 8 (Table 8.7, 100-year GWP without feedback)",
  url: "https://www.ipcc.ch/report/ar5/wg1/",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "CO2=1, CH4=28, N2O=265. carbon-climate feedback 미포함 값.",
};

export const IPCC_AR6: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar6-2021",
  doc: "IPCC Sixth Assessment Report",
  publisher: "IPCC",
  edition: "2021",
  part: "Working Group I, Chapter 7 (Table 7.15, GWP-100)",
  url: "https://www.ipcc.ch/report/ar6/wg1/",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "CO2=1, CH4=27.9 (non-fossil) / 29.8 (fossil), N2O=273.",
};

/**
 * 한국지역난방공사 열(스팀) 배출계수 (지역별)
 * — Scope 2 (다음 릴리스) 에서 사용.
 */
export const KDHC_HEAT_EF: PrimarySource = {
  kind: "kdhc",
  docId: "kdhc-heat-ef",
  doc: "한국지역난방공사 열(스팀) 온실가스 배출계수",
  publisher: "한국지역난방공사",
  edition: "2023 공시 (계획기간 4기)",
  url: "https://www.kdhc.co.kr",
  maturity: "documented",
  reviewedAt: "2026-08-31",
  note: "지역별 지사(수도권/평택/청주/세종/대구/양산/김해/광주전남) 별 CO2/CH4/N2O 배출계수. 계획기간 3기/4기 별도.",
};

/**
 * 카탈로그 전체 (UI 등에서 목록 조회에 사용).
 */
export const SOURCES = {
  IPCC_2006_VOL2_CH1,
  IPCC_2006_VOL2_CH2,
  KETS_ANNEX_6,
  KETS_ANNEX_12,
  GIR_EF_2017,
  GIR_EF_2022,
  NATIONAL_INVENTORY_REPORT,
  IPCC_SAR,
  IPCC_AR4,
  IPCC_AR5,
  IPCC_AR6,
  KDHC_HEAT_EF,
} as const;

export type SourceKey = keyof typeof SOURCES;
