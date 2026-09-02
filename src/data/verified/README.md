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
| `kets-annex-12.json` | (예정) | — |
| `ipcc-2006-vol2-ch1.json` | (예정) | — |
| `gir-ef-2017.json` | (예정) | — |
| `gwp.json` | (예정) | — |
