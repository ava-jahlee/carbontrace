"use client";

/**
 * ProvenancePanel — 우측 슬라이드 사이드 패널.
 *
 * root layout 에 한 번만 배치 · Provider 안 어디서든 openProvenance() 로 열림.
 * 세로 뷰포트 (< 768px) 에서는 bottom-sheet 로 fallback · 화면 아래에서 위로 슬라이드.
 * 가로 뷰포트에서는 우측 480px 폭 · 세로 100vh · 스크롤 가능.
 */

import { useEffect } from "react";
import { useProvenance } from "./context";
import { ProvenanceBody } from "./ProvenanceBody";

export function ProvenancePanel() {
  const { isOpen, stack, back, close, drillInto } = useProvenance();

  // ESC 로 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // body scroll 잠금 · 패널 열려 있을 때 배경 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;
  const current = stack[stack.length - 1];
  const depth = stack.length;

  return (
    <>
      {/* overlay · 배경 클릭 닫기 */}
      <div
        className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[1px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* 패널 · 세로 뷰포트에서는 아래에서 · 가로에서는 우측에서 */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="근거 상세"
        className="
          fixed z-50 flex flex-col overflow-hidden border-border bg-surface shadow-[0_0_40px_rgba(23,22,19,0.12)]
          inset-x-0 bottom-0 top-auto h-[80vh] max-h-[80vh] border-t
          md:inset-y-0 md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-[480px] md:border-l md:border-t-0
        "
      >
        {/* 상단 · breadcrumb + 닫기 · sticky */}
        <header className="shrink-0 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                근거 상세
              </span>
              {depth > 1 && (
                <span className="font-mono text-[10px] text-text-dim">
                  · 깊이 {depth}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="닫기 (Esc)"
              className="rounded-sm p-1 text-text-muted hover:bg-surface-2 hover:text-text"
              title="닫기 (Esc)"
            >
              <span className="block h-4 w-4 leading-none">✕</span>
            </button>
          </div>

          {/* breadcrumb + 뒤로가기 (깊이 > 1) */}
          {depth > 1 && (
            <div className="mt-2 flex items-baseline justify-between gap-3">
              <nav className="min-w-0 flex-1 truncate text-xs" aria-label="근거 breadcrumb">
                {stack.map((entry, i) => {
                  const label = entry.label || entry.calculated.unit;
                  const isLast = i === stack.length - 1;
                  return (
                    <span key={i}>
                      <span className={isLast ? "text-text" : "text-text-dim"}>
                        {label}
                      </span>
                      {!isLast && <span className="mx-1.5 text-text-dim">›</span>}
                    </span>
                  );
                })}
              </nav>
              <button
                type="button"
                onClick={back}
                className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-accent hover:underline"
              >
                ← 뒤로
              </button>
            </div>
          )}
        </header>

        {/* 본체 · 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* 첫 depth · label 을 큰 제목으로 */}
          {depth === 1 && current.label && (
            <h2 className="mb-3 text-base font-semibold text-text">{current.label}</h2>
          )}
          <ProvenanceBody calculated={current.calculated} onDrill={drillInto} />
        </div>
      </aside>
    </>
  );
}
