"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

interface MarkdownRendererProps {
  source: string;
}

/**
 * <MarkdownRenderer /> — docs/*.md 를 카본트레이스 시각 시스템으로 렌더.
 *
 * 특징:
 * - github-flavored (표·체크박스·strikethrough)
 * - heading 에 id 자동 부여 (rehype-slug) + 클릭 시 anchor 이동 (rehype-autolink)
 * - Tailwind Typography 대신 명시 스타일 · ivory-warm 팔레트에 맞춤
 */
export function MarkdownRenderer({ source }: MarkdownRendererProps) {
  return (
    <div className="doc-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
                ariaLabel: "이 섹션으로 이동",
              },
            },
          ],
        ]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
