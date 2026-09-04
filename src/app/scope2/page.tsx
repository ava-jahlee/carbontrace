import { Scope2Calculator } from "./Scope2Calculator";

export const metadata = {
  title: "Scope 2 계산기 — carbontrace",
  description: "외부 공급 전기·열에 의한 간접 배출량 산정. GIR 승인 전력배출계수 · KDHC 지역별 열 배출계수.",
};

export default function Scope2Page() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-2 flex items-center gap-2 text-xs">
        <a href="/" className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200">
          carbontrace
        </a>
        <span className="text-neutral-400">/</span>
        <span className="text-neutral-800 dark:text-neutral-200">Scope 2</span>
      </div>
      <h1 className="text-3xl font-bold tracking-tight">Scope 2 · 외부 공급 전기·열 간접 배출</h1>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
        전력 (GIR 승인 배출계수) · 지역난방 열 (KDHC 지사별 · K-ETS 계획기간 3기/4기).
      </p>

      <Scope2Calculator />
    </main>
  );
}
