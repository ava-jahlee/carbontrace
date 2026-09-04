# 데이터 프로파일 (Data Profiles)

원본 xlsm 은 훌륭히 만들어졌지만, **작은 오작성 · 오분류가 몇 건 남아 있습니다.**
GIR (온실가스종합정보센터) 국가고유 배출계수도 그 사이 개정되었습니다.

carbontrace 는 다음 셋 중 하나를 사용자가 선택하도록 합니다:

| 프로파일 | override | 성격 |
| --- | --- | --- |
| **`xlsm-original`** | 0 건 | 원본 xlsm 그대로 · 파리티 보존 · 기본 |
| **`xlsm-corrected`** | **33 건** | xlsm 원본 오류만 정정 · 국가고유 배출계수는 xlsm 판 (GIR 2017 승인) 유지 |
| **`gir22-latest`** | **59 건** | 정정 + GIR 2022.1 공표 최신 국가고유 배출계수 반영 |

원본 오류가 있는 값에는 UI 에서 **⚠ warning** 뱃지가 붙어서 · 어느 프로파일을 쓰든 감사자가 즉시 인지할 수 있습니다.

---

## 1. `xlsm-original` · 원본 파리티

원본 xlsm (`GHGCalc_V0m_lja.xlsm`) 이 저장 시점에 계산해 둔 값과 소수점 이하 15 자리까지 일치합니다. 파리티 테스트 137/137 이 이 프로파일을 검증합니다.

**용도**

- 원본 저자와 값을 정확히 대조해야 할 때
- xlsm 을 대체하지 않고 병행 운영할 때
- 검증기관이 "원본 계산기 그대로 확인" 요구할 때

**주의**

- 아래 `xlsm-corrected` 목록의 33 건은 원본 오류가 그대로 남습니다. UI 는 ⚠ warning 뱃지로 표시합니다.

---

## 2. `xlsm-corrected` · xlsm 원본 오류 정정 (33 건)

원본 저자가 잘못 넣은 값 33 건을 정정합니다. GIR 국가고유 배출계수 자체는 xlsm 이 담은 판 (2017 승인) 을 유지합니다.

### 2-1. 등유 · 항공유 T2 tC 뒤바꿈 (4 건)

원본 저자가 등유·항공유 두 값을 뒤바꿔 넣은 것으로 확인. K-ETS 별표 12 표 B (석유(16) 그룹) 기준으로 원상복구.

| Fuel | Field | xlsm 원본 | 정정값 | 원문서 |
| --- | --- | --- | --- | --- |
| 등유 (기타 등유) | T2 tC/TJ | 19.931 | **19.969** | K-ETS 별표 12 표 B (p.3) · 등유 정확값 |
| 등유 (기타 등유) | T2 CO2 (kgCO2/TJ) | 73,079.67 | **73,152.67** | 정정 tC × 44/12 × 1000 |
| 제트용 등유 (항공유) | T2 tC/TJ | 19.969 | **19.931** | K-ETS 별표 12 표 B (p.3) · 항공유 정확값 |
| 제트용 등유 (항공유) | T2 CO2 (kgCO2/TJ) | 73,152.67 | **73,080.33** | 정정 tC × 44/12 × 1000 |

> **감사 자국**: xlsm 등유(19.931) = 별표 12 항공유값 · xlsm 항공유(19.969) = 별표 12 등유값. 두 값을 서로 바꿔 넣은 오작성으로 판정.

### 2-2. 석탄류 T2 N2O = 1.4 → 1.5 (13 건)

원본 xlsm 은 Peat (이탄) 의 N2O = 1.4 값을 다른 석탄에도 그대로 넣었으나, IPCC 2006 Vol.2 Ch.2 **Table 2.5 (Residential and Agriculture)** 는 Peat 만 1.4, 그 외 석탄류는 모두 **1.5** 로 규정.

