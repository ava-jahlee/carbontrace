/**
 * <CornerMeta /> — archivio-uno 계열 코너 메타 시스템.
 *
 * 화면 네 귀퉁이에 작은 mono 라벨로 컨텍스트 표시.
 * (workspace DESIGN.md 4.1)
 *
 * 각 코너는 선택. 값이 없으면 렌더 X.
 * 페이지 상단에 sticky top·bottom fixed 대신 relative wrapper 로 layout 안에 자연스럽게.
 */

interface CornerMetaProps {
  tl?: string;      // top-left  · 예: "carbontrace"
  tr?: string;      // top-right · 예: "v0.4"
  bl?: string;      // bottom-left · 예: "scope_1 / xlsm_original"
  br?: string;      // bottom-right · 예: "137/137 pass"
  children: React.ReactNode;
}

/**
 * 페이지 컨테이너. 4 코너에 mono 라벨을 fixed 로 배치.
 */
export function CornerMetaFrame({ tl, tr, bl, br, children }: CornerMetaProps) {
  return (
    <>
      {tl && (
        <div className="pointer-events-none fixed left-4 top-3 z-20 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {tl}
        </div>
      )}
      {tr && (
        <div className="pointer-events-none fixed right-4 top-3 z-20 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {tr}
        </div>
      )}
      {bl && (
        <div className="pointer-events-none fixed left-4 bottom-3 z-20 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {bl}
        </div>
      )}
      {br && (
        <div className="pointer-events-none fixed right-4 bottom-3 z-20 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {br}
        </div>
      )}
      {children}
    </>
  );
}
