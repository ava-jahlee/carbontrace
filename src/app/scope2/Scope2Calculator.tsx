"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { calculateScope2, type Scope2Input, type Scope2Result, type Scope2SpeciesResult } from "@/lib/calc/scope2";
import type { Calculated, GwpStandard, MaybeCalculated } from "@/lib/calc/types";
import type {
  HeatKind,
  KdhcDistrict,
  KdhcPhase,
  PowerLocation,
  PowerVintage,
} from "@/data/factors/scope2.gen";

type SourceMode = "power" | "heat-kdhc" | "heat-national";

const DISTRICTS: KdhcDistrict[] = [
  "수도권지사", "평택지사", "청주지사", "세종지사",
  "대구지사", "양산지사", "김해지사", "광주전남지사",
];

export function Scope2Calculator() {
  const [mode, setMode] = useState<SourceMode>("heat-kdhc");
  const [amount, setAmount] = useState<string>("1");
  const [gwpStandard, setGwpStandard] = useState<GwpStandard>("SAR");

  // Power
  const [powerVintage, setPowerVintage] = useState<PowerVintage>("2022");
  const [powerLocation, setPowerLocation] = useState<PowerLocation>("소비단");

  // KDHC
  const [phase, setPhase] = useState<KdhcPhase>("4기");
  const [district, setDistrict] = useState<KdhcDistrict>("수도권지사");

  // National heat
  const [heatKind, setHeatKind] = useState<HeatKind>("열병합");

  const activityUnit = mode === "power" ? "MWh" : "TJ";

  const result = useMemo(() => {
    const amt = parseFloat(amount);
    if (!Number.isFinite(amt)) return null;

    const input: Scope2Input =
      mode === "power"
        ? { kind: "power", amount: amt, vintage: powerVintage, location: powerLocation, gwpStandard }
        : mode === "heat-kdhc"
        ? { kind: "heat-kdhc", amount: amt, phase, district, gwpStandard }
        : { kind: "heat-national", amount: amt, heatKind, gwpStandard };

    return calculateScope2(input);
  }, [mode, amount, powerVintage, powerLocation, phase, district, heatKind, gwpStandard]);

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
      {/* ─── 입력 패널 ─── */}
      <section className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-sm font-semibold text-neutral-500">입력</h2>

        <label className="mt-3 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          공급 유형
        </label>
        <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
          {(
            [
              { v: "power", label: "전력" },
              { v: "heat-kdhc", label: "열 · KDHC" },
              { v: "heat-national", label: "열 · 통합" },
            ] as const
          ).map((opt) => (
            <SegBtn key={opt.v} active={mode === opt.v} onClick={() => setMode(opt.v)}>
              {opt.label}
            </SegBtn>
          ))}
        </div>

        {mode === "power" && (
          <>
            <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              GIR 승인 판
            </label>
            <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
              {(["2017", "2022"] as PowerVintage[]).map((v) => (
                <SegBtn key={v} active={powerVintage === v} onClick={() => setPowerVintage(v)}>
                  {v}년 승인
                </SegBtn>
              ))}
            </div>

            <label className="mt-3 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              위치
            </label>
            <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
              {(["발전단", "소비단"] as PowerLocation[]).map((v) => (
                <SegBtn key={v} active={powerLocation === v} onClick={() => setPowerLocation(v)}>
                  {v}
                </SegBtn>
              ))}
            </div>
          </>
        )}

        {mode === "heat-kdhc" && (
          <>
            <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              계획기간
            </label>
            <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
              {(["3기", "4기"] as KdhcPhase[]).map((p) => (
                <SegBtn key={p} active={phase === p} onClick={() => setPhase(p)}>
                  {p}
                </SegBtn>
              ))}
            </div>

            <label className="mt-3 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              지사
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as KdhcDistrict)}
              className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-950"
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </>
        )}

        {mode === "heat-national" && (
          <>
            <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
              열 종류
            </label>
            <div className="mt-1 inline-flex overflow-hidden rounded border border-neutral-300 dark:border-neutral-700">
              {(["열전용", "열병합", "열평균"] as HeatKind[]).map((k) => (
                <SegBtn key={k} active={heatKind === k} onClick={() => setHeatKind(k)}>
                  {k}
                </SegBtn>
              ))}
            </div>
            <div className="mt-2 rounded border border-amber-300 bg-amber-50 px-2 py-1.5 text-[11px] text-amber-800 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
              ⚠ 국가 통합 열 3종 값은 원출처 미상. KDHC 지사별 값 사용 권장.
            </div>
          </>
        )}

        <label className="mt-4 block text-xs font-medium text-neutral-700 dark:text-neutral-300">
          사용량 <span className="text-neutral-400">({activityUnit})</span>
        </label>
        <input
          type="number"
          value={amount}
          min={0}
          step="any"
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-sm tabular-nums dark:border-neutral-700 dark:bg-neutral-950"
        />

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
      </section>

      {/* ─── 결과 패널 ─── */}
      <section className="space-y-4">
        <ResultView result={result} activityUnit={activityUnit} amount={amount} />
      </section>
    </div>
  );
}

function SegBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "px-2.5 py-1.5 text-xs " +
        (active
          ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          : "bg-white text-neutral-700 hover:bg-neutral-100 dark:bg-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800")
      }
    >
      {children}
    </button>
  );
}

function ResultView({
  result,
  activityUnit,
  amount,
}: {
  result: Scope2Result | { error: string } | null;
  activityUnit: string;
  amount: string;
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
          {result.sourceLabel} · 사용량 {amount} {activityUnit}
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

function SpeciesCard({ title, result }: { title: string; result: Scope2SpeciesResult }) {
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
