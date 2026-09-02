# carbontrace

> 온실가스 배출량 산정 도구. **모든 숫자가 근거를 달고 다닌다.**
>
> IPCC 2006 GL · 온실가스 배출권거래제(K-ETS) 지침 기반.  
> v0.1 · Scope 1 (연료 연소) 전용.

---

## 왜 이걸 만들었나

배출량 산정은 **사업자 자기보고**다. 검증기관이 매번 원자료를 역추적해야 하고,
그 과정이 검증 비용의 대부분을 차지한다.

원본 엑셀은 셀을 클릭하면 왜 그 값인지 수식이 보인다. 검증자가 셀을 열어 확인할 수 있다.
반면 대부분의 웹 계산기는 결과만 낸다. 만든 사람만 안다.

**감사받는 숫자를 다루는 도구에서는 이 차이가 결정적이다.**

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
npm test   # Vitest 파리티 8/8 + verified 14/14 PASS (170 measurements 승격)
```

---

## 지금 담긴 범위 (v0.1)

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
│  │  │  └─ ipcc-2006-vol2-ch1.json  # ← T1 열량 · 탄소함량 · CO2 EF 164개 표 · 행 매핑
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
| 열량계수 T2 | K-ETS 지침 별표 11 (국가고유 발열량) | asserted |
| 탄소함량 T1 | IPCC 2006 GL Vol.2 Ch.1 Table 1.3 (p.1.21–1.22) | **verified** (2026-09-02, 55개 값) |
| CO2 배출계수 T1 | IPCC 2006 GL Vol.2 Ch.1 Table 1.4 (p.1.23–1.24) | **verified** (2026-09-02, 55개 값) |
| CH4/N2O 배출계수 T1 | IPCC 2006 GL Vol.2 Ch.2 (섹터별) | asserted (다음 세션) |
| 배출계수 T2 | GIR 국가 고유 배출계수 (2017) | asserted |
| 산화계수 T1 | K-ETS 지침 별표 6 (각 배출활동 §④) | **verified** (2026-09-02) |
| 산화계수 T2 | K-ETS 지침 별표 6 (각 배출활동 §④) | **verified** (2026-09-02) |
| GWP (SAR) | 국가 온실가스 인벤토리 보고서 채택 (원출처 IPCC SAR 1995) | documented |
| GWP (AR4/5/6) | IPCC AR4 (2007) / AR5 (2014) / AR6 (2021) | documented |
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

---

## 만든 사람

이정아 · EAN Technology 기술연구소  
askwhy 님이 만든 [co2scope](https://co2scope.askwhy.works) (본부 배포판) 와는 별도 프로젝트.

## 라이선스

MIT