| Fuel | IPCC Category | xlsm 원본 | 정정값 |
| --- | --- | --- | --- |
| 국내 무연탄 | Anthracite | 1.4 | **1.5** |
| 연료용 수입 무연탄 | Anthracite | 1.4 | **1.5** |
| 원료용 수입 무연탄 | Anthracite | 1.4 | **1.5** |
| 원료용 유연탄 (점결탄) | Coking Coal | 1.4 | **1.5** |
| 연료용 유연탄 (기타 유연탄) | Other Bituminous Coal | 1.4 | **1.5** |
| 아역청탄 (하위 유연탄) | Sub-Bituminous Coal | 1.4 | **1.5** |
| 갈탄 | Lignite | 1.4 | **1.5** |
| 유혈암 및 역청암 | Oil Shale and Tar Sands | 1.4 | **1.5** |
| 갈색 연탄 | Brown Coal Briquettes | 1.4 | **1.5** |
| 특허 연료 | Patent Fuel | 1.4 | **1.5** |
| 코크스로 코크스 (석탄) | Coke Oven Coke | 1.4 | **1.5** |
| 가스공장 코크스 (가스 코크스) | Gas Coke | 1.4 | **1.5** |
| 콜타르 | Coal Tar | 1.4 | **1.5** |

> **원문서**: IPCC 2006 GL Vol.2 Ch.2 Table 2.5 · p.2.22–2.23 · `docs/refs/ipcc-2006-vol2-ch2.pdf`

### 2-3. 가스류 T2 CH4·N2O 재분류 (14 건)

xlsm 은 가스류 (매립지가스·슬러지가스·고로가스 등) 를 300/1.4 또는 300/4.0 그룹에 넣었지만, Table 2.5 기체 그룹은 모두 **CH4 = 5 · N2O = 0.1** 입니다.

| Fuel | IPCC Category | xlsm CH4 / N2O | 정정 CH4 / N2O |
| --- | --- | --- | --- |
| 가스공장 가스 | Gas Works Gas | 300 / 1.4 | **5 / 0.1** |
| 코크스로 가스 | Coke Oven Gas | 300 / 1.4 | **5 / 0.1** |
| 고로가스 | Blast Furnace Gas | 300 / 1.4 | **5 / 0.1** |
| 산소 강철로 가스 | Oxygen Steel Furnace Gas | 300 / 1.4 | **5 / 0.1** |
| 매립지 가스 | Landfill Gas | 300 / 4.0 | **5 / 0.1** |
| 슬러지 가스 | Sludge Gas | 300 / 4.0 | **5 / 0.1** |
| 기타 바이오가스 | Other Biogas | 300 / 4.0 | **5 / 0.1** |

> **원문서**: IPCC 2006 GL Vol.2 Ch.2 Table 2.5 · p.2.22–2.23

### 2-4. 아황산염 잿물 T2 CH4·N2O 재분류 (2 건)

아황산염 잿물 (Sulphite Lyes / Black Liquor) 은 특수 화학 그룹 (3 / 2) 인데, xlsm 은 일반 폐기물 그룹 (300 / 4) 에 넣음.

| Fuel | IPCC Category | xlsm CH4 / N2O | 정정 CH4 / N2O |
| --- | --- | --- | --- |
| 아황산염 잿물 | Sulphite Lyes (Black Liquor) | 300 / 4 | **3 / 2** |

> **원문서**: IPCC 2006 GL Vol.2 Ch.2 Table 2.5 · p.2.22–2.23 · 특수 화학연료 그룹

---

## 3. `gir22-latest` · GIR 2022.1 최신 국가고유 반영 (33 + 26 = 59 건)

`xlsm-corrected` 정정 33 건에 더해, GIR (온실가스종합정보센터) 이 2022.1 공표한 **국가고유 배출계수 25 건 중 우리 fuel 매핑이 확실한 13 건** 을 반영합니다. 각 fuel 마다 tC + CO2 두 필드씩 = 26 건.

| Fuel | Label | xlsm (2017 승인) tC | GIR 2022.1 tC |
| --- | --- | --- | --- |
| 경유 (가스디젤 오일) | 경유 | 20.111 | **20.090** |
| 도시가스 (LNG) | 도시가스(LNG) | 15.272 | **15.236** |
| 천연가스 (LNG) | 천연가스(LNG) | 15.312 | **15.281** |
| 휘발유 (자동차용 가솔린) | 휘발유 | 19.700 | **19.731** |
| 등유 (기타 등유) | 등유 | 19.969 (정정 후) | **19.926** |
| 제트용 등유 (항공유) | 항공유(JET-A1) | 19.931 (정정 후) | **19.956** |
| B-A유 | B-A유 | 20.395 | **20.440** |
| B-B유 | B-B유 | 20.869 | **20.900** |
| B-C유 (잔여 석유연료) | B-C유 | 21.216 | **21.249** |
| 프로판 (LPG1호) | 프로판(LPG1호) | 17.581 | **17.630** |
| 부탄 (LPG3호) | 부탄(LPG3호) | 18.058 | **18.094** |
| 국내 무연탄 | 국내무연탄 | 29.612 | **29.705** |
| 연료용 수입 무연탄 | 수입무연탄(연료용) | 27.320 | **27.320** |

