/**
 * Facility 저장소 · localStorage 어댑터.
 *
 * v0.9 · 시설 하나만 저장 (활성 시설 개념 없이 단일).
 * v0.9.1+ · 여러 시설 · 리스트 · 활성 시설 선택 기능 추가 가능.
 *
 * 데이터는 브라우저 로컬에만 · 서버 전송 없음.
 * 이 유틸을 쓰는 컴포넌트는 반드시 "use client".
 */

import type { Facility } from "@/data/facility";

const KEY = "carbontrace:facility:v1";

/** SSR 안전 · 서버에서는 항상 null */
export function loadFacility(): Facility | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as Facility;
    if (obj?.schemaVersion === 1) return obj;
    return null;
  } catch {
    return null;
  }
}

export function saveFacility(f: Facility): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(f));
}

export function clearFacility(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

/** localStorage 변경 알림 · 다른 탭·같은 탭 컴포넌트 sync */
export const FACILITY_EVENT = "carbontrace:facility:changed";

export function notifyFacilityChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FACILITY_EVENT));
}
