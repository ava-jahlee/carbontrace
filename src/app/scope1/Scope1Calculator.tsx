"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { FUELS } from "@/data/factors/fuels.gen";
import { calculateScope1 } from "@/lib/calc/scope1";
import type { GwpStandard, Tier } from "@/lib/calc/types";

export function Scope1Calculator() {
  const [fuelId, setFuelId] = useState<string>("아역청탄-하위-유연탄");
  const [amount, setAmount] = useState<string>("1");
  const [heatTier, setHeatTier] = useState<Tier>("T1");
  const [efTier, setEfTier] = useState<Tier>("T2");
  const [gwpStandard, setGwpStandard] = useState<GwpStandard>("SAR");

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
    });
  }, [fuelId, amount, heatTier, efTier, gwpStandard]);

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
    <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      {/* ─── 입력 패널 ─── */}
      <section className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-500">입력</h2>

        <label className="mt-3 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          연료
        </label>
        <select
          value={fuelId}
          onChange={(e) => setFuelId(e.target.value)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
        >
          {grouped.map(([category, list]) => (
            <optgroup key={category} label={category}>
              {list.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          사용량 <span className="text-neutral-400">({fuel?.activityUnit ?? "?"})</span>
        </label>
        <input
          type="number"
          value={amount}
          min={0}
          step="any"
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm tabular-nums dark:border-neutral-700 dark:bg-neutral-950"
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              열량계수 Tier
            </label>
            <TierPicker value={heatTier} onChange={setHeatTier} />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              배출계수 Tier
            </label>
            <TierPicker value={efTier} onChange={setEfTier} />
          </div>
        </div>

        <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          GWP 기준
        </label>
        <select
          value={gwpStandard}
          onChange={(e) => setGwpStandard(e.target.value as GwpStandard)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
        >
          <option value="SAR">국가 인벤토리 (SAR 1995)</option>
          <option value="AR4">IPCC AR4 (2007)</option>
          <option value="AR5">IPCC AR5 (2014)</option>
          <option value="AR6">IPCC AR6 (2021)</option>
        </select>

        {fuel && (
          <div className="mt-4 rounded border border-neutral-200 bg-neutral-50 p-3 text-[11px] text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
            <div className="mb-1 font-semibold text-neutral-500">연료 기본 정보</div>
            <div>분류: {fuel.category ?? "—"}</div>
            <div>상온: {fuel.state ?? "—"}</div>
            <div className="mt-2 text-[10px] text-neutral-500">
              계수 근거는 각 값 옆의{" "}
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[9px]">
                i
              </span>{" "}
              버튼을 눌러 확인하세요.
            </div>
          </div>
        )}
      </section>

      {/* ─── 결과 패널 ─── */}
      <section className="space-y-4">
        <ResultView result={result} amount={amount} activityUnit={fuel?.activityUnit ?? ""} />
      </section>
    </div>
  );
}

function TierPicker({ value, onChange }: { value: Tier; onChange: (t: Tier) => void }) {
  return (
    <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
      {(["T1", "T2", "T3"] as Tier[]).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={
            "px-2.5 py-1.5 text-xs " +
            (value === t
              ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              : "bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800")
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}

import type { Calculated, MaybeCalculated, Scope1Result, Scope1SpeciesResult } from "@/lib/calc/types";

function ResultView({
  result,
  amount,
  activityUnit,
}: {
  result: Scope1Result | { error: string } | null;
  amount: string;
  activityUnit: string;
}) {
  if (result === null) {
    return (
      <div className="rounded border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
        사용량을 입력하세요.
      </div>
    );
  }
  if ("error" in result) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-800">
        {result.error}
      </div>
    );
  }
  return (
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
          <Cell calculated={result.totalCo2eq} digits={6} size="lg" emphasis />
        </div>
        <div className="mt-1 text-xs text-neutral-500">
          {result.fuelName} · 사용량 {amount} {activityUnit}
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h3 className="text-sm font-semibold text-neutral-500">공통 계수</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ResultRow label="열량계수" calculated={result.heatFactor} digits={4} />
          <ResultRow label="산화계수" calculated={result.oxidation} digits={4} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <SpeciesCard title="CO₂" result={result.co2} />
        <SpeciesCard title="CH₄" result={result.ch4} />
        <SpeciesCard title="N₂O" result={result.n2o} />
      </div>
    </>
  );
}

function ResultRow({
  label,
  calculated,
  digits = 4,
}: {
  label: string;
  calculated: MaybeCalculated;
  digits?: number;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-950">
      <span className="text-xs text-neutral-500">{label}</span>
      <Cell calculated={calculated} digits={digits} size="sm" />
    </div>
  );
}

function SpeciesCard({ title, result }: { title: string; result: Scope1SpeciesResult }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-[10px] uppercase tracking-widest text-neutral-500">species</span>
      </div>
      <div className="mt-3 space-y-2">
        <RowLine label="배출계수" c={result.emissionFactor} digits={4} />
        <RowLine label="tGHG" c={result.tGhg} digits={6} />
        <RowLine label="GWP" c={result.gwp} digits={0} />
        <div className="border-t border-neutral-200 pt-2 dark:border-neutral-800">
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
      <span className="text-xs text-neutral-500">{label}</span>
      <Cell calculated={c} digits={digits} size="sm" emphasis={emphasis} />
    </div>
  );
}
