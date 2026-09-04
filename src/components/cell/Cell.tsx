"use client";

/**
 * <Cell />  — carbontrace 의 시그니처 컴포넌트.
 *
 * 값 하나를 표시하되, 그 값이 왜 그 값인지의 근거를 팝오버로 완전히 열어 보여 준다.
 *
 * 핵심 원칙 (workspace DESIGN.md · REFERENCES.md · 목업 B 준수):
 *   - 근거 = 진짜 원문서 (primarySource). IPCC PDF, GIR, K-ETS 지침 등
 *   - 성숙도 뱃지는 도트 + 소문자 (`● verified`) — 대괄호 X, 이모지 X
 *   - 라이트 우선 · warmer ivory 톤 · warm accent (terracotta)
 */

import { useState } from "react";
import type { Calculated, CalculatedInput } from "@/lib/calc/types";
import type { PrimarySource, SourceMaturity } from "@/data/sources";
import { isWarningPrimarySource } from "@/lib/audit/summary";

export interface CellProps {
  calculated: Calculated | null;
  digits?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  emphasis?: boolean;
}

/** 로케일-무관 결정적 숫자 포매터 (hydration mismatch 방지) */
function formatNumber(n: number, digits: number): string {
  if (!Number.isFinite(n)) return String(n);
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs < Math.pow(10, -(digits + 1)) || abs >= 1e12) {
    return n.toExponential(digits);
  }
  const fixed = n.toFixed(digits);
  const [intPart, decPart] = fixed.split(".");
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!decPart) return withCommas;
  const trimmed = decPart.replace(/0+$/, "");
  return trimmed.length > 0 ? `${withCommas}.${trimmed}` : withCommas;
}

