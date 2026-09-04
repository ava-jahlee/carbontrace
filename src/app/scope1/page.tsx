import { Scope1Calculator } from "./Scope1Calculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";

export const metadata = {
  title: "Scope 1 계산기 — carbontrace",
  description: "IPCC 2006 GL · K-ETS 지침 기반 연료 연소 배출량 산정. 모든 값이 근거를 달고 다닌다.",
};

export default function Scope1Page() {
  return (
    <CornerMetaFrame
      tl="carbontrace"
      tr="v0.4"
      bl="fuel_combustion · 1A4"
      br="IPCC 2006 · K-ETS"
    >
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:px-10 md:px-12">
        {/* breadcrumb · mono */}
        <div className="mb-4 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <a href="/" className="hover:text-ink">carbontrace</a>
          <span className="text-text-dim">/</span>
          <span className="text-ink-dim">scope_1</span>
        </div>

        {/* 헤드 */}
        <header className="border-b border-border pb-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            I · direct emissions
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
            Scope 1 · 연료 연소 직접 배출
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            1A. 에너지 › 1A4. 기타 · 고정연소. IPCC 2006 GL · 온실가스 배출권거래제 지침.
          </p>
        </header>

        <Scope1Calculator />
      </main>
    </CornerMetaFrame>
  );
}
