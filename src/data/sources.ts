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
 * · Chapter 1 (Introduction)
 *   - Table 1.2 (p.1.18–1.19) : Default Net Calorific Values (NCV)
 *   - Table 1.3 (p.1.21–1.22) : Default Carbon Content (kg/GJ = tC/TJ)
 *   - Table 1.4 (p.1.23–1.24) : Default CO2 Emission Factors
 *     · 표시값은 반올림. 정확값은 표 하단 계산식 C = A × B × 44/12 × 1000 으로 유도.
 */
export const IPCC_2006_VOL2_CH1: PrimarySource = {
  kind: "ipcc-2006",
  docId: "ipcc-2006-vol2-ch1",
  doc: "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "2006",
  part: "Volume 2 (Energy) · Chapter 1 (Introduction)",
  table: "Table 1.2 (NCV, p.1.18–1.19) · Table 1.3 (Carbon Content, p.1.21–1.22) · Table 1.4 (CO2 EF, p.1.23–1.24)",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "T1 열량계수 · 탄소함량 · CO2 배출계수 (IPCC 국제 관례 기본값). Ch.1 은 CO2 만 다루며, CH4·N2O 는 Vol.2 Ch.2 참조.",
};

/**
 * IPCC 2006 Guidelines for National GHG Inventories · Volume 2 (Energy)
 * · Chapter 2 (Stationary Combustion)
 *   섹터별 CH4·N2O 기본 배출계수 (Ch.1 은 CO2 · Ch.2 는 CH4/N2O 분담).
 *   - Table 2.2 (p.2.16–2.17) : Energy Industries
 *   - Table 2.3 (p.2.18–2.19) : Manufacturing Industries & Construction
 *   - Table 2.4 (p.2.20–2.21) : Commercial/Institutional
 *   - Table 2.5 (p.2.22–2.23) : Residential & Agriculture/Forestry/Fishing
 *   본 계산기 (K-ETS 대상 사업체 배출) 는 Table 2.2 (Energy Industries) 채택.
 */
export const IPCC_2006_VOL2_CH2: PrimarySource = {
  kind: "ipcc-2006",
  docId: "ipcc-2006-vol2-ch2",
  doc: "2006 IPCC Guidelines for National Greenhouse Gas Inventories",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "2006",
  part: "Volume 2 (Energy) · Chapter 2 (Stationary Combustion)",
  table: "Table 2.2 (Energy Industries, p.2.16–2.17) · Table 2.3/2.4/2.5 (섹터별)",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "T1 CH4/N2O 배출계수. 섹터별 4개 표가 있으며 본 계산기는 Energy Industries (Table 2.2) 채택 — 우리 xlsm 의 석탄류 CH4=1 값이 T2.2 와 일치 (T2.3/T2.4=10, T2.5=300 이 아님).",
};

/**
 * 온실가스 배출권거래제 지침 · 별표 6
 * 정식 명칭: 「배출활동별 온실가스 배출량 등의 세부산정방법 및 기준 (제11조 관련)」
 *
 * 환경부 (現 기후에너지환경부) 고시. 산화계수는 이 별표 안의 각 배출활동
 * (고정연소 고체/액체/기체) § "④ 산화계수 (fi)" 조항에 규정.
 */
export const KETS_ANNEX_6: PrimarySource = {
  kind: "kets-guideline",
  docId: "kets-annex-6",
  doc: "온실가스 배출권거래제의 배출량 보고 및 인증에 관한 지침 · 별표 6",
  publisher: "환경부 (現 기후에너지환경부)",
  edition: "고시 제2025-64호 (2025-04-11 개정)",
  part: "별표 6 「배출활동별 온실가스 배출량 등의 세부산정방법 및 기준」 (제11조 관련)",
  url: "https://gmi.go.kr/upload/format/Attachment6_Scope.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "산화계수는 각 배출활동(고정연소 고체·액체·기체) 산정방법론의 「④ 산화계수 (fi)」 조항에 규정. 값별 위치는 verified 매핑 참조.",
};

/**
 * 온실가스 배출권거래제 지침 · 별표 12 (연료별 국가 고유 발열량 및 배출계수)
 * — Tier 2 열량계수 (순발열량) · Tier 2 국가고유 배출계수 원출처.
 */
