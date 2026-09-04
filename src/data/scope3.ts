/**
 * scope3.ts — Scope 3 15 카테고리 카탈로그.
 *
 * carbontrace 는 Scope 3 를 다음 세 가지 원칙으로 다룬다:
 *
 *   1) **정의는 표준 그대로.** GHG Protocol Corporate Value Chain (Scope 3)
 *      Standard (2011) 의 15 카테고리 · 원문 명칭 · 정의를 그대로 옮긴다.
 *   2) **방법론은 명시적으로.** 각 카테고리마다 지출 기반 · 활동 기반 · 공급자
 *      특정 등 여러 방법론이 있고, 어느 것을 썼는지 결과와 함께 밝힌다.
 *   3) **방법 투명성 = 감사 가능성.** Scope 3 는 정밀도가 낮은 게 정상. 대신
 *      "어떤 방법으로 얼마의 오차를 감수했는지" 가 감사자에게 투명해야 한다.
 *
 * v0.6 스캐폴딩:
 *   - 15 카테고리 카탈로그만 · 실제 계산 엔진 없음
 *   - 각 카테고리 상세 페이지는 정의·방법론 목록·원문서만
 *   - 데이터·엔진 구현은 카테고리별로 이후 iteration
 */

import type { PrimarySource } from "./sources";
import {
  GHG_PROTOCOL_SCOPE3_STANDARD,
  GHG_PROTOCOL_SCOPE3_CALC_GUIDANCE,
  NIER_SCOPE3_GUIDELINE,
  PCAF_STANDARD,
  IPCC_2006_VOL3_CH7,
} from "./sources";

// ─────────────────────────────────────────────────────────────
// 타입
// ─────────────────────────────────────────────────────────────

export type Scope3Direction = "upstream" | "downstream";
export type Scope3Status = "stub" | "partial" | "complete";

export interface Scope3Methodology {
  /** 방법론 slug (예: "spend-based"). */
  key: string;
  /** 표시 이름 (한글). */
  label: string;
  /** 짧은 설명 · 어떤 데이터가 필요한지. */
  hint: string;
  /** 이 방법론의 원문서 근거. */
  primarySource: PrimarySource;
  /** 이 방법론의 정밀도 (GHG Protocol 권장 순위 · 낮을수록 정밀). */
  precisionRank: 1 | 2 | 3 | 4;
  /** 이 방법론의 carbontrace 구현 상태. */
  status: Scope3Status;
}

export interface Scope3Category {
  /** GHG Protocol category number (1-15). */
  number: number;
  /** URL slug ("cat-01-purchased-goods"). */
  id: string;
  /** upstream vs downstream. */
  direction: Scope3Direction;
  /** GHG Protocol 표준 명칭 (영문 그대로). */
  nameEn: string;
  /** 한글 명칭 (NIER 지침 기반). */
  nameKo: string;
  /** 정의 (한 문장). */
  definition: string;
  /** 건물/일반 사업체 관점 실무 컨텍스트. */
  buildingContext?: string;
  /** 대표 배출 활동 예시. */
  activities: string[];
  /** 방법론 목록 (GHG Protocol 순서 · 상단이 더 정밀). */
  methodologies: Scope3Methodology[];
  /** 이 카테고리의 근본 정의 원문서. */
  primarySource: PrimarySource;
  /** 참조 자료 (선택). */
  additionalSources?: PrimarySource[];
  /** carbontrace 구현 상태. */
  status: Scope3Status;
  /** UI 안내 메모 (준비 중 · 시작 시점 등). */
  note?: string;
}

// ─────────────────────────────────────────────────────────────
// 방법론 공용 정의 (반복 재사용)
// ─────────────────────────────────────────────────────────────

const GHG_P = GHG_PROTOCOL_SCOPE3_CALC_GUIDANCE;
const GHG_S = GHG_PROTOCOL_SCOPE3_STANDARD;
const NIER = NIER_SCOPE3_GUIDELINE;

// ─────────────────────────────────────────────────────────────
// Upstream · Cat 1-8
// ─────────────────────────────────────────────────────────────

