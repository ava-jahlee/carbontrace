# verified/ — 값 수준 원문서 매핑

이 폴더의 JSON 파일은 각 계수 값이 **원문서의 어느 조항/페이지/표에서 왔는지**
값 하나하나에 매핑한다.

## 왜 별도 파일인가

- `src/data/sources.ts` 는 문서 카탈로그 — "IPCC 2006 GL Vol.2 Ch.1" 같은 **책 정보**.
- `src/data/verified/<doc-id>.json` 은 값 매핑 — "이 산화계수 값은 그 책의 § 1.④ Tier 2 에 있다" 같은 **값 단위 위치**.

`build_scope1_data.py` 실행 시 이 매핑 파일들을 로드해서:

1. 매핑에 있는 값은 `primarySource` 를 `{ ...카탈로그상수, row, note, reviewedAt }` 로 확장하고
   자동으로 `maturity: "verified"` 로 승격한다.
2. 매핑의 `expectedValue` 와 실제 데이터 값이 다르면 stderr 에 경고를 낸다 (사일런트 승격 방지).

## 스키마

```jsonc
{
  "$schema": "verified-source-map v1",
  "docId": "kets-annex-6",                  // sources.ts 의 docId 와 일치해야 함
  "reviewedAt": "2026-09-02",
  "entries": {
    "<lookup-key>": {
      "row": "문서 내 조항/행 라벨",
      "page": "1.24",                         // 선택
      "expectedValue": 0.98,                  // 실제 값과 대조되는 기대값
      "note": "발전 부문은 0.99, 기타부문은 0.98"
    }
  }
}
```

### lookup-key 규칙

`<카테고리>.<식별자>.<필드>` 형식.

| 대상 | 키 예시 |
|---|---|
| 산화계수 | `oxidation.고체.t1`, `oxidation.기체.t2` |
| 연료 열량 | `fuel.<fuelId>.heat.t1_net`, `fuel.<fuelId>.heat.t2_net` |
| 연료 배출계수 | `fuel.<fuelId>.ef.t1.CO2`, `fuel.<fuelId>.ef.t2.CH4` |
| GWP | `gwp.SAR.CO2`, `gwp.AR6.CH4` |

## 문서별 매핑 파일

| 파일 | 상태 | 값 개수 |
|---|---|---|
| `kets-annex-6.json` | verified (2026-09-02) | 6 / 6 |
| `ipcc-2006-vol2-ch1.json` | verified (2026-09-02) | 164 / 164 (Table 1.2/1.3/1.4) |
| `ipcc-2006-vol2-ch2.json` | verified (2026-09-02) | 199 / 236 (Table 2.2 T1 109/110 · Table 2.5 T2 90/126 · 목탄 T1 CH4 mismatch 1건 + T2 mismatch 36건) |
| `ipcc-sar-1995.json` | verified (2026-09-02) | 3 / 3 (GWP-100) |
| `ipcc-ar4-2007.json` | verified (2026-09-02) | 3 / 3 (Table 2.14) |
| `ipcc-ar5-2014.json` | verified (2026-09-02) | 3 / 3 (Table 8.7, without climate-carbon feedback) |
| `ipcc-ar6-2021.json` | verified (2026-09-02) | 3 / 3 (Table 7.15 · 7.SM.7) |
| `kets-annex-12.json` | verified (2026-09-02) | 69 / 69 (표 A T2 순발열량 27 + 표 B T2 배출계수 21 연료 × 2 = 42) |
| `gir-ef-2017.json` | (예정) | — (별표 12 와 불일치 4건: 등유·경유·항공유·도시가스LNG) |

## 자동 생성 스크립트

큰 문서는 매핑을 손으로 만들지 않고 스크립트로 생성한다:

- `scripts/build_verified_ipcc_ch1.py` — IPCC Vol.2 Ch.1 원문 값을 하드코딩 → 우리 fuel id 매칭 → `ipcc-2006-vol2-ch1.json` 생성
- `scripts/build_verified_ipcc_ch2_t25.py` — IPCC Vol.2 Ch.2 Table 2.2 (Energy Industries, T1) + Table 2.5 (Residential and Agriculture, T2) 통합 매핑 → `ipcc-2006-vol2-ch2.json`
- `scripts/build_verified_kets_a12.py` — K-ETS 별표 12 표 A/B 매핑 → `kets-annex-12.json`
  - 각 스크립트는 값 대조까지 하며, 불일치가 있으면 stderr 로 경고 후 해당 항목 스킵

## T2 CH4/N2O 원출처 결정 (2026-09-02)

원본 xlsm 은 T2 CH4/N2O 컬럼에 값을 채워두었으나, **K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정** (별표 10 IPCC 기본 배출계수 인용) 하며 Tier 2 CH4/N2O 는 규정하지 않는다.
xlsm T2 CH4/N2O 값을 IPCC 다른 부문 표와 대조한 결과 **IPCC Vol.2 Ch.2 Table 2.5 (Residential and Agriculture)** 값과 대부분 일치 (90/126) 하는 것을 발견 — 원본 xlsm 저자가 T1 컬럼에는 Table 2.2 (Energy Industries), T2 컬럼에는 Table 2.5 (Residential) 두 부문을 담아둔 것으로 해석.

원본 xlsm 오작성 (36건) 은 GIR_EF_2017 유지:

- **석탄 N2O = 1.4** (11개 fuel): Table 2.5 는 Peat 만 1.4, 다른 석탄은 모두 1.5 → xlsm 이 Peat 값을 다른 석탄에도 오적용한 것으로 판정
- **가스류 그룹 오분류** (매립지가스·슬러지가스·기타바이오가스·고로가스·산소강철로가스·코크스로가스·가스공장가스·가스공장코크스): xlsm 300/1.4~4.0 vs Table 2.5 5/0.1
- **액성천연가스**: xlsm 5/0.1 (기체 분류) vs Table 2.5 10/0.6 (액체 분류)
- **정제가스**: xlsm 10/0.6 (액체 분류) vs Table 2.5 5/0.1 (기체 분류)
- **아황산염 잿물**: xlsm 300/4 vs Table 2.5 3/2 (특수 화학연료 별도 값)
- **기타 액체 바이오매스**: xlsm 300/4 vs Table 2.5 10/0.6 (액체 분류)
