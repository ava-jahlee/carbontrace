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
  | "ghg-protocol"     // GHG Protocol (WRI + WBCSD) · Corporate Standard · Scope 3 시리즈
  | "nier"             // 국립환경과학원 (National Institute of Environmental Research) · 환경부 산하
  | "pcaf"             // Partnership for Carbon Accounting Financials · 금융업 Scope 3
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
  table: "Table 2.2 (Energy Industries, p.2.16–2.17) · Table 2.5 (Residential and Agriculture, p.2.22–2.23)",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "CH4/N2O 배출계수 원출처. Tier 1 = Table 2.2 (Energy Industries, 109개 값 verified). Tier 2 = Table 2.5 (Residential and Agriculture, 90개 값 verified). K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값의 실제 원출처는 지침이 아니라 IPCC 다른 부문 표 (원본 xlsm 저자가 T1=Energy Industries, T2=Residential 두 부문을 담아둔 것으로 해석). 원본 xlsm 오작성 36건 발견 (석탄 N2O Peat 값 오적용, 여러 gas 류 그룹 오분류) 은 GIR_EF_2017 유지.",
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
  note: "산화계수는 각 배출활동(고정연소 고체·액체·기체) 산정방법론의 「④ 산화계수 (fi)」 조항에 규정. 값별 위치는 verified 매핑 참조. 별표 6 은 CH4/N2O 배출계수를 Tier 1 만 규정 (별표 10 IPCC 기본 배출계수 인용) 하며 Tier 2 CH4/N2O 는 규정하지 않음 → xlsm T2 CH4/N2O 값의 실제 원출처는 IPCC Vol.2 Ch.2 Table 2.5 (Residential and Agriculture) 로 매핑됨.",
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
 * GIR 승인 국가고유 배출계수 · 연료연소 부문 · 2017년 승인 판
 * 온실가스종합정보센터.
 *
 * 이 판은 별표 12 (K-ETS 배출권거래제용, 등유·경유 병합 · 천연가스·도시가스LNG 병합)
 * 와 달리 각 연료를 세분화한 원본 GIR 공표. 우리 xlsm 은 이 판을 참조해
 * 경유(20.111) · 도시가스LNG(15.272) 값을 넣었다. KEEI 학술지 논문에서 시대별 판
 * 대조표 (~06 IPCC 기본 → 07~ → 12~ → 17~ → 22~) 로 이 판의 정체를 확인.
 *
 * 원문 재확보 방법:
 *   1) GIR 국가·지역 온실가스 통계 게시판 (menuId=36) 오래된 페이지에서 "2017년(2018년 승인)
 *      국가 온실가스 배출·흡수계수 공표" pdf 다운로드
 *   2) 또는 참조 논문: 민선영·최용옥 (2024), "월별 자료를 이용한 선도적인 에너지 분야 온실가스
 *      배출량 산정", 에너지경제연구 23(1):21-48 <표 2>
 */
export const GIR_EF_2017: PrimarySource = {
  kind: "gir",
  docId: "gir-ef-2017",
  doc: "GIR 승인 국가고유 배출계수 · 연료연소 부문 · 2017년 승인 (2018.1 공표 추정)",
  publisher: "온실가스종합정보센터 (GIR · 現 기후에너지환경부 소속)",
  edition: "2017년 승인 · 2018년 공표 (2021년까지 5년간 적용)",
  part: "1A 연료연소 부문 배출계수 (CO2 배출계수 tC/TJ · 세분화판)",
  table: "GIR 승인 국가고유 배출계수 · 2017년 승인분 (환경부 온실가스종합정보센터)",
  url: "https://www.gir.go.kr/home/index.do?menuId=36",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "xlsm 이 T2 tC/CO2 컬럼에 실제로 참조한 GIR 공표 판. 별표 12 표 B (배출권거래제용 반올림 및 유사연료 병합판) 와 달리 이 판은 세분화값 (경유 · 도시가스LNG 를 별도 값으로 규정). 대표값 (tC/TJ) — 국내무연탄 30.185 · 수입무연탄 27.404 · 유연탄(연료탄) 25.951 · 유연탄(원료탄) 25.963 · 천연가스 15.312 · 도시가스 15.272 · 휘발유 19.548 · 등유 19.969 · 경유 20.111 · B-A유 20.657 · B-B유 21.384 · B-C유 21.929 · 항공유 19.931 · 납사 19.157 · 용제 19.172 · 프로판 17.641 · 부탄 18.107 · 윤활유 19.979 · 석유코크 26.086 · 기타석유(부생연료1호) 20.067 · 부생연료2호 21.729. 이 값들의 재확인 근거: 민선영·최용옥 (2024) 「월별 자료를 이용한 선도적인 에너지 분야 온실가스 배출량 산정」에너지경제연구 23(1):21-48 <표 2> 탄소배출계수 · 자료: 환경부 온실가스종합정보센터(2022); 2021년 승인 국가 온실가스 배출·흡수계수. 후속판 (2022.1 공표) 은 GIR_EF_2022 참조.",
};

