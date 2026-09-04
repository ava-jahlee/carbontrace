/**
 * Inventory (배출량 목록) · 여러 계산 결과를 누적해 총합을 뽑기 위한 저장 단위.
 *
 * 원 xlsm 은 한 번에 연료·전력·열 각 1건씩만 다뤘다. 웹 버전은 · 여러 활동
 * (예 · 본사 도시가스 + 지사 등유 + 상반기 전력) 을 누적해서 사업장 전체
 * 총합을 뽑을 수 있게 한다.
 *
 * 각 항목은 계산 시점의 근거 (Calculated · 입력 스냅샷 · 시설 스냅샷) 를
 * 통째로 보존한다 · 나중에 감사자가 "이 값 어디서 나왔나" 물으면 그대로 열림.
 */

import type { Calculated } from "@/lib/calc/types";
import type { FacilityGrade, FacilityUsage } from "@/data/facility";

/**
 * 항목이 속한 계산기 (discriminator).
 * 이후 Scope 3 세분화하며 카테고리가 늘어남 · 문자열로 유지 (open enum).
 */
export type InventoryCategory =
  | "fuel-combustion"    // Scope 1 · 연료 연소
  | "refrigerant"        // Scope 1 · 냉매 유출
  | "electricity"        // Scope 2 · 전력
  | "heat-kdhc"          // Scope 2 · 지역난방 (KDHC)
  | "heat-national"      // Scope 2 · 지역난방 (국가고유)
  | "scope3";            // Scope 3 · 임시 통합 (v0.9 세분화 없음)

export const CATEGORY_META: Record<
  InventoryCategory,
  { ko: string; scope: 1 | 2 | 3; href: string }
> = {
  "fuel-combustion": { ko: "연료 연소", scope: 1, href: "/scope1/fuel-combustion" },
  "refrigerant":     { ko: "냉매 · F-gas", scope: 1, href: "/scope1/refrigerant" },
  "electricity":     { ko: "전력", scope: 2, href: "/scope2" },
  "heat-kdhc":       { ko: "지역난방 · KDHC", scope: 2, href: "/scope2" },
  "heat-national":   { ko: "지역난방 · 국가고유", scope: 2, href: "/scope2" },
  "scope3":          { ko: "Scope 3", scope: 3, href: "/scope3" },
};

/** 목록 화면에서 바로 읽히는 요약 텍스트 (계산기가 생성해 넘김). */
export interface InventoryDisplay {
  /** 활동 요약 · 예 "도시가스 · 1,000 Nm³" */
  activity: string;
  /** 조건 요약 · 예 "열량 T1 · 배출 T2 · AR5" */
  conditions: string;
}

/** 저장 시점 시설 스냅샷 (감사용 · 나중에 시설 정보가 바뀌어도 이 항목의 기록은 유지). */
export interface FacilitySnapshot {
  siteName: string;
  usage: FacilityUsage;
  annualGhgMTons: number;
  grade: FacilityGrade;
}

/** Inventory 한 항목. 하나가 곧 "감사 가능한 계산 한 건" 이다. */
export interface InventoryItem {
  /** uuid · 항목 식별자 */
  id: string;
  /** 스키마 버전 (마이그레이션용) */
  schemaVersion: 1;

  /** 사용자 라벨 · 자유 입력 · 예 "본사 · 도시가스 · 2026-12" */
  label: string;
  /** 메모 · 선택 · 감사 코멘트 등 */
  memo?: string;

  /** 분류 · Scope 는 category 에서 유도 */
  category: InventoryCategory;

  /** 저장 시점 시설 · null 이면 시설 미등록 상태에서 저장된 것 */
  facility: FacilitySnapshot | null;

  /** 목록에 표시할 요약 문구 */
  display: InventoryDisplay;

  /** 이 항목의 합산 대상 · tCO2eq · Calculated 통째로 보존 (근거 열람용) */
  totalCo2eq: Calculated;

  /** 계산 시점 사용자 입력 스냅샷 · 재계산 가능하도록 · category 별로 형태 다름 */
  inputs: unknown;

  /** 원 결과 통째 · optional · 종별 배출·열량계수 등 세부 열람용 */
  rawResult?: unknown;

  /** 계산 중 발생한 경고 (T2 대체 · NF3 안내 등) */
  warnings: string[];

  createdAt: string;
  updatedAt: string;
}

/** 새 항목을 만들 때 계산기가 넘겨줄 payload · id · 시간은 저장 시 채워짐 */
export type InventoryDraft = Omit<
  InventoryItem,
  "id" | "createdAt" | "updatedAt" | "schemaVersion"
>;
