import { CornerMetaFrame } from "@/components/layout/CornerMeta";
import { SectionHeader } from "@/components/layout/SectionHeader";

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
  { name: "Cat 1. 구매 재화 · 서비스", detail: "건축 자재 (시멘트·철강·유리·목재), 사무기기 · 소모품 embodied carbon", status: "planned", source: "GHG Protocol Scope 3 · UK BEIS · ecoinvent" },
  { name: "Cat 2. 자본재", detail: "건물 자체 embodied carbon (설계 시)", status: "planned" },
  { name: "Cat 3. 연료·에너지 관련 · Scope 1/2 미포함", detail: "연료 upstream (well-to-tank) · 전력·열 T&D loss", status: "planned", source: "IEA · UK BEIS · KEPCO T&D 손실률" },
  { name: "Cat 4. Upstream 물류", detail: "자재 운송 (건축 시 · 소모품 배송)", status: "planned" },
  { name: "Cat 5. 폐기물 처리", detail: "일반폐기물 · 재활용 · 하수 처리", status: "planned", source: "IPCC 2006 Vol.5" },
  { name: "Cat 6. 출장", detail: "항공 · 철도 · 자동차 · 숙박", status: "planned", source: "GHG Protocol · GLEC" },
  { name: "Cat 7. 통근", detail: "직원 통근 (자동차 · 대중교통 · 도보)", status: "planned" },
  { name: "Cat 8. Upstream 임대 자산", detail: "임차 건물의 Scope 1/2 (임대 건물이 있는 경우)", status: "planned" },
  { name: "Cat 9. Downstream 물류", detail: "일반적으로 건물 계산에는 미해당", status: "planned" },
  { name: "Cat 10-11. 판매 재화 처리·사용", detail: "일반적으로 건물 계산에는 미해당", status: "planned" },
  { name: "Cat 12. 판매 재화 폐기", detail: "일반적으로 건물 계산에는 미해당", status: "planned" },
  { name: "Cat 13. Downstream 임대 자산", detail: "임대인 관점 (자신이 임대하는 건물의 임차인 배출량)", status: "planned" },
  { name: "Cat 14. 프랜차이즈", detail: "프랜차이즈 본사 관점", status: "planned" },
  { name: "Cat 15. 투자", detail: "금융업 · PCAF 방법론", status: "planned", source: "PCAF Global GHG Accounting Standard" },
];

const ippu: Category[] = [
  { name: "IPPU 2A 광물 (시멘트·석회·유리)", detail: "부지 내 시멘트 생산 등", status: "planned", source: "IPCC 2006 Vol.3 Ch.2" },
  { name: "IPPU 2B 화학 (암모니아·질산 등)", detail: "부지 내 화학 공정", status: "planned", source: "IPCC 2006 Vol.3 Ch.3" },
  { name: "IPPU 2C 금속 (철강·알루미늄)", detail: "부지 내 금속 생산", status: "planned", source: "IPCC 2006 Vol.3 Ch.4" },
  { name: "IPPU 2F ODS 대체 (HFC 사용)", detail: "냉매 fugitive 는 이미 반영 (Scope 1 다이렉트)", status: "done" },
  { name: "IPPU 2G 기타 · SF6/NF3 산업 사용", detail: "전기 절연 SF6 는 이미 반영. NF3 반도체 IPPU 는 별도", status: "in-progress" },
];

function StatusBadge({ s }: { s: Category["status"] }) {
  const label = s === "done" ? "[done]" : s === "in-progress" ? "[wip]" : "[planned]";
  const cls =
    s === "done"
      ? "text-verified border-verified/40 bg-verified-bg"
      : s === "in-progress"
      ? "text-asserted border-asserted/40 bg-asserted-bg"
      : "text-pending border-pending/40 bg-pending-bg";
  return (
    <span className={`inline-block rounded-sm border px-1 py-0 font-mono text-[10px] leading-4 tracking-tight ${cls}`}>
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
    <CornerMetaFrame
      tl="carbontrace"
      tr="v0.4"
      bl="scope_1 · 2 · 3 · IPPU"
      br="GHG Protocol · IPCC 2006"
    >
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-16 sm:px-10 md:px-12">
        <div className="mb-4 flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <a href="/" className="hover:text-ink">carbontrace</a>
          <span className="text-text-dim">/</span>
          <span className="text-ink-dim">roadmap</span>
        </div>

        <header className="border-b border-border pb-6">
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
            IV · future scope
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text">확장성 로드맵</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            carbontrace 는 건물 온실가스 계산기지만, 감사 가능 원칙과 primary source 카탈로그를 그대로 유지하며
            Scope 3 · IPPU · F-gas 까지 확장 가능하도록 설계됨.
          </p>
        </header>

        {/* v0.4 요약 */}
        <div className="mt-6 rounded-md border border-verified/40 bg-verified-bg p-4">
          <div className="font-mono text-[10px] uppercase tracking-widest text-verified">
            v0.4 · current
          </div>
          <ul className="mt-2 space-y-1 text-xs text-text-muted">
            <li>· Scope 1 (연료 연소 · 63 연료 · 3 티어 · 4 GWP 판 · 3 데이터 프로파일)</li>
            <li>· Scope 2 (전력 · KDHC 열 · 국가 통합 열)</li>
            <li>· Scope 1 fugitive · 냉매 · F-gas (HFC · 블렌드 · SF6 · NF3)</li>
          </ul>
        </div>

        {/* Scope 1 */}
        <div className="mt-10">
          <SectionHeader numeral="I" title="Scope 1 · 직접 배출" hint="direct" />
          <div className="mt-4"><CategoryList items={scope1} /></div>
        </div>

        {/* Scope 2 */}
        <div className="mt-10">
          <SectionHeader numeral="II" title="Scope 2 · 외부 공급 에너지" hint="purchased energy" />
          <div className="mt-4"><CategoryList items={scope2} /></div>
        </div>

        {/* Scope 3 */}
        <div className="mt-10">
          <SectionHeader numeral="III" title="Scope 3 · 기타 간접" hint="GHG Protocol · 15 categories" />
          <div className="mt-4"><CategoryList items={scope3} /></div>
        </div>

        {/* IPPU */}
        <div className="mt-10">
          <SectionHeader numeral="IV" title="IPPU · 산업 공정 및 제품 사용" hint="processes" />
          <div className="mt-4"><CategoryList items={ippu} /></div>
        </div>
      </main>
    </CornerMetaFrame>
  );
}