/**
 * GIR 국가고유 배출계수 · 2022.1 공표 · 「연료연소 부문 25개」
 * 온실가스종합정보센터.
 *
 * xlsm 이 이 판을 사용하지는 않지만 (K-ETS 별표 12 값 우선 참조) 감사자용
 * 최신 국가고유 배출계수 참조 문서로 등록.
 */
export const GIR_EF_2022: PrimarySource = {
  kind: "gir",
  docId: "gir-ef-2022",
  doc: "GIR 승인 국가고유 배출계수 · 연료연소 부문 25개 · 2022.1 공표",
  publisher: "온실가스종합정보센터 (GIR · 現 기후에너지환경부 소속)",
  edition: "2022년 1월 공표 (2023-01-10 등록)",
  part: "1A 연료연소 부문 25개 배출계수 (석유 16 · 가스 3 · 석탄 6) · CO2 배출계수 (tC/TJ)",
  table: "연료연소 부문(25개) 배출계수 표",
  url: "https://www.gir.go.kr/home/board/read.do?boardId=60&boardMasterId=2&menuId=36",
  maturity: "verified",
  reviewedAt: "2026-09-02",
  note: "GIR 이 승인한 국가고유 배출계수 최신 공표 (2022.1). 근거: 탄소중립기본법 제36조 및 시행령 제39조. 개발: 한국에너지공단 통계분석실. 값 목록 (tC/TJ): 휘발유 19.731 · 등유 19.926 · 경유 20.090 · B-A유 20.440 · B-B유 20.900 · B-C유 21.249 · 나프타 19.083 · 용제 19.128 · 항공유(JET-A1) 19.956 · 아스팔트 21.473 · 석유코크스 26.192 · 윤활유 19.897 · 부생연료유 1호 20.165 · 부생연료유 2호 21.877 · 프로판(LPG1호) 17.630 · 부탄(LPG3호) 18.094 · 천연가스(LNG) 15.281 · 도시가스(LNG) 15.236 · 도시가스(LPG) 17.453 · 국내무연탄 29.705 · 수입무연탄(연료용) 27.320 · 수입무연탄(원료용) 28.990 · 유연탄(연료용) 26.105 · 유연탄(원료용) 25.349 · 아역청탄 26.868. K-ETS 별표 12 (2025-04-11 고시 제2025-64호) 는 이 값 대부분을 소수점 3자리로 재규정하되 일부는 K-ETS 자체 값으로 편성. 참고: 원문 확인 → EG-TIPS 에너지온실가스 종합정보 플랫폼 (https://tips.energy.or.kr/carbon/Ggas_tatistics03.do) 및 GIR 국가·지역 온실가스 통계 게시판.",
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
 * — Scope 2 에서 사용. xlsm _Supplier 시트 8개 지사 × 계획기간 3기·4기 = 16개 값.
 */
export const KDHC_HEAT_EF: PrimarySource = {
  kind: "kdhc",
  docId: "kdhc-heat-ef",
  doc: "한국지역난방공사 열(스팀) 온실가스 배출계수",
  publisher: "한국지역난방공사 (KDHC)",
  edition: "2023 공시 · 계획기간 3기·4기 병기",
  url: "https://www.kdhc.co.kr",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "지사별 배출계수: 수도권·평택·청주·세종·대구·양산·김해·광주전남 8개 지사. K-ETS 배출권거래제 계획기간 3기(2021~2025) 와 4기(2026~2030) 별도 공표. 지사별 열매체(온수·중온수·증기) 및 열원(열병합·열전용) 조합에 따라 값이 다르며, 실측 기반 매년 갱신. 매년 KDHC 홈페이지 공지사항 게시판에서 신 공표 확인 필요.",
};

/**
 * GIR 승인 국가 온실가스 배출계수 · 전력배출계수 · 2017년 승인
 * (2018년 초 공표 추정, xlsm 이 담은 첫 판)
 *
 * xlsm _Law&GL22!J99~L100: 발전단 · 소비단 CO2/CH4/N2O.
 */
export const GIR_POWER_2017: PrimarySource = {
  kind: "gir",
  docId: "gir-power-2017",
  doc: "GIR 승인 국가 온실가스 배출계수 · 전력 부문 · 2017년 승인",
  publisher: "온실가스종합정보센터 (GIR · 現 기후에너지환경부)",
  edition: "2017년 승인 · 2018년 공표 추정 (3년 주기 갱신 · 2021년까지 적용)",
  part: "전력 부문 배출계수 (발전단 · 소비단)",
  table: "GIR 승인 국가 온실가스 배출계수 · 전력배출계수 · 2017년 승인",
  url: "https://www.gir.go.kr/home/index.do?menuId=36",
  maturity: "verified",
  reviewedAt: "2026-09-04",
  note: "발전단 CO2 = 440.1 kgCO2/MWh (0.4401 tCO2/MWh) · CH4 = 0.0034 kgCH4/MWh · N2O = 0.0082 kgN2O/MWh. 소비단 CO2 = 456.7 kgCO2/MWh (0.4567 tCO2/MWh) · CH4 = 0.0036 kgCH4/MWh · N2O = 0.0085 kgN2O/MWh. 순발열량: 발전단 8.9 MJ/kWh · 소비단 9.6 MJ/kWh (별표 12 표 A 와 동일). 소비단 = 송·배전 손실 반영값 (약 3.8% 손실). K-ETS 배출권거래제 실무에서 사용.",
};

/**
 * GIR 승인 국가 온실가스 배출계수 · 전력배출계수 · 2022년 승인
 * (2023년 초 공표, xlsm 이 담은 두 번째 판 = 최신 xlsm 반영 판)
 *
 * xlsm 은 이 판을 반영. 이후 갱신 (2025.3, 2025.12) 은 xlsm 미반영.
 */
export const GIR_POWER_2022: PrimarySource = {
  kind: "gir",
  docId: "gir-power-2022",
  doc: "GIR 승인 국가 온실가스 배출계수 · 전력 부문 · 2022년 승인",
  publisher: "온실가스종합정보센터 (GIR · 現 기후에너지환경부)",
  edition: "2022년 승인 · 2023년 공표 (3년 주기 · 2024년까지 K-ETS 실무 적용)",
  part: "전력 부문 배출계수 (발전단 · 소비단)",
  table: "GIR 승인 국가 온실가스 배출계수 · 전력배출계수 · 2022년 승인",
  url: "https://www.gir.go.kr/home/index.do?menuId=36",
  maturity: "verified",
  reviewedAt: "2026-09-04",
  note: "발전단 CO2 = 440.3 kgCO2/MWh (0.4403 tCO2/MWh) · CH4 = 0.0116 kgCH4/MWh · N2O = 0.0093 kgN2O/MWh. 소비단 CO2 = 474.7 kgCO2/MWh (0.4747 tCO2/MWh) · CH4 = 0.0125 kgCH4/MWh · N2O = 0.01 kgN2O/MWh. 순발열량 (변동 없음): 발전단 8.9 · 소비단 9.6 MJ/kWh. 후속 판: 2024년 승인 판 (2025-03-31 공표 · 2020~2022 평균 = 0.4541 tCO2eq/MWh) → 2023년 판 (2025-12-18 공표 · 2023년 단년도 = 0.4173 tCO2eq/MWh · 갱신 주기가 3년 → 1년으로 단축). xlsm 은 최신 2판을 반영 안 함.",
};

/**
 * GIR 최신 전력배출계수 참조 (감사자용, xlsm 미반영)
 * — 2025년 12월 기후에너지환경부 공표 최신값 두 판을 note 에 등재.
 */
export const GIR_POWER_LATEST: PrimarySource = {
  kind: "gir",
  docId: "gir-power-latest",
  doc: "기후에너지환경부 최신 전력배출계수 (감사 참조용)",
  publisher: "기후에너지환경부 · 국가 온실가스 통계 관리위원회",
  edition: "2024년 승인 (2025-03-31 공표) + 2023년 계수 (2025-12-18 공표)",
  part: "전력 부문 · 소비단 배출계수 (연간 갱신)",
  table: "국가 온실가스 배출계수 · 전력배출계수",
  url: "https://www.gir.go.kr/home/board/read.do?boardId=82&boardMasterId=2&menuId=36",
  maturity: "verified",
  reviewedAt: "2026-09-04",
  note: "2024년 승인 판 (2025-03-31 공표): 2020~2022년 평균 소비단 = 0.4541 tCO2eq/MWh. 2023년 판 (2025-12-18 공표, 최신): 2023년 단년도 소비단 = 0.4173 tCO2eq/MWh (전년 대비 8.1% 감소, 재생에너지 확대 반영). 2025년 12월부터 갱신 주기가 3년 → 1년으로 단축. xlsm 은 2022년 승인 판까지만 반영하므로 감사자는 최신 계수와의 차이를 인식해야 함. 배출권거래제 정산 실무는 여전히 3년 주기 판 적용.",
};

/**
 * 열(스팀) 부문 국가 통합 배출계수 (열전용 · 열병합 · 열평균) — 원출처 미상
 *
 * xlsm _Law&GL22!J101~L103: 열전용 (56,373/1.278/0.166), 열병합 (60,760/2.053/0.549),
 * 열평균 (59,510/1.832/0.44) kgGHG/TJ.
 *
 * 이 3종은 KDHC 지사별 실측값이 아니라, 전국 평균 통합값으로 보임. K-ETS 지침 별표 어딘가에
 * 정의됐을 가능성 큼. 원문 재확보 후 verified 승격 대상.
 */
export const KETS_HEAT_EF: PrimarySource = {
  kind: "kets-guideline",
  docId: "kets-heat-ef",
  doc: "국가 통합 열(스팀) 배출계수 · 열전용/열병합/열평균 3종 (원출처 조사 중)",
  publisher: "환경부 · 산업통상자원부 (K-ETS 지침 관련 추정)",
  edition: "원출처 미상 (추정: K-ETS 지침 별표 또는 GIR 인벤토리 부속 자료)",
  url: "https://www.gir.go.kr/home/index.do?menuId=36",
  maturity: "asserted",
  reviewedAt: "2026-09-04",
  note: "⚠ 원출처 미상. xlsm 값: 열전용 CO2=56,373 · CH4=1.278 · N2O=0.166 kgGHG/TJ · 열병합 CO2=60,760 · CH4=2.053 · N2O=0.549 · 열평균 CO2=59,510 · CH4=1.832 · N2O=0.44. 이 3종 값은 KDHC 지사별 실측이 아닌 전국 통합값으로 보이며 K-ETS 배출권거래제 지침 별표 또는 GIR 국가 인벤토리 부속 자료에 있을 것으로 추정. 원문 확보 후 verified 승격 필요. 감사 시 KDHC 지사별 값 (KDHC_HEAT_EF 참조) 우선 사용 권장.",
};

/**
 * IPCC AR6 Chapter 7 Supplementary Material · Table 7.SM.7
 * — HFCs · PFCs · SF6 · NF3 등 F-gas 상세 GWP-100 값.
 *   냉매 (Scope 1 fugitive) 및 IPPU 에서 사용.
 */
export const IPCC_AR6_TABLE_SM7: PrimarySource = {
  kind: "ipcc-ar",
  docId: "ipcc-ar6-2021-sm7",
  doc: "IPCC AR6 · WG1 · Chapter 7 Supplementary Material · Table 7.SM.7",
  publisher: "IPCC",
  edition: "2021 (Chapter 7 SM · Table 7.SM.7)",
  part: "Working Group I · Chapter 7 · Supplementary Material",
  table: "Table 7.SM.7 (Emissions metrics for individual gases · GWP-20/100/500 · GTP-20/50/100)",
  url: "https://www.ipcc.ch/report/ar6/wg1/downloads/report/IPCC_AR6_WGI_Chapter07_SM.pdf",
  maturity: "verified",
  reviewedAt: "2026-09-04",
  note: "F-gas GWP-100 상세: HFC-134a=1530 · HFC-32=771 · HFC-125=3740 · HFC-143a=5810 · HFC-152a=164 · SF6=24300 · NF3=17400. 냉매 blend (R-410A 등) 는 mass 비율 가중 합. K-ETS 실무는 여전히 SAR (1300, 650, 2800, 3800, 140, 23900) 사용.",
};

/**
 * IPCC 2006 Guidelines Vol.3 · Chapter 7 (IPPU · Emissions of Fluorinated Substitutes for ODS)
 * — 냉매 유출 배출량 산정 방법론. 개별 냉매 GWP 는 AR 문서 별도 참조.
 */
export const IPCC_2006_VOL3_CH7: PrimarySource = {
  kind: "ipcc-2006",
  docId: "ipcc-2006-vol3-ch7",
  doc: "IPCC 2006 Guidelines · Vol.3 · Chapter 7 (Emissions of Fluorinated Substitutes for ODS)",
  publisher: "IPCC",
  edition: "2006 (Vol.3 · Chapter 7)",
  part: "Volume 3 (Industrial Processes and Product Use) · Chapter 7",
  table: "Section 7.5 (Refrigeration and Air Conditioning) · Tier 1a screening approach",
  url: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/3_Volume3/V3_7_Ch7_ODS_Substitutes.pdf",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "냉매 배출량 산정 = 냉매 유출량 (kg) × GWP (kgCO2eq/kg). Tier 1a: 초기 충전량 × 기본 유출률 (연간 · 폐기). Tier 2/3: 물질수지법 (사업장 실측). 건물 냉방·냉장 설비의 Scope 1 fugitive 배출로 분류.",
};

// ─────────────────────────────────────────────────────────────
// Scope 3 · 원문서 카탈로그 (v0.6 신규)
// ─────────────────────────────────────────────────────────────

/**
 * GHG Protocol · Corporate Value Chain (Scope 3) Accounting and Reporting Standard
 * — Scope 3 15 카테고리 정의 · 요구사항 · 보고 형식의 근본 표준.
 *   실제 계산 방법은 별도 Calculation Guidance (2013) 참조.
 */
export const GHG_PROTOCOL_SCOPE3_STANDARD: PrimarySource = {
  kind: "ghg-protocol",
  docId: "ghg-protocol-scope3-standard-2011",
  doc: "Corporate Value Chain (Scope 3) Accounting and Reporting Standard",
  publisher: "World Resources Institute (WRI) + World Business Council for Sustainable Development (WBCSD)",
  edition: "2011",
  part: "Full Standard (152p) · Chapter 5 (Setting the Boundary) · Chapter 6 (Categorizing Emissions)",
  table: "Table 5.4 (Scope 3 Categories · 15 categories overview)",
  url: "https://ghgprotocol.org/corporate-value-chain-scope-3-standard",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "Scope 3 15 카테고리 (Upstream 1-8 · Downstream 9-15) 의 정의 · 경계 · 요구사항의 근본 표준. Corporate Standard(2004) 의 후속 표준. 실제 카테고리별 계산 방법은 별도 Technical Guidance(2013) 참조.",
};

/**
 * GHG Protocol · Technical Guidance for Calculating Scope 3 Emissions (v1.0)
 * — 15 카테고리 각각의 실무 계산 방법 · 데이터 소스 · 배출계수 참조표.
 */
export const GHG_PROTOCOL_SCOPE3_CALC_GUIDANCE: PrimarySource = {
  kind: "ghg-protocol",
  docId: "ghg-protocol-scope3-calc-guidance-2013",
  doc: "Technical Guidance for Calculating Scope 3 Emissions (version 1.0)",
  publisher: "WRI + WBCSD (in partnership with Carbon Trust)",
  edition: "2013 · v1.0 (182p)",
  part: "Chapter 1 (Introduction) · Chapter 2-16 (카테고리별 상세 방법론)",
  url: "https://ghgprotocol.org/scope-3-calculation-guidance-2",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "각 카테고리(Cat 1-15)에 대해 여러 방법론 (spend-based · average-data · supplier-specific · hybrid 등) 을 순차 제시. 방법론 선택 순서: 사업장 실측 우선 → 산업 평균값 → 지출 기반. 저자: WRI+WBCSD 공동 · Carbon Trust 파트너십. Copyright © 2013.",
};

/**
 * 국립환경과학원 · Scope 3 온실가스 배출량 산정 및 보고 가이드라인 (v1.0)
 * — 한국 실무자 대상 국내 지침서. GHG Protocol 3개 표준 기반 · 한국 상황 (배출권거래제·NIR·PCAF)
 *   반영. 상이할 경우 GHG Protocol 우선.
 */
export const NIER_SCOPE3_GUIDELINE: PrimarySource = {
  kind: "nier",
  docId: "nier-scope3-guideline-2024",
  doc: "Scope 3 온실가스 배출량 산정 및 보고 가이드라인 (v1.0)",
  publisher: "국립환경과학원 (NIER · 환경부 산하)",
  edition: "2024.12 · v1.0 · 발간등록번호 NIER-GP2024-103 (정부간행물 11-1480523-005587-01)",
  part: "총 313p · 카테고리별 산정 방법 · 데이터 수집 · 국내 사례",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "한국 실무자용 국내 지침서 · 2024년 12월 발간 (최신). 근거 국제 표준 3종: (1) GHG Protocol Corporate Accounting and Reporting Standard(2004) (2) Corporate Value Chain(Scope 3) Standard(2011) (3) Technical Guidance for Calculation Scope 3 Emissions v1.0(2013). GHG Protocol 과 상이할 경우 GHG Protocol 우선 적용. 감사자·국내 실무자 우선 참조 문서.",
};

/**
 * PCAF · The Global GHG Accounting and Reporting Standard for the Financial Industry
 * — Scope 3 Cat 15 Investments (금융업 · 대출·투자 포트폴리오 배출량) 유일한 산업별 표준.
 */
export const PCAF_STANDARD: PrimarySource = {
  kind: "pcaf",
  docId: "pcaf-global-standard-2022",
  doc: "The Global GHG Accounting and Reporting Standard for the Financial Industry · Part A: Financed Emissions",
  publisher: "Partnership for Carbon Accounting Financials (PCAF)",
  edition: "2nd Edition · 2022-12",
  part: "Part A (Financed Emissions) · 6 asset classes (Listed equity · Business loans · Project finance · Commercial real estate · Mortgages · Motor vehicle loans)",
  url: "https://carbonaccountingfinancials.com/en/standard",
  maturity: "documented",
  reviewedAt: "2026-09-04",
  note: "Scope 3 Cat 15 Investments 계산의 국제 표준. Attribution factor = (금융기관 참여도) / (자산 총가치) 로 대출·투자 대상의 Scope 1+2 (선택적 3) 배출량을 배분. 6개 자산군별 상세 방법론. GHG Protocol Scope 3 Standard 는 Cat 15 계산 방법을 명시하지 않고 PCAF 로 위임. 국내 금융업체도 채택 증가 (KB금융지주·신한금융지주 등).",
};

/**
 * 카탈로그 전체 (UI 등에서 목록 조회에 사용).
 */
export const SOURCES = {
  IPCC_2006_VOL2_CH1,
  IPCC_2006_VOL2_CH2,
  IPCC_2006_VOL3_CH7,
  KETS_ANNEX_6,
  KETS_ANNEX_12,
  GIR_EF_2017,
  GIR_EF_2022,
  IPCC_SAR,
  IPCC_AR4,
  IPCC_AR5,
  IPCC_AR6,
  IPCC_AR6_TABLE_SM7,
  KDHC_HEAT_EF,
  GIR_POWER_2017,
  GIR_POWER_2022,
  GIR_POWER_LATEST,
  KETS_HEAT_EF,
  GHG_PROTOCOL_SCOPE3_STANDARD,
  GHG_PROTOCOL_SCOPE3_CALC_GUIDANCE,
  NIER_SCOPE3_GUIDELINE,
  PCAF_STANDARD,
} as const;

export type SourceKey = keyof typeof SOURCES;
