/**
 * audit/summary.ts — 계산 결과 트리 순회 유틸.
 *
 * Calculated (결과 하나) 를 재귀 순회해서:
 *   - 사용된 각 Measurement 의 primary source 성숙도 카운트
 *   - warning (⚠ prefix note) 목록
 *   - 사용된 unique docId 목록
 *
 * 감사자가 "이 결과에 얼마나 신뢰할 수 있는 계수가 얼마나 쓰였나" 를 한눈에 볼 수 있게.
 */

import type { Calculated, CalculatedInput } from "@/lib/calc/types";
import type { PrimarySource } from "@/data/sources";

export interface AuditSummary {
  /** 성숙도별 primary source 사용 횟수. */
  maturityCounts: {
    verified: number;
    documented: number;
    asserted: number;
    pending: number;
  };
  /** ⚠ 로 시작하는 note 를 가진 primary source 목록 (중복 제거). */
  warnings: { docLabel: string; note: string }[];
  /** 사용된 unique docId 목록. */
  usedDocIds: string[];
  /** 총 primary source 사용 횟수 (중복 포함). */
  totalMeasurements: number;
  /** 사용자 입력 횟수 (T3). */
  userInputs: number;
  /** 상수 사용 횟수. */
  constants: number;
}

const EMPTY_SUMMARY = (): AuditSummary => ({
  maturityCounts: { verified: 0, documented: 0, asserted: 0, pending: 0 },
  warnings: [],
  usedDocIds: [],
  totalMeasurements: 0,
  userInputs: 0,
  constants: 0,
});

/** primary source note 가 ⚠ 로 시작하는지. */
export function isWarningPrimarySource(ps: PrimarySource): boolean {
  return !!ps.note?.trimStart().startsWith("⚠");
}

/** 각 Calculated 를 재귀 순회하며 primary source 를 수집. */
function walk(c: Calculated, seen: Set<Calculated>, into: AuditSummary): void {
  if (seen.has(c)) return;   // cycle 방지
  seen.add(c);

  for (const input of c.inputs) {
    walkInput(input, seen, into);
  }
}

function walkInput(input: CalculatedInput, seen: Set<Calculated>, into: AuditSummary): void {
  if (input.kind === "measurement") {
    const ps = input.measurement.primarySource;
    into.totalMeasurements += 1;
    into.maturityCounts[ps.maturity] += 1;
    if (!into.usedDocIds.includes(ps.docId)) into.usedDocIds.push(ps.docId);
    if (isWarningPrimarySource(ps)) {
      const docLabel = ps.publisher ? `${ps.publisher} · ${ps.edition ?? ""}`.trim() : ps.doc;
      const noteKey = ps.note ?? "";
      if (!into.warnings.some((w) => w.docLabel === docLabel && w.note === noteKey)) {
        into.warnings.push({ docLabel, note: noteKey });
      }
    }
  } else if (input.kind === "user") {
    into.userInputs += 1;
  } else if (input.kind === "constant") {
    into.constants += 1;
  } else if (input.kind === "derived") {
    walk(input.from, seen, into);
  }
}

/** Calculated 하나에 대한 audit summary 생성. */
export function summarize(c: Calculated | null): AuditSummary {
  const s = EMPTY_SUMMARY();
  if (!c) return s;
  walk(c, new Set<Calculated>(), s);
  return s;
}

/** 여러 Calculated (예: Scope 1 CO2/CH4/N2O tCo2eq 각각) 합쳐서 요약. */
export function summarizeAll(cs: (Calculated | null | undefined)[]): AuditSummary {
  const s = EMPTY_SUMMARY();
  const seen = new Set<Calculated>();
  for (const c of cs) {
    if (c) walk(c, seen, s);
  }
  return s;
}
