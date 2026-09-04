import { RefrigerantCalculator } from "./RefrigerantCalculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "냉매 · F-gas 계산기 — carbontrace",
  description:
    "Scope 1 fugitive · IPCC 2006 Vol.3 Ch.7 를 그대로 따르는 HFC · SF6 · NF3 유출 배출량 산정.",
};

export default function RefrigerantPage() {
  return (
    <CornerMetaFrame bl="fugitive · 1B · f-gas" br="IPCC 2006 Vol.3 · AR6 SM.7">
      <TopNav active="refrigerant" meta="scope_1 / fugitive" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            direct emissions · fugitive
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            냉매 <span className="text-accent">·</span> F-gas
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              건물 냉방·냉장 설비에서 새어 나온 냉매의 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              IPCC 2006 Vol.3 Ch.7 · Tier 1a screening 방법을 따릅니다.
            </p>
          </div>
        </header>

        <RefrigerantCalculator />
      </main>
    </CornerMetaFrame>
  );
}
