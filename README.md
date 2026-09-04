# carbontrace

> 온실가스 배출량 산정 도구. **모든 수치에는 근거가 필요합니다.**
>
> IPCC 2006 GL, 온실가스 배출권거래제 (K-ETS) 지침, GIR 국가고유 배출계수, KDHC 지사별 실측을 그대로 따릅니다.  
> v0.4 · Scope 1 (연료 · 냉매) + Scope 2 (전력 · 열) + 데이터 프로파일 + 확장성 로드맵.

---

## 추가 문서

- [`docs/AUDIT-GUIDE.md`](./docs/AUDIT-GUIDE.md) · 감사자용 walkthrough — 제3자 검증기관·심사원이 특정 값을 원문서까지 역추적하는 방법
- [`docs/DEVELOPMENT.md`](./docs/DEVELOPMENT.md) · 개발자 가이드 — 신규 배출원·데이터 프로파일·계수 추가 방법
- [`docs/PRIMARY-SOURCE-NOTE-STANDARD.md`](./docs/PRIMARY-SOURCE-NOTE-STANDARD.md) · Primary source `note` 필드 작성 표준

---

## 왜 이걸 만들었나

배출량 산정은 사업자 자기보고입니다. 검증기관이 매번 원자료를 역추적해야 하고,
그 과정이 검증 비용의 대부분을 차지합니다.

원본 엑셀은 셀을 클릭하면 그 값이 어떻게 나왔는지 수식이 보입니다. 검증자가 셀을 열어 확인할 수 있습니다.
반면 대부분의 웹 계산기는 결과만 냅니다. 만든 사람만 알 수 있습니다.

**감사받는 숫자를 다루는 도구에서는 이 차이가 결정적입니다.**

carbontrace 는 웹으로 옮기되 이 감사성을 잃지 않는 것을 목표로 한다.  
**단순히 "엑셀의 어느 셀에서 가져왔다" 가 아니라, 감사자가 원문서까지 바로 클릭해서 갈 수 있어야 한다** 는 것.

- 결과 값 옆의 `i` 를 누르면 → 수식 · 대입된 각 계수 · **각 계수의 원문서 (IPCC PDF · GIR 공식자료 · K-ETS 지침) 링크** 가 다 열린다.
- 파생값은 다시 파고들 수 있다. 트리를 계속 파내려가면 결국 감사 가능한 원문서에 도달한다.
- 계산 엔진과 데이터를 완전히 분리했다. 각 값은 `{ value, unit, primarySource }` 형태로 나른다.
  `primarySource` 는 발행처 · 판 · 표 · 페이지 · URL · 조사 성숙도(verified/documented/asserted/pending) 를 갖는다.

---

## 신뢰의 근거 — 파리티 테스트

원본 xlsm (`GHGCalc_V0m_lja.xlsm`) 이 저장 시점에 계산해 둔 값과
carbontrace 의 계산 엔진 결과를 소수점 10 자리 이상 자리에서 비교한다.

| 케이스 | 원본 xlsm 값 | carbontrace | 결과 |
|---|---|---|---|
| 아역청탄 1 ton · T1 열량 · T2 배출 · ∑ tCO2eq | `1.9248203519999998` | `1.9248203519999998` | ✅ PASS |
| CO2 tGHG | `1.7975477519999998` | `1.7975477519999998` | ✅ PASS |
| CH4 tCO2eq | `0.11907` | `0.11907` | ✅ PASS |
| N2O tCO2eq | `0.008202599999999999` | `0.008202599999999999` | ✅ PASS |

```bash
npm test   # Vitest 파리티 8/8 (Scope 1) + Scope 2 14/14 + verified 61/61
           #  + dataProfile 19/19 + audit summary 13/13 + refrigerant 22/22
           #  = 137/137 PASS
           # (454 measurements 승격 · xlsm 정정 override 33 건 · GIR 2022.1 최신 override 26 건)
```

Scope 2 파리티 (xlsm Main D42 = 35.991 tCO2, KDHC 4기 수도권지사 1 TJ):
| 케이스 | 원본 xlsm | carbontrace | 결과 |
|---|---|---|---|
| KDHC 4기 수도권지사 1 TJ · CO2 tCO2eq | `35.991` | `35.991` | ✅ PASS |
| GIR 2022년 승인 · 소비단 1 MWh · CO2 tCO2eq | `0.4747` | `0.4747` | ✅ PASS |

