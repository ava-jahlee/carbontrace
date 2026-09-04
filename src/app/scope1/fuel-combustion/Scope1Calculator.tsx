"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell } from "@/components/cell/Cell";
import { AuditSummaryCard } from "@/components/audit/AuditSummary";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { FacilityContextBanner } from "@/components/facility/FacilityContextBanner";
import { AddToInventoryButton } from "@/components/inventory/AddToInventoryButton";
import { FUELS } from "@/data/factors/fuels.gen";
import {
  countOverrides,
  DATA_PROFILE_DESC,
  DATA_PROFILE_LABELS,
  type DataProfile,
} from "@/data/factors/corrections";
import { calculateScope1 } from "@/lib/calc/scope1";
import { summarizeAll } from "@/lib/audit/summary";
import { useFacility } from "@/lib/facility/useFacility";
import { minTiersOf } from "@/lib/facility/grade";
import { buildFacilitySnapshot, defaultInventoryLabel } from "@/lib/inventory/draft";
import type { InventoryDraft } from "@/data/inventory";
import type { GwpStandard, Tier } from "@/lib/calc/types";

const TIER_RANK: Record<Tier, number> = { T1: 1, T2: 2, T3: 3 };

export function Scope1Calculator() {
  const { facility } = useFacility();
  const mins = minTiersOf(facility);

  const [fuelId, setFuelId] = useState<string>("아역청탄-하위-유연탄");
  const [amount, setAmount] = useState<string>("1");
  const [heatTier, setHeatTier] = useState<Tier>("T1");
  const [efTier, setEfTier] = useState<Tier>("T2");
  const [gwpStandard, setGwpStandard] = useState<GwpStandard>("SAR");
  const [dataProfile, setDataProfile] = useState<DataProfile>("xlsm-original");

  // T3 사용자 입력 (사업장 실측치). Tier 가 T3 일 때만 UI 노출·값 사용.
  // 원 xlsm 관례: efTier=T3 이면 산화계수도 T3 (Main!F15 = E15) · 그래서 4개 값이 같이 나옴.
  const [ovrHeat, setOvrHeat] = useState<string>("");
  const [ovrCO2, setOvrCO2] = useState<string>("");
  const [ovrCH4, setOvrCH4] = useState<string>("");
  const [ovrN2O, setOvrN2O] = useState<string>("");
  const [ovrOx, setOvrOx] = useState<string>("");

  // 시설이 바뀌면 · 현재 Tier 가 최소치 미달이면 자동으로 올림.
  useEffect(() => {
    if (!mins) return;
    if (TIER_RANK[heatTier] < TIER_RANK[mins.heat]) setHeatTier(mins.heat);
    if (TIER_RANK[efTier] < TIER_RANK[mins.ef]) setEfTier(mins.ef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mins?.heat, mins?.ef]);

  const fuel = useMemo(() => FUELS.find((f) => f.id === fuelId), [fuelId]);

  const result = useMemo(() => {
    const amt = parseFloat(amount);
    if (!Number.isFinite(amt)) return null;

    // T3 override 값들 · 해당 tier 가 T3 일 때만 파싱해서 넘김.
    const parseNum = (s: string) => {
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : undefined;
    };
    const overrides = {
      heatFactor: heatTier === "T3" ? parseNum(ovrHeat) : undefined,
      efCO2: efTier === "T3" ? parseNum(ovrCO2) : undefined,
      efCH4: efTier === "T3" ? parseNum(ovrCH4) : undefined,
      efN2O: efTier === "T3" ? parseNum(ovrN2O) : undefined,
      oxidation: efTier === "T3" ? parseNum(ovrOx) : undefined,
    };

    return calculateScope1({
      fuelId,
      amount: amt,
      heatTier,
      efTier,
      gwpStandard,
      dataProfile,
      overrides,
    });
  }, [fuelId, amount, heatTier, efTier, gwpStandard, dataProfile, ovrHeat, ovrCO2, ovrCH4, ovrN2O, ovrOx]);

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
    <div className="mt-6">
      <FacilityContextBanner showTiers />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* ═══ 좌: 입력 (subtle wash · workspace DESIGN.md 4.2) ═══ */}
      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="rounded-md border border-border bg-surface-2 p-5">
          <SectionHeader title="입력" />

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
              <Field
                label="열량 tier"
                hint={mins ? `ncv · min ${mins.heat}` : "ncv"}
              >
                <TierPicker value={heatTier} onChange={setHeatTier} minTier={mins?.heat} />
              </Field>
              <Field
                label="배출 tier"
                hint={mins ? `ef · min ${mins.ef}` : "ef"}
              >
                <TierPicker value={efTier} onChange={setEfTier} minTier={mins?.ef} />
              </Field>
            </div>

            {/* ─ T3 사용자 입력 (사업장 실측치) ─ */}
            {heatTier === "T3" && (
              <OverrideField
                label="열량계수"
                hint={fuel?.heat.unit ?? "MJ/kg"}
                value={ovrHeat}
                onChange={setOvrHeat}
                placeholder="사업장 실측 열량계수"
              />
            )}
            {efTier === "T3" && (
              <div className="rounded-sm border border-accent/40 bg-accent/[0.04] p-3 space-y-3">
                <div className="text-[11px] text-text-muted">
                  배출 T3 · 사업장 실측 배출계수 · 산화계수를 입력합니다.
                </div>
                <OverrideField
                  label="배출계수 CO₂"
                  hint="kgGHG/TJ"
                  value={ovrCO2}
                  onChange={setOvrCO2}
                />
                <OverrideField
                  label="배출계수 CH₄"
                  hint="kgGHG/TJ"
                  value={ovrCH4}
                  onChange={setOvrCH4}
                />
                <OverrideField
                  label="배출계수 N₂O"
                  hint="kgGHG/TJ"
                  value={ovrN2O}
                  onChange={setOvrN2O}
                />
                <OverrideField
                  label="산화계수"
                  hint="0 – 1"
                  value={ovrOx}
                  onChange={setOvrOx}
                  placeholder="예 · 0.99"
                />
              </div>
            )}

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
              hint={`${countOverrides(dataProfile)} overrides`}
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
                <div>분류 · {fuel.category ?? "—"}</div>
                <div>상온 · {fuel.state ?? "—"}</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ═══ 우: 결과 ═══ */}
      <section className="space-y-4">
        <ResultView
          result={result}
          amount={amount}
          activityUnit={fuel?.activityUnit ?? ""}
          heatTier={heatTier}
          efTier={efTier}
          gwpStandard={gwpStandard}
        />

        {/* ═ VI · 인벤토리에 추가 ═ */}
        {result && !("error" in result) && (
          <div className="border-t border-border pt-5">
            <AddToInventoryButton
              defaultLabel={defaultInventoryLabel(facility, result.fuelName)}
              getDraft={(label): InventoryDraft => ({
                label,
                category: "fuel-combustion",
                facility: buildFacilitySnapshot(facility),
                display: {
                  activity: `${result.fuelName} · ${amount} ${fuel?.activityUnit ?? ""}`,
                  conditions: `열량 ${heatTier} · 배출 ${efTier} · GWP ${gwpStandard}`,
                },
                totalCo2eq: result.totalCo2eq,
                inputs: {
                  fuelId,
                  amount: parseFloat(amount),
                  heatTier,
                  efTier,
                  gwpStandard,
                  dataProfile,
                },
                rawResult: result,
                warnings: result.warnings,
              })}
            />
          </div>
        )}
      </section>
      </div>
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

