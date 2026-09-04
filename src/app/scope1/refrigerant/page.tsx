import Link from "next/link";
import { RefrigerantCalculator } from "./RefrigerantCalculator";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Scope 1 · 냉매 · F-gas — carbontrace",
  description:
    "Scope 1 fugitive · IPCC 2006 Vol.3 Ch.7 를 그대로 따르는 HFC · SF6 · NF3 유출 배출량 산정.",
};

export default function RefrigerantPage() {
  return (
    <>
      <TopNav active="scope1" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        {/* breadcrumb · scope 1 로 돌아가기 */}
        <div className="mb-6">
          <Link
            href="/scope1"
            className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-accent"
          >
            ← scope 1 · 하위 카테고리
          </Link>
        </div>

        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            scope_1 · direct emissions · fugitive
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            냉매 <span className="text-accent">·</span> F-gas
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              건물 냉방·냉장 설비에서 새어 나온 냉매의 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              IPCC 2006 Vol.3 Ch.7 · Tier 1a screening 방법을 따릅니다. 분류상 1B · fugitive 에 해당합니다.
            </p>
          </div>
        </header>

        <RefrigerantCalculator />

        {/* 페이지 footer · 이슈 제안 채널 */}
        <footer className="mt-16 border-t border-border pt-4 text-xs text-text-dim">
          <p>
            값 · 방법론에 이상이 있으면 →{" "}
            <a
              href="https://github.com/ava-jahlee/carbontrace/issues/new?labels=user-feedback&title=%5B%EB%83%89%EB%A7%A4%5D+"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              GitHub Issues 로 제안 ↗
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
