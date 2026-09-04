"use client";

import Link from "next/link";
import { useFacility } from "@/lib/facility/useFacility";
import { minTiersOf } from "@/lib/facility/grade";

/**
 * 계산기 상단에 붙는 시설 컨텍스트 배너.
 *
 * 등록됨 · 시설명 · 등급 · (선택) 최소 Tier · [시설 수정] 링크
 * 미등록 · 안내 + [시설 등록 →]
 *
 * showTiers=true 이면 heat/ef/ox 최소 Tier 를 함께 표시 (fuel-combustion 계산기용).
 * refrigerant / scope2 는 Tier 개념이 없으므로 기본값 false.
 */
export function FacilityContextBanner({
  showTiers = false,
}: {
  showTiers?: boolean;
}) {
  const { facility, ready } = useFacility();

  // hydration 전 · 배너 공간만 확보 (레이아웃 흔들림 방지)
  if (!ready) {
    return <div className="mb-6 h-[52px]" aria-hidden />;
  }

  if (!facility) {
    return (
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-l-2 border-warn-border bg-warn-bg/60 px-4 py-3 text-sm text-warn">
        <div className="flex items-baseline gap-2">
          <span
            className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-warn"
            aria-hidden
          />
          <span>
            시설이 등록되지 않았습니다 · 등급에 따른 최소 Tier 강제가 적용되지 않습니다.
          </span>
        </div>
        <Link
          href="/facility"
          className="font-mono text-[11px] uppercase tracking-widest text-warn underline decoration-dotted underline-offset-4 hover:decoration-solid"
        >
          시설 등록 →
        </Link>
      </div>
    );
  }

  const mins = minTiersOf(facility);
  return (
    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-l-2 border-accent bg-surface-2 px-4 py-3 text-sm">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="flex items-baseline gap-2">
          <span
            className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent"
            aria-hidden
          />
          <span className="font-medium text-text">{facility.siteName}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
            · 등급 {calcGradeLabel(facility.annualGhgMTons)}
          </span>
        </span>
        {showTiers && mins && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            · min tier · heat {mins.heat} / ef {mins.ef} / ox {mins.ox}
          </span>
        )}
      </div>
      <Link
        href="/facility"
        className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent"
      >
        시설 수정 →
      </Link>
    </div>
  );
}

// grade.calcGrade 를 다시 안 불러도 되게 · 인라인 (banner 는 label 만 필요)
import { calcGrade } from "@/lib/facility/grade";
function calcGradeLabel(annualGhgMTons: number) {
  return calcGrade(annualGhgMTons);
}
