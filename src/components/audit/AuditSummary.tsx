/**
 * <AuditSummary /> — 계산 결과의 신뢰도 요약 카드.
 *
 * 계산 트리에 사용된 primary source 들의 성숙도 분포와 warning 을 한눈에 표시.
 * 목업 B 준수: 도트 + 소문자 · warm accent · 대괄호 X · 이모지 X.
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
    <div className="rounded-md border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          audit · confidence
        </h3>
        <span className="font-mono text-[10px] text-text-dim tabular-nums">
          {totalMeasurements} factors · {usedDocIds.length} docs
        </span>
      </div>

      {/* 성숙도 분포 바 · muted 톤 */}
      <div className="mt-3 flex h-1.5 overflow-hidden rounded-sm bg-surface-2">
        {m.verified > 0 && (
          <div
            className="bg-verified"
            style={{ width: `${verifiedPct}%` }}
            title={`verified: ${m.verified}건 (${verifiedPct}%)`}
          />
        )}
        {m.documented > 0 && (
          <div
            className="bg-documented"
            style={{ width: `${documentedPct}%` }}
            title={`documented: ${m.documented}건 (${documentedPct}%)`}
          />
        )}
        {m.asserted > 0 && (
          <div
            className="bg-asserted"
            style={{ width: `${assertedPct}%` }}
            title={`asserted: ${m.asserted}건 (${assertedPct}%)`}
          />
        )}
        {m.pending > 0 && (
          <div
            className="bg-pending"
            style={{ width: `${pendingPct}%` }}
            title={`pending: ${m.pending}건 (${pendingPct}%)`}
          />
        )}
      </div>

      {/* 성숙도 라벨 · mono 대괄호 */}
      <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tabular-nums">
        <MatItem tone="verified" label="verified" count={m.verified} pct={verifiedPct} />
        <MatItem tone="documented" label="documented" count={m.documented} pct={documentedPct} />
        <MatItem tone="asserted" label="asserted" count={m.asserted} pct={assertedPct} />
        {m.pending > 0 && (
          <MatItem tone="pending" label="pending" count={m.pending} pct={pendingPct} />
        )}
      </div>

      {/* Warning 목록 */}
      {warnings.length > 0 && (
        <div className="mt-3 rounded-sm border border-warn-border bg-warn-bg p-2 text-[11px]">
          <div className="mb-1 flex items-center gap-2 font-mono tracking-wide text-warn">
            <span className="h-1.5 w-1.5 rounded-full bg-warn" />
            <span>needs review</span>
            <span className="tabular-nums text-warn/80">· {warnings.length} warning(s)</span>
          </div>
          <ul className="space-y-1 pl-4 text-warn">
            {warnings.map((w, i) => (
              <li key={i} className="list-disc">
                <span className="font-medium">{w.docLabel}</span>
                {w.note && (
                  <span className="ml-1 opacity-80">
                    — {w.note.slice(0, 120)}{w.note.length > 120 ? "…" : ""}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

type Tone = "verified" | "documented" | "asserted" | "pending";

function MatItem({ tone, label, count, pct }: { tone: Tone; label: string; count: number; pct: number }) {
  const dotCls =
    tone === "verified" ? "bg-verified"
    : tone === "documented" ? "bg-documented"
    : tone === "asserted" ? "bg-asserted"
    : "bg-pending";
  const textCls =
    tone === "verified" ? "text-verified"
    : tone === "documented" ? "text-documented"
    : tone === "asserted" ? "text-asserted"
    : "text-pending";
  return (
    <span className={`inline-flex items-center gap-1.5 ${textCls}`}>
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotCls}`} aria-hidden="true" />
      <span>{label}</span>
      <span className="text-text-dim">{count} · {pct}%</span>
    </span>
  );
}
