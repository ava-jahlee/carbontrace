import { Scope2Calculator } from "./Scope2Calculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";

export const metadata = {
  title: "Scope 2 계산기 — carbontrace",
  description: "외부 공급 전기·열에 의한 간접 배출량 산정. GIR 승인 전력배출계수 · KDHC 지역별 열 배출계수.",
};

export default function Scope2Page() {
  return (
    <CornerMetaFrame
      tl="carbontrace"
      tr="v0.4"
      bl="purchased_energy · elec + heat"
      br="GIR · KDHC"
    >
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:px-10 md:px-12">
        <div className="mb-4 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <a href="/" className="hover:text-ink">carbontrace</a>
          <span className="text-text-dim">/</span>
          <span className="text-ink-dim">scope_2</span>
        </div>

        <header className="border-b border-border pb-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            II · indirect · purchased energy
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
            Scope 2 · 외부 공급 전기·열
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            전력은 GIR 승인 배출계수, 지역난방 열은 KDHC 지사별 값과 K-ETS 계획기간 3기·4기 값을 사용합니다.
          </p>
        </header>

        <Scope2Calculator />
      </main>
    </CornerMetaFrame>
  );
}