export function Cell({ calculated, digits = 4, label, size = "md", emphasis = false }: CellProps) {
  const [open, setOpen] = useState(false);

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

  // 첫 depth measurement input 중 warning 이 있는지 (팝오버 열기 전 사전 표시)
  const hasDirectWarning = calculated.inputs.some(
    (i) => i.kind === "measurement" && isWarningPrimarySource(i.measurement.primarySource),
  );

  return (
    <span className="relative inline-flex items-baseline gap-1 group align-baseline">
      {label && <span className="text-xs text-text-muted mr-1">{label}</span>}
      <span className={`font-semibold tabular-nums ${sizeCls} ${emphCls}`}>
        {formatNumber(calculated.value, digits)}
      </span>
      <span className="text-xs text-text-muted">{calculated.unit}</span>
      {hasDirectWarning && (
        <span
          className="ml-1 inline-flex items-center gap-1 font-mono text-[10px] tracking-wide text-warn"
          title="이 값을 만든 근거 중 확인이 필요한 항목이 있습니다. 팝오버를 열어 원문서를 확인해 주세요."
          aria-label="warning primary source"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-warn" />
          warn
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="근거 보기"
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border-strong font-mono text-[10px] text-text-muted hover:bg-surface-2 hover:text-text"
        title="근거 보기"
      >
        i
      </button>
      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-30 mt-2 w-[min(32rem,calc(100vw-2rem))] rounded-md border border-border bg-surface p-3 text-left text-sm shadow-[0_4px_24px_rgba(23,22,19,0.08)]"
        >
          <ProvenanceBody calculated={calculated} />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted hover:bg-surface-2 hover:text-text"
            >
              close
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// 팝오버 내용
// ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
      {children}
    </div>
  );
}

function ProvenanceBody({ calculated }: { calculated: Calculated }) {
  return (
    <div className="space-y-3">
      <div>
        <SectionLabel>result</SectionLabel>
        <div className="mt-1">
          <span className="text-lg font-semibold tabular-nums">{formatNumber(calculated.value, 6)}</span>
          <span className="ml-1 text-xs text-text-muted">{calculated.unit}</span>
        </div>
      </div>
      <div>
        <SectionLabel>formula</SectionLabel>
        <div className="mt-1 rounded-sm bg-surface-2 px-2 py-1 font-mono text-xs text-text">
          {calculated.formula}
        </div>
      </div>
      <div>
        <SectionLabel>inputs</SectionLabel>
        <ul className="mt-1 space-y-1">
          {calculated.inputs.map((input, idx) => (
            <li key={idx}>
              <InputRow input={input} />
            </li>
          ))}
        </ul>
      </div>
      {calculated.notes && calculated.notes.length > 0 && (
        <div>
          <SectionLabel>notes</SectionLabel>
          <ul className="mt-1 list-disc pl-4 text-xs text-text-muted">
            {calculated.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function InputRow({ input }: { input: CalculatedInput }) {
  const [open, setOpen] = useState(false);

  const KindBadge = ({ kind }: { kind: CalculatedInput["kind"] }) => {
    // 도트 + 소문자 mono (목업 B 준수 · 대괄호 X)
    const label =
      kind === "measurement" ? "factor"
      : kind === "derived" ? "derived"
      : kind === "user" ? "input"
      : "const";
    // 도트 색: measurement=accent, derived=ink-dim, user=verified, constant=text-dim
    const dotCls =
      kind === "measurement" ? "bg-accent"
      : kind === "derived" ? "bg-ink-dim"
      : kind === "user" ? "bg-verified"
      : "bg-text-dim";
    const textCls =
      kind === "measurement" ? "text-accent"
      : kind === "derived" ? "text-ink-dim"
      : kind === "user" ? "text-verified"
      : "text-text-dim";
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${textCls}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dotCls}`} />
        {label}
      </span>
    );
  };

  const value =
    input.kind === "measurement" ? input.measurement.value : input.value;
  const unit =
    input.kind === "measurement" ? input.measurement.unit : input.unit;

  return (
    <div className="rounded-sm border border-border bg-surface p-2">
      <div className="flex items-baseline gap-2">
        <KindBadge kind={input.kind} />
        <span className="text-xs font-medium text-text">{input.label}</span>
        <span className="ml-auto font-mono text-xs tabular-nums text-text">
          {formatNumber(value, 6)}
        </span>
        <span className="text-[10px] text-text-muted">{unit}</span>
      </div>
      {input.kind === "measurement" && (
        <div className="mt-2">
          <PrimarySourceCard ps={input.measurement.primarySource} />
        </div>
      )}
      {input.kind === "user" && input.note && (
        <div className="mt-1 text-[11px] italic text-text-muted">{input.note}</div>
      )}
      {input.kind === "constant" && input.note && (
        <div className="mt-1 text-[11px] text-text-muted">{input.note}</div>
      )}
      {input.kind === "derived" && (
        <div className="mt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="font-mono text-[10px] uppercase tracking-wider text-ink-dim underline decoration-dotted hover:text-ink"
          >
            {open ? "close ▴" : "drill down ▸"}
          </button>
          {open && (
            <div className="mt-2 rounded-sm border border-dashed border-border-strong bg-surface-2/50 p-2">
              <ProvenanceBody calculated={input.from} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PrimarySource 카드 — 감사자가 원문서로 역추적하는 진입점.
// ─────────────────────────────────────────────────────────────

function MaturityBadge({ maturity }: { maturity: SourceMaturity }) {
  // 도트 + 소문자 (목업 B 준수 · 대괄호 X · 이모지 X)
  const title =
    maturity === "verified" ? "원문서의 표·페이지·행까지 확인을 마쳤습니다."
    : maturity === "documented" ? "원문서와 표는 확인을 마쳤습니다. 페이지와 행은 추후 명시할 예정입니다."
    : maturity === "asserted" ? "문서명과 표는 알지만 원문 재확인이 남아 있습니다."
    : "아직 원문서 재추적을 하지 않았습니다.";
  const dotCls =
    maturity === "verified" ? "bg-verified"
    : maturity === "documented" ? "bg-documented"
    : maturity === "asserted" ? "bg-asserted"
    : "bg-pending";
  const textCls =
    maturity === "verified" ? "text-verified"
    : maturity === "documented" ? "text-documented"
    : maturity === "asserted" ? "text-asserted"
    : "text-pending";
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${textCls}`}
      title={title}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotCls}`} />
      {maturity}
    </span>
  );
}

function PrimarySourceCard({ ps }: { ps: PrimarySource }) {
  const locationParts: string[] = [];
  if (ps.part) locationParts.push(ps.part);
  if (ps.table) locationParts.push(ps.table);
  if (ps.page) locationParts.push(`p. ${ps.page}`);
  if (ps.row) locationParts.push(`행: ${ps.row}`);

  // note 에 ⚠ 프리픽스가 있으면 원본 xlsm 오작성/원출처 불명 warning
  const isWarning = ps.note?.trimStart().startsWith("⚠");
  const cardCls = isWarning
    ? "rounded-sm border border-warn-border bg-warn-bg p-2 text-[11px] leading-relaxed"
    : "rounded-sm border border-border bg-surface-2/60 p-2 text-[11px] leading-relaxed";

  return (
    <div className={cardCls}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted">
          primary source
        </span>
        <MaturityBadge maturity={ps.maturity} />
        {isWarning && (
          <span
            className="inline-flex items-center gap-1 font-mono text-[10px] tracking-wide text-warn"
            title="원본 xlsm 에 오작성이 있거나 원출처를 아직 확인하지 못했습니다. 감사할 때 재확인이 필요합니다."
          >
            <span className="h-1.5 w-1.5 rounded-full bg-warn" />
            needs review
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        <div className="text-text">
          <span className="font-semibold">{ps.publisher}</span>
          {ps.edition && <span className="ml-1 text-text-muted">· {ps.edition}</span>}
        </div>
        <div className="text-text-muted">{ps.doc}</div>
        {locationParts.length > 0 && (
          <div className="font-mono text-[10px] text-text-muted">
            {locationParts.join(" · ")}
          </div>
        )}
        {ps.url && (
          <div>
            <a
              href={ps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-dotted hover:text-text"
            >
              원문서 열기 ↗
            </a>
          </div>
        )}
        {ps.note && (
          <div
            className={
              isWarning
                ? "mt-1 rounded-sm bg-warn-bg/70 px-2 py-1 text-warn"
                : "mt-1 italic text-text-muted"
            }
          >
            {ps.note}
          </div>
        )}
        {ps.reviewedAt && (
          <div className="mt-0.5 font-mono text-[10px] text-text-dim">
            reviewed · {ps.reviewedAt}
          </div>
        )}
      </div>
    </div>
  );
}
