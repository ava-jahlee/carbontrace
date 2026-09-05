"use client";

/**
 * ProvenancePanel — 우측 슬라이드 사이드 패널.
 *
 * 탐색 chrome 은 Windows Explorer 를 따른다:
 *   ← →  = 방문 히스토리
 *   주소창 = 현재 경로 · 상위 폴더는 클릭해서 바로 점프
 *   Esc / overlay / ✕ = 닫기
 *   Alt+← / Alt+→ = 뒤로 / 앞으로
 *
 * 세로 뷰포트 (< 768px) 에서는 bottom-sheet · 가로에서는 우측 480px.
 */

import { useEffect } from "react";
import { useProvenance } from "./context";
import { ProvenanceBody } from "./ProvenanceBody";

function entryLabel(entry: { label?: string; calculated: { unit: string } }): string {
  return entry.label || entry.calculated.unit;
}

export function ProvenancePanel() {
  const { isOpen, stack, canBack, canForward, back, forward, goTo, close, drillInto } =
    useProvenance();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        back();
        return;
      }
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        forward();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, back, forward]);

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
      <div
        className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[1px]"
        onClick={close}
        aria-hidden="true"
      />

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
        <header className="shrink-0 border-b border-border bg-surface px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <NavArrow
                direction="back"
                disabled={!canBack}
                onClick={back}
                label="뒤로 (Alt+←)"
              />
              <NavArrow
                direction="forward"
                disabled={!canForward}
                onClick={forward}
                label="앞으로 (Alt+→)"
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              근거 상세
            </span>
            <div className="flex-1" />
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

          {/* 주소창 · 현재 경로는 항상 표시 · 상위는 클릭으로 점프 */}
          <nav
            className="mt-2 flex flex-wrap items-baseline gap-y-1 text-xs"
            aria-label="현재 경로"
          >
            {stack.map((entry, i) => {
              const label = entryLabel(entry);
              const isLast = i === stack.length - 1;
              return (
                <span key={i} className="inline-flex items-baseline">
                  {isLast ? (
                    <span className="font-medium text-text">{label}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goTo(i + 1)}
                      className="text-text-dim underline decoration-dotted underline-offset-2 hover:text-accent"
                    >
                      {label}
                    </button>
                  )}
                  {!isLast && (
                    <span className="mx-1.5 text-text-dim" aria-hidden>
                      ›
                    </span>
                  )}
                </span>
              );
            })}
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {depth === 1 && current.label && (
            <h2 className="mb-3 text-base font-semibold text-text">{current.label}</h2>
          )}
          <ProvenanceBody calculated={current.calculated} onDrill={drillInto} />
        </div>
      </aside>
    </>
  );
}

function NavArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "back" | "forward";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={
        "rounded-sm px-1.5 py-0.5 font-mono text-sm leading-none " +
        (disabled
          ? "cursor-default text-text-dim/40"
          : "text-text-muted hover:bg-surface-2 hover:text-text")
      }
    >
      {direction === "back" ? "←" : "→"}
    </button>
  );
}
