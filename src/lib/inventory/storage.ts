/**
 * Inventory 저장소 · localStorage 어댑터.
 *
 * 배열 하나를 통째로 JSON 직렬화 · 항목이 수백 개까지는 브라우저 저장에
 * 무리 없다. 감사·백업이 필요하면 페이지의 JSON 내보내기로 파일화.
 */

import type { InventoryDraft, InventoryItem } from "@/data/inventory";

const KEY = "carbontrace:inventory:v1";

export const INVENTORY_EVENT = "carbontrace:inventory:changed";

/** SSR 안전 · 서버에서는 항상 빈 배열 */
export function loadInventory(): InventoryItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as InventoryItem[];
    if (!Array.isArray(arr)) return [];
    return arr.filter((x) => x?.schemaVersion === 1);
  } catch {
    return [];
  }
}

function persist(items: InventoryItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(INVENTORY_EVENT));
}

/** 새 항목 추가 · id · 시간 자동 부여. 새 배열을 반환. */
export function addInventoryItem(draft: InventoryDraft): InventoryItem {
  const now = new Date().toISOString();
  const item: InventoryItem = {
    ...draft,
    id: cryptoUuid(),
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
  };
  const next = [...loadInventory(), item];
  persist(next);
  return item;
}

/** 라벨·메모만 편집 가능 (숫자 결과는 계산기에서 다시 만들어야 함). */
export function updateInventoryItemMeta(
  id: string,
  patch: Partial<Pick<InventoryItem, "label" | "memo">>,
): void {
  const items = loadInventory().map((x) =>
    x.id === id ? { ...x, ...patch, updatedAt: new Date().toISOString() } : x,
  );
  persist(items);
}

export function removeInventoryItem(id: string): void {
  const items = loadInventory().filter((x) => x.id !== id);
  persist(items);
}

export function clearInventory(): void {
  persist([]);
}

/** JSON 파일 다운로드 (브라우저 전용). */
export function exportInventoryJson(): void {
  if (typeof window === "undefined") return;
  const items = loadInventory();
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob(
    [JSON.stringify({ exportedAt: new Date().toISOString(), items }, null, 2)],
    { type: "application/json" },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `carbontrace-inventory-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** crypto.randomUUID() · 구형 브라우저 fallback */
function cryptoUuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // fallback · v4-ish
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
