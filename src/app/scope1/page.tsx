import { Scope1Calculator } from "./Scope1Calculator";
import { CornerMetaFrame } from "@/components/layout/CornerMeta";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Scope 1 계산기 — carbontrace",
  description:
    "IPCC 2006 GL 과 K-ETS 지침을 그대로 따르는 연료 연소 배출량 산정. 모든 수치에는 근거가 필요합니다.",
};

export default function Scope1Page() {
  return (
    <CornerMetaFrame bl="fuel_combustion · 1A4" br="IPCC 2006 · K-ETS">
      <TopNav active="scope1" meta="scope_1 / stationary" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        {/* 헤드 · Mara 계열 큰 sans + terracotta accent */}
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            direct emissions · stationary
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Scope 1 <span className="text-accent">·</span> 연료 연소
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              건물 안에서 태우는 연료 (도시가스·경유·LPG 등) 에서 나온 직접 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              IPCC 2006 Vol.2 Ch.2 · K-ETS 별표 12 를 따릅니다. 분류상 1A4 · 기타 (고정연소) 에 해당합니다.
            </p>
          </div>
        </header>

        <Scope1Calculator />
      </main>
    </CornerMetaFrame>
  );
}
