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
  tag: string;
}

const CATALOG: CatalogItem[] = [
  {
    href: "/scope1",
    title: "Scope 1 · 직접 배출",
    subtitle: "Direct emissions · fuel + fugitive",
    detail:
      "연료 사용량 · 냉매 유출량을 입력하면 IPCC 2006 + K-ETS 방법으로 tCO₂eq 을 계산합니다.",
    tag: "scope_1 / direct",
  },
  {
    href: "/scope2",
    title: "Scope 2 · 전력·열",
    subtitle: "Purchased electricity & heat",
    detail:
      "전력·열 사용량을 입력하면 GIR 국가고유 배출계수와 KDHC 지사별 실측치로 tCO₂eq 을 계산합니다.",
    tag: "scope_2 / purchased_energy",
  },
  {
    href: "/scope3",
    title: "Scope 3 · 기타 간접",
    subtitle: "Corporate value chain · 15 categories",
    detail:
      "협력사 · 물류 · 통근 · 투자 등 15 카테고리의 방법론 카탈로그. 계산기는 순차 구현 중입니다.",
    tag: "scope_3 / value_chain",
  },
];

interface DocLink {
  href: string;
  tag: string;
  title: string;
  hint: string;
}

const DOC_LINKS: DocLink[] = [
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/AUDIT-GUIDE.md",
    tag: "audit",
    title: "감사자용 walkthrough",
    hint: "제3자 검증기관·심사원이 특정 값을 원문서까지 역추적하는 표준 5단계",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/DATA-PROFILES.md",
    tag: "data",
    title: "데이터 프로파일 상세",
    hint: "3 프로파일 (원본·정정·최신) · 각 정정 fuel 별 표 · 원문서 근거",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/DEVELOPMENT.md",
    tag: "dev",
    title: "개발자 가이드",
    hint: "신규 배출원·데이터 프로파일 추가 5단계",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/PRIMARY-SOURCE-NOTE-STANDARD.md",
    tag: "note",
    title: "Primary source note 표준",
    hint: "note 필드 작성 규칙 · muted · 사실 · 마침표",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/CHANGELOG.md",
    tag: "log",
    title: "Changelog",
    hint: "버전별 릴리스 노트 · v0.1 → v0.7",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/issues/new?labels=user-feedback",
    tag: "issue",
    title: "이슈 · 제안",
    hint: "값·방법론에 이상이 있으면 GitHub Issues 로 제안 (오픈 커뮤니티)",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace",
    tag: "repo",
    title: "GitHub · ava-jahlee/carbontrace",
    hint: "",
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
                  <div className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                    {item.tag}
                  </div>
                  <div className="mt-3 text-xl font-semibold tracking-tight text-text group-hover:text-ink">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{item.subtitle}</div>
                  <div className="mt-4 font-mono text-[11px] leading-relaxed text-text-muted">
                    {item.detail}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 감사자 · 개발자 진입 (docs) ─── */}
        <section className="mt-24">
          <div className="mb-6 border-b border-border pb-3">
            <h2 className="text-base font-semibold text-text">Docs</h2>
          </div>
          <ul className="space-y-4">
            {DOC_LINKS.map((doc) => (
              <li key={doc.href}>
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-baseline gap-3 text-text hover:text-accent"
                >
                  <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-accent-soft">
                    {doc.tag}
                  </span>
                  <span className="underline decoration-dotted underline-offset-4">{doc.title}</span>
                  <span className="text-text-dim">↗</span>
                </a>
                {doc.hint && (
                  <div className="ml-[4.25rem] mt-0.5 text-xs text-text-muted">{doc.hint}</div>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 푸터 ─── */}
        <footer className="mt-24 flex items-baseline justify-between border-t border-border pt-6 text-xs text-text-dim">
          <div>
            v 0.7 · 2026-09-04 ·{" "}
            <a
              href="https://github.com/ava-jahlee/carbontrace"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
          <Link
            href="/roadmap"
            className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent"
          >
            admin
          </Link>
        </footer>
      </main>
    </>
  );
}
