# carbontrace · 개발자 가이드

> 신규 배출원·데이터 프로파일·기능 추가 방법. 감사성 원칙을 깨지 않으면서 확장.

---

## 아키텍처

```
┌────────────────────────────────────────────────────────────┐
│  UI                                                        │
│  src/app/{scope1,scope2,refrigerant,roadmap}/*             │
│  src/components/{cell,audit,fuel}/*                        │
└────────────┬───────────────────────────────────────────────┘
             │
┌────────────▼───────────────────────────────────────────────┐
│  계산 엔진                                                 │
│  src/lib/calc/{scope1,scope2,refrigerant}.ts               │
│  src/lib/audit/summary.ts                                  │
└────────────┬───────────────────────────────────────────────┘
             │
┌────────────▼───────────────────────────────────────────────┐
│  데이터 (자동 생성 + verified 오버레이 + corrections)      │
│  src/data/factors/{fuels,scope2,refrigerants}.gen.ts       │
│  src/data/factors/corrections.ts    (프로파일 오버라이드)  │
│  src/data/sources.ts                (primary source 카탈로그)│
│  src/data/verified/*.json           (값 단위 verified 매핑) │
└────────────┬───────────────────────────────────────────────┘
             │
┌────────────▼───────────────────────────────────────────────┐
│  빌드 파이프라인                                           │
│  scripts/build_*_data.py            (xlsm → *.gen.ts)      │
│  scripts/extract_xlsm.py            (xlsm → raw json)      │
└────────────────────────────────────────────────────────────┘
```

### 핵심 타입 3개

1. **`Measurement`** (`src/data/factors/types.ts`)
   ```ts
   type Measurement = {
     value: number;
     unit?: string;
     primarySource: PrimarySource;
   };
   ```
   모든 계수·상수는 이 타입. `value` 만 있는 raw number 를 인자로 쓰지 마라.

2. **`PrimarySource`** (`src/data/sources.ts`)
   ```ts
   type PrimarySource = {
     kind: SourceKind;   // "ipcc" | "gir" | "kets-guideline" | "kdhc" | ...
     docId: string;      // 카탈로그 키
     doc: string;
     publisher: string;
     edition?: string;
     part?: string;
     table?: string;
     page?: string;
     row?: string;
     url?: string;
     maturity: "verified" | "documented" | "asserted" | "pending";
     reviewedAt?: string;
     note?: string;      // 특이사항 (⚠ 로 시작하면 UI warning 배지 표시)
   };
   ```

3. **`Calculated`** (`src/lib/calc/types.ts`)
   ```ts
   type Calculated = Measurement & {
     formula: string;
     inputs: (Measurement | Calculated | UserInput | Constant)[];
   };
   ```
   중간 계산 결과. `inputs` 를 통해 재귀 감사.

---

## 신규 배출원 추가 · 5 단계

예: Scope 3 카테고리 6 · 출장 (business travel) 추가.

### 1. Primary source 등록

`src/data/sources.ts` 에 원문서 정의:

```ts
export const GHG_PROTOCOL_S3_CH6: PrimarySource = {
  kind: "documented" as SourceKind,
  docId: "ghg-protocol-s3-ch6",
  doc: "GHG Protocol Scope 3 Standard · Ch.6 Business Travel",
  publisher: "World Resources Institute · WBCSD",
  edition: "2011년 9월",
  page: "36-42",
  url: "https://ghgprotocol.org/sites/default/files/standards/Corporate-Value-Chain-Accounting-Reporing-Standard_041613_2.pdf",
  maturity: "documented",
  reviewedAt: "2026-01-15",
  note: "GHG Protocol Scope 3 Standard 6장. 항공·철도·자동차 이동 배출량 산정 방법론.",
};
```

**성숙도 판정 기준**:
- `verified` — 원문서 열어서 표·행·값 3개 모두 재확인 완료
- `documented` — 문서·페이지 참조 확인 (표·값 개별 검증은 후속)
- `asserted` — xlsm 저자 또는 초기 세팅자가 주장한 값. 원문서 확인 대기
- `pending` — 조사 중 · 값이 있지만 근거 미조사

### 2. 계수 데이터 파일 생성

`src/data/factors/business-travel.gen.ts`:

