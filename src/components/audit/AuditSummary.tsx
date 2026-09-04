/**
 * <AuditSummary /> — 계산 결과의 신뢰도 요약 카드.
 *
 * 계산 트리에 사용된 primary source 들의 성숙도 분포와 warning 을 한눈에 표시.
 */

import type { AuditSummary } from "@/lib/audit/summary";

interface Props {
  summary: AuditSummary;
}

export function AuditSummaryCard({ summary }: Props) {
  const { maturityCounts: m, warnings, usedDocIds, totalMeasurements } = summary;
  const total = m.verified + m.documented + m.asserted + m.pending;
  if (total === 0) {
    return null;
  }

  const verifiedPct = Math.round((m.verified / total) * 100);
  const documentedPct = Math.round((m.documented / total) * 100);
  const assertedPct = Math.round((m.asserted / total) * 100);
  const pendingPct = 100 - verifiedPct - documentedPct - assertedPct;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-neutral-500">감사 신뢰도 요약</h3>
        <span className="text-[10px] text-neutral-400">
          {totalMeasurements}건 계수 사용 · {usedDocIds.length}개 원문서 참조
        </span>
      </div>

      {/* 성숙도 분포 바 */}
      <div className="mt-3 flex h-2.5 overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
        {m.verified > 0 && (
          <div
            className="bg-emerald-500"
            style={{ width: `${verifiedPct}%` }}
            title={`verified: ${m.verified}건 (${verifiedPct}%)`}
          />
        )}
        {m.documented > 0 && (
          <div
            className="bg-sky-500"
            style={{ width: `${documentedPct}%` }}
            title={`documented: ${m.documented}건 (${documentedPct}%)`}
          />
        )}
        {m.asserted > 0 && (
          <div
            className="bg-amber-500"
            style={{ width: `${assertedPct}%` }}
            title={`asserted: ${m.asserted}건 (${assertedPct}%)`}
          />
        )}
        {m.pending > 0 && (
          <div
            className="bg-neutral-400"
            style={{ width: `${pendingPct}%` }}
            title={`pending: ${m.pending}건 (${pendingPct}%)`}
          />
        )}
      </div>

      {/* 성숙도 라벨 */}
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] tabular-nums">
        <MatItem color="bg-emerald-500" label="확정" count={m.verified} pct={verifiedPct} />
        <MatItem color="bg-sky-500" label="문서화" count={m.documented} pct={documentedPct} />
        <MatItem color="bg-amber-500" label="주장" count={m.asserted} pct={assertedPct} />
        {m.pending > 0 && (
          <MatItem color="bg-neutral-400" label="미조사" count={m.pending} pct={pendingPct} />
        )}
      </div>

      {/* Warning 목록 (⚠ 원출처 확인 요망) */}
      {warnings.length > 0 && (
        <div className="mt-3 rounded border border-amber-300 bg-amber-50 p-2 text-[11px] dark:border-amber-700 dark:bg-amber-950/30">
          <div className="mb-1 flex items-center gap-1 font-semibold text-amber-900 dark:text-amber-200">
            <span aria-hidden="true">⚠</span>
            <span>이 결과에 사용된 warning 값 {warnings.length}건</span>
          </div>
          <ul className="space-y-1 pl-4 text-amber-800 dark:text-amber-300">
            {warnings.map((w, i) => (
              <li key={i} className="list-disc">
                <span className="font-medium">{w.docLabel}</span>
                {w.note && <span className="ml-1 opacity-80">— {w.note.slice(0, 120)}{w.note.length > 120 ? "…" : ""}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MatItem({ color, label, count, pct }: { color: string; label: string; count: number; pct: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300">
      <span className={`inline-block h-2 w-2 rounded-full ${color}`} aria-hidden="true" />
      <span>{label}</span>
      <span className="text-neutral-500">{count}건 · {pct}%</span>
    </span>
  );
}
