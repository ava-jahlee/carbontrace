/**
 * <SectionHeader /> — 담담한 섹션 헤더.
 *
 * 목업 B (Mara + Daniel Blue) 준수:
 * - Roman numerals 도배 안 함 (numeral prop 은 optional · 특별한 경우만)
 * - title + hint (mono 소문자) 조합
 * - border-bottom 얇게
 *
 * 예:
 *   <SectionHeader title="입력" hint="control panel" />
 *   <SectionHeader title="결과" hint="total emission" />
 */

interface SectionHeaderProps {
  /** 섹션 제목 (한국어) */
  title: string;
  /** 부가 힌트 (mono 소문자 · 예: "control panel") */
  hint?: string;
  /** Roman numeral (선택 · 대부분 사용 X · 랜딩 카달로그 나열 정도) */
  numeral?: string;
}

export function SectionHeader({ title, hint, numeral }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-1.5">
      {numeral && (
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
          {numeral}
        </span>
      )}
      <h2 className="text-sm font-semibold text-text">{title}</h2>
      {hint && (
        <span className="font-mono text-[10px] lowercase tracking-wider text-text-dim">
          / {hint}
        </span>
      )}
    </div>
  );
}
