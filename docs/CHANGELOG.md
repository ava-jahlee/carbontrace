# Changelog

carbontrace 는 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 형식을 따릅니다.

---

## v0.9 · 2026-09-04 · 시설 등록 · 배출 인벤토리 · Tier 강제

**정아 님의 두 핵심 지적을 함께 해결한 릴리스.** 첫째 · 원 xlsm 은 계산 전에 시설 정보 (유형·연간 GHG 규모 → K-ETS 별표 5 등급 → 최소 Tier) 를 먼저 요구하는데 웹에는 이 진입점이 없었다. 둘째 · "단순 결과 계산이 의미있는게 아냐. 그걸 다 합산한 값이 중요한거잖아. 지금은 검색하고 다른거 검색하려면 원래 검색했던게 다 날아가잖아." 이 두 가지를 시설 (Facility) 계층 + 인벤토리 (Inventory) 계층으로 함께 해결.

**엑셀 실측 근거** · `scripts/extract_facility_schema.py` 로 `Main` 시트의 셀 값·수식·xlsm 내부 `dataValidation` XML 을 직접 파싱해 · 시설 진입 스키마·등급 기준·최소 Tier 매핑을 실측 확인. 근거 리포트 = `docs/refs/facility_schema.txt`. 원 xlsm 은 처음부터 1A4 (건물 부문) 전용 · 사용자 선택은 사실상 3 개 (현장명 · 용도 · 연간 GHG).

### Added

#### 시설 (Facility) 계층 · `/facility`

- `src/data/facility.ts` · **Facility 스키마**
  - `FacilityUsage` · `residential` / `commercial-public` (Main!H3 dropdown · `_Law&GL22!F23:F24` 실측)
  - `FacilityGrade` · A/B/C · 등급 기준 `FACILITY_GRADE_THRESHOLDS` = 0-5-50 만ton/yr (`_Law&GL22!B109:C111` 실측 · K-ETS 별표 5)
  - `MinTiers` · heat/ef/ox × A/B/C 매핑 (Main!D14/E14/F14 실측)
  - `Facility` · siteName · usage · annualGhgMTons + schemaVersion · createdAt/updatedAt
  - 분야·부문 · `1A. 에너지` · `1A4. 기타` 로 고정 (원 xlsm 도 건물 부문 전용)
- `src/lib/facility/` · 순수 유틸
  - `grade.ts` · `calcGrade` · `minTiersOf` · `checkTier` · `isTierAllowed`
  - `storage.ts` · localStorage 어댑터 · `carbontrace:facility:v1` · SSR 안전 · `FACILITY_EVENT` dispatch
  - `useFacility.ts` · React hook · hydration 안전 · ready flag
- `src/components/layout/FacilityBadge.tsx` · TopNav 우측 뱃지 · 미등록 회색 dot · 등록됨 accent dot + 시설명 + 등급
- `src/app/facility/page.tsx` + `FacilityForm.tsx` · 시설 등록 UI
  - 좌측 · 3 필드 (사업장 이름 · 용도 2 버튼 · 연간 GHG)
  - 우측 · auto/derived · 등급 큰 배지 + 최소 Tier 표 + 다음 진입 링크
  - 저장·업데이트·삭제 액션 + 저장 flash

#### 인벤토리 (Inventory) 계층 · `/inventory`

- `src/data/inventory.ts` · **InventoryItem 스키마**
  - `InventoryCategory` (open enum) · `fuel-combustion` / `refrigerant` / `electricity` / `heat-kdhc` / `heat-national` / `scope3`
  - `CATEGORY_META` · ko 라벨 + scope 유도 + 계산기 href
  - `FacilitySnapshot` · 저장 시점 시설 스냅샷 (감사시 시설 정보가 바뀌어도 이 항목 기록은 유지)
  - `InventoryDisplay` · activity + conditions 요약
  - `totalCo2eq: Calculated` · **value + formula + inputs 를 통째로 보존** (감사자가 원 계산 근거 열람 가능)
  - `inputs: unknown` · 재계산용 원본 입력 스냅샷
  - `rawResult?: unknown` · optional · 종별 배출 등 세부
- `src/lib/inventory/`
  - `storage.ts` · localStorage · `carbontrace:inventory:v1` · add · updateMeta · remove · clear · **exportInventoryJson** (파일 다운로드)
  - `useInventory.ts` · React hook
  - `aggregations.ts` · `groupByScope` · `sumCo2eqTons` · `groupByCategory` · `formatCo2eq`
  - `draft.ts` · `buildFacilitySnapshot` · `defaultInventoryLabel` (계산기 공통 헬퍼)
- `src/app/inventory/page.tsx` + `InventoryView.tsx` · 인벤토리 뷰
  - 상단 · 큰 총합 tCO₂eq · 현재 시설 · 항목 수 · JSON 내보내기 · 전체 삭제
  - Scope 1/2/3 그룹 · 각 소계 헤더 · 항목 리스트
  - 항목 · 카테고리 배지 · 라벨 · activity/conditions · memo · site 스냅샷 · warnings · tCO₂eq · 계산기 링크 · 편집/삭제
  - EmptyState · 시설 미등록 시 시설 등록 유도 + 각 계산기 진입 링크

