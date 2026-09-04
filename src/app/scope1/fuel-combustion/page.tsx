import Link from "next/link";
import { Scope1Calculator } from "./Scope1Calculator";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Scope 1 · 연료 연소 — carbontrace",
  description:
    "IPCC 2006 GL 과 K-ETS 지침을 그대로 따르는 연료 연소 배출량 산정. 모든 수치에는 근거가 필요합니다.",
};

export default function FuelCombustionPage() {
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
            scope_1 · direct emissions · stationary
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            연료 연소 <span className="text-accent">·</span> Fuel combustion
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

        {/* 페이지 footer · 이슈 제안 채널 */}
        <footer className="mt-16 border-t border-border pt-4 text-xs text-text-dim">
          <p>
            값 · 방법론에 이상이 있으면 →{" "}
            <a
              href="https://github.com/ava-jahlee/carbontrace/issues/new?labels=user-feedback&title=%5B%EC%97%B0%EB%A3%8C%EC%97%B0%EC%86%8C%5D+"
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
