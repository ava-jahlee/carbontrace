"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { AuditSummaryCard } from "@/components/audit/AuditSummary";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FUELS } from "@/data/factors/fuels.gen";
import {
  countOverrides,
  DATA_PROFILE_DESC,
  DATA_PROFILE_LABELS,
  type DataProfile,
} from "@/data/factors/corrections";
import { calculateScope1 } from "@/lib/calc/scope1";
import { summarizeAll } from "@/lib/audit/summary";
import type { GwpStandard, Tier } from "@/lib/calc/types";

export function Scope1Calculator() {
  const [fuelId, setFuelId] = useState<string>("아역청탄-하위-유연탄");
  const [amount, setAmount] = useState<string>("1");
  const [heatTier, setHeatTier] = useState<Tier>("T1");
  const [efTier, setEfTier] = useState<Tier>("T2");
  const [gwpStandard, setGwpStandard] = useState<GwpStandard>("SAR");
  const [dataProfile, setDataProfile] = useState<DataProfile>("xlsm-original");

  const fuel = useMemo(() => FUELS.find((f) => f.id === fuelId), [fuelId]);

  const result = useMemo(() => {
    const amt = parseFloat(amount);
    if (!Number.isFinite(amt)) return null;
    return calculateScope1({
      fuelId,
      amount: amt,
      heatTier,
      efTier,
      gwpStandard,
      dataProfile,
    });
  }, [fuelId, amount, heatTier, efTier, gwpStandard, dataProfile]);

  const grouped = useMemo(() => {
    const g = new Map<string, typeof FUELS>();
    for (const f of FUELS) {
      const key = f.category ?? "기타";
      if (!g.has(key)) g.set(key, [] as typeof FUELS);
      g.get(key)!.push(f);
    }
    return Array.from(g.entries());
  }, []);

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* ═══ 좌: 입력 (subtle wash · workspace DESIGN.md 4.2) ═══ */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-md border border-border bg-surface-2 p-5">
          <SectionHeader title="입력" hint="control panel" />

          <div className="mt-4 space-y-4">
            <Field label="연료" hint="fuel">
              <select
                value={fuelId}
                onChange={(e) => setFuelId(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
              >
                {grouped.map(([category, list]) => (
                  <optgroup key={category} label={category}>
                    {list.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </Field>

            <Field
              label="사용량"
              hint={`amount · ${fuel?.activityUnit ?? "?"}`}
            >
              <input
                type="number"
                value={amount}
                min={0}
                step="any"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm tabular-nums text-text"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="열량 tier" hint="ncv">
                <TierPicker value={heatTier} onChange={setHeatTier} />
              </Field>
              <Field label="배출 tier" hint="ef">
                <TierPicker value={efTier} onChange={setEfTier} />
              </Field>
            </div>

            <Field label="기준" hint="GWP ver.">
              <select
                value={gwpStandard}
                onChange={(e) => setGwpStandard(e.target.value as GwpStandard)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
              >
                <option value="SAR">국가 인벤토리 (SAR 1995)</option>
                <option value="AR4">IPCC AR4 (2007)</option>
                <option value="AR5">IPCC AR5 (2014)</option>
                <option value="AR6">IPCC AR6 (2021)</option>
              </select>
            </Field>

            <Field
              label="데이터 프로파일"
              hint={`profile · ${countOverrides(dataProfile)} overrides`}
            >
              <select
                value={dataProfile}
                onChange={(e) => setDataProfile(e.target.value as DataProfile)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
              >
                {(Object.keys(DATA_PROFILE_LABELS) as DataProfile[]).map((p) => (
                  <option key={p} value={p}>{DATA_PROFILE_LABELS[p]}</option>
                ))}
              </select>
              <p className="mt-1.5 rounded-sm border border-border bg-surface px-2 py-1.5 text-[11px] leading-relaxed text-text-muted">
                {DATA_PROFILE_DESC[dataProfile]}
              </p>
            </Field>

            {fuel && (
              <div className="rounded-sm border border-border bg-surface p-3 text-[11px] text-text-muted">
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  fuel meta
                </div>
                <div className="mt-1">분류 · {fuel.category ?? "—"}</div>
                <div>상온 · {fuel.state ?? "—"}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ═══ 우: 결과 ═══ */}
      <section className="space-y-6">
        <ResultView
          result={result}
          amount={amount}
          activityUnit={fuel?.activityUnit ?? ""}
          heatTier={heatTier}
          efTier={efTier}
          gwpStandard={gwpStandard}
        />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Helper: Field wrapper · label + hint (mono)
// ─────────────────────────────────────────────────────────────

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

function TierPicker({ value, onChange }: { value: Tier; onChange: (t: Tier) => void }) {
  return (
    <div className="inline-flex overflow-hidden rounded-sm border border-border">
      {(["T1", "T2", "T3"] as Tier[]).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={
            "px-2.5 py-1.5 font-mono text-[11px] tracking-wide " +
            (value === t
              ? "bg-ink text-bg"
              : "bg-surface text-text-muted hover:bg-surface-2 hover:text-text")
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 결과 뷰
// ─────────────────────────────────────────────────────────────

import type { Calculated, MaybeCalculated, Scope1Result, Scope1SpeciesResult } from "@/lib/calc/types";

function ResultView({
  result,
  amount,
  activityUnit,
  heatTier,
  efTier,
  gwpStandard,
}: {
  result: Scope1Result | { error: string } | null;
  amount: string;
  activityUnit: string;
  heatTier: Tier;
  efTier: Tier;
  gwpStandard: GwpStandard;
}) {
  if (result === null) {
    return (
      <div className="rounded-sm border border-border bg-surface-2 p-4 text-sm text-text-muted">
        사용량을 입력해 주세요.
      </div>
    );
  }
  if ("error" in result) {
    return (
      <div className="rounded-sm border border-warn-border bg-warn-bg p-3 text-sm text-warn">
        {result.error}
      </div>
    );
  }
  return (
    <>
      {result.warnings.length > 0 && (
        <div className="rounded-sm border border-warn-border bg-warn-bg p-3 text-xs text-warn">
          <div className="mb-1 flex items-center gap-1.5 font-mono uppercase tracking-widest">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-warn" aria-hidden />
            <span>warning</span>
          </div>
          <ul className="list-disc pl-4">
            {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      {/* ═ II · 결과 (1위 압도적 · one decision one screen) ═ */}
      <div>
        <SectionHeader title="결과" hint="total emission" />
        <div className="mt-4 rounded-md border border-border-strong bg-surface p-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            ∑ tCO2eq
          </div>
          <div className="mt-2">
            <Cell calculated={result.totalCo2eq} digits={6} size="lg" emphasis />
          </div>
          {/* 요약 · 명시적 라벨 (연료·사용량·조건) */}
          <dl className="mt-4 space-y-1 text-xs">
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                연료
              </dt>
              <dd className="text-text-muted">{result.fuelName}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                사용량
              </dt>
              <dd className="text-text-muted">
                <span className="tabular-nums">{amount}</span> {activityUnit}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-12 shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                조건
              </dt>
              <dd className="text-text-muted">
                열량 {heatTier} · 배출 {efTier} · GWP {gwpStandard}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* ═ III · 감사 신뢰도 ═ */}
      <div>
        <SectionHeader title="감사 신뢰도" hint="confidence" />
        <div className="mt-4">
          <AuditSummaryCard summary={summarizeAll([result.totalCo2eq])} />
        </div>
      </div>

      {/* ═ IV · 공통 계수 ═ */}
      <div>
        <SectionHeader title="공통 계수" hint="shared factors" />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ResultRow label="열량계수" hint="ncv" calculated={result.heatFactor} digits={4} />
          <ResultRow label="산화계수" hint="ox" calculated={result.oxidation} digits={4} />
        </div>
      </div>

      {/* ═ V · 종별 (CO2 · CH4 · N2O) ═ */}
      <div>
        <SectionHeader title="종별 배출" hint="by species" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <SpeciesCard title="CO₂" result={result.co2} />
          <SpeciesCard title="CH₄" result={result.ch4} />
          <SpeciesCard title="N₂O" result={result.n2o} />
        </div>
      </div>
    </>
  );
}

function ResultRow({
  label,
  hint,
  calculated,
  digits = 4,
}: {
  label: string;
  hint?: string;
  calculated: MaybeCalculated;
  digits?: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-sm border border-border bg-surface-2 px-3 py-2">
      <div className="flex items-baseline gap-2">
        <span className="text-xs text-text-muted">{label}</span>
        {hint && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">/ {hint}</span>
        )}
      </div>
      <Cell calculated={calculated} digits={digits} size="sm" />
    </div>
  );
}

function SpeciesCard({ title, result }: { title: string; result: Scope1SpeciesResult }) {
  return (
    <div className="rounded-md border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between border-b border-border pb-2">
        <h3 className="text-base font-semibold text-text">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">species</span>
      </div>
      <div className="mt-3 space-y-2">
        <RowLine label="배출계수" c={result.emissionFactor} digits={4} />
        <RowLine label="tGHG" c={result.tGhg} digits={6} />
        <RowLine label="GWP" c={result.gwp} digits={0} />
        <div className="border-t border-border pt-2">
          <RowLine label="tCO2eq" c={result.tCo2eq} digits={6} emphasis />
        </div>
      </div>
    </div>
  );
}

function RowLine({
  label,
  c,
  digits,
  emphasis = false,
}: {
  label: string;
  c: Calculated | MaybeCalculated;
  digits: number;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-xs text-text-muted">{label}</span>
      <Cell calculated={c} digits={digits} size="sm" emphasis={emphasis} />
    </div>
  );
}