#### 각 계산기 · 시설 컨텍스트 + Tier 강제 + Add 버튼

- `src/components/facility/FacilityContextBanner.tsx` · 계산기 상단 배너
  - 등록됨 · 시설명 · 등급 · (fuel-combustion 만) 최소 Tier + 시설 수정 링크
  - 미등록 · warn 색 · 시설 등록 유도 링크
- `src/components/inventory/AddToInventoryButton.tsx` · 결과 카드 아래 버튼
  - idle → editing (라벨 인라인 입력 · Enter/Escape 지원) → saved (인벤토리 보기 링크 · 3초 후 idle 복귀)
- `Scope1Calculator` (fuel-combustion)
  - **시설 등급이 최소 Tier 를 강제** · 등급 B → T1 disabled · line-through 회색 처리 · title 툴팁 안내
  - 시설이 바뀌면 기존 Tier 상태가 미달일 경우 자동 승격
  - Add 버튼 · category="fuel-combustion" · display.activity `${fuelName} · ${amount} ${unit}` · conditions `열량 ${T} · 배출 ${T} · GWP ${G}`
- `RefrigerantCalculator` · 시설 배너 (Tier 무관) + Add 버튼 · category="refrigerant"
- `Scope2Calculator` · 시설 배너 + Add 버튼 · mode → category 자동 매핑 (`power`→`electricity` · `heat-kdhc` · `heat-national`)

### Changed

- **TopNav**
  - `active` 타입에 `"inventory"` · `"facility"` 추가
  - NAV_ITEMS 에 Inventory 링크 (Scope 3 와 Docs 사이)
  - 우측에 FacilityBadge 통합 · meta 왼쪽에
  - 기본 meta 를 `v 0.9` 로

### Docs · Scripts

- `scripts/extract_facility_schema.py` · openpyxl 로 시설 관련 셀 값·수식 + zipfile 로 dataValidation XML 파싱
  - `docs/refs/facility_schema.txt` (gitignore) 에 저장
- `README.md` · 헤더 v0.9 로 · 시설 등록 · 배출 인벤토리 요약 추가

### Verified (브라우저)

1. `/facility` · 사업장 이름 · 연간 GHG 6 만ton/yr → **B 등급** · heat T2 · ef T2 · ox T2 자동 · 저장 → TopNav 뱃지 `● 카본트레이스 본사 · B` 즉시 갱신
2. `/scope1/fuel-combustion` · 시설 배너 표시 · **T1 두 버튼 모두 disabled (line-through)** · 자동 T2 승격
3. `+ 인벤토리에 추가` · 라벨 자동 채움 (`카본트레이스 본사 · 아역청탄 (하위 유연탄)`) · 저장 → 인벤토리 항목 1건 (2.0267 tCO₂eq)
4. `/scope1/refrigerant` · 시설 배너 · Add · 항목 추가 (7.6500 tCO₂eq)
5. `/inventory` · **Grand total 9.677 tCO₂eq** · Scope 1 소계 9.677 (2개 항목) · Scope 2/3 · 0 · 빈 그룹 안내

### Tests · Build

- 137/137 (unchanged) · 파리티·감사요약·데이터프로파일 전부 pass
- 33 static routes (`/facility` · `/inventory` 추가)

### Next (v0.10 후보)

- 시설 여러 개 관리 · 활성 시설 스위처 (여러 사업장을 오가는 컨설턴트/그룹사 대응)
- 인벤토리 JSON 가져오기 (백업 파일 복원)
- Scope 3 계산기 (구체 카테고리별)
- PDF 리포트 (인벤토리 → 감사 walkthrough 포함 인쇄)

---

## v0.8.1 · 2026-09-04 · 카드 정의화 · Docs 랜딩 삭제 · 이슈 별도 장치

**정아 님 피드백 반영.** v0.8 랜딩이 여전히 문제였다. 카드가 계산법 서술 (검색기 뉘앙스) 이었고 · 랜딩 Docs 섹션은 상단 nav 와 중복이면서 사용자 앞에 정신없이 나열됐고 · 이슈/제안이 Docs 안에 끼어 있었다.

**엑셀 재파악 결과** · 원 xlsm 은 시트 3 개 (`Main` · `_Law&GL22` · `_Supplier`) 이고 · 사용자 대면은 `Main` 시트 1 개뿐이며 · **활동원 1 건씩만** 계산한다 (연료 1 · 전기 1 · 열 1). 정아 님이 원한 "인벤토리 합산" 흐름은 원 xlsm 에도 없었다. 이건 웹으로 옮기며 개선할 자연스러운 여지 · **다음 릴리스 v0.9 에서 다룬다** (시설 등록 · 활동원 다수 등록 · Scope 별 소계 · 사업장 총합).

