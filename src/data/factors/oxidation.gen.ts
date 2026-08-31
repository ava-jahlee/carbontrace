/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 */

import type { OxidationTable } from "./types";
import { IPCC_2006_VOL2_CH2, KETS_ANNEX_6 } from "@/data/sources";

export const OXIDATION: OxidationTable = {
  "고체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": IPCC_2006_VOL2_CH2
    },
    "t2": {
      "value": 0.98,
      "unit": "-",
      "primarySource": KETS_ANNEX_6
    }
  },
  "액체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": IPCC_2006_VOL2_CH2
    },
    "t2": {
      "value": 0.99,
      "unit": "-",
      "primarySource": KETS_ANNEX_6
    }
  },
  "기체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "primarySource": IPCC_2006_VOL2_CH2
    },
    "t2": {
      "value": 0.995,
      "unit": "-",
      "primarySource": KETS_ANNEX_6
    }
  }
};