```ts
import type { Measurement } from "@/data/factors/types";
import { GHG_PROTOCOL_S3_CH6 } from "@/data/sources";

function m(value: number, unit: string, extra_note?: string): Measurement {
  return {
    value,
    unit,
    primarySource: {
      ...GHG_PROTOCOL_S3_CH6,
      ...(extra_note ? { note: `${GHG_PROTOCOL_S3_CH6.note} · ${extra_note}`, maturity: "asserted" } : {}),
    },
  };
}

export const AIR_TRAVEL_EF = {
  domestic: m(0.15, "kgCO2eq/km/passenger"),  // 국내선
  shortHaul: m(0.09, "kgCO2eq/km/passenger"), // 단거리 국제선
  longHaul: m(0.11, "kgCO2eq/km/passenger"),  // 장거리 국제선
};
```

xlsm 유래 데이터라면 `scripts/build_*_data.py` 로 파이썬에서 생성. 그렇지 않으면 손으로 작성.

### 3. 계산 엔진

`src/lib/calc/business-travel.ts`:

```ts
import type { Calculated } from "./types";
import { AIR_TRAVEL_EF } from "@/data/factors/business-travel.gen";

export type BusinessTravelInput = {
  travelType: "domestic" | "shortHaul" | "longHaul";
  distanceKm: number;
  passengers: number;
};

export function calculateBusinessTravel(input: BusinessTravelInput): Calculated {
  const ef = AIR_TRAVEL_EF[input.travelType];
  const distance: Measurement = { value: input.distanceKm, unit: "km", primarySource: /* USER_INPUT_SRC */ };
  const passengers: Measurement = { value: input.passengers, unit: "명", primarySource: /* USER_INPUT_SRC */ };

  const value = ef.value * input.distanceKm * input.passengers / 1000;

  return {
    value,
    unit: "tCO2eq",
    primarySource: ef.primarySource,
    formula: "배출계수 × 거리 × 인원 × 10⁻³",
    inputs: [ef, distance, passengers],
  };
}
```

### 4. UI

`src/app/scope3/business-travel/page.tsx`:

```tsx
export const metadata = { title: "Scope 3 · 출장 · carbontrace" };
export default function Page() {
  return <BusinessTravelCalculator />;
}
```

`src/app/scope3/business-travel/BusinessTravelCalculator.tsx` — 다른 계산기 (Scope2Calculator.tsx · RefrigerantCalculator.tsx) 를 참고. 다음 3개 확보 필수:

- 입력 패널
- `<Cell />` 컴포넌트로 계산 결과 렌더
- `<AuditSummaryCard />` 로 감사 요약 표시

### 5. 테스트

`tests/business-travel.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { calculateBusinessTravel } from "@/lib/calc/business-travel";

describe("business travel · GHG Protocol Scope 3 Ch.6", () => {
  it("국내선 1000km 2명 = ...", () => {
    const result = calculateBusinessTravel({
      travelType: "domestic",
      distanceKm: 1000,
      passengers: 2,
    });
    expect(result.value).toBeCloseTo(0.3, 4);
    expect(result.primarySource.docId).toBe("ghg-protocol-s3-ch6");
  });
});
```

랜딩 페이지 · 로드맵 페이지에 링크 추가.

---

## 신규 데이터 프로파일 추가

Scope 1 에 신규 프로파일 (예: "IPCC AR6 배출계수 통합판") 을 추가하려면:

1. `src/data/factors/corrections.ts` 의 `DataProfile` union 에 새 리터럴 추가.
2. 오버라이드 dict 정의 (fuelId → { propertyKey → Measurement }).
3. `getOverride` 스위치에 신규 프로파일 처리.
4. UI (`Scope1Calculator.tsx`) 의 프로파일 라디오 버튼에 추가.
5. `DATA_PROFILE_LABELS` · `DATA_PROFILE_DESC` 채우기.
6. `tests/dataProfile.test.ts` 에 검증 케이스 추가.

**Override 시 주의**:
- 원본 값과 다르면 `primarySource.note` 에 반드시 근거 명시
- 원본 xlsm 정정이면 `⚠` 로 시작 (UI 배지 트리거)
- 원본 xlsm 값과 계산 결과가 크게 달라지면 파리티 테스트가 깨질 수 있으므로,
  파리티 테스트는 `xlsm-original` 프로파일로 실행되도록 유지.