Scope 2 는 CH4/N2O 도 완전 계산하므로 총합 tCO2eq 는 xlsm 원본 (CO2 만 계산) 보다 약간 큼:
- KDHC 4기 수도권지사 1 TJ: xlsm 35.991 → carbontrace **36.025181** (+0.034, CH4·N2O 항 추가).

---

## 지금 담긴 범위 (v0.4)

- **Scope 1** — 1A4 기타 (건물) 고정연소 · 1B fugitive (냉매/F-gas)
- **Scope 2** — 외부 공급 전기·열 간접 배출
  - 전력: GIR 승인 국가 온실가스 배출계수 (2017년 승인 · 2022년 승인 두 판 verified)
  - 열/스팀 (KDHC): 지사별 8개 × 계획기간 3기·4기 = 16개 실측값
  - 열/스팀 (국가 통합 3종): 열전용·열병합·열평균 — 원출처 미상 (asserted + warning)
  - 최신 정보 참조: 2024년 승인 판 (2025-03-31 공표, 소비단 = 0.4541 tCO2eq/MWh) · 2023년 판 (2025-12-18 공표, 소비단 = 0.4173 tCO2eq/MWh)
- **원본 xlsm 넘어서기** — xlsm 이 CO2 만 계산한 Scope 2 CH4/N2O 도 완전 계산 · 다중 GWP 판 (SAR/AR4/AR5/AR6) 선택 지원

### 데이터 프로파일 (v0.3 신규)

원본 xlsm 은 훌륭히 만들었지만 다음 오류가 있음. carbontrace 는 원본 파리티를 지키면서
사용자가 정정판을 선택할 수 있는 **데이터 프로파일** 을 제공.

| 프로파일 | override | 설명 |
|---|---|---|
| `xlsm-original` | 0 건 | 원본 xlsm 그대로 (파리티 보존 · 기본) |
| `xlsm-corrected` | 33 건 | xlsm 오류만 정정 · GIR 국가고유는 xlsm 판 유지 |
| `gir22-latest` | 59 건 | 정정 + GIR 2022.1 공표 최신 국가고유 배출계수 |

정정 대상 (`xlsm-corrected`):
- **등유·항공유 T2 tC 뒤바꿈 4건** — xlsm 저자가 두 값을 뒤바꿔 넣은 것. 별표 12 표 B 기준으로 원상복구
- **석탄류 T2 N2O = 1.4 오작성 13건** — xlsm 이 Peat (이탄) 값 1.4 를 다른 석탄에도 그대로 넣음. IPCC Table 2.5 는 Peat 외 다른 석탄 모두 1.5
- **가스류 7건** — 매립지가스·슬러지가스·고로가스·산소강철로가스·가스공장가스·코크스로가스·기타바이오가스 T2 CH4/N2O 가 xlsm 300/(1.4 or 4) → Table 2.5 기체 그룹 5/0.1
- **아황산염 잿물 (Sulphite Lyes/Black Liquor)** — xlsm 300/4 → Table 2.5 3/2 (특수 화학 그룹)

추가 최신화 (`gir22-latest`):
- GIR 2022.1 공표 국가고유 배출계수 13개 반영 (경유 · 도시가스LNG · 천연가스LNG · 휘발유 · 등유 · 항공유 · B-A/B/C유 · 프로판/부탄 · 국내무연탄 · 수입무연탄)

### 냉매 · F-gas (v0.4 신규 · Scope 1 fugitive)

건물 냉방/냉장 설비 유출 배출량. IPCC 2006 Vol.3 Ch.7 Tier 1a screening.

지원 냉매 10종:
- 단일 HFC: HFC-134a · HFC-32 · HFC-125 · HFC-143a · HFC-152a
- 블렌드: R-410A · R-404A · R-407C
- 기타: SF6 (전기 절연) · NF3 (반도체)

각 냉매에 대해 SAR/AR4/AR5/AR6 4개 GWP 판 지원. 블렌드는 mass 비율 가중 GWP 자동 계산.

### 로드맵 (v0.4 신규 · `/roadmap`)

Scope 3 15개 카테고리 · IPPU 5개 카테고리 · 확장 예정 항목 목록 페이지.
각 항목에 상태 (완료/진행/예정) · 근거 문서 (GHG Protocol · IPCC Vol.3 · PCAF 등) 명시.