/** T3 사용자 입력 헬퍼 · Field + number input 한 세트. */
function OverrideField({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        value={value}
        min={0}
        step="any"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border bg-surface px-2 py-1.5 text-sm tabular-nums text-text placeholder:text-text-dim"
      />
    </Field>
  );
}

function TierPicker({
  value,
  onChange,
  minTier,
}: {
  value: Tier;
  onChange: (t: Tier) => void;
  /** 시설 등급이 요구하는 최소 Tier · 이보다 낮은 것은 disabled */
  minTier?: Tier;
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-sm border border-border">
      {(["T1", "T2", "T3"] as Tier[]).map((t) => {
        const disabled = minTier ? TIER_RANK[t] < TIER_RANK[minTier] : false;
        const active = value === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => !disabled && onChange(t)}
            disabled={disabled}
            title={disabled ? `시설 등급이 최소 ${minTier} 를 요구합니다` : undefined}
            className={
              "px-2.5 py-1.5 font-mono text-[11px] tracking-wide " +
              (active
                ? "bg-ink text-bg"
                : disabled
                ? "bg-surface-2 text-text-dim/60 line-through cursor-not-allowed"
                : "bg-surface text-text-muted hover:bg-surface-2 hover:text-text")
            }
          >
            {t}
          </button>
        );
      })}
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

      {/* ═ II·III·IV · 결과 + 공통 계수 + 감사 신뢰도 · 하나의 카드로 통합 ═
        논리적 그룹 (결과 값 + 그 값을 만든 계수 + 그 계수의 근거) 을 · 시각적으로도 하나로.
        border-t 로 조각 구분 · 세로 뷰포트에서 "빈 박스" 문제 해소. */}
      <div className="rounded-md border border-border-strong bg-surface">
        {/* 결과 값 · 큰 숫자 + 조건 요약 dl */}
        <div className="p-4">
          <Cell calculated={result.totalCo2eq} digits={6} size="md" emphasis />
          <dl className="mt-3 space-y-1 text-xs">
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

        {/* 공통 계수 · 인라인 · 카드 없이 라벨-값 */}
        <div className="border-t border-border px-4 py-3">
          <div className="mb-1.5 text-[11px] font-medium text-text-muted">공통 계수</div>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
            <FactorInline label="열량계수" hint="ncv" calculated={result.heatFactor} digits={4} />
            <FactorInline label="산화계수" hint="ox" calculated={result.oxidation} digits={4} />
          </div>
        </div>

        {/* 감사 신뢰도 · 인라인 · 상세 접기 (기본 접힘 · 이슈 있으면 자동 펼침) */}
        <div className="border-t border-border px-4">
          <AuditSummaryCard summary={summarizeAll([result.totalCo2eq])} variant="inline" />
        </div>
      </div>

      {/* ═ V · 종별 (CO2 · CH4 · N2O) ═ */}
      <div>
        <SectionHeader title="종별 배출" />
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <SpeciesCard title="CO₂" result={result.co2} />
          <SpeciesCard title="CH₄" result={result.ch4} />
          <SpeciesCard title="N₂O" result={result.n2o} />
        </div>
      </div>
    </>
  );
}

/** 공통 계수를 카드 없이 인라인으로 · label · hint · value 한 줄. */
function FactorInline({
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
    <div className="flex items-baseline gap-2">
      <span className="text-text-muted">{label}</span>
      {hint && (
        <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim">/ {hint}</span>
      )}
      <Cell calculated={calculated} digits={digits} size="sm" />
    </div>
  );
}

function SpeciesCard({ title, result }: { title: string; result: Scope1SpeciesResult }) {
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <div className="border-b border-border pb-1.5">
        <h3 className="text-sm font-semibold text-text">{title}</h3>
      </div>
      <div className="mt-2 space-y-1.5">
        <RowLine label="배출계수" c={result.emissionFactor} digits={4} />
        <RowLine label="tGHG" c={result.tGhg} digits={6} />
        <RowLine label="GWP" c={result.gwp} digits={0} />
        <div className="border-t border-border pt-1.5">
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
