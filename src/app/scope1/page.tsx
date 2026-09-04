import Link from "next/link";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "Scope 1 · 직접 배출 — carbontrace",
  description:
    "사업자가 소유·통제하는 배출원에서 나온 직접 배출량. IPCC 카테고리 1A (연료 연소) · 1B (fugitive) 등.",
};

interface SubCategory {
  href: string;
  ipccCode: string;
  nameKo: string;
  nameEn: string;
  detail: string;
  status: "done" | "planned";
  source?: string;
}

const READY: SubCategory[] = [
  {
    href: "/scope1/fuel-combustion",
    ipccCode: "1A4",
    nameKo: "연료 연소",
    nameEn: "Fuel combustion · stationary",
    detail:
      "건물 안에서 태우는 도시가스 · 경유 · LPG 등. 우리 보일러 · 비상 발전기 · 주방 조리기구에서 나오는 배출.",
    status: "done",
    source: "IPCC 2006 Vol.2 Ch.2 · K-ETS 별표 12",
  },
  {
    href: "/scope1/refrigerant",
    ipccCode: "1B",
    nameKo: "냉매 · F-gas",
    nameEn: "Refrigerant leakage · fugitive",
    detail:
      "냉방 · 냉장 설비에서 세어 나오는 HFC · SF6 등. 우리 설비의 유출 배출.",
    status: "done",
    source: "IPCC 2006 Vol.3 Ch.7 · AR6 Table 7.SM.7",
  },
];

const PLANNED: SubCategory[] = [
  {
    href: "#",
    ipccCode: "1A2",
    nameKo: "산업 공정 · 부지 내 연료",
    nameEn: "Manufacturing industries & construction",
    detail: "부지 내에서 자재 (시멘트 · 철강 등) 를 직접 생산하며 태우는 연료. 지금은 미구현.",
    status: "planned",
    source: "IPCC 2006 Vol.2 Ch.2",
  },
];

function CardBody({ item }: { item: SubCategory }) {
  const isPlanned = item.status === "planned";
  return (
    <div className="p-8">
      <div className="flex items-baseline justify-between">
        <div className="font-mono text-[10px] uppercase tracking-widest text-accent-soft">
          scope_1 / {item.ipccCode.toLowerCase()}
        </div>
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${
            isPlanned ? "text-pending" : "text-verified"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPlanned ? "bg-pending" : "bg-verified"
            }`}
            aria-hidden
          />
          {isPlanned ? "planned" : "ready"}
        </span>
      </div>
      <div
        className={`mt-3 text-xl font-semibold tracking-tight ${
          isPlanned ? "text-text" : "text-text group-hover:text-ink"
        }`}
      >
        {item.nameKo}
      </div>
      <div className="mt-1 text-xs text-text-muted">{item.nameEn}</div>
      <p className="mt-4 text-sm leading-relaxed text-text-muted">
        {item.detail}
      </p>
    </div>
  );
}

function SubCategoryCard({ item }: { item: SubCategory }) {
  if (item.status === "planned") {
    return (
      <li className="bg-surface">
        <div className="block cursor-not-allowed opacity-60">
          <CardBody item={item} />
        </div>
      </li>
    );
  }
  return (
    <li className="bg-surface">
      <Link
        href={item.href}
        className="group block transition-colors hover:bg-accent/[0.04]"
      >
        <CardBody item={item} />
      </Link>
    </li>
  );
}

export default function Scope1Page() {
  return (
    <>
      <TopNav active="scope1" />

      <main className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-accent-soft">
            scope_1 · direct emissions
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Scope 1 <span className="text-accent">·</span> 직접 배출
          </h1>
          <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              사업자가 소유·통제하는 배출원에서 나온 직접 배출량을 산정합니다.
            </p>
            <p className="text-text-dim">
              GHG Protocol Corporate Standard 는 이 범위를 세 갈래로 나눕니다 · 연료 연소 (1A) · 산업 공정 (2A~2G) · 비의도적 유출 (1B fugitive · 냉매·메탄 누출 등).
            </p>
            <p className="text-text-dim">
              carbontrace 는 건물 부문에서 자주 쓰이는 1A4 (기타 · 고정연소) 와 1B (fugitive · 냉매) 두 하위 카테고리를 먼저 다룹니다.
            </p>
          </div>
        </header>

        {/* 하위 카테고리 · 준비 완료 */}
        <div className="mt-12">
          <SectionHeader title="하위 카테고리" />
          <ul
            className="mt-4 grid gap-px bg-border sm:grid-cols-2"
            style={{ border: "1px solid var(--border)" }}
          >
            {READY.map((item) => (
              <SubCategoryCard key={item.ipccCode} item={item} />
            ))}
          </ul>
        </div>

        {/* 하위 카테고리 · 확장 예정 · 별도 서브섹션 · 폭 좁게 */}
        <div className="mt-12 max-w-md">
          <SectionHeader title="확장 예정" />
          <ul
            className="mt-4 grid gap-px bg-border"
            style={{ border: "1px solid var(--border)" }}
          >
            {PLANNED.map((item) => (
              <SubCategoryCard key={item.ipccCode} item={item} />
            ))}
          </ul>
        </div>

        {/* 페이지 footer · 이슈 제안 채널 */}
        <footer className="mt-16 border-t border-border pt-4 text-xs text-text-dim">
          <p>
            값 · 방법론에 이상이 있으면 →{" "}
            <a
              href="https://github.com/ava-jahlee/carbontrace/issues/new?labels=user-feedback&title=%5BScope+1%5D+"
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
