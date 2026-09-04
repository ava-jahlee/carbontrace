import { SectionHeader } from "@/components/layout/SectionHeader";
import { TopNav } from "@/components/layout/TopNav";

export const metadata = {
  title: "확장성 로드맵 — carbontrace",
  description: "Scope 3 · IPPU · F-gas 향후 확장 계획.",
};

interface Category {
  name: string;
  detail: string;
  status: "done" | "in-progress" | "planned";
  source?: string;
}

const scope1: Category[] = [
  { name: "1A4a 상업/공공 건물 · 고정연소", detail: "63개 연료, T1/T2/T3, 산화계수, GWP 4판", status: "done", source: "IPCC 2006 Vol.2 Ch.2 · K-ETS 별표 12" },
  { name: "1A4b 주거용 건물 · 고정연소", detail: "동일 63개 연료 재사용", status: "done" },
  { name: "1B fugitive · 냉매/F-gas", detail: "HFC · 블렌드 · SF6 · NF3 · GWP 4판", status: "done", source: "IPCC 2006 Vol.3 Ch.7 · AR6 Table 7.SM.7" },
  { name: "1A2 건축 자재 산업 (시멘트·철강 등)", detail: "부지 내 자재 생산 시", status: "planned", source: "IPCC 2006 Vol.2 Ch.2" },
];

const scope2: Category[] = [
  { name: "구매 전력", detail: "GIR 승인 2017년 · 2022년 판 verified · 2024/2023 참조", status: "done", source: "GIR 승인 국가 온실가스 배출계수 · 전력배출계수" },
  { name: "구매 열/스팀 · KDHC 지사별", detail: "8 지사 × 3기·4기 = 16 값", status: "done", source: "한국지역난방공사 공시" },
  { name: "구매 열/스팀 · 국가 통합 3종", detail: "열전용 · 열병합 · 열평균 (원출처 미상 → asserted)", status: "in-progress" },
];

const scope3: Category[] = [
  { name: "Cat 1-15. 15 카테고리 카탈로그", detail: "정의 · 방법론 · 원문서 카탈로그 완성 (/scope3) · 계산 엔진은 카테고리별로 순차 구현", status: "in-progress", source: "GHG Protocol Scope 3 Standard · NIER 지침 v1.0 (2024.12)" },
  { name: "Cat 3. 연료·에너지 관련 · Scope 1/2 미포함", detail: "우선 확장 후보 · Scope 1·2 이미 있으므로 well-to-tank + T&D loss 계수만 추가", status: "planned", source: "IEA · UK BEIS · KEPCO T&D 손실률" },
  { name: "Cat 6. 출장", detail: "실무 자주 사용 · 항공 (좌석 등급별) · 철도 · 자동차", status: "planned", source: "GHG Protocol · UK BEIS · GLEC" },
  { name: "Cat 7. 통근", detail: "직원 통근 (자동차 · 대중교통 · 도보 · 재택근무)", status: "planned" },
  { name: "Cat 4. Upstream 물류", detail: "자재 운송 (건축 시 · 소모품 배송)", status: "planned" },
  { name: "Cat 5. 폐기물 처리", detail: "일반폐기물 · 재활용 · 하수 처리", status: "planned", source: "IPCC 2006 Vol.5 · 한국환경공단" },
  { name: "Cat 15. 투자", detail: "금융업 · PCAF 6개 자산군별 방법론", status: "planned", source: "PCAF Global Standard 2nd Ed. (2022)" },
];

const ippu: Category[] = [
  { name: "IPPU 2A 광물 (시멘트·석회·유리)", detail: "부지 내 시멘트 생산 등", status: "planned", source: "IPCC 2006 Vol.3 Ch.2" },
  { name: "IPPU 2B 화학 (암모니아·질산 등)", detail: "부지 내 화학 공정", status: "planned", source: "IPCC 2006 Vol.3 Ch.3" },
  { name: "IPPU 2C 금속 (철강·알루미늄)", detail: "부지 내 금속 생산", status: "planned", source: "IPCC 2006 Vol.3 Ch.4" },
  { name: "IPPU 2F ODS 대체 (HFC 사용)", detail: "냉매 fugitive 는 이미 반영 (Scope 1 다이렉트)", status: "done" },
  { name: "IPPU 2G 기타 · SF6/NF3 산업 사용", detail: "전기 절연 SF6 는 이미 반영. NF3 반도체 IPPU 는 별도", status: "in-progress" },
];

