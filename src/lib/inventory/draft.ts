/**
 * Inventory draft 빌드 헬퍼 · 계산기 3개에서 공통으로 쓴다.
 *
 * 시설 스냅샷 생성만 여기서 · category 별 특화 필드 조립은 각 계산기에서.
 */

import type { Facility } from "@/data/facility";
import type { FacilitySnapshot } from "@/data/inventory";
import { calcGrade } from "@/lib/facility/grade";

/** null 이면 시설 미등록 (인벤토리 항목에 null 로 보존). */
export function buildFacilitySnapshot(
  facility: Facility | null,
): FacilitySnapshot | null {
  if (!facility) return null;
  return {
    siteName: facility.siteName,
    usage: facility.usage,
    annualGhgMTons: facility.annualGhgMTons,
    grade: calcGrade(facility.annualGhgMTons),
  };
}

/**
 * 기본 라벨 · 시설명 + 서브 (연료명 · 냉매명 등) 조합.
 * 시설 없으면 서브만.
 */
export function defaultInventoryLabel(
  facility: Facility | null,
  sub: string,
): string {
  if (!facility) return sub;
  return `${facility.siteName} · ${sub}`;
}
