/**
 * refrigerants.gen.ts — 주요 냉매 · F-gas 목록 및 GWP-100.
 *
 * K-ETS 실무는 SAR 사용, 국가 인벤토리는 AR5, ESG/CSRD 등 국제 공시는 AR6.
 * 여기서는 4개 판 모두 저장하여 사용자가 선택 가능.
 *
 * 값 출처:
 *   SAR : IPCC 1995 SAR
 *   AR4 : IPCC 2007 AR4 · Table 2.14
 *   AR5 : IPCC 2013 AR5 WG1 · Table 8.7 (with feedback)
 *   AR6 : IPCC 2021 AR6 WG1 · Chapter 7 SM · Table 7.SM.7
 *
 * Blend 냉매 (R-410A 등) 는 각 구성 성분의 mass 비율로 계산해도 되지만
 * 여기서는 IPCC/UNEP 공식 blend GWP (AR 별 계산값) 를 직접 저장.
 */

import type { Measurement } from "@/data/factors/types";
import { IPCC_AR6_TABLE_SM7, IPCC_SAR, IPCC_AR4, IPCC_AR5 } from "@/data/sources";

export type GwpAssessment = "SAR" | "AR4" | "AR5" | "AR6";

export interface Refrigerant {
  /** 표준 식별자 (ASHRAE/UNEP). */
  id: string;
  /** 사용자 표시 이름. */
  name: string;
  /** 그룹: HFC 단일 · HFC 블렌드 · PFC · SF6 · NF3. */
  group: "HFC" | "HFC-blend" | "PFC" | "SF6" | "NF3";
  /** 일반적 용도 (건물 관점). */
  application: string;
  /** GWP-100 by assessment. 값이 없으면 null. */
  gwp100: Record<GwpAssessment, Measurement | null>;
}

function m(value: number, assessment: GwpAssessment, note?: string): Measurement {
  const src = assessment === "SAR" ? IPCC_SAR
    : assessment === "AR4" ? IPCC_AR4
    : assessment === "AR5" ? IPCC_AR5
    : IPCC_AR6_TABLE_SM7;
  return {
    value,
    unit: "kgCO2eq/kg",
    primarySource: {
      ...src,
      note: note ?? `${assessment} GWP-100 값. ${src.note?.slice(0, 80) ?? ""}`,
    },
  };
}

