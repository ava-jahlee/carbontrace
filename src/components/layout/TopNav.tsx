import Link from "next/link";

/**
 * 상단 인라인 nav — Mara 계열 (쉼표 나열).
 *
 * carbontrace 로고 + 카달로그 링크 (쉼표) + 우측 mono 라벨.
 * 랜딩과 계산기 페이지 4개에서 동일하게 사용.
 */

interface TopNavProps {
  /** 우측 mono 라벨 (예: "v 0.4" · "scope_1 / stationary") */
  meta?: string;
  /** 현재 페이지 (활성 링크 accent 처리용) */
  active?: "home" | "scope1" | "scope2" | "refrigerant" | "roadmap";
}

const NAV_ITEMS = [
  { href: "/scope1", label: "Scope 1", key: "scope1" as const },
  { href: "/scope2", label: "Scope 2", key: "scope2" as const },
  { href: "/refrigerant", label: "Refrigerant", key: "refrigerant" as const },
  { href: "/roadmap", label: "Roadmap", key: "roadmap" as const },
];

export function TopNav({ meta = "v 0.4", active }: TopNavProps) {
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
      <span className="text-text-dim">,</span>
      <a
        href="https://github.com/ava-jahlee/carbontrace/tree/main/docs"
        target="_blank"
        rel="noreferrer"
        className="text-text-muted hover:text-accent"
      >
        Docs
      </a>
      <div className="flex-1" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
        {meta}
      </span>
    </nav>
  );
}
