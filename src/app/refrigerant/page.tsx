import { RefrigerantCalculator } from "./RefrigerantCalculator";

export const metadata = {
  title: "냉매 · F-gas 계산기 — carbontrace",
  description: "Scope 1 fugitive · IPCC 2006 Vol.3 Ch.7 · HFC · SF6 · NF3 유출 배출량 산정.",
};

export default function RefrigerantPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <a href="/" className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
          carbontrace
        </a>
        <span className="text-neutral-400">/</span>
        <span className="text-neutral-800 dark:text-neutral-200">냉매 · F-gas</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">냉매 · F-gas · Scope 1 fugitive</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        IPCC 2006 Vol.3 Ch.7 · Tier 1a screening. 건물 냉방/냉장 설비에서 발생하는 냉매 유출 배출량.
      </p>

      <RefrigerantCalculator />
    </main>
  );
}