## 이전 범위 (v0.1)

- **Scope 1** — 1A4 기타 (건물) 고정연소
  - 63 개 연료 (석유류 · 석탄류 · 가스류 · 기타 화석연료 · 바이오매스)
  - 열량계수 T1 (IPCC 순발열량) / T2 (국가고유 17년) / T3 (사용자 입력)
  - 배출계수 T1 (IPCC) / T2 (GIR 국가고유) / T3
  - 산화계수 참조표 (상온 × Tier)
  - GWP: SAR (국가 인벤토리) / AR4 / AR5 / AR6 선택

## 앞으로 담을 것

배출량 산정에서 지금 웹 계산기들이 손대지 못하는 영역들이 있다.
carbontrace 는 이걸 하나씩 커버해 갈 예정이다.

- **냉매(HFC) 누출** — 건물 계산기에도 빠져 있는 구멍
- **배출활동 축 도입** — 연료 선택이 아닌 배출활동 선택으로. 건물이 그 위의 한 사례가 되도록
- **IPPU 주요 업종** — 시멘트 · 철강 · 반도체 (F-gas)
- **원천 연결** — 한전 파워플래너 · 국세청 전자세금계산서 등에서 직접 사용량 가져오기
- **감사 추적** — 원본 파일 해시 + 추출값 + 적용 계수 + 계산식을 함께 저장

---

## 개발

```bash
npm install
npm run dev            # Next.js dev 서버
npm test               # 파리티 테스트
npm run data:extract   # 원본 xlsm → raw JSON
npm run data:build     # raw JSON → TypeScript 계수 모듈 재생성
```

### 스택

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Vitest (파리티 테스트)
- Python 3 + openpyxl (원본 xlsm → 데이터 파이프라인)

### 폴더 구조

```
carbontrace/
├─ scripts/
│  ├─ extract_xlsm.py           # xlsm → src/data/raw/*.json
│  ├─ inspect_law_gl22.py       # (디버그) 시트 사람이 읽기 좋게 덤프
│  └─ build_scope1_data.py      # raw JSON → src/data/factors/*.gen.ts
├─ src/
│  ├─ data/
│  │  ├─ sources.ts             # 원문서 카탈로그 (IPCC · GIR · K-ETS · NIR · KDHC)
│  │  ├─ verified/              # 값 수준 원문서 매핑 (조사 릴리스 산출물)
│  │  │  ├─ kets-annex-6.json   # ← 산화계수 6개 조항 위치 매핑
│  │  │  ├─ ipcc-2006-vol2-ch1.json  # ← T1 열량 · 탄소함량 · CO2 EF 164개 표 · 행 매핑
│  │  │  ├─ ipcc-2006-vol2-ch2.json  # ← T1 CH4/N2O EF 109개 (Table 2.2) + T2 CH4/N2O 90개 (Table 2.5)
│  │  │  ├─ ipcc-sar-1995.json       # ← GWP SAR 3개 (K-ETS 채택 값)
│  │  │  ├─ ipcc-ar4-2007.json       # ← GWP AR4 Table 2.14 3개
│  │  │  ├─ ipcc-ar5-2014.json       # ← GWP AR5 Table 8.7 3개
│  │  │  ├─ ipcc-ar6-2021.json       # ← GWP AR6 Table 7.SM.7 / 7.15 3개
│  │  │  └─ kets-annex-12.json       # ← T2 순발열량 27개 (별표 12 표 A)
│  │  ├─ raw/                   # 원본 xlsm 그대로 (git 커밋)
│  │  └─ factors/
│  │     ├─ types.ts            # Measurement (value + primarySource), Fuel, ...
│  │     ├─ fuels.gen.ts        # 63개 연료 (자동 생성)
│  │     ├─ oxidation.gen.ts    # 산화계수 (자동 생성)
│  │     └─ gwp.gen.ts          # GWP 세트 (SAR/AR4/AR5/AR6)
│  ├─ lib/calc/
│  │  ├─ types.ts               # Calculated, CalculatedInput, Scope1Input/Result
│  │  └─ scope1.ts              # Scope 1 계산 엔진 (원본 Main 시트 재현)
│  ├─ components/cell/
│  │  └─ Cell.tsx               # 값 + 근거 팝오버 (도구의 시그니처)
│  └─ app/
│     ├─ page.tsx               # 랜딩
│     └─ scope1/
│        ├─ page.tsx
│        └─ Scope1Calculator.tsx
└─ tests/
   ├─ scope1.parity.test.ts     # 원본 xlsm 값과 소수점 일치 검증
   └─ verified.sources.test.ts  # verified 매핑 승격 검증 (docId · row · maturity)
```