### Changed

- **카드 문구 · 계산법 → 정의 (누가 태웠나 축)**
  - Scope 1 · "연료 사용량 · 냉매 유출량을 입력하면 IPCC + K-ETS 방법으로 tCO₂eq 을 계산합니다" → **"우리 사업장 · 우리가 직접 태운 것 · 사업장 안의 보일러 · 차량 · 냉매 유출 등 · 소유·통제하는 배출원에서 우리가 직접 낸 배출량."**
  - Scope 2 · "전력·열 사용량을 입력하면 GIR 국가고유 배출계수와 KDHC 지사별 실측치로 tCO₂eq 을 계산합니다" → **"우리 대신 · 한전·지역난방이 태워준 것 · 사 온 전기 · 열 · 스팀. 우리가 소비했지만 실제 배출은 발전소 · 열병합 시설에서 났고 · 그 상류 배출을 우리 몫으로 인정하는 부분."**
  - Scope 3 · "협력사·물류·통근·투자 등 15 카테고리의 방법론 카탈로그. 계산기는 순차 구현 중" → **"우리 사업 때문에 · 다른 회사·사람이 태운 것 · 원재료 공급사 · 물류 · 임직원 통근 · 투자한 회사 · 우리 제품을 쓰는 사용자 등 15 카테고리. 우리가 직접 태우진 않았지만 우리 사업이 유발한 배출량."**
  - subtitle 을 accent (terracotta 굵게) 로 강조 · detail 을 muted 본문으로
- **Scope 1 하위 카드도 정의 축으로**
  - 연료 연소 · "연료 종류·사용량·Tier 를 입력하면 저위발열량과 배출계수를 거쳐 tCO₂eq 을 계산합니다" → "건물 안에서 태우는 도시가스 · 경유 · LPG 등. 우리 보일러 · 비상 발전기 · 주방 조리기구에서 나오는 배출."
  - 냉매 · F-gas · 유사하게 · "냉방 · 냉장 설비에서 세어 나오는 HFC · SF6 등. 우리 설비의 유출 배출."
  - 1A2 planned · "부지 내에서 자재 (시멘트 · 철강 등) 를 직접 생산하며 태우는 연료. 지금은 미구현."
- **카드에서 SRC 라인 (`SRC · IPCC 2006 VOL.2 CH.2 · K-ETS 별표 12`) 제거**
  - 사용자가 카드에서 궁금해할 정보가 아니다 · 감사자용 정보는 계산기 안 팝오버 · Audit Summary 에서 이미 노출됨
  - 랜딩·Scope 1 하위 카드 모두 적용
- **랜딩 footer 에 "제안 ↗" 링크 추가** · 오른쪽 · admin 왼쪽 · subtle mono
  - 이슈/제안은 별도 장치 (독립 링크) · Docs 와 완전히 분리

### Removed

- **랜딩 Docs 섹션 통째로 삭제** · 상단 nav 의 Docs 링크만 남김
  - 이유 · 상단 nav 와 중복 · 7 항목 나열이 사용자 앞에서 정신없음 · 뭘 눌러야 할지 모름
- **랜딩 Docs 섹션 안의 이슈·제안 링크 삭제** · footer 제안 링크로 이동
- **`DocLink` interface · `DOC_LINKS` 배열 삭제** ([page.tsx](../src/app/page.tsx))

### Docs (참고 · 코드 무변경)

- 새 스크립트 [`scripts/audit_xlsm_flow.py`](../scripts/audit_xlsm_flow.py) · xlsm 을 사용자 흐름 관점으로 재감사 · 시트 목록 · 소계·합계 후보 · header 스캔 · 결과는 [`docs/refs/xlsm_flow_audit.txt`](../docs/refs/) 에 저장
- 발견 · Main 시트 1 개에 Scope 1 · Scope 2 · 시설 정보 다 담김 · 활동원 1 건씩 · **인벤토리 없음** · 시설 등급 (A/B/C) 이 최소 Tier 를 결정하는 진입점 · **웹에는 이 진입점이 아직 없다**

### 다음 릴리스 v0.9 · 인벤토리 흐름 (계획)

- **시설 (사업장) 등록** 진입점 추가 · 유형 · 분야 · 부문 · 용도 · 연간 GHG 규모 → 최소 Tier 등급 자동 산정 (K-ETS A/B/C)
- **인벤토리 상태 관리** · 여러 활동원 등록 · Scope 별 소계 · 사업장 총합
- **저장·불러오기 · JSON 내보내기** · localStorage 브라우저 저장 · 익명 · 개인
- **각 항목마다 계산 조건 (연료·Tier·GWP·프로파일) 스냅샷** 유지

### Tests · Build

- 137/137 (unchanged)
- 31 static routes (unchanged)

---

## v0.8 · 2026-09-04 · 사이트 내부 Docs · UI 노이즈 정리 · 계산기 문구

