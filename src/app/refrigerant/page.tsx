import { RefrigerantCalculator } from "./RefrigerantCalculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";

export const metadata = {
  title: "냉매 · F-gas 계산기 — carbontrace",
  description: "Scope 1 fugitive · IPCC 2006 Vol.3 Ch.7 · HFC · SF6 · NF3 유출 배출량 산정.",
};

export default function RefrigerantPage() {
  return (
    <CornerMetaFrame
      tl="carbontrace"
      tr="v0.4"
      bl="fugitive · 1B · f-gas"
      br="IPCC 2006 Vol.3 · AR6 SM.7"
    >
      <main className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:px-10 md:px-12">
        <div className="mb-4 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <a href="/" className="hover:text-ink">carbontrace</a>
          <span className="text-text-dim">/</span>
          <span className="text-ink-dim">refrigerant</span>
        </div>

        <header className="border-b border-border pb-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            III · direct · fugitive
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">
            냉매 · F-gas · Scope 1 fugitive
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            건물 냉방·냉장 설비에서 새어 나온 냉매의 배출량을 산정합니다. IPCC 2006 Vol.3 Ch.7 Tier 1a screening 방법입니다.
          </p>
        </header>

        <RefrigerantCalculator />
      </main>
    </CornerMetaFrame>
  );
}
