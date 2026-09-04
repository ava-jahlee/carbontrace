import Link from "next/link";
import { TopNav } from "@/components/layout/TopNav";
import { DOCS, DOC_GROUPS } from "@/lib/docs/catalog";
import type { DocEntry, DocGroup } from "@/lib/docs/catalog";

export const metadata = {
  title: "Docs — carbontrace",
  description:
    "carbontrace 도구를 감사·확장·유지보수하기 위한 문서. 감사자용 walkthrough, 데이터 프로파일 상세, 개발자 가이드, 릴리스 노트.",
};

function DocCard({ entry }: { entry: DocEntry }) {
  return (
    <li className="bg-surface">
      <Link
        href={`/docs/${entry.slug}`}
        className="group block h-full p-6 transition-colors hover:bg-accent/[0.04]"
      >
        <div className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
          {entry.group}
        </div>
        <div className="mt-2 text-lg font-semibold tracking-tight text-text group-hover:text-ink">
          {entry.title}
        </div>
        <p className="mt-2 text-xs leading-relaxed text-text-muted">
          {entry.subtitle}
        </p>
      </Link>
    </li>
  );
}

function Group({ group }: { group: DocGroup }) {
  const meta = DOC_GROUPS[group];
  const items = DOCS.filter((d) => d.group === group);

  return (
    <section className="mt-12">
      <div className="mb-4 border-b border-border pb-3">
        <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
          {meta.kicker}
        </div>
        <h2 className="mt-1 text-lg font-semibold tracking-tight text-text">
          {meta.title}
        </h2>
        <p className="mt-1 text-xs text-text-muted">{meta.hint}</p>
      </div>
      <ul
        className="grid gap-px bg-border sm:grid-cols-2"
        style={{ border: "1px solid var(--border)" }}
      >
        {items.map((entry) => (
          <DocCard key={entry.slug} entry={entry} />
        ))}
      </ul>
    </section>
  );
}

export default function DocsPage() {
  return (
    <>
      <TopNav active="docs" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            docs · reference material
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Docs
          </h1>
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              carbontrace 를 감사 · 확장 · 유지보수하기 위한 문서 모음입니다.
            </p>
            <p className="text-text-dim">
              모든 문서는 markdown 원본이 GitHub 에 열려 있고 · 이 사이트 안에서 목차·본문·PDF 로 열람할 수 있습니다.
              각 페이지 우측 상단의 <span className="font-mono text-[11px]">PDF ↓</span> 버튼으로 브라우저 인쇄 대화상자를 열어 PDF 로 저장할 수 있습니다.
            </p>
          </div>
        </header>

        <Group group="audit" />
        <Group group="data" />
        <Group group="dev" />

        <footer className="mt-16 border-t border-border pt-4 text-xs text-text-dim">
          <p>
            문서의 오류·개선점은 →{" "}
            <a
              href="https://github.com/ava-jahlee/carbontrace/tree/main/docs"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              GitHub · docs/ ↗
            </a>{" "}
            에서 직접 수정 PR 을 열거나 · 각 페이지 하단의 "수정 제안" 링크를 이용하세요.
          </p>
        </footer>
      </main>
    </>
  );
}