> **원문서**: EG-TIPS 에너지온실가스 종합정보 플랫폼 「에너지 발열량 및 온실가스 배출계수 → 연료연소 부문(25개) 배출계수 (2022.1)」

> **참고**: 위 값들은 K-ETS 지침 별표 12 (2025-04-11 개정) 에 소수점 3 자리로 대부분 재수록되었으며, 국가 인벤토리 (NIR) 최신 실무는 이 판을 사용합니다.

---

## 어떤 프로파일을 언제 쓰나

| 상황 | 권장 프로파일 |
| --- | --- |
| **원본 xlsm 병행 운영** · 저자·검증기관이 "원본 계산기 그대로" 요구 | `xlsm-original` |
| **원본 오류만 정정** · xlsm 을 대체하되 국가고유 배출계수 판은 유지 | `xlsm-corrected` |
| **최신 실무 · K-ETS 5기 대비** · GIR 2022.1 최신값 반영 | `gir22-latest` |
| **국제 ESG · EU CSRD** 목적 | `gir22-latest` + GWP AR6 |
| **국가 인벤토리 (NIR) 대조** | `gir22-latest` + GWP AR5 |
| **배출권거래제 (K-ETS) 실무** | `xlsm-original` 또는 `xlsm-corrected` + GWP SAR |

---

## UI 사용법

Scope 1 계산기 좌측 **`데이터 프로파일`** 필드에서 선택. 프로파일 이름 아래 현재 몇 건의 override 가 적용 중인지 표시됩니다.

원본 xlsm 오류가 있는 값을 원본 프로파일 (`xlsm-original`) 로 볼 때, Cell 컴포넌트 옆에 **⚠ warning** 뱃지가 붙습니다. 뱃지 클릭 시 팝오버가 열려 오류 상세와 정정 지침을 확인할 수 있습니다.

---

## 코드에서 사용

```typescript
import { calculateScope1 } from "@/lib/calc/scope1";
import { countOverrides } from "@/data/factors/corrections";

// 원본
const orig = calculateScope1({
  fuelId: "아역청탄-하위-유연탄",
  amount: 1,
  heatTier: "T1",
  efTier: "T2",
  gwpStandard: "SAR",
  dataProfile: "xlsm-original",
});

// 정정판
const fixed = calculateScope1({
  ...orig,
  dataProfile: "xlsm-corrected",
});

// GIR 2022.1 최신
const latest = calculateScope1({
  ...orig,
  dataProfile: "gir22-latest",
});

console.log(countOverrides("xlsm-corrected"));  // 33
console.log(countOverrides("gir22-latest"));    // 59
```

---

## 감사 검증

- `tests/dataProfile.test.ts` · 각 프로파일이 override 를 실제로 적용하는지 검증
- `tests/scope1.parity.test.ts` · `xlsm-original` 이 원본 xlsm 값과 소수점 이하 15 자리까지 일치하는지 검증
- 각 override 는 `primarySource` 에 `note` 로 정정 원문서·근거·정정 전후값을 명시

---

## 관련 문서

- [`AUDIT-GUIDE.md`](./AUDIT-GUIDE.md) · 감사자용 walkthrough — 특정 값을 원문서까지 역추적하는 표준 5단계
- [`DEVELOPMENT.md`](./DEVELOPMENT.md) · 개발자 가이드 — 신규 배출원·데이터 프로파일 추가
- [`PRIMARY-SOURCE-NOTE-STANDARD.md`](./PRIMARY-SOURCE-NOTE-STANDARD.md) · `primarySource.note` 필드 작성 표준
- [`../src/data/factors/corrections.ts`](../src/data/factors/corrections.ts) · 정정 override 원본 코드
- [`CHANGELOG.md`](./CHANGELOG.md) · 버전별 릴리스 노트
