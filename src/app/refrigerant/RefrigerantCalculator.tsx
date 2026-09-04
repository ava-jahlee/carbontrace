"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { AuditSummaryCard } from "@/components/audit/AuditSummary";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { summarizeAll } from "@/lib/audit/summary";
import { calculateRefrigerant } from "@/lib/calc/refrigerant";
import { REFRIGERANTS } from "@/data/factors/refrigerants.gen";
import type { GwpAssessment } from "@/data/factors/refrigerants.gen";

export function RefrigerantCalculator() {
  const [refrigerantId, setRefrigerantId] = useState<string>("HFC-134a");
  const [leakedKg, setLeakedKg] = useState<string>("5");
  const [gwpAssessment, setGwpAssessment] = useState<GwpAssessment>("AR6");

  const refr = useMemo(() => REFRIGERANTS.find((r) => r.id === refrigerantId), [refrigerantId]);

  const result = useMemo(() => {
    const kg = parseFloat(leakedKg);
    if (!Number.isFinite(kg)) return null;
    return calculateRefrigerant({ refrigerantId, leakedKg: kg, gwpAssessment });
  }, [refrigerantId, leakedKg, gwpAssessment]);

  const grouped = useMemo(() => {
    const g = new Map<string, typeof REFRIGERANTS>();
    for (const r of REFRIGERANTS) {
      if (!g.has(r.group)) g.set(r.group, [] as typeof REFRIGERANTS);
      g.get(r.group)!.push(r);
    }
    return Array.from(g.entries());
  }, []);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* ═══ 좌: 입력 ═══ */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-md border border-border bg-surface-2 p-5">
          <SectionHeader numeral="I" title="입력" hint="control panel" />

          <div className="mt-4 space-y-4">
            <Field label="냉매" hint="refrigerant">
              <select
                value={refrigerantId}
                onChange={(e) => setRefrigerantId(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
              >
                {grouped.map(([group, list]) => (
                  <optgroup key={group} label={group}>
                    {list.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {refr && (
                <div className="mt-1.5 rounded-sm border border-border bg-surface px-2 py-1.5 text-[11px] text-text-muted">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
                    application
                  </div>
                  <div className="mt-0.5">{refr.application}</div>
                </div>
              )}
            </Field>

            <Field label="연간 유출량" hint="leaked · kg">
              <input
                type="number"
                value={leakedKg}
                min={0}
                step="any"
                onChange={(e) => setLeakedKg(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm tabular-nums text-text"
              />
              <p className="mt-1 text-[11px] text-text-muted">연간 재충전량과 폐기 시 손실을 사업자가 실측한 값을 넣어 주세요.</p>
            </Field>

            <Field label="GWP 판" hint="assessment">
              <select
                value={gwpAssessment}
                onChange={(e) => setGwpAssessment(e.target.value as GwpAssessment)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
              >
                <option value="SAR">SAR 1995 · K-ETS 실무</option>
                <option value="AR4">AR4 2007</option>
                <option value="AR5">AR5 2013 · 한국 국가 인벤토리</option>
                <option value="AR6">AR6 2021 · 국제 ESG · CSRD</option>
              </select>
            </Field>
          </div>
        </div>
      </aside>

      {/* ═══ 우: 결과 ═══ */}
      <section className="space-y-6">
        {!result && (
          <div className="rounded-sm border border-border bg-surface-2 p-4 text-sm text-text-muted">
            유출량을 입력해 주세요.
          </div>
        )}
        {result && "error" in result && (
          <div className="rounded-sm border border-warn-border bg-warn-bg p-3 text-sm text-warn">
            {result.error}
          </div>
        )}
        {result && !("error" in result) && (
          <>
            {result.warnings.length > 0 && (
              <div className="rounded-sm border border-warn-border bg-warn-bg p-3 text-xs text-warn">
                <div className="mb-1 font-mono uppercase tracking-widest">[warning]</div>
                <ul className="list-disc pl-4">
                  {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}

            <div>
              <SectionHeader numeral="II" title="결과" hint="total emission" />
              <div className="mt-4 rounded-md border border-border-strong bg-surface p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                  ∑ tCO2eq
                </div>
                <div className="mt-2">
                  <Cell calculated={result.tCo2eq} digits={6} size="lg" emphasis />
                </div>
                <div className="mt-2 text-xs text-text-muted">
                  {result.refrigerantName} · {leakedKg} kg 유출 · GWP {gwpAssessment}
                </div>
              </div>
            </div>

            <div>
              <SectionHeader numeral="III" title="감사 신뢰도" hint="confidence" />
              <div className="mt-4">
                <AuditSummaryCard summary={summarizeAll([result.tCo2eq, result.methodology])} />
              </div>
            </div>

            <div>
              <SectionHeader numeral="IV" title="중간값" hint="intermediate" />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <IntermediateRow label="GWP-100" hint="from primary source" c={result.gwp} digits={4} />
                <IntermediateRow label="방법론 근거" hint="methodology" c={result.methodology} digits={0} />
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-xs font-medium text-text">{label}</span>
        {hint && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">
            / {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

import type { Calculated } from "@/lib/calc/types";

function IntermediateRow({
  label,
  hint,
  c,
  digits,
}: {
  label: string;
  hint?: string;
  c: Calculated;
  digits: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-sm border border-border bg-surface-2 px-3 py-2">
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-text-muted">{label}</span>
        {hint && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">/ {hint}</span>
        )}
      </div>
      <Cell calculated={c} digits={digits} size="sm" />
    </div>
  );
}
