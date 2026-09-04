import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";

/**
 * 랜딩 페이지.
 *
 * workspace DESIGN.md · REFERENCES.md · 목업 B (Mara + Daniel Blue) 준수:
 * - warmer ivory + terracotta accent
 * - 상단 인라인 nav (Mara 계열 · 쉼표 나열)
 * - 큰 sans headline `carbon / trace` 두 줄 + terracotta underline
 * - 우측 principle 사이드 (border-left)
 * - 2x2 카달로그 그리드 · 도트 성숙도 뱃지 (대괄호 X)
 * - 좌하단 좌표 코너 메타 (Daniel Blue 스타일)
 */

interface CatalogItem {
  href: string;
  title: string;
  subtitle: string;
  detail: string;
}

const CATALOG: CatalogItem[] = [
  {
    href: "/scope1",
    title: "Scope 1 · 직접 배출",
    subtitle: "우리 사업장 · 우리가 직접 태운 것",
    detail:
      "사업장 안의 보일러 · 차량 · 냉매 유출 등 · 소유·통제하는 배출원에서 우리가 직접 낸 배출량.",
  },
  {
    href: "/scope2",
    title: "Scope 2 · 전력·열",
    subtitle: "우리 대신 · 한전·지역난방이 태워준 것",
    detail:
      "사 온 전기 · 열 · 스팀. 우리가 소비했지만 실제 배출은 발전소 · 열병합 시설에서 났고 · 그 상류 배출을 우리 몫으로 인정하는 부분.",
  },
  {
    href: "/scope3",
    title: "Scope 3 · 기타 간접",
    subtitle: "우리 사업 때문에 · 다른 회사·사람이 태운 것",
    detail:
      "원재료 공급사 · 물류 · 임직원 통근 · 투자한 회사 · 우리 제품을 쓰는 사용자 등 15 카테고리. 우리가 직접 태우진 않았지만 우리 사업이 유발한 배출량.",
  },
];

const MATURITY = [
  {
    key: "verified",
    label: "verified",
    desc: "원문 표·페이지·행까지 확인 완료",
    dotCls: "bg-verified",
    textCls: "text-verified",
  },
  {
    key: "documented",
    label: "documented",
    desc: "원문·표 확인 · 페이지·행 미기재",
    dotCls: "bg-documented",
    textCls: "text-documented",
  },
  {
    key: "asserted",
    label: "asserted",
    desc: "문서명·표는 알지만 원문 재확인 남음",
    dotCls: "bg-asserted",
    textCls: "text-asserted",
  },
  {
    key: "pending",
    label: "pending",
    desc: "원문 재추적 아직 안 함",
    dotCls: "bg-pending",
    textCls: "text-pending",
  },
] as const;

export default function Home() {
  return (
    <>
      <TopNav active="home" />

      <main className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:px-10 md:px-12 lg:px-16">
        {/* ─── 히어로 (좌: 큰 sans headline · 우: principle) ─── */}
        <section className="grid gap-16 md:grid-cols-2 md:items-end">
          {/* 왼쪽 · 헤드라인 */}
          <div>
            <h1 className="text-6xl font-semibold leading-[0.9] tracking-[-0.02em] text-text sm:text-7xl md:text-8xl">
              <span className="block">carbon</span>
              <span className="relative inline-block">
                trace
                {/* absolute underline · line-box 밀지 않게 */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 right-0 bottom-1 h-[6px] bg-accent"
                />
              </span>
            </h1>
            {/* 문단 명시 분리 · muted → accent 두 줄 */}
            <div className="mt-8 max-w-sm space-y-1.5 text-base leading-relaxed text-pretty">
              <p className="text-text-muted">온실가스 배출량 산정 도구.</p>
              <p className="font-medium text-accent">모든 수치에는 근거가 필요합니다.</p>
            </div>
          </div>

          {/* 오른쪽 · principle (border-left divider) */}
          <div className="border-l border-border pl-8 text-sm leading-relaxed text-text-muted text-pretty">
            <p>IPCC 2006 GL 과 K-ETS 지침을 그대로 따르는 계산 엔진입니다.</p>
            <p className="mt-1.5">
              <span className="font-medium text-accent">감사 가능성 (auditability)</span> 이 이 도구의 핵심입니다.
            </p>

            <p className="mt-5">
              결과 값 옆의{" "}
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-strong font-mono text-[9px] text-text-muted">
                i
              </span>
              {" "}를 누르면 그 값을 만든 수식과 각 계수를 볼 수 있습니다.
            </p>
            <p className="mt-1.5">
              계수마다 <span className="font-medium text-text">원문서 (IPCC · GIR · K-ETS)</span> 링크가 붙어 있어 값을 곧바로 재확인할 수 있습니다.
            </p>

            {/* 성숙도 · 도트 + 라벨 + 짧은 설명 (세로 스택) */}
            <dl className="mt-6 space-y-1.5 text-[11px] leading-relaxed">
              {MATURITY.map((m) => (
                <div key={m.key} className="flex items-baseline gap-2">
                  <span
                    className={`inline-block h-1.5 w-1.5 shrink-0 translate-y-[-1px] rounded-full ${m.dotCls}`}
                    aria-hidden
                  />
                  <dt className={`w-[68px] shrink-0 font-mono tracking-wide ${m.textCls}`}>{m.label}</dt>
                  <dd className="text-text-dim">{m.desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── 카탈로그 (Scope 1·2·3) ─── */}
        <section className="mt-24">
          <div className="mb-8 border-b border-border-strong pb-3">
            <h2 className="text-base font-semibold text-text">Catalog</h2>
          </div>
          <ul className="grid gap-px bg-border sm:grid-cols-3" style={{ border: "1px solid var(--border)" }}>
            {CATALOG.map((item) => (
              <li key={item.href} className="bg-surface">
                <Link
                  href={item.href}
                  className="group block h-full p-8 transition-colors hover:bg-accent/[0.04]"
                >
                  <div className="text-xl font-semibold tracking-tight text-text group-hover:text-ink">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm font-medium text-accent">
                    {item.subtitle}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {item.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 푸터 · GitHub · 제안 · admin ─── */}
        <footer className="mt-24 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-border pt-6 text-sm text-text-muted">
          <a
            href="https://github.com/ava-jahlee/carbontrace"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-4 hover:text-accent"
          >
            GitHub ↗
          </a>
          <div className="flex items-baseline gap-8">
            <a
              href="https://github.com/ava-jahlee/carbontrace/issues/new?labels=user-feedback"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              값·방법론 제안 ↗
            </a>
            <Link
              href="/roadmap"
              className="text-text-dim hover:text-accent"
            >
              admin
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
