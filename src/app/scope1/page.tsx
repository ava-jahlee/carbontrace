import { Scope1Calculator } from "./Scope1Calculator";

export const metadata = {
  title: "Scope 1 계산기 — carbontrace",
  description: "IPCC 2006 GL · K-ETS 지침 기반 연료 연소 배출량 산정. 모든 값이 근거를 달고 다닌다.",
};

export default function Scope1Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <a href="/" className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
          carbontrace
        </a>
        <span className="text-neutral-400">/</span>
        <span className="text-neutral-800 dark:text-neutral-200">Scope 1</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Scope 1 · 연료 연소 직접 배출</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        1A. 에너지 › 1A4. 기타 · 고정연소.  IPCC 2006 GL & 온실가스 배출권거래제 지침.
      </p>

      <Scope1Calculator />
    </main>
  );
}
