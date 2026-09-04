import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { PrintButton } from "./PrintButton";
import type { TocItem } from "@/lib/docs/loader";
import type { DocEntry } from "@/lib/docs/catalog";
import { DOC_GROUPS } from "@/lib/docs/catalog";

interface DocLayoutProps {
  entry: DocEntry;
  source: string;
  title: string;
  toc: TocItem[];
}

/**
 * <DocLayout /> · /docs/{slug} 개별 페이지 프레임.
 *
 * 구성 · 2 컬럼 grid
 *  - 좌측 (240px · sticky) · breadcrumb + TOC
 *  - 우측 (본문) · 상단 헤더 (kicker · title · PDF 버튼) + markdown
 *
 * TopNav 는 언제나 상단.
 * `data-print="hide"` 로 nav · TOC 는 인쇄 시 숨김.
 */
export function DocLayout({ entry, source, title, toc }: DocLayoutProps) {
  const group = DOC_GROUPS[entry.group];

  return (
    <>
      <div data-print="hide">
        <TopNav active="docs" meta={`docs / ${entry.group}`} />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:px-10 md:px-12">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          {/* 좌측 · sticky nav (인쇄 시 숨김) */}
          <aside
            data-print="hide"
            className="md:sticky md:top-8 md:self-start md:max-h-[calc(100vh-4rem)] md:overflow-y-auto"
          >
            <Link
              href="/docs"
              className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent"
            >
              ← docs
            </Link>

            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-accent-soft">
              {group.kicker}
            </div>

            {toc.length > 0 && (
              <nav className="mt-6 border-t border-border pt-4 text-sm">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                  contents
                </div>
                <ul className="space-y-1.5">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={item.level === 3 ? "ml-3" : ""}
                    >
                      <a
                        href={`#${item.id}`}
                        className={
                          item.level === 2
                            ? "text-text-muted hover:text-accent"
                            : "text-xs text-text-dim hover:text-accent"
                        }
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          {/* 우측 · 본문 */}
          <div>
            <header className="border-b border-border pb-6">
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
                  {group.kicker}
                </div>
                <div data-print="hide">
                  <PrintButton />
                </div>
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-sm text-text-muted">{entry.subtitle}</p>
            </header>

            <article className="mt-10">
              <MarkdownRenderer source={source} />
            </article>

            <footer
              data-print="hide"
              className="mt-16 border-t border-border pt-4 text-xs text-text-dim"
            >
              <p>
                이 문서에 오류·개선점이 있다면 →{" "}
                <a
                  href={`https://github.com/ava-jahlee/carbontrace/edit/main/docs/${entry.file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-dotted underline-offset-4 hover:text-accent"
                >
                  GitHub 에서 수정 제안 ↗
                </a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
