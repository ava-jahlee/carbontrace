"use client";

/**
 * <Cell />  — carbontrace 의 시그니처 컴포넌트.
 *
 * 값 하나를 표시하되 · 옆의 ⓘ 를 누르면 우측 사이드 패널 (ProvenancePanel) 이 열려
 * 그 값이 왜 그 값인지의 근거를 완전히 보여 준다.
 *
 * 이전 (v0.9까지) 은 팝오버를 Cell 안에 직접 렌더했지만 · drill down 이 깊어질수록
 * 폭이 좁아지고 길을 잃는 문제가 있어서 · 전역 사이드 패널로 위임했다.
 * (v0.10 · 감사 workflow 개선)
 */

import type { Calculated } from "@/lib/calc/types";
import { isWarningPrimarySource } from "@/lib/audit/summary";
import { useProvenance } from "@/components/provenance/context";
import { formatNumber } from "@/components/provenance/ProvenanceBody";

export interface CellProps {
  calculated: Calculated | null;
  digits?: number;
  label?: string;
  /**
   * 사이드 패널 breadcrumb 첫 depth 에 뜰 이름.
   * 없으면 unit 이 대신 표시됨. 여러 Cell 이 한 페이지에 있을 때 구분에 유용.
   * 예 : "총 CO₂eq" · "배출계수 CO₂" · "열량계수"
   */
  provenanceLabel?: string;
  size?: "sm" | "md" | "lg";
  emphasis?: boolean;
}

export function Cell({
  calculated,
  digits = 4,
  label,
  provenanceLabel,
  size = "md",
  emphasis = false,
}: CellProps) {
  const { open } = useProvenance();

  if (!calculated) {
    return (
      <span className="inline-flex items-baseline gap-1 text-text-dim" aria-label="값 없음">
        {label && <span className="text-xs text-text-muted">{label}</span>}
        <span>—</span>
      </span>
    );
  }

  const sizeCls = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const emphCls = emphasis ? "text-ink" : "";

  // 첫 depth measurement input 중 warning 이 있는지 (패널 열기 전 사전 표시)
  const hasDirectWarning = calculated.inputs.some(
    (i) => i.kind === "measurement" && isWarningPrimarySource(i.measurement.primarySource),
  );

  return (
    <span className="inline-flex items-baseline gap-1 align-baseline">
      {label && <span className="mr-1 text-xs text-text-muted">{label}</span>}
      <span className={`font-semibold tabular-nums ${sizeCls} ${emphCls}`}>
        {formatNumber(calculated.value, digits)}
      </span>
      <span className="text-xs text-text-muted">{calculated.unit}</span>
      {hasDirectWarning && (
        <span
          className="ml-1 inline-flex items-center gap-1 font-mono text-[10px] tracking-wide text-warn"
          title="이 값을 만든 근거 중 확인이 필요한 항목이 있습니다."
          aria-label="warning primary source"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-warn" />
          warn
        </span>
      )}
      <button
        type="button"
        onClick={() => open(calculated, provenanceLabel)}
        aria-label={`${provenanceLabel ?? "값"} 의 근거 보기`}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border-strong font-mono text-[10px] text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
        title="근거 보기"
      >
        i
      </button>
    </span>
  );
}
