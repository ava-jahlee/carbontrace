import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-6 inline-block rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] uppercase tracking-widest text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">
        v0.4 · Scope 1 + Scope 2 + Refrigerant + Roadmap
      </div>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        carbontrace
      </h1>
      <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
        온실가스 배출량 산정 도구.  <span className="text-neutral-800 dark:text-neutral-200">모든 숫자가 근거를 달고 다닌다.</span>
      </p>

      <section className="mt-10 space-y-4 text-neutral-700 dark:text-neutral-300">
        <p>
          IPCC 2006 GL · K-ETS 지침에 기반한 계산 엔진이지만,
          이 도구의 진짜 지향은 <b>감사 가능성 (auditability)</b> 에 있다.
        </p>
        <p>
          결과 값 옆의{" "}
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-[10px] text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            i
          </span>{" "}
          를 누르면, 그 값이 어떤 수식에서, 어떤 계수를 대입해 나왔는지,
          그리고 각 계수가 <b>어느 원문서 (IPCC PDF · GIR 공식자료 · K-ETS 지침 등)</b> 에서 왔는지가 열린다.
          링크를 눌러 원문서로 바로 이동해 값을 재확인할 수 있다.
          파생값은 다시 파고들 수 있어, 엑셀에서 셀을 클릭하면 수식이 보이는 감사성을 웹에서 그대로 재현한다.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/scope1"
          className="inline-flex items-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Scope 1 계산기 (연료 연소) →
        </Link>
        <Link
          href="/scope2"
          className="inline-flex items-center rounded-lg border border-neutral-900 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800"
        >
          Scope 2 계산기 (전기·열) →
        </Link>
        <Link
          href="/refrigerant"
          className="inline-flex items-center rounded-lg border border-neutral-900 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-100 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-800"
        >
          냉매 · F-gas →
        </Link>
        <Link
          href="/roadmap"
          className="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          로드맵 (Scope 3 · IPPU) →
        </Link>
        <a
          href="https://github.com/ava-jahlee/carbontrace/blob/main/docs/AUDIT-GUIDE.md"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border border-emerald-500 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900"
        >
          🔍 감사자용 walkthrough ↗
        </a>
        <a
          href="https://github.com/ava-jahlee/carbontrace"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border border-neutral-300 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          GitHub
        </a>
      </div>

      <footer className="mt-16 border-t border-neutral-200 pt-6 text-xs text-neutral-500 dark:border-neutral-800">
        원본: <code className="font-mono">GHGCalc_V0m_lja.xlsm</code> · 재현 신뢰: Vitest 파리티 137/137 PASS
      </footer>
    </main>
  );
}
