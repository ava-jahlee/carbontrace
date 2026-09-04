"use client";

import Link from "next/link";
import { useState } from "react";
import type { InventoryDraft } from "@/data/inventory";
import { addInventoryItem } from "@/lib/inventory/storage";

/**
 * 결과 카드 근처에 배치하는 "인벤토리에 추가" 버튼.
 *
 * 사용 패턴 (계산기 내부):
 *   <AddToInventoryButton
 *     disabled={result === null || 'error' in result}
 *     defaultLabel={autoLabel}
 *     getDraft={() => buildDraft(result, facility, ...)}
 *   />
 *
 * 상태 흐름:
 *   1. idle · [+ 인벤토리에 추가] 버튼
 *   2. editing · 라벨 인라인 입력 + [저장] [취소]
 *   3. saved · [추가됨 · 인벤토리 보기 →] · 3초 후 idle 로 복귀
 */
export function AddToInventoryButton({
  disabled,
  defaultLabel,
  getDraft,
}: {
  disabled?: boolean;
  defaultLabel: string;
  /** 클릭 시점에 최신 상태로 draft 를 만들어 넘긴다. null 이면 저장 취소. */
  getDraft: (label: string) => InventoryDraft | null;
}) {
  const [phase, setPhase] = useState<"idle" | "editing" | "saved">("idle");
  const [label, setLabel] = useState(defaultLabel);

  // defaultLabel 이 바뀌면 (연료·냉매 등) 편집 중이 아닐 때는 sync
  if (phase === "idle" && label !== defaultLabel) {
    setLabel(defaultLabel);
  }

  function handleSave() {
    const trimmed = label.trim() || defaultLabel;
    const draft = getDraft(trimmed);
    if (!draft) return;
    addInventoryItem(draft);
    setPhase("saved");
    setTimeout(() => setPhase("idle"), 3000);
  }

  if (phase === "saved") {
    return (
      <div className="flex items-baseline gap-4 text-sm">
        <span className="inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-widest text-verified">
          <span className="h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-verified" aria-hidden />
          인벤토리에 추가됨
        </span>
        <Link
          href="/inventory"
          className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid"
        >
          인벤토리 보기 →
        </Link>
      </div>
    );
  }

  if (phase === "editing") {
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") {
              setPhase("idle");
              setLabel(defaultLabel);
            }
          }}
          placeholder="라벨 · 예 · 본사 · 12월"
          className="min-w-0 flex-1 rounded-none border border-border bg-surface-2 px-2 py-1.5 text-sm text-text focus:border-accent focus:outline-none"
          maxLength={120}
          autoFocus
        />
        <button
          type="button"
          onClick={handleSave}
          className="border border-accent bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent/90"
        >
          저장
        </button>
        <button
          type="button"
          onClick={() => {
            setPhase("idle");
            setLabel(defaultLabel);
          }}
          className="text-xs text-text-dim hover:text-text"
        >
          취소
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPhase("editing")}
      disabled={disabled}
      className={`inline-flex items-baseline gap-2 border px-3 py-1.5 text-sm transition-colors ${
        disabled
          ? "cursor-not-allowed border-border bg-surface-2 text-text-dim"
          : "border-border bg-surface hover:border-accent hover:text-accent"
      }`}
      title={disabled ? "결과가 준비되지 않았습니다" : "이 결과를 인벤토리에 담습니다"}
    >
      <span className="font-mono text-xs leading-none">+</span>
      <span>인벤토리에 추가</span>
    </button>
  );
}
