import Link from "next/link";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";
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
    title: "Scope 1 · 연료 연소",
    subtitle: "Fuel combustion · direct emissions",
    detail: "63 연료 · T1/T2/T3 · GWP 4판 · 3 데이터 프로파일",
    tag: "scope_1 / stationary / 1A4",
  },
  {
    href: "/scope2",
    title: "Scope 2 · 전력·열",
    subtitle: "Purchased electricity & heat",
    detail: "GIR 전력 배출계수 · KDHC 8지사 3·4기 · 국가 통합 3종",
    tag: "scope_2 / purchased_energy",
  },
  {
    href: "/refrigerant",
    title: "냉매 · F-gas",
    subtitle: "Refrigerant leakage · fugitive",
    detail: "HFC 5 · blend 3 · SF6 · NF3 · GWP SAR/AR4/AR5/AR6",
    tag: "scope_1 / fugitive / 1B",
  },
  {
    href: "/roadmap",
    title: "확장 로드맵",
    subtitle: "Scope 3 · IPPU · future scope",
    detail: "GHG Protocol 15 카테고리 · IPPU 5 · PCAF · GLEC",
    tag: "roadmap / planned",
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
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/DEVELOPMENT.md",
    tag: "dev",
    title: "개발자 가이드",
    hint: "신규 배출원·데이터 프로파일 추가 5단계",
  },
  {
    href: "https://github.com/ava-jahlee/carbontrace/blob/main/docs/PRIMARY-SOURCE-NOTE-STANDARD.md",
    tag: "data",
    title: "Primary source note 표준",
    hint: "note 필드 작성 규칙 · muted · 사실 · 마침표",
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
    <CornerMetaFrame bl="seoul · 37.5665° N 126.9780° E" br="vitest · 137/137 pass">
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

        {/* ─── 카탈로그 (2x2 그리드) ─── */}
        <section className="mt-24">
          <div className="mb-8 flex items-baseline justify-between border-b border-border-strong pb-3">
            <h2 className="text-base font-semibold text-text">Catalog</h2>
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-dim">
              4 items
            </span>
          </div>
          <ul className="grid gap-px bg-border sm:grid-cols-2" style={{ border: "1px solid var(--border)" }}>
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
          <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
            <h2 className="text-base font-semibold text-text">Docs</h2>
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-dim">
              audit · dev · data
            </span>
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

        {/* ─── 푸터 · sources ─── */}
        <footer className="mt-24 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-text-dim">
          <div>src · GHGCalc_V0m_lja.xlsm · parity 137/137</div>
          <div className="mt-1">v 0.4 · 2026-09-04</div>
        </footer>
      </main>
    </CornerMetaFrame>
  );
}
