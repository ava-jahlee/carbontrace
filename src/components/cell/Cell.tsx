"use client";

/**
 * <Cell />  — carbontrace 의 시그니처 컴포넌트.
 *
 * 값 하나를 표시하되, 그 값이 왜 그 값인지의 근거를 팝오버로 완전히 열어 보여 준다.
 * 원본 엑셀에서 셀을 클릭하면 수식이 보이는 감사성을, 웹에서 재현.
 *
 * 표시 규칙:
 *   1. value 를 굵게 + 단위 병기
 *   2. 오른쪽 작은 정보 표식 (⌕). 클릭 → 팝오버 열림
 *   3. 팝오버 내용:
 *      - formula (수식 문자열)
 *      - inputs 각각을 label / value / unit / source 로 나열
 *      - derived 인자는 접혀 있고, 눌러서 하위 근거를 재귀적으로 열 수 있음
 */

import { useState } from "react";
import type { Calculated, CalculatedInput } from "@/lib/calc/types";

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

  return (
    <span className="relative inline-flex items-baseline gap-1 group align-baseline">
      {label && <span className="text-xs text-neutral-500 mr-1">{label}</span>}
      <span className={`font-semibold tabular-nums ${sizeCls} ${emphCls}`}>
        {formatNumber(calculated.value, digits)}
      </span>
      <span className="text-xs text-neutral-500">{calculated.unit}</span>
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
          className="absolute left-0 top-full z-30 mt-2 w-[min(28rem,calc(100vw-2rem))] rounded-lg border border-neutral-300 bg-white p-3 text-left text-sm shadow-xl dark:border-neutral-700 dark:bg-neutral-900"
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
        <div className="mt-1 space-y-0.5 text-[11px] text-neutral-600 dark:text-neutral-400">
          <div>
            <span className="text-neutral-400">셀 </span>
            <span className="font-mono text-neutral-700 dark:text-neutral-300">
              {input.measurement.sourceCell}
            </span>
          </div>
          <div>
            <span className="text-neutral-400">근거 </span>
            <span>{input.measurement.sourceDoc}</span>
          </div>
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
