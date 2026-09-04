"use client";

/**
 * <Cell />  — carbontrace 의 시그니처 컴포넌트.
 *
 * 값 하나를 표시하되, 그 값이 왜 그 값인지의 근거를 팝오버로 완전히 열어 보여 준다.
 *
 * 핵심 원칙:
 *   근거 = 진짜 원문서 (primarySource). IPCC PDF, GIR 공식 자료, K-ETS 지침 등.
 *   감사자는 팝오버의 문서 링크를 눌러 원문서로 바로 이동해 값을 재확인할 수 있어야 한다.
 *
 * 표시 규칙:
 *   1. value 를 굵게 + 단위 병기
 *   2. 오른쪽 작은 정보 표식 (i). 클릭 → 팝오버 열림
 *   3. 팝오버 내용:
 *      - formula (수식 문자열)
 *      - inputs 각각을 label / value / unit / primary source 로 나열
 *      - derived 인자는 접혀 있고, 눌러서 하위 근거를 재귀적으로 열 수 있음
 */

import { useState } from "react";
import type { Calculated, CalculatedInput } from "@/lib/calc/types";
import type { PrimarySource, SourceMaturity } from "@/data/sources";
import { isWarningPrimarySource } from "@/lib/audit/summary";

export interface CellProps {
  /** 표시할 계산 결과. null 이면 "-" 표기. */
  calculated: Calculated | null;
  /** 소수점 자릿수 (기본 4). */
  digits?: number;
  /** 값 옆에 붙일 접두 라벨 (선택). */
  label?: string;
  /** 값 크기. */
  size?: "sm" | "md" | "lg";
  /** 강조 색 (총합, 결과 등에 쓰기). */
  emphasis?: boolean;
}