**Docs 를 사이트 안 카테고리·본문 뷰로 실장.** 이전에는 랜딩 Docs 섹션이 전부 GitHub 로 튀어나가는 링크 나열이었다. Thunderhead / DesignBuilder 스타일로 재설계 · `/docs` 랜딩에 카테고리 3 그룹 (감사 · 데이터 · 개발) · 각 문서는 개별 페이지 (`/docs/{slug}`) · 좌측 sticky TOC + 우측 markdown 렌더 본문 + 상단 PDF 다운 버튼 (브라우저 인쇄 → PDF 저장).

같은 릴리스에서 **UI 노이즈 대거 정리** · 카운트 라벨 (`3 SCOPES` · `7 ITEMS`) 삭제 · fixed 코너 mono (`seoul 37.5665° N ...` · `vitest 137/137 pass`) 완전 제거 · footer 자기 자랑 축소. **카드 문구도 검색기 → 계산기 뉘앙스** 로 재작성.

### Added

- **`/docs` · 사이트 내부 Docs 시스템** — Thunderhead / DesignBuilder 참조
  - [`/docs`](../src/app/docs/page.tsx) 랜딩 · 3 그룹 카테고리 카드
    - **감사 · 검증** (audit / verify) · Audit Guide · Primary Source Note 표준
    - **데이터** (data / methodology) · Data Profiles
    - **개발 · 릴리스** (dev / release) · Development Guide · Changelog
  - [`/docs/[slug]`](../src/app/docs/[slug]/page.tsx) 개별 페이지 5 개 · dynamic route + `generateStaticParams`
    - `/docs/audit-guide` · `/docs/primary-source-note` · `/docs/data-profiles` · `/docs/development` · `/docs/changelog`
  - [`<DocLayout />`](../src/components/docs/DocLayout.tsx) · 2 컬럼 grid (좌 220px sticky TOC · 우 본문)
    - 상단 · kicker + 큰 제목 + subtitle + `PDF ↓` 버튼
    - 좌측 · `← docs` 브레드크럼 + h2/h3 목록 (h3 는 들여쓰기)
    - 하단 · GitHub 수정 제안 링크 (`edit/main/docs/{file}`)
  - [`<MarkdownRenderer />`](../src/components/docs/MarkdownRenderer.tsx) · react-markdown + remark-gfm + rehype-slug + rehype-autolink-headings
    - heading 에 anchor id 자동 부여 · 클릭 시 URL 해시 이동
    - GitHub-flavored (표 · 체크박스 · strikethrough)
  - [`<PrintButton />`](../src/components/docs/PrintButton.tsx) · `window.print()` 로 브라우저 인쇄 대화상자 · destination "PDF 로 저장" 선택
- **`.doc-prose` markdown 스타일** ([globals.css](../src/app/globals.css)) · ivory-warm 팔레트 일관
  - h2 상단 border · h3 muted · h4 mono uppercase
  - 인라인 code · code block · table (thead 배경) · blockquote (accent border-left) · hr
  - `scroll-margin-top: 5rem` · anchor 이동 시 상단 nav 아래로 정확히 정렬
- **`@media print` CSS** · nav · TOC · footer 를 `data-print="hide"` 로 인쇄 시 숨김 · 본문만 남김
- **문서 카탈로그** ([`src/lib/docs/catalog.ts`](../src/lib/docs/catalog.ts)) · DocEntry 정의 · 그룹 메타
- **markdown 로더 · TOC 추출 유틸** ([`src/lib/docs/loader.ts`](../src/lib/docs/loader.ts))
  - `loadDoc(file)` · `extractTitle(md)` · `extractToc(md)` · rehype-slug 호환 slugify (한글 지원)

### Changed

- **랜딩 페이지 UI 노이즈 정리** ([`page.tsx`](../src/app/page.tsx))
  - CornerMetaFrame 완전 제거 · `seoul · 37.5665° N 126.9780° E` · `vitest · 137/137 pass` 삭제
  - Catalog 헤더 `3 SCOPES` 카운트 라벨 삭제
  - Docs 헤더 `7 ITEMS` 카운트 라벨 삭제
  - footer · `src · GHGCalc_V0m_lja.xlsm · parity 137/137` 제거 → `v 0.7 · 2026-09-04 · GitHub ↗` 만 · admin 링크 우측
- **모든 계산기 페이지 CornerMetaFrame 삭제**
  - `/scope1` · `/scope1/fuel-combustion` · `/scope1/refrigerant`
  - `/scope2` · `/scope3` · `/scope3/[cat]` · `/roadmap`
  - 이유 · TopNav 우측 meta 로 컨텍스트 이미 충분 · fixed 코너 라벨은 중복이고 화면 하단 지저분함