export const KETS_ANNEX_12: PrimarySource = {
  kind: "kets-guideline",
  docId: "kets-annex-12",
  doc: "온실가스 배출권거래제의 배출량 보고 및 인증에 관한 지침 · 별표 12",
  publisher: "환경부 (現 기후에너지환경부)",
  edition: "고시 제2025-64호 (2025-04-11 개정)",
  part: "별표 12 「연료별 국가 고유 발열량 및 배출계수」 (제15조제2항 관련)",
  table: "표 A 연료별 국가 고유 발열량 (에너지법 시행규칙 별표) · 표 B 연료별 국가고유 배출계수",
  url: "https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200201&flNm=%5B%EB%B3%84%ED%91%9C+12%5D+%EC%97%B0%EB%A3%8C%EB%B3%84+%EA%B5%AD%EA%B0%80+%EA%B3%A0%EC%9C%A0+%EB%B0%9C%EC%97%B4%EB%9F%89+%EB%B0%8F+%EB%B0%B0%EC%B6%9C%EA%B3%84%EC%88%98+%28%EC%A0%9C15%EC%A1%B0%EC%A0%9C2%ED%95%AD+%EA%B4%80%EB%A0%A8%29&flSeq=151024615",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "T2 열량계수 표 A 27개 + T2 국가고유 배출계수 표 B 21개 연료 × (tC + CO2) = 42개 · 총 69개 값 verified 승격. 표 B 4개(등유·경유·항공유·도시가스LNG)는 xlsm 값이 별표 12 와 달라 GIR 별도 공표계수 채택으로 추정 (verified 승격 안 됨, GIR_EF_2017 유지). 특히 xlsm 등유·항공유 tC 값이 별표 12 와 정확히 뒤바뀌어 있어 원본 오작성 가능성. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구, 에너지관리공단.",
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
 * IPCC Second Assessment Report (SAR, 1995) — Working Group I.
 * K-ETS 배출권거래제 지침 별표 6 이 채택한 GWP 원출처.
 */
export const IPCC_SAR: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-sar-1995",
  doc: "IPCC Second Assessment Report · Climate Change 1995: The Science of Climate Change",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "1995 (WG1 Full Report, digitized 2010)",
  part: "Working Group I · Summary for Policymakers Table 4 · Ch.2 Table 2.9",
  url: "https://www.ipcc.ch/site/assets/uploads/2018/02/ipcc_sar_wg_I_full_report.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "GWP-100: CO2=1, CH4=21, N2O=310. K-ETS 배출권거래제 지침 별표 6 채택 값 (2024년 이전에는 한국 국가 인벤토리도 SAR 채택했으나 파리협정 대응으로 2024년부터 AR5 로 전환).",
};

/**
 * IPCC Fourth Assessment Report (AR4, 2007) — Working Group I Chapter 2.
 */
export const IPCC_AR4: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar4-2007",
  doc: "IPCC Fourth Assessment Report · Climate Change 2007: The Physical Science Basis",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "2007",
  part: "Working Group I · Chapter 2 (Changes in Atmospheric Constituents and Radiative Forcing)",
  table: "Table 2.14 (Direct GWPs relative to CO2, 100-year)",
  url: "https://www.ipcc.ch/site/assets/uploads/2018/02/ar4-wg1-chapter2-1.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "GWP-100: CO2=1, CH4=25, N2O=298.",
};

/**
 * IPCC Fifth Assessment Report (AR5, 2013) — Working Group I Chapter 8 Appendix 8.A.
 * 파리협정 투명성체계 대응으로 2024년부터 한국 국가 인벤토리에서 채택.
 */
export const IPCC_AR5: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar5-2014",
  doc: "IPCC Fifth Assessment Report · Climate Change 2013: The Physical Science Basis",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "2013 (WG1 Full Report)",
  part: "Working Group I · Chapter 8 (Anthropogenic and Natural Radiative Forcing) · Appendix 8.A",
  table: "Table 8.7 (Lifetimes, radiative efficiencies and metrics)",
  url: "https://www.ipcc.ch/site/assets/uploads/2018/02/WG1AR5_Chapter08_FINAL.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "GWP-100 (without climate-carbon feedback): CO2=1, CH4=28, N2O=265. 2024년~ 한국 국가 온실가스 인벤토리(NIR) 채택 값 (K-ETS 배출권거래제는 여전히 SAR 사용).",
};

/**
 * IPCC Sixth Assessment Report (AR6, 2021) — Working Group I Chapter 7.
 * Methane 을 fossil/non-fossil 로 분리 규정 (Table 7.15). 별도 Table 7.SM.7 에 통합 값 제공.
 */
export const IPCC_AR6: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar6-2021",
  doc: "IPCC Sixth Assessment Report · Climate Change 2021: The Physical Science Basis",
  publisher: "IPCC (Intergovernmental Panel on Climate Change)",
  edition: "2021 (WG1 Full Report)",
  part: "Working Group I · Chapter 7 (Earth's Energy Budget, Climate Feedbacks, Climate Sensitivity)",
  table: "Table 7.15 (GWP/GTP) · Table 7.SM.7 (methane, radiative forcing only)",
  url: "https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter07.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "GWP-100: CO2=1, CH4=27.9 (methane pure RF, Table 7.SM.7), N2O=273 (Table 7.15). AR6 는 methane 을 fossil (29.8) 과 non-fossil (27.0) 로 분리 규정하지만 본 계산기는 통합 값 27.9 사용.",
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
  IPCC_SAR,
  IPCC_AR4,
  IPCC_AR5,
  IPCC_AR6,
  KDHC_HEAT_EF,
} as const;

export type SourceKey = keyof typeof SOURCES;
