/**
 * Markdown 로더 + TOC 추출.
 *
 * Node 서버 컴포넌트에서만 호출 (fs 사용).
 * 파일은 프로젝트 루트의 docs/ 폴더에서 읽는다.
 */

import fs from "node:fs";
import path from "node:path";

export interface TocItem {
  /** heading text (raw) */
  text: string;
  /** heading level · 2 or 3 (h1 은 제목이므로 제외) */
  level: 2 | 3;
  /** anchor id · rehype-slug 와 동일 규칙으로 생성 */
  id: string;
}

/**
 * 프로젝트 루트 기준 docs/{file} 읽기.
 * 파일이 없으면 throw.
 */
export function loadDoc(file: string): string {
  const p = path.join(process.cwd(), "docs", file);
  return fs.readFileSync(p, "utf-8");
}

/**
 * markdown 원문에서 h1 (첫 번째) 을 페이지 제목으로 추출.
 * 없으면 null.
 */
export function extractTitle(md: string): string | null {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

/**
 * h2 · h3 만 뽑아 TOC 로 만든다.
 * anchor id 규칙 · rehype-slug 의 github slugger 와 호환되게 정규화.
 */
export function extractToc(md: string): TocItem[] {
  const lines = md.split(/\r?\n/);
  const items: TocItem[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    // ``` fence · code block 안의 # 는 heading 아님
    if (/^```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const h2 = line.match(/^##\s+(.+?)\s*$/);
    const h3 = line.match(/^###\s+(.+?)\s*$/);
    if (h2) {
      const text = h2[1].trim();
      items.push({ text, level: 2, id: slugify(text) });
    } else if (h3) {
      const text = h3[1].trim();
      items.push({ text, level: 3, id: slugify(text) });
    }
  }
  return items;
}

/**
 * rehype-slug (github-slugger) 와 호환되는 slug 생성.
 * - 소문자
 * - 공백·`-` 는 `-` 로
 * - 영문·숫자·한글·`_-` 만 남김
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-")
    // 제거 대상: 한글·영문·숫자·`_`·`-` 이외
    .replace(/[^\p{L}\p{N}_-]/gu, "")
    // 연속 `-` 정리
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