function StatusBadge({ s }: { s: Category["status"] }) {
  const label = s === "done" ? "done" : s === "in-progress" ? "wip" : "planned";
  const dotCls =
    s === "done" ? "bg-verified"
    : s === "in-progress" ? "bg-asserted"
    : "bg-pending";
  const textCls =
    s === "done" ? "text-verified"
    : s === "in-progress" ? "text-asserted"
    : "text-pending";
  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide ${textCls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotCls}`} />
      {label}
    </span>
  );
}

function CategoryList({ items, offset = 0 }: { items: Category[]; offset?: number }) {
  return (
    <ul className="divide-y divide-border rounded-md border border-border bg-surface">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[2rem_auto_1fr] items-baseline gap-x-3 gap-y-1 p-3">
          <span className="font-mono text-[10px] tabular-nums text-text-dim">
            {String(i + 1 + offset).padStart(2, "0")}
          </span>
          <StatusBadge s={it.status} />
          <div className="min-w-0">
            <div className="text-sm font-medium text-text">{it.name}</div>
            <div className="mt-0.5 text-xs text-text-muted">{it.detail}</div>
            {it.source && (
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-dim">
                src · {it.source}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function RoadmapPage() {
  return (
    <>
      <TopNav />

      <main className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:px-10 md:px-12">
        <header className="border-b border-border pb-8">
          <div className="font-mono text-[11px] uppercase tracking-widest text-asserted">
            admin · internal · not linked from main nav
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            확장성 <span className="text-accent">·</span> Roadmap
          </h1>
          <div className="mt-4 max-w-2xl space-y-1 text-sm leading-relaxed text-pretty">
            <p className="text-text-muted">
              관리자·개발자용 내부 로드맵. 사용자 대면 nav 에서는 노출하지 않습니다.
            </p>
            <p className="text-text-dim">
              사용자에게는 지금 준비된 것만 카탈로그로 보여줍니다. 계획 중인 항목·확장 예정은 여기에 정리됩니다. 이슈·제안은{" "}
              <a
                href="https://github.com/ava-jahlee/carbontrace/issues"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-accent"
              >
                GitHub Issues ↗
              </a>
              {" "}에서 받습니다.
            </p>
          </div>
        </header>

        {/* v0.7 현재 */}
        <div className="mt-8 rounded-md border border-verified/40 bg-verified-bg p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-verified">
            v0.7 · current
          </div>
          <ul className="mt-2 space-y-1 text-xs text-text-muted">
            <li>· Scope 1 · 랜딩 (하위 2 카테고리) · 연료 연소 · 냉매 fugitive</li>
            <li>· Scope 2 · 전력 · KDHC 열 · 국가 통합 열</li>
            <li>· Scope 3 · 15 카테고리 카탈로그 (계산기 순차 구현 예정)</li>
            <li>· URL 재구성 · /scope1/{"{fuel-combustion,refrigerant}"}</li>
          </ul>
        </div>

        {/* Scope 1 */}
        <div className="mt-12">
          <SectionHeader title="Scope 1 · 직접 배출" hint="direct" />
          <div className="mt-4"><CategoryList items={scope1} /></div>
        </div>

        {/* Scope 2 */}
        <div className="mt-12">
          <SectionHeader title="Scope 2 · 외부 공급 에너지" hint="purchased energy" />
          <div className="mt-4"><CategoryList items={scope2} /></div>
        </div>

        {/* Scope 3 */}
        <div className="mt-12">
          <SectionHeader title="Scope 3 · 기타 간접" hint="ghg protocol · 15 categories" />
          <div className="mt-4"><CategoryList items={scope3} /></div>
        </div>

        {/* IPPU */}
        <div className="mt-12">
          <SectionHeader title="IPPU · 산업 공정 및 제품 사용" hint="processes" />
          <div className="mt-4"><CategoryList items={ippu} /></div>
        </div>
      </main>
    </>
  );
}