---

## 데이터 출처 (v0.1 카탈로그)

`src/data/sources.ts` 에 원문서 카탈로그를 두고 각 계수가 이 항목을 참조한다.
성숙도(maturity) 는 이번 릴리스에서 다음 단계로 나눴다.

- **verified** — 원문서 · 표 · 페이지 · 행까지 확인 완료
- **documented** — 원문서 · 표 확인 완료
- **asserted** — 문서명 · 표는 알지만 원문 재확인 예정
- **pending** — 원문서 재추적 미완료

| 항목 | 원문서 | 이번 릴리스 상태 |
|---|---|---|
| 열량계수 T1 | IPCC 2006 GL Vol.2 Ch.1 Table 1.2 (p.1.18–1.19) | **verified** (2026-09-02, 54개 값) |
| 열량계수 T2 | K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반) | **verified** (2026-09-02, 27개 값) |
| 배출계수 T2 (국가고유) | K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수) | **verified** (2026-09-02, 21개 연료 × 2 = 42개 값) |
| 배출계수 T2 (경유·도시가스LNG 세분화) | GIR 승인 국가고유 배출계수 · 2017년 승인 (2018.1 공표 추정) — 별표 12 병합값 대신 세분화값 참조 | **verified** (2026-09-02, 경유 20.111 · 도시가스LNG 15.272 각 tC + CO2 = 4개 값) — 근거: 민선영·최용옥 (2024) 에너지경제연구 23(1) <표 2> |
| 배출계수 T2 (등유·항공유 xlsm 오작성) | xlsm 저자가 별표 12 등유·항공유 값을 뒤바꿔 넣음 (등유=19.931=별표12 항공유값, 항공유=19.969=별표12 등유값) | asserted + ⚠ note (UI 배지) — 원본 정정 필요 |
| 배출계수 T2 참조 (감사용) | GIR 국가고유 배출계수 2022.1 공표 「연료연소 부문 25개」 | **verified** (2026-09-02, 25개 값 sources.ts note 에 등재) — xlsm 은 이 판을 사용하지 않지만 감사자용 최신 국가 공표 참조 |
| 탄소함량 T1 | IPCC 2006 GL Vol.2 Ch.1 Table 1.3 (p.1.21–1.22) | **verified** (2026-09-02, 55개 값) |
| CO2 배출계수 T1 | IPCC 2006 GL Vol.2 Ch.1 Table 1.4 (p.1.23–1.24) | **verified** (2026-09-02, 55개 값) |
| CH4/N2O 배출계수 T1 | IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Energy Industries, p.2.16–2.17) | **verified** (2026-09-02, 109개 값) |
| CH4/N2O 배출계수 T2 | IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Residential and Agriculture, p.2.22–2.23) | **verified** (2026-09-02, 90개 값) — 별표 6 은 T2 CH4/N2O 미규정, 실제 원출처가 지침이 아닌 IPCC 다른 부문 표라는 사실 확인 |
| 산화계수 T1 | K-ETS 지침 별표 6 (각 배출활동 §④) | **verified** (2026-09-02) |
| 산화계수 T2 | K-ETS 지침 별표 6 (각 배출활동 §④) | **verified** (2026-09-02) |
| GWP (SAR) | IPCC SAR 1995 WG1 SPM Table 4 · Ch.2 Table 2.9 | **verified** (2026-09-02) — K-ETS 배출권거래제 채택 값 |
| GWP (AR4) | IPCC AR4 2007 WG1 Ch.2 Table 2.14 | **verified** (2026-09-02) |
| GWP (AR5) | IPCC AR5 2013 WG1 Ch.8 Appendix 8.A Table 8.7 (w/o climate-carbon feedback) | **verified** (2026-09-02) — 한국 NIR 2024~ 채택 값 |
| GWP (AR6) | IPCC AR6 2021 WG1 Ch.7 Table 7.15 · 7.SM.7 | **verified** (2026-09-02) — CH4 27.9 (통합값, fossil 29.8 / non-fossil 27.0 미구분) |
| 지역난방 열 배출계수 | 한국지역난방공사 공시 | documented (Scope 2 예정) |
| GIR 국가 고유 배출계수 (2022 개정) | | pending (다음 릴리스에서 병합) |

