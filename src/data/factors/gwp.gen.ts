/**
 * carbontrace — Scope 1 계수 데이터
 * 생성: scripts/build_scope1_data.py
 * 원본: C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm
 *
 * 이 파일은 자동 생성됩니다. 직접 편집하지 마세요.
 * 원본 값이 바뀌면 xlsm 을 갱신하고 스크립트를 재실행하세요.
 */

import type { Fuel, OxidationTable, GwpTables } from "./types";

export const GWP: GwpTables = {
  "SAR": {
    "label": "국가 인벤토리 (SAR 1995)",
    "CO2": 1,
    "CH4": 21,
    "N2O": 310,
    "source": "IPCC Second Assessment Report (1995) / 한국 국가인벤토리 채택"
  },
  "AR4": {
    "label": "IPCC AR4 (2007)",
    "CO2": 1,
    "CH4": 25,
    "N2O": 298,
    "source": "IPCC Fourth Assessment Report (2007), 100-year GWP"
  },
  "AR5": {
    "label": "IPCC AR5 (2014)",
    "CO2": 1,
    "CH4": 28,
    "N2O": 265,
    "source": "IPCC Fifth Assessment Report (2014), 100-year GWP, w/o feedback"
  },
  "AR6": {
    "label": "IPCC AR6 (2021)",
    "CO2": 1,
    "CH4": 27.9,
    "N2O": 273,
    "source": "IPCC Sixth Assessment Report (2021), 100-year GWP-100"
  }
};