- **Scope 1 랜딩 · section header hint 제거** · `ready · 2` · `planned` 카운트 삭제
- **랜딩 카탈로그 카드 · 계산기 뉘앙스로 문구 재작성**
  - Scope 1 · 이전: "1A4 연료 연소 (63 연료 · 3 tier · 3 profile) · 1B 냉매 · F-gas"
  - Scope 1 · 이후: "연료 사용량 · 냉매 유출량을 입력하면 IPCC 2006 + K-ETS 방법으로 tCO₂eq 을 계산합니다."
  - Scope 2 · 유사하게 활동 흐름 명시
  - Scope 3 · "계산기는 순차 구현 중" 명시 (스캐폴딩만 있음을 명확히)
- **Scope 1 랜딩 하위 카드 · 계산기 뉘앙스로 재작성**
  - fuel-combustion · "연료 종류·사용량·Tier 를 입력하면 저위발열량과 배출계수를 거쳐 tCO₂eq 을 계산합니다."
  - refrigerant · "냉매 종류·연간 유출량·GWP 기준을 입력하면 GWP × 유출량으로 tCO₂eq 을 계산합니다."
  - 1A2 planned · "계산기 미구현" 명시
- **TopNav · Docs 링크 · 외부 GitHub → 내부 `/docs`** ([`TopNav.tsx`](../src/components/layout/TopNav.tsx))
  - `active` 타입에 `"docs"` 추가
  - `NAV_ITEMS` 에 Docs 항목 통합 · 별도로 하드코드된 외부 링크 제거
- **랜딩 Docs 섹션 링크 · 외부 md 파일 → 내부 `/docs/{slug}`**
  - 5 개 문서 (audit-guide · primary-source-note · data-profiles · development · changelog) 모두 내부 링크로 전환
  - Issue · Repo 만 외부 GitHub 유지 (`external: true`)

### Design rationale

- **`/docs` = 사이트 안 · 카테고리 · 본문 · PDF**. 이 셋 다 사용자 기대다. 그 기대 없이 링크만 뿌리면 문서가 있어도 문서가 없는 것과 같다.
- **자기 자랑 mono 축소**. `parity 137/137` · `vitest 137/137 pass` · `seoul 37.5665° N` 은 개발자 자기 만족이고 사용자에게는 노이즈. 감사자·개발자용 정보는 관련 페이지 (docs · repo) 로.
- **계산기 vs 검색기**. 카드 detail 이 "63 연료 · 3 tier · 3 profile" 처럼 데이터 인벤토리를 나열하면 조회기처럼 읽힌다. carbontrace 는 **입력 → 계산 → 결과** 도구다. 문구도 그 흐름을 말해야 한다.
- **인쇄 = 뷰포트 재구성**. `window.print()` + `@media print` CSS 조합으로 별도 PDF 파이프라인 (pandoc 등) 없이 브라우저만으로 PDF 저장 가능. 나중에 필요하면 서버측 puppeteer/pandoc 추가.

### Dependencies

- `react-markdown` `^10.1.0` · `remark-gfm` `^4.0.1` · `rehype-slug` `^6.0.0` · `rehype-autolink-headings` `^7.1.0`

### Tests

- 137/137 (unchanged · 계산 로직 무변경)
- 빌드 · 31 static routes (25 → 31 · Docs 6 페이지 추가)

---

## v0.7 · 2026-09-04 · 위계 재조정 · Scope 1 하위 카테고리 · 이슈 채널

**IPCC · GHG Protocol 위계 그대로 반영.** Scope 1 안의 연료 연소·냉매를 별도 최상위 카드로 두던 구조를 정리 · Scope 1 랜딩 아래로 hoist. 사용자 대면 nav 4 items (Scope 1 · 2 · 3 · Docs) 로 단순화. 로드맵은 관리자 내부 페이지로 격리 · 사용자 피드백은 GitHub Issues 로 받는다.

### Changed

- **URL 재구성** (Next.js App Router · git mv 로 히스토리 보존)
  - `/scope1` (기존 연료 연소 계산기) → `/scope1/fuel-combustion`
  - `/refrigerant` (기존 냉매 계산기) → `/scope1/refrigerant`
  - `/scope1` 은 **Scope 1 랜딩** 으로 전환 (하위 카테고리 카드)
- `TopNav` · 5 → 4 items · Refrigerant · Roadmap 링크 제거
  - `active` 타입에서 `refrigerant` · `roadmap` 제거 · fuel-combustion 과 refrigerant 모두 `scope1` active 로 통일
  - default meta `v 0.6` → `v 0.7`
- **랜딩 Catalog** · 5 → 3 items (Scope 1 · Scope 2 · Scope 3 · scope 축 정렬)
  - "5 items" → "3 scopes"
  - Scope 1 카드 detail: "63 연료 · T1/T2/T3 · GWP 4판 · 3 데이터 프로파일" → "1A4 연료 연소 (63 연료 · 3 tier · 3 profile) · 1B 냉매 · F-gas"
  - 냉매 · Roadmap 최상위 카드 제거
- **랜딩 footer** · admin · roadmap 링크 추가 (조용히 · 우측 mono)
  - v 0.6 → v 0.7