v0.1 은 대부분 `asserted` 상태로 시작한다.  
"이 값이 어느 원문서에 있다" 는 알지만, **값 하나하나에 페이지·행까지 매핑하는 조사 릴리스** 를 별도로 돌려 `verified` 로 승격한다.

### 조사 릴리스 파이프라인

`src/data/verified/<doc-id>.json` 매핑 파일이 있으면 build 스크립트가:

1. 각 값의 `primarySource` 를 `{ ...카탈로그상수, row, note, reviewedAt }` 로 확장
2. `maturity` 를 `verified` 로 승격
3. 매핑의 `expectedValue` 와 실제 데이터가 다르면 stderr 경고 후 승격 취소 (사일런트 승격 방지)

`tests/verified.sources.test.ts` 가 승격된 값에 대해 `docId · row · maturity` 존재를 매 빌드마다 확인한다.

**진행 상황**

- ✅ 2026-09-02 · K-ETS 별표 6 산화계수 6개 값 — 각 배출활동 §④ 조항까지 매핑
- ✅ 2026-09-02 · IPCC 2006 GL Vol.2 Ch.1 T1 계수 164개 값 — Table 1.2 (NCV) · Table 1.3 (탄소함량) · Table 1.4 (CO2 EF) 각 표 · 행 · 페이지 매핑
   - CO2 EF 는 IPCC 표 하단 계산식 `C = A × B × 44/12 × 1000` 유도값 사용 (표 표시값은 반올림 값)
- ✅ 2026-09-02 · IPCC 2006 GL Vol.2 Ch.2 T1 CH4/N2O 계수 109개 값 — Table 2.2 (Energy Industries) 채택 근거로 우리 xlsm 값이 T2.2 와 정확히 일치 (석탄류 CH4=1 판정)
   - 목탄 CH4 만 우리 xlsm 값(30)이 어느 표에도 없어 asserted 유지 (원본 오류 가능성)
- ✅ 2026-09-02 · IPCC 2006 GL Vol.2 Ch.2 T2 CH4/N2O 계수 90개 값 — Table 2.5 (Residential and Agriculture) 매핑
   - **핵심 발견**: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정 (별표 10 IPCC 기본 배출계수 인용). Tier 2 CH4/N2O 규정이 지침에 존재하지 않음. xlsm T2 컬럼 값을 IPCC 다른 부문 표와 대조한 결과 **Table 2.5 (Residential)** 값과 일치 → 원본 xlsm 저자가 T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 두 부문을 담아둔 것으로 해석
   - **원본 xlsm 오작성 36건 발견** (GIR_EF_2017 유지 · 승격 안 됨):
     - 석탄 N2O = 1.4 (11개 fuel): Table 2.5 는 Peat 만 1.4, 다른 석탄은 모두 1.5 → xlsm 이 Peat 값을 다른 석탄에도 오적용
     - 가스류 그룹 오분류 (7개 fuel): 매립지가스·슬러지가스·기타바이오가스·고로가스·산소강철로가스·코크스로가스·가스공장가스 등 xlsm 300/1.4~4.0 vs Table 2.5 5/0.1
     - 액성천연가스·정제가스: xlsm 이 액체↔기체 분류 반대
     - 아황산염 잿물·기타 액체 바이오매스: xlsm 이 특수 그룹을 일반 폐기물 그룹으로 분류
- ✅ 2026-09-02 · GWP 4개 판 (SAR / AR4 / AR5 / AR6) 총 12개 값 — 각 IPCC 원본 PDF · 표 · 행까지 매핑
   - K-ETS 지침 별표 6 은 여전히 SAR (CH4=21 · N2O=310) 채택. 한국 국가 인벤토리(NIR) 는 2024년부터 AR5 (CH4=28 · N2O=265) 로 전환 (파리협정 투명성체계 대응)
   - AR6 CH4=27.9 는 Table 7.SM.7 의 순수 methane RF 값. Table 7.15 는 fossil methane 29.8 · non-fossil methane 27.0 로 분리 규정 → GHG Protocol 은 실무적으로 분리 사용 권장하나 본 계산기는 통합 값 27.9 유지
