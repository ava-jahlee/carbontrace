import Link from "next/link";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";

/**
 * 랜딩 페이지.
 *
 * workspace DESIGN.md · REFERENCES.md 준수:
 * - archivio-uno 계열 카달로그 감성 · 코너 메타
 * - Roman numerals 로 카탈로그 아이템 나열
 * - IBM Plex 3종 폰트 · ivory 톤 · 라이트 우선
 * - "one decision, one screen" — 카달로그 항목은 균등하되 4개로 절제
 */

interface CatalogItem {
  numeral: string;
  href: string;
  title: string;
  subtitle: string;
  detail: string;
  tag: string;   // mono 태그 (예: "scope_1 · fuel_combustion")
}

const CATALOG: CatalogItem[] = [
  {
    numeral: "I",
    href: "/scope1",
    title: "Scope 1 · 연료 연소",
    subtitle: "Fuel combustion · direct emissions",
    detail: "63 연료 · T1/T2/T3 · GWP 4판 · 3 데이터 프로파일",
    tag: "scope_1 / stationary / 1A4",
  },
  {
    numeral: "II",
    href: "/scope2",
    title: "Scope 2 · 전력·열",
    subtitle: "Purchased electricity & heat",
    detail: "GIR 전력 배출계수 · KDHC 8지사 3·4기 · 국가 통합 3종",
    tag: "scope_2 / purchased_energy",
  },
  {
    numeral: "III",
    href: "/refrigerant",
    title: "냉매 · F-gas",
    subtitle: "Refrigerant leakage · fugitive",
    detail: "HFC 5 · blend 3 · SF6 · NF3 · GWP SAR/AR4/AR5/AR6",
    tag: "scope_1 / fugitive / 1B",
  },
  {
    numeral: "IV",
    href: "/roadmap",
    title: "확장 로드맵",
    subtitle: "Scope 3 · IPPU · future scope",
    detail: "GHG Protocol 15 카테고리 · IPPU 5 · PCAF · GLEC",
    tag: "roadmap / planned",
  },
];

export default function Home() {
  return (
    <CornerMetaFrame
      tl="carbontrace"
      tr="v0.4"
      bl="ivory · plex · muted"
      br="vitest · 137/137 pass"
    >
      <main className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:px-10 md:px-12 lg:px-16">
        {/* ─── 헤드 ─── */}
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            auditable ghg ledger · KR
          </div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-text sm:text-6xl">
            carbontrace
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            온실가스 배출량 산정 도구.{" "}
            <span className="text-text">모든 숫자가 근거를 달고 다닌다.</span>
          </p>
        </header>

        {/* ─── 원칙 ─── */}
        <section className="mt-12 grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-x-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            0 / principle
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-text-muted">
            <p>
              IPCC 2006 GL · K-ETS 지침에 기반한 계산 엔진이지만, 이 도구의 진짜 지향은{" "}
              <span className="font-medium text-text">감사 가능성 (auditability)</span> 에 있다.
            </p>
            <p>
              결과 값 옆의{" "}
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border-strong font-mono text-[9px] text-text-muted">
                i
              </span>{" "}
              를 누르면, 그 값이 어떤 수식에서 어떤 계수를 대입해 나왔는지, 그리고 각 계수가{" "}
              <span className="text-text">어느 원문서 (IPCC PDF · GIR 공식자료 · K-ETS 지침)</span>{" "}
              에서 왔는지가 열린다. 링크를 눌러 원문서로 바로 이동해 값을 재확인할 수 있다. 파생값은 다시 파고들 수 있어, 엑셀 셀 클릭 감사성을 웹에서 재현한다.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
              [verified] · [documented] · [asserted] · [pending]
            </p>
          </div>
        </section>

        {/* ─── 카탈로그 (좌: 로마 숫자 · 우: 항목) ─── */}
        <section className="mt-16">
          <div className="mb-4 flex items-baseline justify-between border-b border-border pb-2">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              catalog · 4 items
            </h2>
            <span className="font-mono text-[10px] text-text-dim">select one</span>
          </div>
          <ul className="divide-y divide-border">
            {CATALOG.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-6 py-6 transition-colors hover:bg-surface-2/50"
                >
                  <span className="font-mono text-xl font-medium text-ink-dim tabular-nums group-hover:text-ink">
                    {item.numeral}
                  </span>
                  <div>
                    <div className="text-xl font-semibold text-text group-hover:text-ink">
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-xs text-text-muted">{item.subtitle}</div>
                    <div className="mt-2 text-sm text-text-muted">{item.detail}</div>
                    <div className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                      {item.tag}
                    </div>
                  </div>
                  <span className="font-mono text-sm text-text-dim group-hover:text-ink">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── 감사자 · 개발자 진입 (secondary) ─── */}
        <section className="mt-16 grid gap-8 sm:grid-cols-[auto_1fr]">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            V / docs
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://github.com/ava-jahlee/carbontrace/blob/main/docs/AUDIT-GUIDE.md"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-baseline gap-2 text-text hover:text-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-ink-dim">
                  audit
                </span>
                <span className="underline decoration-dotted underline-offset-4">감사자용 walkthrough</span>
                <span className="text-text-dim">↗</span>
              </a>
              <div className="mt-0.5 ml-14 text-xs text-text-muted">
                제3자 검증기관·심사원이 특정 값을 원문서까지 역추적하는 표준 5단계
              </div>
            </li>
            <li>
              <a
                href="https://github.com/ava-jahlee/carbontrace/blob/main/docs/DEVELOPMENT.md"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-baseline gap-2 text-text hover:text-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-ink-dim">
                  dev
                </span>
                <span className="underline decoration-dotted underline-offset-4">개발자 가이드</span>
                <span className="text-text-dim">↗</span>
              </a>
              <div className="mt-0.5 ml-14 text-xs text-text-muted">
                신규 배출원·데이터 프로파일 추가 5단계
              </div>
            </li>
            <li>
              <a
                href="https://github.com/ava-jahlee/carbontrace/blob/main/docs/PRIMARY-SOURCE-NOTE-STANDARD.md"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-baseline gap-2 text-text hover:text-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-ink-dim">
                  data
                </span>
                <span className="underline decoration-dotted underline-offset-4">Primary source note 표준</span>
                <span className="text-text-dim">↗</span>
              </a>
              <div className="mt-0.5 ml-14 text-xs text-text-muted">
                note 필드 작성 규칙 · muted · 사실 · 마침표
              </div>
            </li>
            <li>
              <a
                href="https://github.com/ava-jahlee/carbontrace"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-baseline gap-2 text-text hover:text-ink"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim group-hover:text-ink-dim">
                  repo
                </span>
                <span className="underline decoration-dotted underline-offset-4">GitHub · ava-jahlee/carbontrace</span>
                <span className="text-text-dim">↗</span>
              </a>
            </li>
          </ul>
        </section>

        {/* ─── 푸터 · sources ─── */}
        <footer className="mt-20 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-text-dim">
          <div>src · GHGCalc_V0m_lja.xlsm</div>
          <div className="mt-1">parity · vitest 137/137 pass</div>
          <div className="mt-1">v0.4 · 2026-09-04</div>
        </footer>
      </main>
    </CornerMetaFrame>
  );
}
