"use client";

import { useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { AuditSummaryCard } from "@/components/audit/AuditSummary";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { summarizeAll } from "@/lib/audit/summary";
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

  const [powerVintage, setPowerVintage] = useState<PowerVintage>("2022");
  const [powerLocation, setPowerLocation] = useState<PowerLocation>("소비단");

  const [phase, setPhase] = useState<KdhcPhase>("4기");
  const [district, setDistrict] = useState<KdhcDistrict>("수도권지사");

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
    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* ═══ 좌: 입력 ═══ */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-md border border-border bg-surface-2 p-5">
          <SectionHeader numeral="I" title="입력" hint="control panel" />

          <div className="mt-4 space-y-4">
            <Field label="공급 유형" hint="mode">
              <div className="inline-flex overflow-hidden rounded-sm border border-border">
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
            </Field>

            {mode === "power" && (
              <>
                <Field label="GIR 승인 판" hint="vintage">
                  <div className="inline-flex overflow-hidden rounded-sm border border-border">
                    {(["2017", "2022"] as PowerVintage[]).map((v) => (
                      <SegBtn key={v} active={powerVintage === v} onClick={() => setPowerVintage(v)}>
                        {v}년
                      </SegBtn>
                    ))}
                  </div>
                </Field>
                <Field label="위치" hint="location">
                  <div className="inline-flex overflow-hidden rounded-sm border border-border">
                    {(["발전단", "소비단"] as PowerLocation[]).map((v) => (
                      <SegBtn key={v} active={powerLocation === v} onClick={() => setPowerLocation(v)}>
                        {v}
                      </SegBtn>
                    ))}
                  </div>
                </Field>
              </>
            )}

            {mode === "heat-kdhc" && (
              <>
                <Field label="계획기간" hint="phase">
                  <div className="inline-flex overflow-hidden rounded-sm border border-border">
                    {(["3기", "4기"] as KdhcPhase[]).map((p) => (
                      <SegBtn key={p} active={phase === p} onClick={() => setPhase(p)}>
                        {p}
                      </SegBtn>
                    ))}
                  </div>
                </Field>
                <Field label="지사" hint="district">
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value as KdhcDistrict)}
                    className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm text-text"
                  >
                    {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </Field>
              </>
            )}

            {mode === "heat-national" && (
              <>
                <Field label="열 종류" hint="kind">
                  <div className="inline-flex overflow-hidden rounded-sm border border-border">
                    {(["열전용", "열병합", "열평균"] as HeatKind[]).map((k) => (
                      <SegBtn key={k} active={heatKind === k} onClick={() => setHeatKind(k)}>
                        {k}
                      </SegBtn>
                    ))}
                  </div>
                </Field>
                <div className="rounded-sm border border-warn-border bg-warn-bg px-2 py-1.5 text-[11px] text-warn">
                  <span className="font-mono text-[10px] uppercase tracking-widest">[needs-review]</span>
                  {" "}국가 통합 열 3종은 원출처를 아직 확인하지 못했습니다. KDHC 지사별 값을 쓰는 편이 안전합니다.
                </div>
              </>
            )}

            <Field label="사용량" hint={`amount · ${activityUnit}`}>
              <input
                type="number"
                value={amount}
                min={0}
                step="any"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm tabular-nums text-text"
              />
            </Field>

            <Field label="GWP 기준" hint="assessment">
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
          </div>
        </div>
      </aside>

      {/* ═══ 우: 결과 ═══ */}
      <section className="space-y-6">
        <ResultView result={result} activityUnit={activityUnit} amount={amount} />
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
        "px-2.5 py-1.5 font-mono text-[11px] tracking-wide " +
        (active
          ? "bg-ink text-bg"
          : "bg-surface text-text-muted hover:bg-surface-2 hover:text-text")
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
            <Cell calculated={result.totalCo2eq} digits={6} size="lg" emphasis />
          </div>
          <div className="mt-2 text-xs text-text-muted">
            {result.sourceLabel} · 사용량 {amount} {activityUnit}
          </div>
        </div>
      </div>

      <div>
        <SectionHeader numeral="III" title="감사 신뢰도" hint="confidence" />
        <div className="mt-4">
          <AuditSummaryCard summary={summarizeAll([result.totalCo2eq])} />
        </div>
      </div>

      <div>
        <SectionHeader numeral="IV" title="종별 배출" hint="by species" />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <SpeciesCard title="CO₂" result={result.co2} />
          <SpeciesCard title="CH₄" result={result.ch4} />
          <SpeciesCard title="N₂O" result={result.n2o} />
        </div>
      </div>
    </>
  );
}

function SpeciesCard({ title, result }: { title: string; result: Scope2SpeciesResult }) {
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
