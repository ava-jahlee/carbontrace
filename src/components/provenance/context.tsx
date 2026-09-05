"use client";

/**
 * ProvenanceContext — 전역 사이드 패널 상태.
 *
 * 탐색은 Windows Explorer 와 같은 모델:
 *   - stack = 지금 보고 있는 경로 (주소창 breadcrumb)
 *   - past / future = 방문 히스토리 (← 뒤로 · → 앞으로)
 *   - breadcrumb 클릭 = 그 폴더로 점프 · 이후 경로는 버리고 · 히스토리에 남김
 *
 * 그래서 "뒤로" 는 한 칸 상위가 아니라 · 방금 보던 화면으로 돌아간다.
 * 상위로는 주소창의 폴더 이름을 누르면 된다.
 */

import { createContext, useCallback, useContext, useState } from "react";
import type { Calculated } from "@/lib/calc/types";

/** stack 한 층 · 값 하나의 근거. label 은 breadcrumb 에 뜬다. */
export interface ProvenanceEntry {
  calculated: Calculated;
  /** 사용자에게 보이는 이름 · 예 "총 CO₂eq" · "배출계수 CO₂" */
  label?: string;
}

interface NavState {
  stack: ProvenanceEntry[];
  past: ProvenanceEntry[][];
  future: ProvenanceEntry[][];
}

const EMPTY: NavState = { stack: [], past: [], future: [] };

interface ProvenanceContextValue {
  isOpen: boolean;
  stack: ProvenanceEntry[];
  canBack: boolean;
  canForward: boolean;
  /** 새 근거 열기 (경로·히스토리 리셋). Cell 의 ⓘ 클릭시 호출. */
  open: (calculated: Calculated, label?: string) => void;
  /** 현재 경로 위에 한 층 push. derived input drill 시 호출. */
  drillInto: (calculated: Calculated, label?: string) => void;
  /** 히스토리 뒤로 · 방금 보던 경로로. */
  back: () => void;
  /** 히스토리 앞으로. */
  forward: () => void;
  /**
   * 주소창 폴더 클릭 · 그 depth 로 점프 (1-based).
   * 더 깊은 경로는 버리고 · 이전 경로는 히스토리에 남긴다.
   */
  goTo: (depth: number) => void;
  close: () => void;
}

const ProvenanceContext = createContext<ProvenanceContextValue | null>(null);

export function ProvenanceProvider({ children }: { children: React.ReactNode }) {
  const [nav, setNav] = useState<NavState>(EMPTY);

  const open = useCallback((calculated: Calculated, label?: string) => {
    setNav({ stack: [{ calculated, label }], past: [], future: [] });
  }, []);

  const drillInto = useCallback((calculated: Calculated, label?: string) => {
    setNav((prev) => ({
      stack: [...prev.stack, { calculated, label }],
      past: [...prev.past, prev.stack],
      future: [],
    }));
  }, []);

  const back = useCallback(() => {
    setNav((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      return {
        stack: previous,
        past: prev.past.slice(0, -1),
        future: [prev.stack, ...prev.future],
      };
    });
  }, []);

  const forward = useCallback(() => {
    setNav((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      return {
        stack: next,
        past: [...prev.past, prev.stack],
        future: prev.future.slice(1),
      };
    });
  }, []);

  const goTo = useCallback((depth: number) => {
    setNav((prev) => {
      if (depth < 1 || depth >= prev.stack.length) return prev;
      return {
        stack: prev.stack.slice(0, depth),
        past: [...prev.past, prev.stack],
        future: [],
      };
    });
  }, []);

  const close = useCallback(() => {
    setNav(EMPTY);
  }, []);

  return (
    <ProvenanceContext.Provider
      value={{
        isOpen: nav.stack.length > 0,
        stack: nav.stack,
        canBack: nav.past.length > 0,
        canForward: nav.future.length > 0,
        open,
        drillInto,
        back,
        forward,
        goTo,
        close,
      }}
    >
      {children}
    </ProvenanceContext.Provider>
  );
}

/** Provider 없이 호출되어도 안전한 훅 · Cell 이 provider 밖에서도 렌더될 수 있도록. */
export function useProvenance(): ProvenanceContextValue {
  const ctx = useContext(ProvenanceContext);
  if (!ctx) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("useProvenance called outside <ProvenanceProvider/>. Panel will not open.");
    }
    return {
      isOpen: false,
      stack: [],
      canBack: false,
      canForward: false,
      open: () => {},
      drillInto: () => {},
      back: () => {},
      forward: () => {},
      goTo: () => {},
      close: () => {},
    };
  }
  return ctx;
}