/**
 * 로케일-무관 결정적 숫자 포매터.
 * (Next.js hydration mismatch 방지: 서버·클라이언트 모두 동일 결과)
 */
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
      <span className="inline-flex items-baseline gap-1 text-neutral-400" aria-label="값 없음">
        {label && <span className="text-xs text-neutral-500">{label}</span>}
        <span>—</span>
      </span>
    );
  }

  const sizeCls = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const emphCls = emphasis ? "text-emerald-700 dark:text-emerald-400" : "";

  // 첫 depth measurement input 중 warning 이 있는지 (팝오버 열기 전 사전 표시)
  const hasDirectWarning = calculated.inputs.some(
    (i) => i.kind === "measurement" && isWarningPrimarySource(i.measurement.primarySource),
  );

  return (
    <span className="relative inline-flex items-baseline gap-1 group align-baseline">
      {label && <span className="text-xs text-neutral-500 mr-1">{label}</span>}
      <span className={`font-semibold tabular-nums ${sizeCls} ${emphCls}`}>
        {formatNumber(calculated.value, digits)}
      </span>
      <span className="text-xs text-neutral-500">{calculated.unit}</span>
      {hasDirectWarning && (
        <span
          className="ml-1 inline-flex h-4 items-center rounded border border-amber-400 bg-amber-100 px-1 text-[10px] font-semibold text-amber-900 dark:border-amber-600 dark:bg-amber-900/40 dark:text-amber-200"
          title="이 값에 warning primary source 가 사용됨. 팝오버 근거 확인 필요."
          aria-label="warning primary source"
        >
          ⚠
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="근거 보기"
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        title="근거 보기"
      >
        i
      </button>
      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-30 mt-2 w-[min(32rem,calc(100vw-2rem))] rounded-lg border border-neutral-300 bg-white p-3 text-left text-sm shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
        >
          <ProvenanceBody calculated={calculated} />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded border border-neutral-300 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              닫기
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

function ProvenanceBody({ calculated }: { calculated: Calculated }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-500">결과값</div>
        <div className="mt-1">
          <span className="text-lg font-semibold tabular-nums">{formatNumber(calculated.value, 6)}</span>
          <span className="ml-1 text-xs text-neutral-500">{calculated.unit}</span>
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-500">수식</div>
        <div className="mt-1 rounded bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
          {calculated.formula}
        </div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-500">대입된 값</div>
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
          <div className="text-[10px] uppercase tracking-wider text-neutral-500">비고</div>
          <ul className="mt-1 list-disc pl-4 text-xs text-neutral-600 dark:text-neutral-400">
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
    const label =
      kind === "measurement"
        ? "계수"
        : kind === "derived"
          ? "파생"
          : kind === "user"
            ? "입력"
            : "상수";
    const cls =
      kind === "measurement"
        ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700"
        : kind === "derived"
          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700"
          : kind === "user"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
            : "bg-neutral-100 text-neutral-600 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700";
    return (
      <span className={`inline-block rounded border px-1.5 py-[1px] text-[10px] font-medium ${cls}`}>
        {label}
      </span>
    );
  };

  const value =
    input.kind === "measurement" ? input.measurement.value : input.value;
  const unit =
    input.kind === "measurement" ? input.measurement.unit : input.unit;

  return (
    <div className="rounded border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-baseline gap-2">
        <KindBadge kind={input.kind} />
        <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">{input.label}</span>
        <span className="ml-auto font-mono text-xs tabular-nums text-neutral-900 dark:text-neutral-100">
          {formatNumber(value, 6)}
        </span>
        <span className="text-[10px] text-neutral-500">{unit}</span>
      </div>
      {input.kind === "measurement" && (
        <div className="mt-2">
          <PrimarySourceCard ps={input.measurement.primarySource} />
        </div>
      )}
      {input.kind === "user" && input.note && (
        <div className="mt-1 text-[11px] text-neutral-500 italic">{input.note}</div>
      )}
      {input.kind === "constant" && input.note && (
        <div className="mt-1 text-[11px] text-neutral-500">{input.note}</div>
      )}
      {input.kind === "derived" && (
        <div className="mt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="text-[11px] text-amber-700 underline decoration-dotted hover:text-amber-900 dark:text-amber-300"
          >
            {open ? "닫기" : "파고들기 ▸"}
          </button>
          {open && (
            <div className="mt-2 rounded border border-dashed border-amber-300 bg-amber-50/50 p-2 dark:border-amber-700 dark:bg-amber-950/30">
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
  const label =
    maturity === "verified"
      ? "확정"
      : maturity === "documented"
        ? "문서화"
        : maturity === "asserted"
          ? "주장 (조사 예정)"
          : "미조사";
  const cls =
    maturity === "verified"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700"
      : maturity === "documented"
        ? "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700"
        : maturity === "asserted"
          ? "bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-700"
          : "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700";
  return (
    <span
      className={`inline-block rounded border px-1.5 py-[1px] text-[10px] font-medium uppercase tracking-wide ${cls}`}
      title={
        maturity === "verified"
          ? "원문서 · 표 · 페이지 · 행까지 확인 완료"
          : maturity === "documented"
            ? "원문서 · 표 확인 완료 (페이지 · 행은 추후 명시)"
            : maturity === "asserted"
              ? "문서명 · 표는 알지만 원문 재확인 예정"
              : "원문서 재추적 미완료"
      }
    >
      {label}
    </span>
  );
}

function PrimarySourceCard({ ps }: { ps: PrimarySource }) {
  const locationParts: string[] = [];
  if (ps.part) locationParts.push(ps.part);
  if (ps.table) locationParts.push(ps.table);
  if (ps.page) locationParts.push(`p. ${ps.page}`);
  if (ps.row) locationParts.push(`행: ${ps.row}`);

  // note 에 ⚠ 프리픽스가 있으면 원본 xlsm 오작성/원출처 불명 warning.
  const isWarning = ps.note?.trimStart().startsWith("⚠");
  const cardCls = isWarning
    ? "rounded-md border-2 border-amber-300 bg-amber-50 p-2 text-[11px] leading-relaxed dark:border-amber-700 dark:bg-amber-950/30"
    : "rounded-md border border-blue-100 bg-blue-50/50 p-2 text-[11px] leading-relaxed dark:border-blue-900/40 dark:bg-blue-950/20";

  return (
    <div className={cardCls}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
          원문서 근거
        </span>
        <MaturityBadge maturity={ps.maturity} />
        {isWarning && (
          <span
            className="inline-block rounded border border-amber-400 bg-amber-100 px-1.5 py-[1px] text-[10px] font-semibold uppercase tracking-wide text-amber-900 dark:border-amber-600 dark:bg-amber-900/50 dark:text-amber-200"
            title="원본 xlsm 오작성 또는 원출처 불명 · 감사 시 재확인 필요"
          >
            ⚠ 원출처 확인 요망
          </span>
        )}
      </div>
      <div className="space-y-0.5">
        <div className="text-neutral-800 dark:text-neutral-100">
          <span className="font-semibold">{ps.publisher}</span>
          {ps.edition && <span className="ml-1 text-neutral-500">· {ps.edition}</span>}
        </div>
        <div className="text-neutral-700 dark:text-neutral-300">{ps.doc}</div>
        {locationParts.length > 0 && (
          <div className="text-neutral-600 dark:text-neutral-400">
            {locationParts.join(" · ")}
          </div>
        )}
        {ps.url && (
          <div>
            <a
              href={ps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline decoration-dotted hover:text-blue-900 dark:text-blue-300"
            >
              원문서 열기 ↗
            </a>
          </div>
        )}
        {ps.note && (
          <div
            className={
              isWarning
                ? "mt-1 rounded bg-amber-100/70 px-2 py-1 text-amber-900 dark:bg-amber-900/40 dark:text-amber-100"
                : "mt-1 text-neutral-500 italic dark:text-neutral-400"
            }
          >
            {ps.note}
          </div>
        )}
        {ps.reviewedAt && (
          <div className="mt-0.5 text-[10px] text-neutral-400">확인일자 · {ps.reviewedAt}</div>
        )}
      </div>
    </div>
  );
}