- **Docs 섹션** · 6 → 7 items · **이슈 · 제안** 링크 추가 (GitHub Issues `?labels=user-feedback`)
- **로드맵 페이지** (`/roadmap`)
  - 헤더 eyebrow `future scope · expansion` → `admin · internal · not linked from main nav`
  - 관리자·개발자 대상임을 명시 · 사용자 피드백은 GitHub Issues 링크
  - v0.6 요약 → v0.7 요약 · URL 재구성 항목 추가

### Added

- [`/scope1`](../src/app/scope1/page.tsx) · **Scope 1 랜딩 페이지** 신규
  - 하위 카테고리 2 카드 · 1A4 연료 연소 (ready) · 1B 냉매 (ready)
  - 1A2 산업 공정 · 부지 내 연료 (planned · 회색 카드)
  - 각 카드에 IPCC 코드 · 근본 원문서 명시
  - `● ready` · `● planned` dot 배지
- **계산기 페이지 breadcrumb** · `← scope 1 · 하위 카테고리`
- **각 계산기 페이지 footer** · GitHub Issues 링크 (연료연소 · 냉매 각각 title prefix)
- **문서** · [AUDIT-GUIDE.md](./AUDIT-GUIDE.md) URL 목록 업데이트 (5 → 5 정확한 경로)

### Design rationale

- **위계 문제.** 이전 카탈로그에서 연료연소와 냉매가 별도 최상위 카드로 뜨는 게 GHG Protocol 관점에서 이상했다. 둘 다 Scope 1 하위 (1A4 · 1B) 이다. Scope 축을 먼저 · 그 아래 세부 배출원.
- **관리자·사용자 경계.** 로드맵은 사업자·감사자에게 노이즈다. 계획된 것보다 지금 준비된 것을 정확히 보여주는 게 중요. 로드맵은 내부용 · admin footer 링크로만 접근.
- **피드백 채널.** 자체 게시판 (백엔드 필요) 대신 GitHub Issues 활용 · 오픈 · 감사 가능 · 무료. `labels=user-feedback` 로 자동 분류.

---

## v0.6 · 2026-09-04 · Scope 3 · 15 카테고리 카탈로그 스캐폴딩

**GHG Protocol Corporate Value Chain (Scope 3) Standard 의 15 카테고리를 감사 가능한 카탈로그 형태로 스캐폴딩.**
계산 엔진은 카테고리별로 순차 구현 예정. 이번 릴리스는 정의·방법론·원문서 정리에 집중.

### Added

- [`src/data/sources.ts`](../src/data/sources.ts) · 원문서 4종 신규
  - `GHG_PROTOCOL_SCOPE3_STANDARD` (2011) · WRI + WBCSD · 15 카테고리 근본 정의
  - `GHG_PROTOCOL_SCOPE3_CALC_GUIDANCE` (2013 v1.0) · 182p · 실무 계산 방법
  - `NIER_SCOPE3_GUIDELINE` (2024.12 v1.0) · 313p · 국내 지침 · NIER-GP2024-103
  - `PCAF_STANDARD` (2022 2nd ed.) · Cat 15 Investments 전용 · 6 자산군 방법론
- 새 `SourceKind` 3종: `ghg-protocol` · `nier` · `pcaf`
- [`src/data/scope3.ts`](../src/data/scope3.ts) 신규 · 15 카테고리 카탈로그
  - `Scope3Category` · `Scope3Methodology` 타입
  - 각 카테고리: 영문·한글 이름 · 정의 · 건물 컨텍스트 · 대표 활동 · 방법론 (rank 1-4) · 원문서
  - 총 15 카테고리 × 평균 2.7 방법론 = **41 개 (카테고리 · 방법론) 조합** 카탈로그화
- [`/scope3`](../src/app/scope3/page.tsx) 랜딩 페이지 신규
  - Upstream (1-8) · Downstream (9-15) 두 섹션 · 2 열 grid
  - v0.6 스캐폴딩 안내 박스 · 방법 투명성 원칙 명시
  - 근본 원문서 4종 카탈로그 하단 배치
- [`/scope3/[cat]`](../src/app/scope3/[cat]/page.tsx) 카테고리 상세 페이지 (SSG · 15 경로 자동 생성)
  - 정의 · 건물 컨텍스트 · 대표 활동 · 방법론 목록 (rank 순) · 원문서
  - 각 방법론 · precision rank + 구현 상태 (`stub` · `partial` · `complete`)
  - 참조 자료 리스트 (GHG Protocol · NIER · PCAF)

### Changed

- `TopNav` · Scope 3 링크 추가 (4 → 5 items) · default meta v0.5 → v0.6
- 랜딩 `page.tsx`
  - Catalog 4 → 5 items (Scope 3 · 기타 간접 카드 추가)
  - Roadmap 카드 detail 조정 (Scope 3 는 자기 페이지 있으므로 IPPU 위주로)
  - Docs · Changelog hint · v0.1 → v0.5 → v0.6
  - footer v 0.5 → v 0.6
