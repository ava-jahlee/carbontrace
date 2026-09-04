import { TopNav } from "@/components/layout/TopNav";
import { InventoryView } from "./InventoryView";

export const metadata = {
  title: "인벤토리 — carbontrace",
  description:
    "여러 계산 결과를 누적해서 사업장 전체 총합을 뽑는 목록. 항목 단위로 편집 · 삭제 · JSON 내보내기가 가능하고 각 항목은 계산 시점의 근거를 그대로 보존합니다.",
};

export default function InventoryPage() {
  return (
    <>
      <TopNav active="inventory" meta="inventory / items" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            inventory · items · total
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            배출 인벤토리
          </h1>
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              계산기에서 나온 결과를 여기에 하나씩 담으면 사업장 전체 총합이 자동으로 계산됩니다.
            </p>
            <p className="text-text-dim">
              각 항목은 계산 시점의 <span className="font-medium text-text">사용자 입력 · 계수 근거 · 시설 등급</span> 을 함께
              보존합니다. 나중에 감사자가 특정 값의 출처를 물어보면 항목을 열어 그대로 보여줄 수 있습니다.
              데이터는 브라우저 로컬에만 저장되며 · JSON 내보내기로 백업할 수 있습니다.
            </p>
          </div>
        </header>

        <div className="mt-12">
          <InventoryView />
        </div>
      </main>
    </>
  );
}
