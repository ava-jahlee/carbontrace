"use client";

import Link from "next/link";
import { useFacility } from "@/lib/facility/useFacility";
import { calcGrade } from "@/lib/facility/grade";

/**
 * TopNav 우측에 놓이는 시설 뱃지.
 *
 * 상태 3:
 *  - 미등록 · 회색 dot · "시설 등록"
 *  - 등록됨 · accent dot · "○○지점 · B"
 *  - hydration 전 · placeholder (레이아웃 흔들림 방지)
 */
export function FacilityBadge() {
  const { facility, ready } = useFacility();

  if (!ready) {
    return (
      <span
        aria-hidden
        className="inline-flex h-6 w-32 items-baseline"
        style={{ visibility: "hidden" }}
      >
        placeholder
      </span>
    );
  }

  if (!facility) {
    return (
      <Link
        href="/facility"
        className="group inline-flex items-baseline gap-2 text-sm text-text-muted hover:text-accent"
      >
        <span
          className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-text-dim group-hover:bg-accent"
          aria-hidden
        />
        <span>시설 등록</span>
      </Link>
    );
  }

  const grade = calcGrade(facility.annualGhgMTons);
  return (
    <Link
      href="/facility"
      className="group inline-flex items-baseline gap-2 text-sm text-text hover:text-accent"
      title="시설 수정"
    >
      <span
        className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-accent"
        aria-hidden
      />
      <span className="max-w-[160px] truncate">{facility.siteName}</span>
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-accent">
        · {grade}
      </span>
    </Link>
  );
}
