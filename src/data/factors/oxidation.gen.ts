/**
 * carbontrace — Scope 1 계수 데이터
 * 생성: scripts/build_scope1_data.py
 * 원본: C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm
 *
 * 이 파일은 자동 생성됩니다. 직접 편집하지 마세요.
 * 원본 값이 바뀌면 xlsm 을 갱신하고 스크립트를 재실행하세요.
 */

import type { Fuel, OxidationTable, GwpTables } from "./types";

export const OXIDATION: OxidationTable = {
  "고체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "sourceCell": "_Law&GL22!M14",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    },
    "t2": {
      "value": 0.98,
      "unit": "-",
      "sourceCell": "_Law&GL22!N14",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    }
  },
  "액체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "sourceCell": "_Law&GL22!M15",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    },
    "t2": {
      "value": 0.99,
      "unit": "-",
      "sourceCell": "_Law&GL22!N15",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    }
  },
  "기체": {
    "t1": {
      "value": 1.0,
      "unit": "-",
      "sourceCell": "_Law&GL22!M16",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    },
    "t2": {
      "value": 0.995,
      "unit": "-",
      "sourceCell": "_Law&GL22!N16",
      "sourceDoc": "온실가스 배출권거래제 지침 [별첨6]"
    }
  }
};