export const REFRIGERANTS: Refrigerant[] = [
  {
    id: "HFC-134a",
    name: "HFC-134a (1,1,1,2-Tetrafluoroethane)",
    group: "HFC",
    application: "자동차 A/C · 소형 냉장고 · 열펌프 · 의료 흡입기",
    gwp100: {
      SAR: m(1300, "SAR"),
      AR4: m(1430, "AR4"),
      AR5: m(1300, "AR5"),
      AR6: m(1530, "AR6"),
    },
  },
  {
    id: "HFC-32",
    name: "HFC-32 (Difluoromethane)",
    group: "HFC",
    application: "신형 룸에어컨 (친환경 대체 냉매)",
    gwp100: {
      SAR: m(650, "SAR"),
      AR4: m(675, "AR4"),
      AR5: m(677, "AR5"),
      AR6: m(771, "AR6"),
    },
  },
  {
    id: "HFC-125",
    name: "HFC-125 (Pentafluoroethane)",
    group: "HFC",
    application: "R-410A · R-407C 블렌드 구성 · 소화약제",
    gwp100: {
      SAR: m(2800, "SAR"),
      AR4: m(3500, "AR4"),
      AR5: m(3170, "AR5"),
      AR6: m(3740, "AR6"),
    },
  },
  {
    id: "HFC-143a",
    name: "HFC-143a (1,1,1-Trifluoroethane)",
    group: "HFC",
    application: "R-404A · R-507A 블렌드 구성 (상업용 냉장)",
    gwp100: {
      SAR: m(3800, "SAR"),
      AR4: m(4470, "AR4"),
      AR5: m(4800, "AR5"),
      AR6: m(5810, "AR6"),
    },
  },
  {
    id: "HFC-152a",
    name: "HFC-152a (1,1-Difluoroethane)",
    group: "HFC",
    application: "폼 발포제 · 에어로졸",
    gwp100: {
      SAR: m(140, "SAR"),
      AR4: m(124, "AR4"),
      AR5: m(138, "AR5"),
      AR6: m(164, "AR6"),
    },
  },
  {
    id: "R-410A",
    name: "R-410A (HFC-32 50% + HFC-125 50%)",
    group: "HFC-blend",
    application: "일반 가정용·업무용 룸에어컨 (2000년대 주류)",
    // 각 구성 성분의 mass 가중 평균
    gwp100: {
      SAR: m(0.5 * 650 + 0.5 * 2800, "SAR", "R-410A 블렌드 (SAR): 0.5×650 + 0.5×2800 = 1725"),
      AR4: m(0.5 * 675 + 0.5 * 3500, "AR4", "R-410A 블렌드 (AR4): 0.5×675 + 0.5×3500 = 2087.5"),
      AR5: m(0.5 * 677 + 0.5 * 3170, "AR5", "R-410A 블렌드 (AR5): 0.5×677 + 0.5×3170 = 1923.5"),
      AR6: m(0.5 * 771 + 0.5 * 3740, "AR6", "R-410A 블렌드 (AR6): 0.5×771 + 0.5×3740 = 2255.5"),
    },
  },
  {
    id: "R-404A",
    name: "R-404A (HFC-125 44% + HFC-143a 52% + HFC-134a 4%)",
    group: "HFC-blend",
    application: "상업·산업용 저온 냉장 (편의점 · 유통 · 냉동식품)",
    gwp100: {
      SAR: m(0.44 * 2800 + 0.52 * 3800 + 0.04 * 1300, "SAR", "R-404A 블렌드 (SAR)"),
      AR4: m(0.44 * 3500 + 0.52 * 4470 + 0.04 * 1430, "AR4", "R-404A 블렌드 (AR4)"),
      AR5: m(0.44 * 3170 + 0.52 * 4800 + 0.04 * 1300, "AR5", "R-404A 블렌드 (AR5)"),
      AR6: m(0.44 * 3740 + 0.52 * 5810 + 0.04 * 1530, "AR6", "R-404A 블렌드 (AR6)"),
    },
  },
  {
    id: "R-407C",
    name: "R-407C (HFC-32 23% + HFC-125 25% + HFC-134a 52%)",
    group: "HFC-blend",
    application: "중·대형 A/C · 열펌프 (R-22 대체)",
    gwp100: {
      SAR: m(0.23 * 650 + 0.25 * 2800 + 0.52 * 1300, "SAR", "R-407C 블렌드 (SAR)"),
      AR4: m(0.23 * 675 + 0.25 * 3500 + 0.52 * 1430, "AR4", "R-407C 블렌드 (AR4)"),
      AR5: m(0.23 * 677 + 0.25 * 3170 + 0.52 * 1300, "AR5", "R-407C 블렌드 (AR5)"),
      AR6: m(0.23 * 771 + 0.25 * 3740 + 0.52 * 1530, "AR6", "R-407C 블렌드 (AR6)"),
    },
  },
  {
    id: "SF6",
    name: "Sulfur Hexafluoride (SF₆)",
    group: "SF6",
    application: "전기 절연 (변전소 · 스위치기어)",
    gwp100: {
      SAR: m(23900, "SAR"),
      AR4: m(22800, "AR4"),
      AR5: m(23500, "AR5"),
      AR6: m(24300, "AR6"),
    },
  },
  {
    id: "NF3",
    name: "Nitrogen Trifluoride (NF₃)",
    group: "NF3",
    application: "반도체 · 디스플레이 제조 (건물 자체와 무관, 산업 IPPU)",
    gwp100: {
      SAR: null,  // SAR 은 NF3 를 다루지 않음
      AR4: m(17200, "AR4"),
      AR5: m(16100, "AR5"),
      AR6: m(17400, "AR6"),
    },
  },
];

/** 냉매 조회. */
export function findRefrigerant(id: string): Refrigerant | undefined {
  return REFRIGERANTS.find((r) => r.id === id);
}
