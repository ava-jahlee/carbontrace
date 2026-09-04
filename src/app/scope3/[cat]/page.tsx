import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TopNav } from "@/components/layout/TopNav";
import { SCOPE3_CATEGORIES, getScope3Category } from "@/data/scope3";
import type { Metadata } from "next";

export function generateStaticParams() {
  return SCOPE3_CATEGORIES.map((c) => ({ cat: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const category = getScope3Category(cat);
  if (!category) return { title: "Scope 3 카테고리 없음 — carbontrace" };
  return {
    title: `Scope 3 · Cat ${category.number} · ${category.nameKo} — carbontrace`,
    description: category.definition,
  };
}

export default async function Scope3CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const category = getScope3Category(cat);
  if (!category) notFound();

  const catNumStr = String(category.number).padStart(2, "0");

  return (
    <>
      <TopNav active="scope3" meta={`scope_3 / cat_${catNumStr}`} />

      <main className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        {/* 상단 · 뒤로 가기 */}
        <div className="mb-6">
          <Link
            href="/scope3"
            className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent"
          >
            ← scope 3 · 15 categories
          </Link>
        </div>

        {/* 헤더 */}
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            scope_3 · cat_{catNumStr} · {category.direction}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
            <span className="text-accent">Cat {catNumStr}</span> · {category.nameKo}
          </h1>
          <div className="mt-2 font-mono text-xs tracking-wide text-text-dim">
            {category.nameEn}
          </div>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">{category.definition}</p>
            {category.buildingContext && (
              <p className="text-text-dim">{category.buildingContext}</p>
            )}
          </div>
        </header>

        {/* 준비 중 안내 */}
        <div className="mt-8 rounded-md border border-pending/40 bg-pending-bg/50 p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-pending">
            ● {category.status} · 계산기 준비 중
          </div>
          <p className="mt-2 text-xs text-text-muted">
            이 카테고리는 정의 · 방법론 목록 · 원문서만 정리된 상태입니다. 실제 계산 엔진은 아직 구현되지 않았습니다.
          </p>
          {category.note && (
            <p className="mt-2 text-xs text-text-muted">
              <span className="font-mono uppercase tracking-widest text-text-dim">note · </span>
              {category.note}
            </p>
          )}
        </div>

        {/* 대표 활동 */}
        <div className="mt-12">
          <SectionHeader title="대표 배출 활동" hint="typical activities" />
          <ul className="mt-4 space-y-1.5 text-sm">
            {category.activities.map((activity, i) => (
              <li
                key={i}
                className="grid grid-cols-[1.5rem_1fr] items-baseline gap-x-3"
              >
                <span className="font-mono text-[10px] tabular-nums text-text-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-text-muted">{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 방법론 목록 */}
        <div className="mt-12">
          <SectionHeader
            title={`방법론 · ${category.methodologies.length} methods`}
            hint="GHG Protocol 순서 · 상단이 더 정밀"
          />
          <ul className="mt-4 divide-y divide-border rounded-md border border-border bg-surface">
            {category.methodologies.map((m) => (
              <li key={m.key} className="p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] tabular-nums text-text-dim">
                      rank {m.precisionRank}
                    </span>
                    <span className="text-sm font-medium text-text">{m.label}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-pending">
                    <span className="h-1.5 w-1.5 rounded-full bg-pending" />
                    {m.status}
                  </span>
                </div>
                <div className="mt-1 ml-[3.75rem] text-xs text-text-muted">{m.hint}</div>
                <div className="mt-2 ml-[3.75rem] font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  src · {m.primarySource.doc}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 원문서 */}
        <div className="mt-12">
          <SectionHeader title="원문서" hint="primary source" />
          <div className="mt-4 rounded-md border border-border bg-surface p-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
              {category.primarySource.kind} · {category.primarySource.docId}
            </div>
            <div className="mt-1 text-sm font-medium text-text">
              {category.primarySource.doc}
            </div>
            <div className="mt-0.5 text-xs text-text-muted">
              {category.primarySource.publisher}
            </div>
            {category.primarySource.edition && (
              <div className="mt-0.5 text-xs text-text-dim">
                {category.primarySource.edition}
              </div>
            )}
            {category.primarySource.url && (
              <a
                href={category.primarySource.url}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-xs text-accent underline decoration-dotted underline-offset-4 hover:text-accent"
              >
                원문 열기 ↗
              </a>
            )}
          </div>

          {category.additionalSources && category.additionalSources.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                참조 자료
              </div>
              {category.additionalSources.map((s) => (
                <div key={s.docId} className="rounded-md border border-border bg-surface p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
                    {s.kind} · {s.docId}
                  </div>
                  <div className="mt-0.5 text-sm text-text">{s.doc}</div>
                  <div className="text-xs text-text-muted">
                    {s.publisher} {s.edition && `· ${s.edition}`}
                  </div>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-xs text-accent underline decoration-dotted underline-offset-4"
                    >
                      원문 열기 ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
