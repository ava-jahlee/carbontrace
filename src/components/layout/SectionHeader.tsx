/**
 * <SectionHeader /> — Roman numerals 섹션 헤더.
 *
 * mara / Field Studies Flora 계열 미학.
 * (workspace DESIGN.md 4.3)
 *
 * 예:
 *   <SectionHeader numeral="I" title="입력" hint="control panel" />
 */

interface SectionHeaderProps {
  numeral: string;   // "I" · "II" · "III" · "IV"
  title: string;     // 섹션 제목 (한국어)
  hint?: string;     // 부가 힌트 (mono 소문자 · 예: "control panel")
}

export function SectionHeader({ numeral, title, hint }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline gap-3 border-b border-border pb-1.5">
      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-dim">
        {numeral}
      </span>
      <h2 className="text-sm font-semibold text-text">
        {title}
      </h2>
      {hint && (
        <span className="font-mono text-[10px] lowercase tracking-wider text-text-dim">
          / {hint}
        </span>
      )}
    </div>
  );
}
