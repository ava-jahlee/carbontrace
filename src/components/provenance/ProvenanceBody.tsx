"use client";

/**
 * ProvenanceBody — 값 하나의 근거를 렌더한다 (result · formula · inputs · notes).
 *
 * 기존 Cell.tsx 안 팝오버 body 로직을 통째로 분리 · 사이드 패널에서 재사용.
 * derived input 은 인라인 확장 대신 · 상위 panel 의 stack 에 push 하는 방식으로
 * drill down 을 처리한다 (onDrill 콜백).
 */

import type { Calculated, CalculatedInput } from "@/lib/calc/types";
import type { PrimarySource, SourceMaturity } from "@/data/sources";

/** 로케일-무관 결정적 숫자 포매터 (hydration mismatch 방지) */
export function formatNumber(n: number, digits: number): string {
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

interface ProvenanceBodyProps {
  calculated: Calculated;
  /** derived input drill 시 호출. label 은 breadcrumb 용. */
  onDrill: (calculated: Calculated, label?: string) => void;
}

export function ProvenanceBody({ calculated, onDrill }: ProvenanceBodyProps) {
  return (
    <div className="space-y-4">
      {/* result — 큰 숫자 · 이 depth 에서 지금 보고 있는 값 */}
      <div>
        <SectionLabel>result</SectionLabel>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums text-text">
            {formatNumber(calculated.value, 6)}
          </span>
          <span className="text-sm text-text-muted">{calculated.unit}</span>
        </div>
      </div>

      {/* formula — 사람이 읽을 수 있는 계산식 */}
      <div>
        <SectionLabel>formula</SectionLabel>
        <div className="mt-1 rounded-sm bg-surface-2 px-2 py-1.5 font-mono text-xs leading-relaxed text-text">
          {calculated.formula}
        </div>
      </div>

      {/* inputs — 각 항목 · 원문서 카드 · derived 는 drill 버튼 */}
      <div>
        <SectionLabel>inputs</SectionLabel>
        <ul className="mt-2 space-y-2">
          {calculated.inputs.map((input, idx) => (
            <li key={idx}>
              <InputRow input={input} onDrill={onDrill} />
            </li>
          ))}
        </ul>
      </div>

      {/* notes — 계산 자체에 대한 주석 */}
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

// ─────────────────────────────────────────────────────────────
// 하위 컴포넌트
// ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
      {children}
    </div>
  );
}

interface InputRowProps {
  input: CalculatedInput;
  onDrill: (calculated: Calculated, label?: string) => void;
}

function InputRow({ input, onDrill }: InputRowProps) {
  // 도트 + 소문자 mono (목업 B 준수 · 대괄호 X)
  const KindBadge = ({ kind }: { kind: CalculatedInput["kind"] }) => {
    const label =
      kind === "measurement" ? "factor"
      : kind === "derived" ? "derived"
      : kind === "user" ? "input"
      : "const";
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

  const value = input.kind === "measurement" ? input.measurement.value : input.value;
  const unit = input.kind === "measurement" ? input.measurement.unit : input.unit;

  return (
    <div className="rounded-sm border border-border bg-surface p-2.5">
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
        <div className="mt-2">
          <button
            type="button"
            onClick={() => onDrill(input.from, input.label)}
            className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-text-muted transition-colors hover:border-ink-dim hover:text-ink"
          >
            → 이 값의 근거 열기
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PrimarySource 카드 · 감사자가 원문서로 역추적하는 진입점
// ─────────────────────────────────────────────────────────────

function MaturityBadge({ maturity }: { maturity: SourceMaturity }) {
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
            title="원본 xlsm 에 오작성이 있거나 원출처를 아직 확인하지 못했습니다."
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