- `roadmap/page.tsx`
  - Scope 3 섹션 리셋: 15 카테고리 나열 → 카탈로그 링크 + 우선 확장 후보 (Cat 3·6·7·4·5·15) 7 항목으로 정리
  - v0.4 current → v0.6 current · Scope 3 카탈로그 항목 추가
- `README.md` · 버전 v0.5 → v0.6 · Scope 3 섹션 신규

### Verified

- `npm run build` · 통과 · `/scope3/[cat]` 15 경로 SSG 생성 (cat-01-purchased-goods ~ cat-15-investments)
- 랜딩 · `/scope3` · `/scope3/cat-06-business-travel` 브라우저 확인

---

## v0.5 · 2026-09-04 · 문서화 완성 · xlsm 오류 정정 릴리스

**감사자·개발자·릴리스 관리자가 실제로 쓸 수 있는 형태로 문서 체계를 정리했습니다.** 코드 변경은 없고 문서·메타만.

### Added

- [`docs/DATA-PROFILES.md`](./DATA-PROFILES.md) 신규 · 3 프로파일 상세 · 각 정정 fuel 별 표 · 원문서 근거 · UI/코드 사용법 · 감사 검증 방법
- [`docs/CHANGELOG.md`](./CHANGELOG.md) 신규 · v0.1 ~ v0.5 릴리스 히스토리

### Changed

- `README.md` · 버전 v0.4 → v0.5 · 추가 문서 링크 (`DATA-PROFILES`, `CHANGELOG`) 노출
- 랜딩 footer 버전 v 0.4 → v 0.5

---

## v0.4 · 2026-09-04 · UI 시각 시스템 정착 + 정아 피드백 반영

