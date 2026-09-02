/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 * 값 수준 원문서 매핑은 src/data/verified/*.json 참조.
 */

import type { GwpTables } from "./types";
import { IPCC_AR4, IPCC_AR5, IPCC_AR6, NATIONAL_INVENTORY_REPORT } from "@/data/sources";

export const GWP: GwpTables = {
  "SAR": {
    "label": "국가 인벤토리 (IPCC SAR 1995 채택)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": NATIONAL_INVENTORY_REPORT
    },
    "CH4": {
      "value": 21,
      "unit": "-",
      "primarySource": NATIONAL_INVENTORY_REPORT
    },
    "N2O": {
      "value": 310,
      "unit": "-",
      "primarySource": NATIONAL_INVENTORY_REPORT
    }
  },
  "AR4": {
    "label": "IPCC AR4 (2007)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": IPCC_AR4
    },
    "CH4": {
      "value": 25,
      "unit": "-",
      "primarySource": IPCC_AR4
    },
    "N2O": {
      "value": 298,
      "unit": "-",
      "primarySource": IPCC_AR4
    }
  },
  "AR5": {
    "label": "IPCC AR5 (2014)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": IPCC_AR5
    },
    "CH4": {
      "value": 28,
      "unit": "-",
      "primarySource": IPCC_AR5
    },
    "N2O": {
      "value": 265,
      "unit": "-",
      "primarySource": IPCC_AR5
    }
  },
  "AR6": {
    "label": "IPCC AR6 (2021)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": IPCC_AR6
    },
    "CH4": {
      "value": 27.9,
      "unit": "-",
      "primarySource": IPCC_AR6
    },
    "N2O": {
      "value": 273,
      "unit": "-",
      "primarySource": IPCC_AR6
    }
  }
};
