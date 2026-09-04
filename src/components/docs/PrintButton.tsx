"use client";

/**
 * PDF 로 저장 · 브라우저 인쇄 대화상자 호출.
 *
 * @media print CSS 가 · nav · sticky TOC · footer 를 숨긴다.
 * 사용자는 "PDF 로 저장" 을 destination 으로 선택해 저장하면 된다.
 */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text-muted hover:text-accent"
      title="브라우저 인쇄로 PDF 저장"
    >
      <span>PDF ↓</span>
    </button>
  );
}
