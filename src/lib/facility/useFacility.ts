"use client";

/**
 * useFacility · 현재 저장된 시설을 React 상태로 노출.
 *
 * localStorage 를 초기 소스로 하되 · saveFacility / clearFacility
 * 뒤 dispatch 되는 FACILITY_EVENT 를 구독해 자동 리렌더.
 *
 * SSR 시 · 항상 null 로 시작 · hydration 후 실제 값 반영.
 */

import { useEffect, useState } from "react";
import type { Facility } from "@/data/facility";
import { FACILITY_EVENT, loadFacility } from "./storage";

export function useFacility(): {
  facility: Facility | null;
  /** hydration 완료 여부 · SSR 첫 그림 대응 */
  ready: boolean;
} {
  const [facility, setFacility] = useState<Facility | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFacility(loadFacility());
    setReady(true);

    const onChange = () => setFacility(loadFacility());
    window.addEventListener(FACILITY_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(FACILITY_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return { facility, ready };
}
