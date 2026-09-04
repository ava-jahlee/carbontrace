"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FACILITY_GRADE_DESC,
  FACILITY_GRADE_THRESHOLDS,
  FACILITY_USAGE_LABELS,
  type Facility,
  type FacilityUsage,
} from "@/data/facility";
import {
  clearFacility,
  loadFacility,
  notifyFacilityChanged,
  saveFacility,
} from "@/lib/facility/storage";
import { calcGrade, minTiersOf } from "@/lib/facility/grade";

const USAGE_ORDER: FacilityUsage[] = ["residential", "commercial-public"];

/**
 * 시설 등록 · 편집 · 삭제 폼.
 *
 * localStorage 를 초기값 소스로 · 편집 시 저장하면 dispatch.
 * 저장 후 성공 배지 잠깐 표시.
 */
export function FacilityForm() {
  const [siteName, setSiteName] = useState("");
  const [usage, setUsage] = useState<FacilityUsage>("commercial-public");
  const [annualGhgMTons, setAnnualGhgMTons] = useState("1");
  const [savedFlash, setSavedFlash] = useState(false);
  const [existing, setExisting] = useState<Facility | null>(null);

  // hydration · localStorage 초기 로드
  useEffect(() => {
    const f = loadFacility();
    if (f) {
      setExisting(f);
      setSiteName(f.siteName);
      setUsage(f.usage);
      setAnnualGhgMTons(String(f.annualGhgMTons));
    }
  }, []);

  const parsedGhg = useMemo(() => {
    const n = Number(annualGhgMTons);
    return Number.isFinite(n) && n > 0 ? n : NaN;
  }, [annualGhgMTons]);

  const preview: Facility | null = useMemo(() => {
    if (!siteName.trim() || Number.isNaN(parsedGhg)) return null;
    const now = new Date().toISOString();
    return {
      siteName: siteName.trim(),
      usage,
      annualGhgMTons: parsedGhg,
      schemaVersion: 1,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
  }, [siteName, usage, parsedGhg, existing]);

  const grade = preview ? calcGrade(preview.annualGhgMTons) : null;
  const minTiers = preview ? minTiersOf(preview) : null;

  const canSave = preview !== null;

  function handleSave() {
    if (!preview) return;
    saveFacility(preview);
    notifyFacilityChanged();
    setExisting(preview);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }

  function handleClear() {
    if (!confirm("등록된 시설 정보를 삭제할까요? 저장된 계산 조건에는 영향이 없습니다.")) return;
    clearFacility();
    notifyFacilityChanged();
    setExisting(null);
    setSiteName("");
    setUsage("commercial-public");
    setAnnualGhgMTons("1");
  }

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_320px]">
      {/* ─── 좌측 · 입력 폼 ─── */}
      <section>
        <div className="mb-4 font-mono text-[11px] uppercase tracking-widest text-accent-soft">
          input · 3 fields
        </div>

        {/* 1. 사업장 이름 */}
        <label className="block">
          <div className="text-sm font-medium text-text">
            1. 사업장 이름
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              site name
            </span>
          </div>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="예 · 우리회사 본사 · A동 · ○○지점"
            className="mt-2 w-full rounded-none border border-border bg-surface-2 px-3 py-2 text-sm text-text placeholder:text-text-dim focus:border-accent focus:outline-none"
            maxLength={80}
          />
          <div className="mt-1 text-xs text-text-dim">
            감사·보고서에 표시될 이름 · 자유 입력 · 최대 80자
          </div>
        </label>

        {/* 2. 용도 */}
        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-text">
            2. 용도
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              usage · IPCC 1A4
            </span>
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {USAGE_ORDER.map((u) => {
              const meta = FACILITY_USAGE_LABELS[u];
              const active = usage === u;
              return (
                <button
                  type="button"
                  key={u}
                  onClick={() => setUsage(u)}
                  className={`flex flex-col items-start gap-1 border p-3 text-left transition-colors ${
                    active
                      ? "border-accent bg-accent/[0.06]"
                      : "border-border bg-surface hover:border-border-strong"
                  }`}
                >
                  <span className={active ? "text-sm font-medium text-accent" : "text-sm text-text"}>
                    {meta.ko}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                    {meta.ipccCode} · {meta.en}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* 3. 연간 GHG */}
        <label className="mt-6 block">
          <div className="text-sm font-medium text-text">
            3. 연간 GHG 배출량
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
              annual ghg · 만ton/yr
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <input
              type="number"
              value={annualGhgMTons}
              onChange={(e) => setAnnualGhgMTons(e.target.value)}
              min={0.01}
              step="any"
              className="w-32 rounded-none border border-border bg-surface-2 px-3 py-2 text-right font-mono text-sm text-text focus:border-accent focus:outline-none"
            />
            <span className="text-sm text-text-muted">만 ton CO₂eq / yr</span>
          </div>
          <div className="mt-1 text-xs text-text-dim">
            사업장 전체의 연간 온실가스 배출 규모 · 0 초과 · K-ETS 별표 5 등급 산정에만 사용
          </div>
        </label>

        {/* 저장 / 삭제 액션 */}
        <div className="mt-8 flex items-baseline gap-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave}
            className={`border px-4 py-2 text-sm font-medium transition-colors ${
              canSave
                ? "border-accent bg-accent text-white hover:bg-accent/90"
                : "cursor-not-allowed border-border bg-surface-2 text-text-dim"
            }`}
          >
            {existing ? "저장 · 업데이트" : "저장"}
          </button>

          {existing && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-text-dim hover:text-accent"
            >
              등록 삭제
            </button>
          )}

          {savedFlash && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-verified">
              <span className="h-1.5 w-1.5 rounded-full bg-verified" aria-hidden />
              저장됨
            </span>
          )}
        </div>
      </section>

      {/* ─── 우측 · 자동 산정 결과 ─── */}
      <aside className="border-l border-border pl-8">
        <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
          auto · derived
        </div>

        {!preview ? (
          <p className="mt-4 text-sm text-text-dim">
            사업장 이름과 연간 GHG 를 입력하면 등급과 최소 Tier 가 여기에 자동 표시됩니다.
          </p>
        ) : (
          <>
            {/* 등급 */}
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                K-ETS 별표 5 · 시설 등급
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-4xl font-semibold text-accent">{grade}</span>
                <span className="text-sm text-text-muted">{FACILITY_GRADE_DESC[grade!]}</span>
              </div>
              <details className="mt-3 text-xs text-text-dim">
                <summary className="cursor-pointer hover:text-accent">등급 기준</summary>
                <ul className="mt-2 space-y-1 font-mono">
                  {FACILITY_GRADE_THRESHOLDS.map((t) => (
                    <li key={t.grade} className={t.grade === grade ? "text-accent" : ""}>
                      {t.grade} · {t.gteMTons} ≤ x {t.ltMTons === Infinity ? "" : `< ${t.ltMTons}`} 만ton/yr
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* 최소 Tier */}
            <div className="mt-8">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                각 계수의 최소 Tier
              </div>
              <dl className="mt-3 space-y-2 text-sm">
                {minTiers &&
                  (
                    [
                      { key: "heat", label: "열량계수", en: "calorific" },
                      { key: "ef", label: "배출계수", en: "emission factor" },
                      { key: "ox", label: "산화계수", en: "oxidation" },
                    ] as const
                  ).map((row) => (
                    <div key={row.key} className="flex items-baseline justify-between border-b border-border/60 pb-1.5">
                      <dt className="text-text-muted">
                        {row.label}
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                          {row.en}
                        </span>
                      </dt>
                      <dd className="font-mono text-sm font-semibold text-accent">{minTiers[row.key]}</dd>
                    </div>
                  ))}
              </dl>
              <p className="mt-3 text-xs text-text-dim">
                계산기에서 이 최소 Tier 이하의 Tier 는 선택할 수 없습니다.
              </p>
            </div>

            {/* 진입 링크 */}
            {existing && (
              <div className="mt-10 border-t border-border pt-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  다음 단계
                </div>
                <ul className="mt-3 space-y-1.5 text-sm">
                  <li>
                    <Link href="/scope1" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
                      Scope 1 · 직접 배출 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/scope2" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
                      Scope 2 · 전력 · 열 →
                    </Link>
                  </li>
                  <li>
                    <Link href="/scope3" className="text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid">
                      Scope 3 · 기타 간접 →
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