---

## Primary source note 표준

`note` 필드는 감사자가 팝오버에서 보는 텍스트. 다음 규칙을 지킨다.

### 형식 규칙

1. **첫 문자로 상태 신호**:
   - `⚠` : 원본 오작성 · 값 재확인 필요 → UI 에 warning 배지
   - 일반 문장 : 참고 정보

2. **문장 부호 · 톤**:
   - 한국어 · 문장 · 마침표 (`.`) 종결
   - 감사자·심사원이 읽는 문서. 개발자 slang 금지.
   - 사적 의견·평가 언급 금지 (사실만).

3. **구조 (권장)**:
   ```
   [상황 요약]. [원문서 참조]. [현재 처리 방식].
   ```

### 예시

**verified 케이스**:
```
K-ETS 별표 12 표 A · 아역청탄. tC 24.83 kg/GJ 를 24.83 × 44/12 × 1000 = 91,043.33 kgCO2/TJ 로 파생.
```

**warning 케이스**:
```
⚠ xlsm 원본 오작성. 저자가 등유·항공유 값을 뒤바꿔 넣음.
정확한 별표 12 등유 = 19,969 kgC/TJ (73,153 kgCO2/TJ) · 항공유 = 19,499 kgC/TJ (71,430 kgCO2/TJ).
xlsm-corrected 프로파일에서 자동 정정.
```

**asserted 케이스**:
```
xlsm 원본에서 사용된 값. 원문서 확인 대기. GIR 2017년 승인 판으로 추정되나 표 참조 미확인.
```

**documented 케이스**:
```
GIR 2022년 승인 · 2023년 공표 국가고유 배출계수. 표 A · 5번째 값. 원문서 표 값 재확인 대기.
```

---

## 계산 엔진 확장 규칙

### 1. 모든 값은 `Measurement` 로

```ts
// ❌ Bad
const factor = 24.83;

// ✅ Good
const factor: Measurement = {
  value: 24.83,
  unit: "kgC/GJ",
  primarySource: KETS_ANNEX_12,
};
```

### 2. 계산 결과는 `Calculated` 로

```ts
// ✅ 결과값·수식·인자를 함께 리턴
return {
  value: computed,
  unit: "tCO2eq",
  primarySource: sourceOfMostAuthoritativeInput,
  formula: "사용량 × 발열량 × 배출계수 × 10⁻⁶",
  inputs: [amount, ncv, ef],
};
```

`inputs` 는 실제 계산에 들어간 값들. Cell 컴포넌트가 자동 렌더.

### 3. 파리티 테스트는 원본 값 기준

xlsm 을 참조하는 계산은 원본 xlsm 값 기준으로 파리티. 프로파일 오버라이드는 별도 테스트.

### 4. 감사 요약 자동화

`src/lib/audit/summary.ts` 의 `summarizeAll(result)` 를 UI 에서 호출하면
maturity 분포 · warning · 사용 문서 자동 집계. 신규 배출원도 이걸 그대로 쓴다.

---

## 자동 생성 규칙

`src/data/factors/*.gen.ts` 파일은 손으로 편집 금지. 편집하면 다음 빌드 때 덮어써짐.

값을 바꾸려면:
- xlsm 자체를 수정 (본부장님 소유가 아니라면)
- 또는 `src/data/factors/corrections.ts` 에 프로파일 오버라이드 추가
- 또는 `src/data/verified/*.json` 에 verified 매핑 추가 후 재빌드

빌드 명령:
```bash
python scripts/build_scope1_data.py
python scripts/build_scope2_data.py
```

---

## 커밋 · PR 규칙

`c:\Workspace\AGENTS.md` 상위 규칙 준수:
- 사적 의견·인물평·감정 표현 금지
- 사실과 결정만
- 커밋 메시지는 `git commit -F <file>` 로 (PowerShell heredoc 미지원)

배출계수·GWP 값 변경 커밋은 반드시 다음을 포함:
1. 원문서 링크
2. 표·페이지·행
3. 확인일자
4. `sources.ts` 의 `note` 필드 갱신
5. 파리티/verified 테스트 갱신