const CAT_1: Scope3Category = {
  number: 1,
  id: "cat-01-purchased-goods",
  direction: "upstream",
  nameEn: "Purchased goods and services",
  nameKo: "구매한 제품 · 서비스",
  definition: "보고 회사가 구매한 모든 제품 및 서비스의 upstream (Cradle-to-gate) 배출량.",
  buildingContext: "건물 사업체의 경우 건축 자재 (시멘트·철강·유리·목재) · 사무기기 · 소모품 · IT 서비스 등이 포함됨. Embodied carbon 이 실무 화두.",
  activities: [
    "건축 자재 (콘크리트·철근·유리·단열재)",
    "사무기기 (PC · 모니터 · 프린터)",
    "소모품 (종이 · 잉크 · 청소용품)",
    "IT 서비스 · 클라우드 컴퓨팅",
    "위탁 용역 · 컨설팅",
  ],
  methodologies: [
    {
      key: "supplier-specific",
      label: "공급자 특정 방법",
      hint: "공급자가 제공한 실제 제품/서비스 단위별 배출계수 (ISO 14067 검증).",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "hybrid",
      label: "혼합 방법",
      hint: "공급자 특정 데이터 + 산업 평균 데이터 조합.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "average-data",
      label: "산업 평균 방법",
      hint: "제품 종류 × 산업 평균 배출계수 (ecoinvent · ELCD · KEI 국가LCI).",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
    {
      key: "spend-based",
      label: "지출 기반 방법",
      hint: "지출 금액 × EEIO (환경투입산출) 배출계수 (US EEIO · UK BEIS · 한국 KIET).",
      primarySource: GHG_P,
      precisionRank: 4,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "건물 사업체는 자재 구매 규모에 따라 이 카테고리가 Scope 3 전체의 큰 비중을 차지. 초기에는 지출 기반으로 screening 후 큰 자재부터 공급자 특정으로 심화 권장.",
};

const CAT_2: Scope3Category = {
  number: 2,
  id: "cat-02-capital-goods",
  direction: "upstream",
  nameEn: "Capital goods",
  nameKo: "자본재",
  definition: "장기간 사용되는 자산 (건물·설비·차량 등) 의 upstream 배출량. 감가상각 단위 아닌 구매 시점 전량 계상.",
  buildingContext: "건물 자체가 최대 자본재. 새 건물 신축 · 대규모 설비 (냉각탑 · 보일러 · UPS) 구매 시 큰 배출.",
  activities: [
    "신축·개축 건물 (자재 + 시공)",
    "대형 설비 (HVAC · 발전기 · 엘리베이터)",
    "IT 인프라 (서버 · 네트워크 장비)",
    "차량 (관용차 · 임원 차량)",
  ],
  methodologies: [
    {
      key: "supplier-specific",
      label: "공급자 특정 방법",
      hint: "제조사가 제공한 EPD (Environmental Product Declaration) 사용.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "average-data",
      label: "산업 평균 방법",
      hint: "자본재 종류별 산업 평균 embodied carbon (m³·kg 단위).",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "spend-based",
      label: "지출 기반 방법",
      hint: "자본 지출 × EEIO 배출계수.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "감가상각 아닌 구매 시점 전량 계상 원칙. 건물 신축이 있는 해는 이 카테고리가 급증.",
};

const CAT_3: Scope3Category = {
  number: 3,
  id: "cat-03-fuel-energy",
  direction: "upstream",
  nameEn: "Fuel- and energy-related activities not included in scope 1 or 2",
  nameKo: "연료·에너지 관련 활동 (Scope 1·2 미포함)",
  definition: "Scope 1 연료의 upstream (well-to-tank) + Scope 2 전력·열의 전송 손실 (T&D loss) 및 upstream.",
  buildingContext: "건물의 도시가스·경유·전력·지역난방 모두 해당. 특히 T&D loss (약 3.8%) 가 실질적으로 큰 부분.",
  activities: [
    "Scope 1 연료 upstream (원유 정제 · 파이프라인)",
    "Scope 2 전력 T&D 손실 (송·배전 3~4%)",
    "Scope 2 전력 upstream (발전 연료 채굴·수송)",
    "Scope 2 열 upstream · T&D loss",
  ],
  methodologies: [
    {
      key: "supplier-specific",
      label: "공급자 특정 방법",
      hint: "공급자가 제공한 well-to-tank + T&D loss 계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "IEA · UK BEIS 등이 발표한 국가별 well-to-tank + T&D loss 계수. 한국은 KEPCO T&D 손실률 (약 3.8%) 사용.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "Scope 1·2 이미 구현되어 있으므로 · 이 카테고리는 그 위에 well-to-tank + T&D loss 계수만 곱하면 됨. 우선순위 높은 확장 후보.",
};

const CAT_4: Scope3Category = {
  number: 4,
  id: "cat-04-upstream-transport",
  direction: "upstream",
  nameEn: "Upstream transportation and distribution",
  nameKo: "Upstream 운송 및 물류",
  definition: "구매한 제품·서비스가 보고 회사로 오는 과정의 운송·창고 저장 배출량.",
  buildingContext: "건축 자재 배송 (트럭·철도·해상) · 사무 소모품 배송 · IT 장비 물류 등.",
  activities: [
    "화물 트럭 배송 (자재 · 소모품)",
    "철도 화물",
    "해상 화물 (수입 자재)",
    "항공 화물 (긴급 부품)",
    "물류창고 사용 (냉장·상온)",
  ],
  methodologies: [
    {
      key: "fuel-based",
      label: "연료 기반 방법",
      hint: "운송 사업자가 실제 소비한 연료량 × 배출계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "distance-based",
      label: "거리 기반 방법",
      hint: "화물톤 × 거리 × 운송수단별 배출계수 (GLEC · UK BEIS).",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "spend-based",
      label: "지출 기반 방법",
      hint: "물류 지출 × EEIO 계수.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "GLEC (Global Logistics Emissions Council) Framework 가 국제 물류 표준. 국내는 국토교통부 화물 배출계수 참조.",
};

const CAT_5: Scope3Category = {
  number: 5,
  id: "cat-05-waste",
  direction: "upstream",
  nameEn: "Waste generated in operations",
  nameKo: "사업장 폐기물",
  definition: "보고 회사 사업장에서 발생한 폐기물의 처리 (매립·소각·재활용·하수) 과정 배출량.",
  buildingContext: "일반 폐기물 · 음식물 · 재활용 · 하수. 대형 건물은 하수처리량이 큼.",
  activities: [
    "일반 폐기물 (매립 · 소각)",
    "음식물 폐기물",
    "재활용 (종이 · 플라스틱 · 유리 · 금속)",
    "하수 처리",
    "유해 폐기물 (화학물질 · 형광등)",
  ],
  methodologies: [
    {
      key: "supplier-specific",
      label: "공급자 특정 방법",
      hint: "폐기물 처리업체가 제공한 실제 처리별 배출계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "waste-type-specific",
      label: "폐기물 종류별 방법",
      hint: "폐기물 종류 × 처리 방법 × IPCC Vol.5 (Waste) 기본 배출계수.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "총 폐기물량 × 국가 평균 폐기물 배출계수.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "IPCC 2006 Vol.5 (Waste) 가 근본 배출계수 원문서. 국내는 한국환경공단 폐기물 배출계수 사용.",
};

const CAT_6: Scope3Category = {
  number: 6,
  id: "cat-06-business-travel",
  direction: "upstream",
  nameEn: "Business travel",
  nameKo: "출장",
  definition: "직원의 업무 목적 출장에서 발생한 운송 (항공·철도·자동차) 및 숙박 배출량.",
  buildingContext: "일반 사업체 필수 항목. 항공 출장이 큰 비중. 정확한 자료 확보 (거리·좌석 등급) 가 관건.",
  activities: [
    "항공 (국내 · 국제 · 좌석 등급별)",
    "철도 (KTX · 일반)",
    "자동차 (렌터카 · 임차)",
    "숙박 (호텔)",
  ],
  methodologies: [
    {
      key: "fuel-based",
      label: "연료 기반 방법",
      hint: "직접 소비한 연료 (렌터카 · 임차차량) × 배출계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "distance-based",
      label: "거리 기반 방법",
      hint: "인·km × 교통수단별 배출계수. 항공은 좌석 등급 (Economy · Business · First) 별 계수. UK BEIS · DEFRA 표준.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "spend-based",
      label: "지출 기반 방법",
      hint: "출장비 지출 × EEIO 계수.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "실무에서 자주 계산되는 카테고리. 우선순위 높은 확장 후보. 항공 배출은 RF (Radiative Forcing) 효과 보정 여부 (contrails · NOx 등) 결정 필요.",
};

const CAT_7: Scope3Category = {
  number: 7,
  id: "cat-07-commuting",
  direction: "upstream",
  nameEn: "Employee commuting",
  nameKo: "직원 통근",
  definition: "직원이 집에서 직장으로 오가는 통근에서 발생한 배출량. 재택근무의 에너지 사용도 선택적 포함.",
  buildingContext: "직원 규모 · 통근 수단 조합 · 재택근무 비율에 따라 크게 다름. 통근 조사 (survey) 필요.",
  activities: [
    "자가용 자동차",
    "대중교통 (지하철 · 버스)",
    "자전거 · 도보 (배출 0)",
    "재택근무 (자택 에너지)",
  ],
  methodologies: [
    {
      key: "fuel-based",
      label: "연료 기반 방법",
      hint: "직원별 실제 연료 소비 (자가용) 데이터.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "distance-based",
      label: "거리 기반 방법",
      hint: "직원 수 × 평균 통근 거리 × 수단별 배출계수. 통근 조사 필요.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "직원 수 × 국가 평균 통근 배출량.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "통근 조사 응답률·정확도에 의존. 재택근무는 GHG Protocol 최근 지침 (2022) 참조.",
};

const CAT_8: Scope3Category = {
  number: 8,
  id: "cat-08-upstream-leased",
  direction: "upstream",
  nameEn: "Upstream leased assets",
  nameKo: "Upstream 임차 자산",
  definition: "보고 회사가 임차한 자산 (건물·차량·설비) 의 운영 배출량 · Scope 1·2 에 포함되지 않은 경우.",
  buildingContext: "임차 건물의 경우 · Scope 1·2 정의 (control approach) 에 따라 이 카테고리에 들어갈지 결정됨. Operational control 아닌 경우 여기.",
  activities: [
    "임차 사무 건물의 에너지 사용",
    "임차 창고·물류센터",
    "리스 차량 (Scope 1 아닌 경우)",
  ],
  methodologies: [
    {
      key: "asset-specific",
      label: "자산 특정 방법",
      hint: "임차 자산별 실제 에너지 사용량 데이터.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "lessor-specific",
      label: "임대인 특정 방법",
      hint: "임대인이 제공한 자산별 배출량 데이터.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "자산 유형별 (건물·차량) · 면적/규모 × 산업 평균 원단위.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "Scope 1·2 vs Scope 3 Cat 8 경계는 GHG Protocol 의 organizational boundary (equity share vs financial control vs operational control) 정의에 따라 다름.",
};

// ─────────────────────────────────────────────────────────────
// Downstream · Cat 9-15
// ─────────────────────────────────────────────────────────────

const CAT_9: Scope3Category = {
  number: 9,
  id: "cat-09-downstream-transport",
  direction: "downstream",
  nameEn: "Downstream transportation and distribution",
  nameKo: "Downstream 운송 및 물류",
  definition: "보고 회사가 판매한 제품이 최종 소비자에게 가는 downstream 운송 · 창고 저장 배출량.",
  buildingContext: "건물 사업체 · 제조업 아닌 경우 미해당 가능성 큼. 판매 상품 있는 경우만 대상.",
  activities: [
    "판매 제품의 화물 배송 (트럭 · 철도 · 해상 · 항공)",
    "판매 제품의 물류창고",
    "소비자 픽업 (지점 → 소비자)",
  ],
  methodologies: [
    {
      key: "fuel-based",
      label: "연료 기반 방법",
      hint: "운송 사업자 실제 연료 데이터.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "distance-based",
      label: "거리 기반 방법",
      hint: "화물톤 × 거리 × 운송수단별 배출계수.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "site-specific",
      label: "site 기반 방법",
      hint: "창고 · 유통센터별 실제 에너지 사용.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "판매 상품이 없거나 인도조건 (Incoterms) 상 소유권이 이미 상실된 경우 미해당.",
};

const CAT_10: Scope3Category = {
  number: 10,
  id: "cat-10-processing",
  direction: "downstream",
  nameEn: "Processing of sold products",
  nameKo: "판매 제품의 후속 가공",
  definition: "판매한 중간재가 하류 사업자에게서 최종재로 가공될 때의 배출량.",
  buildingContext: "일반적으로 건물 사업체 · 서비스업 미해당. 소재·부품 제조업만 대상.",
  activities: [
    "판매한 중간재의 후속 가공 (제조업 B2B)",
  ],
  methodologies: [
    {
      key: "site-specific",
      label: "site 특정 방법",
      hint: "하류 가공업체의 실제 배출량 데이터.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "중간재 종류 × 표준 가공 배출계수.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "대부분의 서비스업 · 건물 사업체는 미해당. 소재·부품 B2B 제조업만 실질적으로 적용.",
};

const CAT_11: Scope3Category = {
  number: 11,
  id: "cat-11-use-of-sold",
  direction: "downstream",
  nameEn: "Use of sold products",
  nameKo: "판매 제품의 사용",
  definition: "판매한 제품이 최종 소비자에게 사용되는 동안 발생하는 배출량 (에너지 사용 · 냉매 유출 등).",
  buildingContext: "에너지 사용 제품 · 화석 연료 판매 시 이 카테고리가 폭발적으로 큼. 자동차·가전 제조사 · 화석연료 판매사가 대표적.",
  activities: [
    "직접 사용 배출 (자동차 · 가전 · 냉장고)",
    "간접 사용 배출 (선택적 · 예: 세제 사용 시 온수)",
  ],
  methodologies: [
    {
      key: "direct-use-phase",
      label: "직접 사용단계 방법",
      hint: "제품 판매량 × 예상 사용 수명 × 사용 강도 × 배출계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "indirect-use-phase",
      label: "간접 사용단계 방법 (선택)",
      hint: "제품 사용 시 유발되는 부수 배출 (예: 세제 → 온수 사용).",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "자동차 · 가전 · 화석연료 판매사의 경우 Scope 3 전체의 대부분을 차지. 건물 사업체 · 일반 서비스업은 미해당 가능성.",
};

const CAT_12: Scope3Category = {
  number: 12,
  id: "cat-12-eol",
  direction: "downstream",
  nameEn: "End-of-life treatment of sold products",
  nameKo: "판매 제품의 폐기",
  definition: "판매 제품이 수명 종료 후 폐기 · 재활용 처리되는 과정의 배출량.",
  buildingContext: "제품 판매 있는 경우만. 제품 무게 × 처리 방법 (매립 · 소각 · 재활용) 별 계수.",
  activities: [
    "매립",
    "소각",
    "재활용",
  ],
  methodologies: [
    {
      key: "waste-type-specific",
      label: "폐기물 종류별 방법",
      hint: "제품 자재 조성 × 처리 방법 × IPCC Vol.5 배출계수.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "제품 무게 × 국가 평균 폐기물 배출계수.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "제품 수명 후 처리 시나리오 (매립 vs 재활용 비율) 가정 필요. 국가 평균 통계 사용.",
};

const CAT_13: Scope3Category = {
  number: 13,
  id: "cat-13-downstream-leased",
  direction: "downstream",
  nameEn: "Downstream leased assets",
  nameKo: "Downstream 임대 자산",
  definition: "보고 회사가 임대한 자산 (임대인 관점) 을 임차인이 사용할 때의 배출량.",
  buildingContext: "임대인 (부동산 회사 · 리스 회사) 관점. 임차인의 Scope 1·2 가 여기에 들어감. 자사가 임차인이면 Cat 8 (Upstream).",
  activities: [
    "임대 건물의 임차인 에너지 사용",
    "리스 차량의 임차인 사용",
    "리스 설비의 임차인 운영",
  ],
  methodologies: [
    {
      key: "asset-specific",
      label: "자산 특정 방법",
      hint: "임대 자산별 임차인 실제 사용량.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "lessee-specific",
      label: "임차인 특정 방법",
      hint: "임차인이 보고한 Scope 1·2 데이터.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "자산 유형별 산업 평균 원단위.",
      primarySource: GHG_P,
      precisionRank: 3,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "임대인·임차인 관점 이중계상 방지 원칙. Cat 8 (임차인의 upstream) 과 Cat 13 (임대인의 downstream) 은 boundary 결정에 따라 하나만 선택.",
};

const CAT_14: Scope3Category = {
  number: 14,
  id: "cat-14-franchises",
  direction: "downstream",
  nameEn: "Franchises",
  nameKo: "프랜차이즈",
  definition: "프랜차이즈 본사가 자사가 운영하지 않는 프랜차이즈 지점의 Scope 1·2 를 자사 Scope 3 로 보고.",
  buildingContext: "프랜차이즈 사업 (외식·유통·서비스) 에만 해당. 건물 사업체·서비스업 미해당.",
  activities: [
    "프랜차이즈 지점 운영 (에너지 사용 · 냉매 유출)",
  ],
  methodologies: [
    {
      key: "franchise-specific",
      label: "프랜차이즈 특정 방법",
      hint: "각 프랜차이즈 지점의 Scope 1·2 데이터 취합.",
      primarySource: GHG_P,
      precisionRank: 1,
      status: "stub",
    },
    {
      key: "average-data",
      label: "평균 데이터 방법",
      hint: "프랜차이즈 유형별 산업 평균 원단위.",
      primarySource: GHG_P,
      precisionRank: 2,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [GHG_P, NIER],
  status: "stub",
  note: "본사가 지점 운영 (Operational control) 하면 Scope 1·2 에 들어감. 프랜차이즈 계약만 한 경우 Cat 14.",
};

const CAT_15: Scope3Category = {
  number: 15,
  id: "cat-15-investments",
  direction: "downstream",
  nameEn: "Investments",
  nameKo: "투자",
  definition: "금융업체가 대출·투자·프로젝트 파이낸싱한 대상의 배출량 · 참여도 비율로 배분.",
  buildingContext: "금융업체 (은행·증권·자산운용사·보험사) 전용 카테고리. 일반 사업체 미해당.",
  activities: [
    "상장 주식 · 회사채 투자 (자산군 A · Listed equity/corporate bonds)",
    "기업 대출 (자산군 B · Business loans)",
    "프로젝트 파이낸싱 (자산군 C · Project finance)",
    "상업용 부동산 (자산군 D · Commercial real estate)",
    "주택 담보 대출 (자산군 E · Mortgages)",
    "자동차 대출 (자산군 F · Motor vehicle loans)",
  ],
  methodologies: [
    {
      key: "pcaf-asset-class",
      label: "PCAF 자산군별 방법",
      hint: "6개 자산군 각각의 attribution factor × 대상 배출량. Attribution factor = 금융기관 참여도 / 자산 총가치.",
      primarySource: PCAF_STANDARD,
      precisionRank: 1,
      status: "stub",
    },
  ],
  primarySource: GHG_S,
  additionalSources: [PCAF_STANDARD, NIER],
  status: "stub",
  note: "GHG Protocol Scope 3 Standard 는 Cat 15 계산 방법을 명시하지 않고 PCAF Global Standard 로 위임. 국내 KB금융지주·신한금융지주 등이 채택.",
};

// ─────────────────────────────────────────────────────────────
// 전체 카탈로그
// ─────────────────────────────────────────────────────────────

export const SCOPE3_CATEGORIES: Scope3Category[] = [
  CAT_1, CAT_2, CAT_3, CAT_4, CAT_5, CAT_6, CAT_7, CAT_8,
  CAT_9, CAT_10, CAT_11, CAT_12, CAT_13, CAT_14, CAT_15,
];

/** id 로 카테고리 조회. */
export function getScope3Category(id: string): Scope3Category | undefined {
  return SCOPE3_CATEGORIES.find((c) => c.id === id);
}

/** upstream · downstream 분리 조회. */
export function getScope3CategoriesByDirection(direction: Scope3Direction): Scope3Category[] {
  return SCOPE3_CATEGORIES.filter((c) => c.direction === direction);
}

// ─────────────────────────────────────────────────────────────
// carbontrace 확장 (IPCC 원문서 참조 · IPPU 등)
// ─────────────────────────────────────────────────────────────

/** Cat 3 확장 시 참조할 IPCC 냉매 (Scope 1 fugitive 는 이미 있지만 · 냉매 upstream 은 Cat 3). */
export const CAT_3_IPCC_REFRIGERANT_UPSTREAM = IPCC_2006_VOL3_CH7;
