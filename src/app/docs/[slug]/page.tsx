import { notFound } from "next/navigation";
import { DocLayout } from "@/components/docs/DocLayout";
import { DOCS, findDoc } from "@/lib/docs/catalog";
import { loadDoc, extractToc, extractTitle } from "@/lib/docs/loader";

/**
 * 정적 생성 · 카탈로그의 모든 slug.
 */
export function generateStaticParams() {
  return DOCS.map((d) => ({ slug: d.slug }));
}

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const entry = findDoc(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — carbontrace docs`,
    description: entry.subtitle,
  };
}

export default async function DocPage({ params }: Params) {
  const { slug } = await params;
  const entry = findDoc(slug);
  if (!entry) notFound();

  const source = loadDoc(entry.file);
  const title = extractTitle(source) ?? entry.title;
  const toc = extractToc(source);

  // 본문 상단에 h1 이 이미 있으면 <DocLayout /> 이 별도 렌더하므로
  // markdown 본문에서 h1 라인은 제거해 중복을 피한다.
  const bodyWithoutTitle = source.replace(/^#\s+.+\n?/m, "").trimStart();

  return (
    <DocLayout
      entry={entry}
      source={bodyWithoutTitle}
      title={title}
      toc={toc}
    />
  );
}
