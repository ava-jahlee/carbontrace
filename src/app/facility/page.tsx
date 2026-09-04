import { TopNav } from "@/components/layout/TopNav";
import { FacilityForm } from "./FacilityForm";
import { FIXED_IPCC_CATEGORY } from "@/data/facility";

export const metadata = {
  title: "시설 등록 — carbontrace",
  description:
    "사업장 이름 · 용도 · 연간 GHG 배출량을 입력하면 K-ETS 별표 5 등급과 각 계수의 최소 Tier 를 자동 산정합니다. 이 정보는 브라우저에만 저장됩니다.",
};

export default function FacilityPage() {
  return (
    <>
      <TopNav active="facility" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            시설 등록
          </h1>
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              계산 시작 전에 사업장 정보를 먼저 등록합니다.
            </p>
            <p className="text-text-dim">
              세 가지를 입력하면{" "}
              <span className="font-medium text-accent">K-ETS 별표 5 등급 (A · B · C)</span> 과{" "}
              <span className="font-medium text-accent">각 계수의 최소 Tier</span> 가 자동 산정되고 ·
              이후 계산기에서 선택 가능한 Tier 를 규정합니다.
              IPCC 카테고리는{" "}
              <span className="font-mono text-text-muted">{FIXED_IPCC_CATEGORY.sector}</span> ·{" "}
              <span className="font-mono text-text-muted">{FIXED_IPCC_CATEGORY.subSector}</span> 로 고정입니다.
            </p>
            <p className="text-text-dim">
              입력값은 <span className="font-medium text-text">브라우저 로컬 저장소</span> 에만 저장됩니다.
            </p>
          </div>
        </header>

        <div className="mt-12">
          <FacilityForm />
        </div>

        <footer className="mt-16 border-t border-border pt-4 text-xs text-text-dim">
          <p>
            등급 기준·최소 Tier 정의는 K-ETS 별표 5 · 별표 6 을 따릅니다. 세부 근거는{" "}
            <a
              href="/docs/audit-guide"
              className="underline decoration-dotted underline-offset-4 hover:text-accent"
            >
              감사자용 walkthrough
            </a>
            {" "}참조.
          </p>
        </footer>
      </main>
    </>
  );
}