- ✅ 2026-09-02 · K-ETS 별표 12 T2 순발열량 27개 값 — 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반) 매핑
   - 전기(발전/소비기준)는 Scope 1 대상 아님으로 제외
   - 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구, 에너지관리공단
- ✅ 2026-09-02 · K-ETS 별표 12 T2 국가고유 배출계수 42개 값 — 표 B (21개 연료 × tC + CO2) 매핑
   - 매칭된 21개는 primary source 를 GIR_EF_2017 → KETS_ANNEX_12 로 전환 (표 B 가 최우선 원출처)
   - **불일치 4건 발견**: 등유(19.931) · 경유(20.111) · 항공유(19.969) · 도시가스LNG(15.272) 는 xlsm 값이 별표 12 값(등유·경유 병합 19.969 / 항공유 19.931 / 도시가스LNG·천연가스 병합 15.312) 과 달라 GIR 별도 공표계수 유지
   - CO2 계수는 표 표기 반올림값 vs `tC × 44/12 × 1000` 계산 유도값 차이를 note 에 명시 (IPCC Ch.1 접근과 동일)
- ✅ 2026-09-02 · GIR 국가고유 배출계수 2022.1 공표 25개 값 등재 (`GIR_EF_2022` verified) — 최신 국가 공표값을 감사자가 대조할 수 있도록 sources.ts note 에 전체 25개 값 하드코딩
   - 원문: EG-TIPS 에너지온실가스 종합정보 플랫폼 「에너지 발열량 및 온실가스 배출계수 → 연료연소 부문(25개) 배출계수(2022.1)」
   - 위 표에 있는 값들은 K-ETS 별표 12 (2025-04-11 개정) 에 소수점 3자리로 대부분 재수록됨
- ✅ 2026-09-02 · GIR 2017년 승인 국가고유 배출계수 (`GIR_EF_2017`) 정식화 · verified 승격
   - **원출처 추적 완료**: xlsm T2 tC 컬럼 4건 불일치 값의 정체를 학술 문헌 대조로 확정
   - 근거 문헌: 민선영·최용옥 (2024) 「월별 자료를 이용한 선도적인 에너지 분야 온실가스 배출량 산정」에너지경제연구 23(1):21-48 <표 2> · 자료출처: 환경부 온실가스종합정보센터(2022); 2021년 승인 국가 온실가스 배출·흡수계수
   - KEEI 표 헤더: `~06`(2006년까지 IPCC 기본) → `07~`(2007-2011 승인) → `12~`(2012-2016 승인) → **`17~`(2017년 승인, 2021년까지 5년 적용)** → `22~`(2022년 승인, GIR 2022.1 공표)
   - **경유 20.111 · 도시가스LNG 15.272 = 2017년 승인분 세분화값 확정**: 별표 12 표 B 는 배출권거래제 실무를 위해 등유·경유를 병합값(19.969)으로 · 천연가스·도시가스LNG 를 병합값(15.312)으로 축약하지만, GIR 원본 공표는 각 연료를 세분화. xlsm 저자는 별표 12 대신 GIR 세분화 원본을 참조
   - 두 값은 verified 승격 (verified/gir-ef-2017.json 신규 매핑 파일 · 4개 엔트리)
- ✅ 2026-09-02 · xlsm T2 EF 원본 오작성 2건 확정 (등유·항공유 뒤바꿈)
   - **등유·항공유 = xlsm 원본 오작성 확정**: xlsm 등유(19.931)=별표 12 항공유값, xlsm 항공유(19.969)=별표 12 등유값 → 저자가 두 값을 뒤바꿔 넣음
   - note 에 `⚠` 프리픽스 + 정확한 별표 12/GIR 2017/GIR 2022.1 값 + 정정 지침 명시
   - 문서(GIR_EF_2017)는 verified 이지만 이 두 값은 `maturity: "asserted"` 로 명시적 강등 (원본 값 자체가 의심스러움을 유지)
   - UI Cell 컴포넌트에 warning 배지 (⚠ 원출처 확인 요망) 구현 — 감사자에게 즉시 노출

---

## 만든 사람

이정아 · EAN Technology 기술연구소  
askwhy 님이 만든 [co2scope](https://co2scope.askwhy.works) (본부 배포판) 와는 별도 프로젝트.

## 라이선스

MIT
