"use client";

/**
 * ProvenanceContext — 전역 사이드 패널 상태.
 *
 * 왜 전역인가:
 *   계산기 페이지 안 여러 <Cell/> 이 · 값 옆 ⓘ 를 눌러 패널을 연다.
 *   패널은 항상 화면 우측 같은 자리에 열려서 · 어떤 값을 보든 위치가 안정적이다.
 *   drill down (derived input → 그 값의 근거) 은 · 인라인 확장이 아니라
 *   같은 패널 안에서 히스토리 stack 을 쌓는 방식으로 · breadcrumb + 뒤로가기로 길을 잃지 않게.
 *
 * root layout 에 ProvenanceProvider 하나 두고 · 어떤 <Cell/> 이든 openProvenance() 호출.
 */

import { createContext, useCallback, useContext, useState } from "react";
import type { Calculated } from "@/lib/calc/types";

/** stack 한 층 · 값 하나의 근거. label 은 breadcrumb 에 뜬다. */
export interface ProvenanceEntry {
  calculated: Calculated;
  /** 사용자에게 보이는 이름 · 예 "총 CO₂eq" · "배출계수 CO₂" */
  label?: string;
}

interface ProvenanceContextValue {
  isOpen: boolean;
  /** [0] 이 root · [last] 가 현재 view. drill 하면 뒤에 push. */
  stack: ProvenanceEntry[];
  /** 새 근거 열기 (stack 리셋). Cell 의 ⓘ 클릭시 호출. */
  open: (calculated: Calculated, label?: string) => void;
  /** 현재 view 위에 한 층 push. derived input drill 시 호출. */
  drillInto: (calculated: Calculated, label?: string) => void;
  /** 한 층 pop · 이전 depth 로. */
  back: () => void;
  /** 완전 닫기 · stack 비움. */
  close: () => void;
}

const ProvenanceContext = createContext<ProvenanceContextValue | null>(null);

export function ProvenanceProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<ProvenanceEntry[]>([]);

  const open = useCallback((calculated: Calculated, label?: string) => {
    setStack([{ calculated, label }]);
  }, []);

  const drillInto = useCallback((calculated: Calculated, label?: string) => {
    setStack((prev) => [...prev, { calculated, label }]);
  }, []);

  const back = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const close = useCallback(() => {
    setStack([]);
  }, []);

  return (
    <ProvenanceContext.Provider
      value={{ isOpen: stack.length > 0, stack, open, drillInto, back, close }}
    >
      {children}
    </ProvenanceContext.Provider>
  );
}

/** Provider 없이 호출되어도 안전한 훅 · Cell 이 provider 밖에서도 렌더될 수 있도록. */
export function useProvenance(): ProvenanceContextValue {
  const ctx = useContext(ProvenanceContext);
  if (!ctx) {
    // 개발 중 실수 방지 · warn 만 하고 no-op stub 반환
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("useProvenance called outside <ProvenanceProvider/>. Panel will not open.");
    }
    return {
      isOpen: false,
      stack: [],
      open: () => {},
      drillInto: () => {},
      back: () => {},
      close: () => {},
    };
  }
  return ctx;
}