**목업 B (Mara + Daniel Blue) 기반으로 전체 UI 를 워크스페이스 `DESIGN.md` · `REFERENCES.md` 취향에 맞춰 정착.**
[042e025](https://github.com/ava-jahlee/carbontrace/commit/042e025)

### Added

- 냉매 · F-gas 계산기 (`/refrigerant`) · IPCC 2006 Vol.3 Ch.7 Tier 1a screening
  - 지원 냉매 10 종 (HFC-134a·32·125·143a·152a · R-410A·404A·407C · SF6 · NF3)
  - GWP 4 판 (SAR/AR4/AR5/AR6) 지원 · 블렌드는 mass 비율 가중
- `TopNav` 신규 · 4 페이지 (Home · Scope 1 · Scope 2 · Refrigerant · Roadmap) 통일된 인라인 nav
- `AuditSummary` 신규 · 감사 신뢰도 대시보드 (verified/documented/asserted/pending 카운트 + 경고 목록)
- 랜딩 MATURITY 4 단계 dl 로 각 성숙도 뜻 노출 (도트 + 라벨 + 짧은 한글 설명)
- 확장성 로드맵 페이지 (`/roadmap`) · Scope 3 15 카테고리 · IPPU 5 카테고리 계획 명시

### Changed

- **팔레트** → warmer ivory (`#f5f2ec`) + terracotta accent (`#b8532a`) · maturity 색상 재조정
- **폰트** → IBM Plex Sans / IBM Plex Sans KR / IBM Plex Mono 3 종 (Geist 제거)
- **뱃지** → 대괄호 (`[verified]` 등) → 도트 + 소문자 (`● verified`) · Cell / AuditSummary / roadmap 통일
- **결과 요약** → `dl` 명시 라벨화 (AI 티 나는 나열 제거)
  - 냉매: 냉매 / 연간 / 기준
  - Scope 1: 연료 / 사용량 / 조건 (열량·배출 tier + GWP)
  - Scope 2: 공급원 / 사용량
- **"GWP 판"** · **"GWP 기준 · assessment"** → **"기준 · GWP ver."** 통일 (냉매·Scope 1·Scope 2 3 곳)
- SAR/AR4/AR5/AR6 옵션에 실무 힌트 부착 (K-ETS 지침 · UNFCCC NIR · EU CSRD)
- 모든 페이지 header · 설명 두 문단 분리 + `text-pretty` 적용
- `SectionHeader` · Roman numerals 제거 (계산기 각 페이지 I/II/III/IV 미사용)
- 랜딩 · `carbon/trace` 헤드라인 · `absolute` pseudo 로 밑줄 (`border-b` 대신 · line-box 유지)
- 랜딩 · 폭 `max-w-5xl` → `max-w-6xl` · principle wrap 여유

---

## v0.3 · 2026-09-04 · Scope 2 진입 + 데이터 프로파일

**Scope 2 (외부 공급 전기·열) 를 처음부터 감사 가능한 형태로 구현. 데이터 프로파일 시스템으로 xlsm 오류를 정정할 선택지 제공.**

### Added

- **Scope 2 계산기** (`/scope2`) · 전력 · KDHC 열 · 국가 통합 열
- 전력 배출계수 · GIR 승인 2017 년 판 · 2022 년 판 모두 `verified`
- KDHC (한국지역난방공사) 지사별 8 개 × 계획기간 3 기·4 기 = 16 값 `documented`
- 국가 통합 3 종 (열전용·열병합·열평균) · 원출처 미상 · `asserted` + ⚠ warning
- 최신 정보 참조: 2024 년 승인 판 (2025-03-31 공표) · 2023 년 판 (2025-12-18 공표)
- **데이터 프로파일 시스템** · [`src/data/factors/corrections.ts`](../src/data/factors/corrections.ts)
  - `xlsm-original` (파리티 보존 · 기본)
  - `xlsm-corrected` (33 건 정정 · 상세는 [`DATA-PROFILES.md`](./DATA-PROFILES.md))
  - `gir22-latest` (33 정정 + GIR 2022.1 최신 26 건)
- `tests/dataProfile.test.ts` 신규 · 각 프로파일 override 검증

### Changed

- Scope 2 는 xlsm 이 CO2 만 계산한 것을 넘어 CH4/N2O 도 완전 계산 · 다중 GWP 판 선택 지원

---

## v0.2 · 2026-09-02 · 감사 가능성 (auditability) 재정의

**"xlsm 어느 셀에서 왔다" 대신 "IPCC/GIR/K-ETS 어느 원문서 표·페이지·행에서 왔다" 로 감사 트레일을 재정의.**

### Added

- `PrimarySource` 타입 · [`src/data/sources.ts`](../src/data/sources.ts) 원문서 카탈로그
- 4 단계 성숙도 · `verified` / `documented` / `asserted` / `pending`
- [`src/data/verified/*.json`](../src/data/verified/) · 값 단위 원문서 매핑 파일
  - `kets-annex-6.json` · 산화계수 6 개 조항 위치
  - `ipcc-2006-vol2-ch1.json` · T1 열량·탄소함량·CO2 EF 164 개 표·행 매핑
  - `ipcc-2006-vol2-ch2.json` · T1 CH4/N2O 109 개 (Table 2.2) + T2 CH4/N2O 90 개 (Table 2.5)
  - `ipcc-sar-1995.json` · `ipcc-ar4-2007.json` · `ipcc-ar5-2014.json` · `ipcc-ar6-2021.json` · GWP 4 판 12 개
  - `kets-annex-12.json` · T2 순발열량 27 개 + 국가고유 배출계수 42 개
  - `gir-ef-2017.json` · 경유·도시가스LNG 세분화 값 4 개
- 승격 파이프라인 · `scripts/build_scope1_data.py` + `tests/verified.sources.test.ts`
- **총 454 measurements** 를 `verified` 로 승격 완료
- **⚠ warning 뱃지** · Cell 컴포넌트에 xlsm 원본 오류 시각 표시 (등유·항공유 뒤바꿈 등)
- Vitest 파리티 137/137 유지 (`xlsm-original` 프로파일 기준)

### Fixed

- 원본 xlsm T2 EF 오작성 2 건 확정: 등유·항공유 뒤바꿈. 두 값에 `⚠` note + `maturity: asserted` 명시 강등 (문서 자체는 verified 이지만 해당 값 자체가 의심스러움을 유지)

### Documented

- 등유·항공유 뒤바꿈 원인 · K-ETS 별표 12 표 B (석유(16) 그룹) 로 확정
- 석탄 T2 N2O 오작성 원인 · IPCC Table 2.5 대조로 확정 (Peat 값 1.4 를 다른 석탄에도 오적용)
- 가스류·아황산염 오분류 원인 · IPCC Table 2.5 특수 그룹 대조로 확정
- 경유 20.111 · 도시가스LNG 15.272 원출처 확정 · GIR 2017 년 승인분 세분화값 (KEEI 민선영·최용옥 2024 학술 문헌 대조)

---

## v0.1 · 2026-08 · 초기 릴리스

**원본 xlsm (`GHGCalc_V0m_lja.xlsm`) 을 웹으로 옮기되 감사성을 유지하는 실험적 첫 릴리스.**

### Added

- Scope 1 · 1A4 기타 (건물) 고정연소 계산기 (`/scope1`)
- 63 개 연료 (석유류 · 석탄류 · 가스류 · 기타 화석연료 · 바이오매스)
- 열량계수 T1 (IPCC 순발열량) / T2 (국가고유 2017 년) / T3 (사용자 입력)
- 배출계수 T1 (IPCC) / T2 (GIR 국가고유) / T3
- 산화계수 참조표 (상온 × Tier)
- GWP 4 판: SAR (국가 인벤토리) / AR4 / AR5 / AR6 선택
- **원본 xlsm 파리티 137/137** · 소수점 이하 15 자리까지 일치
- `Cell` 컴포넌트 · 값 + 근거 팝오버 (도구의 시그니처)
- 파생값 재귀 파고들기 · 트리 끝에서 원문서 도달 보장
- 계산 엔진과 데이터 완전 분리 · 각 값 `{ value, unit, primarySource }` 형태

### Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Vitest (파리티 테스트)
- Python 3 + openpyxl (원본 xlsm → 데이터 파이프라인)
