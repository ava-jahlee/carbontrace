"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { AuditSummaryCard } from "@/components/audit/AuditSummary";
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

  // 그룹별 정렬 (셀렉트 optgroup 용)
  const grouped = useMemo(() => {
    const g = new Map<string, typeof REFRIGERANTS>();
    for (const r of REFRIGERANTS) {
      if (!g.has(r.group)) g.set(r.group, [] as typeof REFRIGERANTS);
      g.get(r.group)!.push(r);
    }
    return Array.from(g.entries());
  }, []);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      <section className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-500">입력</h2>

        <label className="mt-3 block text-xs font-medium text-neutral-700 dark:text-neutral-300">냉매</label>
        <select
          value={refrigerantId}
          onChange={(e) => setRefrigerantId(e.target.value)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
        >
          {grouped.map(([group, list]) => (
            <optgroup key={group} label={group}>
              {list.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        {refr && (
          <div className="mt-2 rounded border border-neutral-200 bg-neutral-50 px-2 py-1.5 text-[11px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
            <div className="font-semibold text-neutral-500 uppercase tracking-wide text-[10px]">용도</div>
            <div className="mt-0.5">{refr.application}</div>
          </div>
        )}

        <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          연간 유출량 <span className="text-neutral-400">(kg)</span>
        </label>
        <input
          type="number"
          value={leakedKg}
          min={0}
          step="any"
          onChange={(e) => setLeakedKg(e.target.value)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm tabular-nums dark:border-neutral-700 dark:bg-neutral-950"
        />
        <p className="mt-1 text-[11px] text-neutral-500">사업자 실측 (연간 재충전량 + 폐기 시 손실).</p>

        <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">GWP 판</label>
        <select
          value={gwpAssessment}
          onChange={(e) => setGwpAssessment(e.target.value as GwpAssessment)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
        >
          <option value="SAR">SAR 1995 (K-ETS 배출권거래제 실무)</option>
          <option value="AR4">AR4 2007</option>
          <option value="AR5">AR5 2013 (한국 국가 인벤토리)</option>
          <option value="AR6">AR6 2021 (국제 ESG · CSRD 공시)</option>
        </select>
      </section>

      <section className="space-y-4">
        {!result && (
          <div className="rounded border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
            유출량을 입력하세요.
          </div>
        )}
        {result && "error" in result && (
          <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
            {result.error}
          </div>
        )}
        {result && !("error" in result) && (
          <>
            {result.warnings.length > 0 && (
              <div className="rounded border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                <div className="mb-1 font-semibold uppercase tracking-wider">경고</div>
                <ul className="list-disc pl-4">
                  {result.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-800 dark:bg-emerald-950/20">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                ∑ tCO2eq
              </div>
              <div className="mt-2">
                <Cell calculated={result.tCo2eq} digits={6} size="lg" emphasis />
              </div>
              <div className="mt-1 text-xs text-neutral-500">
                {result.refrigerantName} · {leakedKg} kg 유출 · GWP {gwpAssessment}
              </div>
            </div>

            <AuditSummaryCard summary={summarizeAll([result.tCo2eq, result.methodology])} />

            <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-semibold text-neutral-500">중간값</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-baseline justify-between gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
                  <span className="text-xs text-neutral-500">GWP-100</span>
                  <Cell calculated={result.gwp} digits={4} size="sm" />
                </div>
                <div className="flex items-baseline justify-between gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
                  <span className="text-xs text-neutral-500">방법론 근거</span>
                  <Cell calculated={result.methodology} digits={0} size="sm" />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
