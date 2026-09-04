/**
 * 등급 자동 산정 · 최소 Tier 리솔버.
 *
 * 원 xlsm 수식 (Main!F5):
 *   =IF(AND(B109<=G5, C109>G5), "A",
 *      IF(AND(B110<=G5, C110>G5), "B", "C"))
 * → gteMTons ≤ x < ltMTons 반개구간 · Infinity 로 상한 없음.
 */

import {
  FACILITY_GRADE_THRESHOLDS,
  MIN_TIERS_BY_GRADE,
  type Facility,
  type FacilityGrade,
  type MinTiers,
  type Tier,
} from "@/data/facility";

/**
 * 연간 GHG (만ton/yr) → 등급 A/B/C.
 * 0 이하 값이면 A 로 낙관 (원 xlsm 도 G5>0 유효성만 강제).
 */
export function calcGrade(annualGhgMTons: number): FacilityGrade {
  const x = annualGhgMTons;
  for (const t of FACILITY_GRADE_THRESHOLDS) {
    if (t.gteMTons <= x && x < t.ltMTons) return t.grade;
  }
  return "C";
}

/**
 * 시설 하나에 대한 최소 Tier 셋.
 * 원 Main!D14/E14/F14 을 그대로 옮김.
 */
export function minTiersOf(facility: Facility | null): MinTiers | null {
  if (!facility) return null;
  const grade = calcGrade(facility.annualGhgMTons);
  return MIN_TIERS_BY_GRADE[grade];
}

/**
 * 사용자가 선택한 Tier 가 최소 요건을 충족하는지 판정.
 * 계수 종류 (heat/ef/ox) 별로 판정.
 *
 * 반환 · { ok, minTier, gap } · gap>0 이면 부족한 tier 차이 (T1→T3 = 2)
 */
export function checkTier(
  chosen: Tier,
  minTier: Tier,
): { ok: boolean; gap: number } {
  const rank: Record<Tier, number> = { T1: 1, T2: 2, T3: 3 };
  const gap = rank[minTier] - rank[chosen];
  return { ok: gap <= 0, gap: Math.max(gap, 0) };
}

/**
 * 특정 Tier 가 이 시설에서 선택 가능한지 (disabled 판정용).
 */
export function isTierAllowed(
  tierKind: keyof MinTiers,
  candidate: Tier,
  facility: Facility | null,
): boolean {
  const mins = minTiersOf(facility);
  if (!mins) return true; // 시설 미등록 · 아무 tier 허용
  return checkTier(candidate, mins[tierKind]).ok;
}
