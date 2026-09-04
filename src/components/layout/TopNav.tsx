import Link from "next/link";
import { FacilityBadge } from "./FacilityBadge";

/**
 * 상단 인라인 nav — Mara 계열 (쉼표 나열).
 *
 * carbontrace 로고 + 카달로그 링크 (쉼표) + 우측 시설 뱃지.
 * 랜딩과 계산기 페이지에서 동일하게 사용.
 *
 * v0.9 부터 · 우측 mono meta (버전 · 스코프 슬러그) 제거.
 * 정보 가치가 낮고 시각 소음을 유발.
 */

interface TopNavProps {
  /**
   * 현재 페이지 (활성 링크 accent 처리용).
   * fuel-combustion · refrigerant 둘 다 scope1 로 hoist (Scope 1 하위 카테고리).
   */
  active?: "home" | "scope1" | "scope2" | "scope3" | "inventory" | "docs" | "facility";
}

const NAV_ITEMS = [
  { href: "/scope1", label: "Scope 1", key: "scope1" as const },
  { href: "/scope2", label: "Scope 2", key: "scope2" as const },
  { href: "/scope3", label: "Scope 3", key: "scope3" as const },
  { href: "/inventory", label: "Inventory", key: "inventory" as const },
  { href: "/docs", label: "Docs", key: "docs" as const },
];

export function TopNav({ active }: TopNavProps) {
  return (
    <nav className="flex items-baseline gap-2 border-b border-border px-6 py-5 text-sm sm:px-10 md:px-12 lg:px-16">
      <Link
        href="/"
        className={
          active === "home"
            ? "mr-8 text-lg font-semibold tracking-tight text-accent"
            : "mr-8 text-lg font-semibold tracking-tight text-text hover:text-accent"
        }
      >
        carbontrace
      </Link>
      {NAV_ITEMS.map((item, idx) => (
        <span key={item.href} className="flex items-baseline gap-2">
          <Link
            href={item.href}
            className={
              active === item.key
                ? "text-accent"
                : "text-text-muted hover:text-accent"
            }
          >
            {item.label}
          </Link>
          {idx < NAV_ITEMS.length - 1 && <span className="text-text-dim">,</span>}
        </span>
      ))}
      <div className="flex-1" />
      <FacilityBadge />
    </nav>
  );
}
