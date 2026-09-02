/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 * 값 수준 원문서 매핑은 src/data/verified/*.json 참조.
 */

import type { OxidationTable } from "./types";
import { KETS_ANNEX_6 } from "@/data/sources";

export const OXIDATION: OxidationTable = {
  "고체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "1. 고정연소 (고체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 1",
        "note": "「산화계수(f)는 기본값인 1.0을 적용한다.」 (IPCC 관례 · Tier 1)",
        "reviewedAt": "2026-09-02" }
    },
    "t2": {
      "value": 0.98,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "1. 고정연소 (고체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 2",
        "note": "「발전 부문은 산화계수(f) 0.99를 적용하고, 기타부문은 0.98을 적용한다.」 — 본 계산기는 기타부문 기본값(0.98) 채택.",
        "reviewedAt": "2026-09-02" }
    }
  },
  "액체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "3. 고정연소 (액체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 1",
        "note": "「산화계수(fi)는 기본값으로 1.0을 적용한다.」",
        "reviewedAt": "2026-09-02" }
    },
    "t2": {
      "value": 0.99,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "3. 고정연소 (액체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 2",
        "note": "「산화계수(fi)는 0.99를 적용한다. 단, 온실가스종합정보센터에서 별도의 계수를 공표하여 지침에 수록된 경우 그 값을 적용한다.」",
        "reviewedAt": "2026-09-02" }
    }
  },
  "기체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "2. 고정연소 (기체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 1",
        "note": "「산화계수(fi)는 기본값인 1.0을 적용한다.」",
        "reviewedAt": "2026-09-02" }
    },
    "t2": {
      "value": 0.995,
      "unit": "-",
      "primarySource": { ...KETS_ANNEX_6, "maturity": "verified",
        "row": "2. 고정연소 (기체연료) › 5. 배출량 산정방법론 › ④ 산화계수 (fi) › Tier 2",
        "note": "「산화계수(fi)는 0.995를 적용한다. 단, 온실가스종합정보센터에서 별도의 계수를 공표하여 지침에 수록된 경우 그 값을 적용한다.」",
        "reviewedAt": "2026-09-02" }
    }
  }
};
