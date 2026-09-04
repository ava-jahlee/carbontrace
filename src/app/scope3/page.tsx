import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TopNav } from "@/components/layout/TopNav";
import { getScope3CategoriesByDirection, type Scope3Category } from "@/data/scope3";

export const metadata = {
  title: "Scope 3 · 기타 간접 — carbontrace",
  description:
    "GHG Protocol Corporate Value Chain (Scope 3) Standard · 15 카테고리 · Upstream 1-8 · Downstream 9-15.",
};

const upstream = getScope3CategoriesByDirection("upstream");
const downstream = getScope3CategoriesByDirection("downstream");

function CategoryCard({ cat }: { cat: Scope3Category }) {
  return (
    <Link
      href={`/scope3/${cat.id}`}
      className="group flex flex-col gap-2 border border-border bg-surface p-4 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
          cat {String(cat.number).padStart(2, "0")}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-pending">
          <span className="h-1.5 w-1.5 rounded-full bg-pending" />
          {cat.status}
        </span>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-text group-hover:text-accent">{cat.nameKo}</div>
        <div className="mt-0.5 font-mono text-[10px] tracking-wide text-text-dim">
          {cat.nameEn}
        </div>
        <div className="mt-2 text-xs leading-relaxed text-text-muted line-clamp-3">
          {cat.definition}
        </div>
      </div>
      <div className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
        {cat.methodologies.length} methods →
      </div>
    </Link>
  );
}

export default function Scope3Page() {
  return (
    <>
      <TopNav active="scope3" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            scope_3 · corporate value chain · 15 categories
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Scope 3 <span className="text-accent">·</span> 기타 간접
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              사업자가 소유·통제하지 않지만, 사업 활동의 결과로 발생한 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              GHG Protocol Corporate Value Chain (Scope 3) Standard (2011) 의 15 카테고리를 그대로 따릅니다. 국내 실무는 국립환경과학원 「Scope 3 온실가스 배출량 산정 및 보고 가이드라인 v1.0」 (2024.12) 을 참조합니다.
            </p>
          </div>
        </header>

        {/* 안내 · Scope 3 특성 */}
        <div className="mt-8 rounded-md border border-pending/40 bg-pending-bg/50 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-pending">
            v0.6 · scaffolded · 실제 계산기는 카테고리별로 순차 구현
          </div>
          <ul className="mt-2 space-y-1 text-xs text-text-muted">
            <li>
              · Scope 3 는 <strong className="text-text">방법 투명성</strong> 이 감사 가능성의 핵심. 각 카테고리마다 여러 방법론이 있고, 어느 것을 썼는지 결과와 함께 밝힙니다.
            </li>
            <li>
              · 방법론 우선 순위: 공급자 특정 데이터 → 활동 기반 (거리·연료) → 산업 평균 → 지출 기반. 하위로 갈수록 오차 큼.
            </li>
            <li>
              · Scope 1·2 정도의 정밀도는 원리상 어려움. Scope 3 는 <strong className="text-text">추정 규모</strong> 를 감사 가능하게 밝히는 게 목표.
            </li>
          </ul>
        </div>

        {/* Upstream */}
        <div className="mt-12">
          <SectionHeader title="Upstream · 상류 (1-8)" hint="공급망 · 조달 · 지원 활동" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {upstream.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>

        {/* Downstream */}
        <div className="mt-12">
          <SectionHeader title="Downstream · 하류 (9-15)" hint="판매 · 사용 · 폐기 · 투자" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {downstream.map((cat) => (
              <CategoryCard key={cat.id} cat={cat} />
            ))}
          </div>
        </div>

        {/* 원문서 카탈로그 */}
        <div className="mt-12 border-t border-border pt-8">
          <SectionHeader title="근본 원문서" hint="carbontrace 가 참조하는 primary source" />
          <ul className="mt-4 space-y-3 text-xs">
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                ghg-protocol · standard
              </div>
              <a
                href="https://ghgprotocol.org/corporate-value-chain-scope-3-standard"
                target="_blank"
                rel="noreferrer"
                className="text-text hover:text-accent underline decoration-dotted underline-offset-4"
              >
                Corporate Value Chain (Scope 3) Accounting and Reporting Standard (2011) ↗
              </a>
              <div className="mt-0.5 text-text-muted">
                WRI + WBCSD · Scope 3 15 카테고리 정의 · 요구사항 · 보고 형식
              </div>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                ghg-protocol · calc-guidance
              </div>
              <a
                href="https://ghgprotocol.org/scope-3-calculation-guidance-2"
                target="_blank"
                rel="noreferrer"
                className="text-text hover:text-accent underline decoration-dotted underline-offset-4"
              >
                Technical Guidance for Calculating Scope 3 Emissions v1.0 (2013) ↗
              </a>
              <div className="mt-0.5 text-text-muted">
                WRI + WBCSD + Carbon Trust · 15 카테고리 각각의 실무 계산 방법
              </div>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                nier · korean-guideline
              </div>
              <div className="text-text">
                Scope 3 온실가스 배출량 산정 및 보고 가이드라인 v1.0 (2024.12)
              </div>
              <div className="mt-0.5 text-text-muted">
                국립환경과학원 · NIER-GP2024-103 · 313p · GHG Protocol 3종 표준 기반 국내 지침
              </div>
            </li>
            <li>
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                pcaf · financial-industry
              </div>
              <a
                href="https://carbonaccountingfinancials.com/en/standard"
                target="_blank"
                rel="noreferrer"
                className="text-text hover:text-accent underline decoration-dotted underline-offset-4"
              >
                The Global GHG Accounting and Reporting Standard for the Financial Industry, 2nd ed. (2022) ↗
              </a>
              <div className="mt-0.5 text-text-muted">
                PCAF · Cat 15 Investments 전용 표준 · 6개 자산군별 방법론
              </div>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
