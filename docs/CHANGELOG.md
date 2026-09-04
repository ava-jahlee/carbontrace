# Changelog

carbontrace 는 [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 형식을 따릅니다.

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
