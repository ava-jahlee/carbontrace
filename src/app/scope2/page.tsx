import { Scope2Calculator } from "./Scope2Calculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Scope 2 계산기 — carbontrace",
  description:
    "외부 공급 전기와 열에 따른 간접 배출량 산정. GIR 승인 전력배출계수와 KDHC 지역별 열 배출계수를 그대로 사용합니다.",
};

export default function Scope2Page() {
  return (
    <CornerMetaFrame bl="purchased_energy · elec + heat" br="GIR · KDHC">
      <TopNav active="scope2" meta="scope_2 / purchased_energy" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            indirect emissions · purchased energy
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Scope 2 <span className="text-accent">·</span> 전력 · 열
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              외부에서 사 온 전기와 열 (지역난방) 에서 나온 간접 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              전력은 GIR 승인 배출계수, 지역난방 열은 KDHC 지사별 값과 K-ETS 계획기간 3·4기 값을 사용합니다.
            </p>
          </div>
        </header>

        <Scope2Calculator />
      </main>
    </CornerMetaFrame>
  );
}
