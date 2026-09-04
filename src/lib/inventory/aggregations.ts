/**
 * Inventory 집계 유틸 · 순수 함수.
 *
 * 총합은 tCO2eq · 각 계산기 결과의 `totalCo2eq.value` (Scope 1/2) 또는
 * `tCo2eq.value` (Refrigerant) 을 이미 InventoryItem.totalCo2eq 로
 * 통일해 넣었다고 가정. 저장 시점에서 계산기 어댑터가 이걸 보장한다.
 */

import { CATEGORY_META, type InventoryCategory, type InventoryItem } from "@/data/inventory";

export type Scope = 1 | 2 | 3;

/** Scope 별 소계 · items 만 반환하면 렌더 쪽에서 소계도 계산할 수 있다. */
export function groupByScope(
  items: InventoryItem[],
): Record<Scope, InventoryItem[]> {
  const g: Record<Scope, InventoryItem[]> = { 1: [], 2: [], 3: [] };
  for (const item of items) {
    const scope = CATEGORY_META[item.category].scope;
    g[scope].push(item);
  }
  return g;
}

/** 배열의 tCO2eq 합계 · 유효하지 않은 값은 0 취급. */
export function sumCo2eqTons(items: InventoryItem[]): number {
  let total = 0;
  for (const item of items) {
    const v = item.totalCo2eq?.value;
    if (typeof v === "number" && Number.isFinite(v)) total += v;
  }
  return total;
}

/** 카테고리 별 소계 (참고용 · 상세 표에서 씀). */
export function groupByCategory(
  items: InventoryItem[],
): Map<InventoryCategory, InventoryItem[]> {
  const g = new Map<InventoryCategory, InventoryItem[]>();
  for (const item of items) {
    if (!g.has(item.category)) g.set(item.category, []);
    g.get(item.category)!.push(item);
  }
  return g;
}

/** 표시용 · tCO2eq 를 사람이 읽는 문자열로 (자리수는 상황별). */
export function formatCo2eq(tons: number, digits = 3): string {
  if (!Number.isFinite(tons)) return "—";
  return tons.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
