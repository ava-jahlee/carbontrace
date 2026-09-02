/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 * 값 수준 원문서 매핑은 src/data/verified/*.json 참조.
 */

import type { Fuel } from "./types";
import { GIR_EF_2017, IPCC_2006_VOL2_CH1, IPCC_2006_VOL2_CH2, KETS_ANNEX_12 } from "@/data/sources";

export const FUELS: Fuel[] = [
  {
    "id": "원유",
    "category": "석유류",
    "name": "원유",
    "state": "액체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 42.3,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Crude Oil · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 45.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 42.2,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 원유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Crude Oil · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Crude Oil · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Crude Oil · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Crude Oil · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Crude Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Crude Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "오리멀젼",
    "category": "석유류",
    "name": "오리멀젼",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 27.5,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Orimulsion · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 21.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Orimulsion · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 77000.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Orimulsion · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 77,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=21.0 kg/GJ, B=1) 유도값 = 77000.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Orimulsion · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Orimulsion · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Orimulsion · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Orimulsion · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "액성천연가스",
    "category": "석유류",
    "name": "액성천연가스",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 44.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Natural Gas Liquids · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 17.5,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Natural Gas Liquids · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 64166.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Natural Gas Liquids · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 64,200 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=17.5 kg/GJ, B=1) 유도값 = 64166.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Natural Gas Liquids · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Natural Gas Liquids · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "천연가스",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "휘발유-자동차용-가솔린",
    "category": "석유류",
    "name": "휘발유 (자동차용 가솔린)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 44.3,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Motor Gasoline · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 32.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 30.4,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 휘발유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 18.9,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Motor Gasoline · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 69299.99999999999,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Motor Gasoline · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 69,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=18.9 kg/GJ, B=1) 유도값 = 69300.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Motor Gasoline · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Motor Gasoline · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.548,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 휘발유 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 71676.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 휘발유 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 71,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 71676.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Motor Gasoline · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Motor Gasoline · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "항공용-가솔린",
    "category": "석유류",
    "name": "항공용 가솔린",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 44.3,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Aviation Gasoline · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Aviation Gasoline · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Aviation Gasoline · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 70,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.1 kg/GJ, B=1) 유도값 = 70033.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Aviation Gasoline · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Aviation Gasoline · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Aviation Gasoline · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Aviation Gasoline · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "제트용-가솔린",
    "category": "석유류",
    "name": "제트용 가솔린",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 44.3,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Jet Gasoline · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Jet Gasoline · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Jet Gasoline · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 70,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.1 kg/GJ, B=1) 유도값 = 70033.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Jet Gasoline · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Jet Gasoline · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Jet Gasoline · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Jet Gasoline · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "제트용-등유-항공유",
    "category": "석유류",
    "name": "제트용 등유 (항공유)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 44.1,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Jet Kerosene · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 36.5,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 33.9,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 항공유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.5,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Jet Kerosene · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 71500.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Jet Kerosene · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 71,500 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.5 kg/GJ, B=1) 유도값 = 71500.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Jet Kerosene · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Jet Kerosene · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.969,
          "unit": "tC/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "asserted",
            "note": "⚠ xlsm 원본 오작성: K-ETS 별표 12 표 B 항공유값(19.931) 대신 별표 12 등유값(19.969)을 잘못 넣음. 정확한 별표 12 항공유 = 19.931 kgC/TJ · GIR 2017 항공유 = 19.931 · GIR 2022.1 항공유(JET-A1) = 19.956. 감사 시 xlsm 원본 정정 필요.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73219.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "asserted",
            "note": "⚠ xlsm 원본 오작성 (tC 값 뒤바꿈에 따른 CO2 계수 파생 오류). 정확한 값 (tC × 44/12 × 1000): 별표 12 항공유 = 72,974 kgCO2/TJ · GIR 2022.1 항공유(JET-A1) = 73,152 kgCO2/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Jet Kerosene · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Jet Kerosene · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "등유-기타-등유",
    "category": "석유류",
    "name": "등유 (기타 등유)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 43.8,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Kerosene · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 36.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 등유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Kerosene · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 71866.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Kerosene · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 71,900 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.6 kg/GJ, B=1) 유도값 = 71866.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Kerosene · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Kerosene · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.931,
          "unit": "tC/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "asserted",
            "note": "⚠ xlsm 원본 오작성: K-ETS 별표 12 표 B 등유값(19.969) 대신 별표 12 항공유값(19.931)을 잘못 넣음. 정확한 별표 12 등유 = 19.969 kgC/TJ · GIR 2017 등유 = 19.969 · GIR 2022.1 등유 = 19.926. 감사 시 xlsm 원본 정정 필요.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73080.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "asserted",
            "note": "⚠ xlsm 원본 오작성 (tC 값 뒤바꿈에 따른 CO2 계수 파생 오류). 정확한 값 (tC × 44/12 × 1000): 별표 12 등유 = 73,153 kgCO2/TJ · GIR 2022.1 등유 = 73,062 kgCO2/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Kerosene · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Kerosene · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "혈암유",
    "category": "석유류",
    "name": "혈암유",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 38.1,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Shale Oil · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Shale Oil · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Shale Oil · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Shale Oil · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Shale Oil · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Shale Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Shale Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "경유-가스디젤-오일",
    "category": "석유류",
    "name": "경유 (가스/디젤 오일)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 43.0,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Gas/Diesel Oil · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 37.8,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 35.2,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 경유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.2,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Gas/Diesel Oil · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 74066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Gas/Diesel Oil · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 74,100 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.2 kg/GJ, B=1) 유도값 = 74066.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas/Diesel Oil · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas/Diesel Oil · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.111,
          "unit": "tC/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "verified",
            "row": "1A 연료연소 · 석유 · 경유 · 국가고유 세분화값",
            "page": "KEEI 표 2 · 17~ 열 · 경유 20.111",
            "note": "GIR 2017년 승인 국가고유 배출계수 (2018.1 공표 추정). 별표 12 표 B 는 등유·경유를 병합값(19,969)으로 규정하나 GIR 원본은 두 연료를 세분화. 후속판 GIR 2022.1 = 20.090 kgC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73740.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "verified",
            "row": "1A 연료연소 · 석유 · 경유 · CO2 유도값",
            "page": "GIR 2017 세분화 tC 20.111 × 44/12 × 1000",
            "note": "GIR 2017년 승인 세분화 tC (20.111) 기반 CO2 배출계수. 계산식: 20.111 × 44/12 × 1000 = 73,740 kgCO2/TJ. 별표 12 표 B 병합값 대신 GIR 원본 세분화값 준용. 후속판 GIR 2022.1 경유 CO2 = 73,663 kgCO2/TJ (tC 20.090 유도).",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Gas/Diesel Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Gas/Diesel Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "B-A유",
    "category": "석유류",
    "name": "B-A유",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": null,
      "t1_gross": {
        "value": 39.0,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 36.4,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · B-A유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH2
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH2
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.657,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-A유 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 75742.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-A유 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 75,700 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 75742.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "B-B유",
    "category": "석유류",
    "name": "B-B유",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": null,
      "t1_gross": {
        "value": 40.5,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 38.0,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · B-B유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH2
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH2
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.384,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-B유 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 78408.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-B유 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 78,400 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 78408.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "B-C유-잔여-석유연료",
    "category": "석유류",
    "name": "B-C유 (잔여 석유연료)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 40.4,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Residual Fuel Oil · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 41.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · B-C유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 21.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Residual Fuel Oil · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 77366.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Residual Fuel Oil · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 77,400 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=21.1 kg/GJ, B=1) 유도값 = 77366.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Residual Fuel Oil · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Residual Fuel Oil · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.929,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-C유 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 80406.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · B-C유 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 80,300 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 80406.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "부생연료-1호",
    "category": "석유류",
    "name": "부생연료 1호",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": null,
      "t1_gross": {
        "value": 37.1,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 34.6,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 부생연료유1호 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.067,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부생연료 1호 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73579.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부생연료 1호 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 73,500 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 73579.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil (부생연료는 액체석유 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil (부생연료는 액체석유 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "부생연료-2호",
    "category": "석유류",
    "name": "부생연료 2호",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": null,
      "t1_gross": {
        "value": 39.9,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 37.7,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 부생연료유2호 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.729,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부생연료 2호 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 79673.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부생연료 2호 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 79,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 79673.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil (부생연료는 액체석유 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Residual Fuel Oil (부생연료는 액체석유 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "LPG-액화석유가스",
    "category": "석유류",
    "name": "LPG (액화석유가스)",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 47.3,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Liquefied Petroleum Gases · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 17.2,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Liquefied Petroleum Gases · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 63066.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Liquefied Petroleum Gases · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 63,100 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=17.2 kg/GJ, B=1) 유도값 = 63066.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Liquefied Petroleum Gases · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Liquefied Petroleum Gases · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "프로판LPG1호",
    "category": "석유류",
    "name": "프로판(LPG1호)",
    "state": "기체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": null,
      "t1_gross": {
        "value": 50.4,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 46.3,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 프로판(LPG1호) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": {
          "value": 17.641,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 프로판(LPG1호) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 64683.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 프로판(LPG1호) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 64,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 64683.6667. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (프로판은 LPG 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (프로판은 LPG 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "부탄LPG3호",
    "category": "석유류",
    "name": "부탄(LPG3호)",
    "state": "기체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": null,
      "t1_gross": {
        "value": 49.5,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 45.7,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 부탄(LPG3호) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": {
          "value": 18.107,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부탄(LPP3호) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 66392.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 부탄(LPP3호) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 66,300 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 66392.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (부탄은 LPG 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (부탄은 LPG 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "에탄",
    "category": "석유류",
    "name": "에탄",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 46.4,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Ethane · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 16.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Ethane · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 61600.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Ethane · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 61,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=16.8 kg/GJ, B=1) 유도값 = 61600.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Ethane · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Ethane · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Ethane · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Ethane · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "납사-나프타",
    "category": "석유류",
    "name": "납사 (나프타)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 44.5,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Naphtha · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 32.3,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 29.9,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 나프타 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Naphtha · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Naphtha · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Naphtha · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Naphtha · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.157,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 나프타 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70242.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 나프타 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 70,200 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 70242.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Naphtha · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Naphtha · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "아스팔트-역청",
    "category": "석유류",
    "name": "아스팔트 (역청)",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Bitumen · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 41.4,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 아스팔트 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 22.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Bitumen · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Bitumen · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 80,700 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=22.0 kg/GJ, B=1) 유도값 = 80666.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Bitumen · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Bitumen · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.544,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 아스팔트 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 78994.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 아스팔트 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 78,900 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 78994.6667. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Bitumen · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Bitumen · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "윤활유",
    "category": "석유류",
    "name": "윤활유",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Lubricants · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 40.0,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 37.3,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 윤활유 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Lubricants · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Lubricants · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Lubricants · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Lubricants · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.979,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 윤활유 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73256.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 윤활유 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 73,200 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 73256.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Lubricants · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Lubricants · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "석유-코크스",
    "category": "석유류",
    "name": "석유 코크스",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 32.5,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Petroleum Coke · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 35.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 석유코크스 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Petroleum Coke · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Petroleum Coke · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 97,500 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.6 kg/GJ, B=1) 유도값 = 97533.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Petroleum Coke · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Petroleum Coke · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 26.086,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 석유코크스 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 95648.66666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 석유코크스 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 95,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 95648.6667. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Petroleum Coke · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Petroleum Coke · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "정유공장-원료-정제-원료",
    "category": "석유류",
    "name": "정유공장 원료 (정제 원료)",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 43.0,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Refinery Feedstocks · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Refinery Feedstocks · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Refinery Feedstocks · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Refinery Feedstocks · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Refinery Feedstocks · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Refinery Feedstocks · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Refinery Feedstocks · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "정제가스",
    "category": "석유류",
    "name": "정제가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 49.5,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Refinery Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 15.7,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Refinery Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 57566.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Refinery Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 57,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=15.7 kg/GJ, B=1) 유도값 = 57566.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Refinery Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Refinery Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "파라핀왁스밀랍",
    "category": "석유류",
    "name": "파라핀왁스(밀랍)",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Paraffin Waxes · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Paraffin Waxes · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Paraffin Waxes · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Paraffin Waxes · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Paraffin Waxes · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Paraffin Waxes · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Paraffin Waxes · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "용제-백유",
    "category": "석유류",
    "name": "용제 (백유)",
    "state": "액체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · White Spirit and SBP · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 32.8,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 30.3,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 용제 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · White Spirit and SBP · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · White Spirit and SBP · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · White Spirit and SBP · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · White Spirit and SBP · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.172,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 용제 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70297.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석유(16) · 용제 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 70,200 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 70297.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · White Spirit and SBP · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · White Spirit and SBP · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "재생유-기타석유제품",
    "category": "석유류",
    "name": "재생유 (기타석유제품)",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Petroleum Products · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Petroleum Products · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Petroleum Products · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Petroleum Products · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Petroleum Products · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.067,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 73579.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Petroleum Products · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Petroleum Products · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "국내-무연탄",
    "category": "석탄류",
    "name": "국내 무연탄",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 26.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Anthracite · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 19.8,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 19.4,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 국내무연탄 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Anthracite · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Anthracite · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 98,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.8 kg/GJ, B=1) 유도값 = 98266.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 30.185,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 국내무연탄 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 110678.33333333331,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 국내무연탄 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 110,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 110678.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Anthracite · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "연료용-수입-무연탄",
    "category": "석탄류",
    "name": "연료용 수입 무연탄",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 26.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Anthracite · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 21.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 20.5,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 연료용 수입무연탄 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Anthracite · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Anthracite · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 98,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.8 kg/GJ, B=1) 유도값 = 98266.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 27.404,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 수입무연탄(연료용) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 100481.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 수입무연탄(연료용) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 100,400 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 100481.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Anthracite · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "원료용-수입-무연탄",
    "category": "석탄류",
    "name": "원료용 수입 무연탄",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 26.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Anthracite · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 25.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 24.7,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 원료용 수입무연탄 · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Anthracite · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Anthracite · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 98,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.8 kg/GJ, B=1) 유도값 = 98266.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Anthracite · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 29.909,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 수입무연탄(원료용) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 109666.33333333331,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 수입무연탄(원료용) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 109,600 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 109666.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Anthracite · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "원료용-유연탄-점결탄",
    "category": "석탄류",
    "name": "원료용 유연탄 (점결탄)",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 28.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Coking Coal · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 29.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 28.0,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 원료용 유연탄(역청탄) · 순발열량",
          "page": "1-2",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Coking Coal · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Coking Coal · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 94,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=25.8 kg/GJ, B=1) 유도값 = 94600.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coking Coal · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coking Coal · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.963,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 유연탄(원료용) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 95197.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 유연탄(원료용) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 95,100 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 95197.6667. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Coking Coal · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "연료용-유연탄-기타-유연탄",
    "category": "석탄류",
    "name": "연료용 유연탄 (기타 유연탄)",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 25.8,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Bituminous Coal · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 24.8,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 23.7,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 연료용 유연탄(역청탄) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Bituminous Coal · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Bituminous Coal · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 94,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=25.8 kg/GJ, B=1) 유도값 = 94600.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Bituminous Coal · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Bituminous Coal · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.951,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 유연탄(연료용) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 95153.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 유연탄(연료용) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 95,100 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 95153.6667. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Bituminous Coal · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "아역청탄-하위-유연탄",
    "category": "석탄류",
    "name": "아역청탄 (하위 유연탄)",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 18.9,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Sub-Bituminous Coal · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 21.4,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 19.9,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 아역청탄 · 순발열량",
          "page": "2",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.2,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Sub-Bituminous Coal · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 96066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Sub-Bituminous Coal · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 96,100 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.2 kg/GJ, B=1) 유도값 = 96066.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sub-Bituminous Coal · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sub-Bituminous Coal · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 26.468,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 아역청탄 · 탄소배출계수 (kgC/TJ)",
            "page": "4",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 97049.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 석탄(6) · 아역청탄 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "4",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 97,000 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 97049.3333. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Sub-Bituminous Coal · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "갈탄",
    "category": "석탄류",
    "name": "갈탄",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 11.9,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Lignite · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 27.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Lignite · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 101200.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Lignite · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 101,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=27.6 kg/GJ, B=1) 유도값 = 101200.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Lignite · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Lignite · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Lignite · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "유혈암-및-역청암",
    "category": "석탄류",
    "name": "유혈암 및 역청암",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 8.9,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Oil Shale and Tar Sands · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 29.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Oil Shale and Tar Sands · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 106700.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Oil Shale and Tar Sands · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 107,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=29.1 kg/GJ, B=1) 유도값 = 106700.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Oil Shale and Tar Sands · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Oil Shale and Tar Sands · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Oil Shale and Tar Sands · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "갈색-연탄",
    "category": "석탄류",
    "name": "갈색 연탄",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 20.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Brown Coal Briquettes · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Brown Coal Briquettes · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Brown Coal Briquettes · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 97,500 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.6 kg/GJ, B=1) 유도값 = 97533.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Brown Coal Briquettes · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Brown Coal Briquettes · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Brown Coal Briquettes · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "특허-연료",
    "category": "석탄류",
    "name": "특허 연료",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 20.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Patent Fuel · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Patent Fuel · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Patent Fuel · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 97,500 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.6 kg/GJ, B=1) 유도값 = 97533.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Patent Fuel · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Patent Fuel · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Patent Fuel · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "코크스로-코크스-석탄",
    "category": "석탄류",
    "name": "코크스로 코크스 (석탄)",
    "state": "고체",
    "activityUnit": "ton-연료",
    "heat": {
      "unit": "MJ/kg",
      "t1_net": {
        "value": 28.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Coke Oven Coke and Lignite Coke · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 29.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 28.9,
        "unit": "MJ/kg",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 코크스 · 순발열량",
          "page": "2",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단).",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 29.2,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Coke Oven Coke and Lignite Coke · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Coke Oven Coke and Lignite Coke · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 107,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=29.2 kg/GJ, B=1) 유도값 = 107066.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coke Oven Coke and Lignite Coke · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coke Oven Coke and Lignite Coke · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Coke Oven Coke and Lignite Coke · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "가스-공장-코크스-가스-코크스",
    "category": "석탄류",
    "name": "가스 공장 코크스 (가스 코크스)",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 28.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Gas Coke · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 29.2,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Gas Coke · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Gas Coke · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 107,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=29.2 kg/GJ, B=1) 유도값 = 107066.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas Coke · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas Coke · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "콜타르",
    "category": "석탄류",
    "name": "콜타르",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 28.0,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Coal Tar · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 22.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Coal Tar · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Coal Tar · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 80,700 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=22.0 kg/GJ, B=1) 유도값 = 80666.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coal Tar · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coal Tar · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Coal Tar · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "가스공장-가스",
    "category": "가스류",
    "name": "가스공장 가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 38.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Gas Works Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 12.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Gas Works Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Gas Works Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 44,400 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=12.1 kg/GJ, B=1) 유도값 = 44366.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas Works Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Gas Works Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "코크스로-가스",
    "category": "가스류",
    "name": "코크스로 가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 38.7,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Coke Oven Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 12.1,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Coke Oven Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Coke Oven Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 44,400 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=12.1 kg/GJ, B=1) 유도값 = 44366.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coke Oven Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Coke Oven Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "고로가스",
    "category": "가스류",
    "name": "고로가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 2.47,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Blast Furnace Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 70.8,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Blast Furnace Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 259600.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Blast Furnace Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 260,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=70.8 kg/GJ, B=1) 유도값 = 259600.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Blast Furnace Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Blast Furnace Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "산소-강철로-가스",
    "category": "가스류",
    "name": "산소 강철로 가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 7.06,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Oxygen Steel Furnace Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 49.6,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Oxygen Steel Furnace Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 181866.66666666666,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Oxygen Steel Furnace Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 182,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=49.6 kg/GJ, B=1) 유도값 = 181866.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Oxygen Steel Furnace Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Oxygen Steel Furnace Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "천연가스LNG",
    "category": "가스류",
    "name": "천연가스(LNG)",
    "state": "기체",
    "activityUnit": "kL-연료",
    "heat": {
      "unit": "MJ/L",
      "t1_net": {
        "value": 48.0,
        "unit": "MJ/L",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Natural Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": {
        "value": 54.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 49.4,
        "unit": "MJ/L",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 천연가스(LNG) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단). 단위 표기 참고: 별표 12 원표는 MJ/kg, xlsm 은 MJ/L 로 기록되어 있으나 값 자체(순발열량)는 동일.",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 15.3,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Natural Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 56100.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Natural Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 56,100 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=15.3 kg/GJ, B=1) 유도값 = 56100.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Natural Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Natural Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "천연가스",
        "tC_per_TJ": {
          "value": 15.312,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 가스(3) · 천연가스·도시가스(LNG) 병합 · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 56144.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 가스(3) · 천연가스·도시가스(LNG) 병합 · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 56,100 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 56144.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Natural Gas · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Natural Gas · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "도시가스LNG",
    "category": "가스류",
    "name": "도시가스(LNG)",
    "state": "기체",
    "activityUnit": "천m³-연료",
    "heat": {
      "unit": "MJ/Nm3",
      "t1_net": null,
      "t1_gross": {
        "value": 43.1,
        "unit": "MJ/Nm3",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 38.9,
        "unit": "MJ/Nm3",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 도시가스(LNG) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단). 단위 표기 참고: 별표 12 원표는 MJ/Nm³, xlsm 은 MJ/Nm3 로 기록되어 있으나 값 자체(순발열량)는 동일.",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "도시가스(LNG)",
        "tC_per_TJ": {
          "value": 15.272,
          "unit": "tC/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "verified",
            "row": "1A 연료연소 · 가스 · 도시가스 · 국가고유 세분화값",
            "page": "KEEI 표 2 · 17~ 열 · 도시가스 15.272",
            "note": "GIR 2017년 승인 국가고유 배출계수 (2018.1 공표 추정). 별표 12 표 B 는 천연가스·도시가스LNG 를 병합값(15,312)으로 규정하나 GIR 원본은 두 연료를 세분화. 도시가스는 정제 과정에서 CH4 함량이 미세 조정되어 순수 LNG 대비 tC 가 낮음. 후속판 GIR 2022.1 = 15.236 kgC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 55997.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": { ...GIR_EF_2017, "maturity": "verified",
            "row": "1A 연료연소 · 가스 · 도시가스 · CO2 유도값",
            "page": "GIR 2017 세분화 tC 15.272 × 44/12 × 1000",
            "note": "GIR 2017년 승인 세분화 tC (15.272) 기반 CO2 배출계수. 계산식: 15.272 × 44/12 × 1000 = 55,997 kgCO2/TJ. 별표 12 표 B 병합값(56,144) 대신 GIR 원본 세분화값 준용. 후속판 GIR 2022.1 도시가스LNG CO2 = 55,865 kgCO2/TJ (tC 15.236 유도).",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Natural Gas (도시가스LNG 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Natural Gas (도시가스LNG 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "도시가스LPG",
    "category": "가스류",
    "name": "도시가스(LPG)",
    "state": "기체",
    "activityUnit": "천m³-연료",
    "heat": {
      "unit": "MJ/Nm3",
      "t1_net": null,
      "t1_gross": {
        "value": 63.6,
        "unit": "MJ/Nm3",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 58.4,
        "unit": "MJ/Nm3",
        "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
          "row": "표 A · 도시가스(LPG) · 순발열량",
          "page": "1",
          "note": "K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). 순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단). 단위 표기 참고: 별표 12 원표는 MJ/Nm³, xlsm 은 MJ/Nm3 로 기록되어 있으나 값 자체(순발열량)는 동일.",
          "reviewedAt": "2026-09-02" }
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": null,
        "N2O": null
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": {
          "value": 17.454,
          "unit": "tC/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 가스(3) · 도시가스(LPG) · 탄소배출계수 (kgC/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 탄소배출계수 (kgC/TJ = tC/TJ). 비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. 석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준).",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 63998.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...KETS_ANNEX_12, "maturity": "verified",
            "row": "표 B · 가스(3) · 도시가스(LPG) · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": "3",
            "note": "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). 표 표기 반올림값 = 64,000 kgCO2/TJ. 본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = 63998.0000. tC 대비 소수점 오차만 있음.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (도시가스LPG 준용) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Liquefied Petroleum Gases (도시가스LPG 준용) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "도시폐기물-비-바이오매스",
    "category": "기타 화석연료",
    "name": "도시폐기물 (비-바이오매스)",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 10.0,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Municipal Wastes (non-biomass fraction) · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Municipal Wastes (non-biomass fraction) · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 91666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Municipal Wastes (non-biomass fraction) · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 91,700 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=25.0 kg/GJ, B=1) 유도값 = 91666.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Municipal Wastes (non-biomass fraction) · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Municipal Wastes (non-biomass fraction) · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Municipal Wastes (non-biomass fraction) · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Municipal Wastes (non-biomass fraction) · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "산업-폐기물",
    "category": "기타 화석연료",
    "name": "산업 폐기물",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": null,
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 39.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Industrial Wastes · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 143000.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Industrial Wastes · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 143,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=39.0 kg/GJ, B=1) 유도값 = 143000.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Industrial Wastes · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Industrial Wastes · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Industrial Wastes · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Industrial Wastes · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "폐유",
    "category": "기타 화석연료",
    "name": "폐유",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 40.2,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Waste Oil · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Waste Oil · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Waste Oil · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 73,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=20.0 kg/GJ, B=1) 유도값 = 73333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Waste Oils · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Waste Oils · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Waste Oils · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Waste Oils · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "이탄-토탄",
    "category": "기타 화석연료",
    "name": "이탄 (토탄)",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 9.76,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Peat · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 28.9,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Peat · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 105966.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Peat · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 106,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=28.9 kg/GJ, B=1) 유도값 = 105966.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Peat · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Peat · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Peat · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Peat · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "목재목재폐기물",
    "category": "바이오매스",
    "name": "목재/목재폐기물",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 15.6,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Wood/Wood Waste · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 30.5,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Wood/Wood Waste · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Wood/Wood Waste · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 112,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=30.5 kg/GJ, B=1) 유도값 = 111833.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Wood/Wood Waste · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Wood/Wood Waste · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "목재/폐목재",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Wood / Wood Waste · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Wood / Wood Waste · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "아황산염-잿물",
    "category": "바이오매스",
    "name": "아황산염 잿물",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 11.8,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Sulphite lyes (black liquor) · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.0,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Sulphite lyes (black liquor) · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 95333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Sulphite lyes (black liquor) · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 95,300 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=26.0 kg/GJ, B=1) 유도값 = 95333.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sulphite lyes (black liquor) · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 2.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sulphite lyes (black liquor) · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "기타-주요한-고체-바이오매스",
    "category": "바이오매스",
    "name": "기타 주요한 고체 바이오매스",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 11.6,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Primary Solid Biomass · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 27.3,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Primary Solid Biomass · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Primary Solid Biomass · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 100,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=27.3 kg/GJ, B=1) 유도값 = 100100.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Primary Solid Biomass · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Primary Solid Biomass · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "목재/폐목재",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Primary Solid Biomass · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Other Primary Solid Biomass · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "목탄",
    "category": "바이오매스",
    "name": "목탄",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 29.5,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Charcoal · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 30.5,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Charcoal · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Charcoal · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 112,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=30.5 kg/GJ, B=1) 유도값 = 111833.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH2
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Charcoal · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "숯(목탄)",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 200.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Charcoal · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Charcoal · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "바이오-가솔린",
    "category": "바이오매스",
    "name": "바이오 가솔린",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 27.0,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Biogasoline · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.3,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Biogasoline · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Biogasoline · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 70,800 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.3 kg/GJ, B=1) 유도값 = 70766.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Biogasoline · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Biogasoline · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Biogasoline · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Biogasoline · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "바이오-디젤",
    "category": "바이오매스",
    "name": "바이오 디젤",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 27.0,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Biodiesels (Liquid) · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.3,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Biodiesels (Liquid) · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Biodiesels (Liquid) · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 70,800 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=19.3 kg/GJ, B=1) 유도값 = 70766.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Biodiesels (Liquid) · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Biodiesels (Liquid) · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Biodiesels · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Biodiesels · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  },
  {
    "id": "기타-액체-바이오매스",
    "category": "바이오매스",
    "name": "기타 액체 바이오매스",
    "state": "액체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 27.4,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Liquid Biofuels · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 21.7,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Liquid Biofuels · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 79566.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Liquid Biofuels · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 79,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=21.7 kg/GJ, B=1) 유도값 = 79566.6667.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Liquid Biofuels · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Liquid Biofuels · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "매립지-가스",
    "category": "바이오매스",
    "name": "매립지 가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 50.4,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Landfill Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 14.9,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Landfill Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Landfill Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 54,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=14.9 kg/GJ, B=1) 유도값 = 54633.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Landfill Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Landfill Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "슬러지-가스",
    "category": "바이오매스",
    "name": "슬러지 가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 50.4,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Sludge Gas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 14.9,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Sludge Gas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Sludge Gas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 54,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=14.9 kg/GJ, B=1) 유도값 = 54633.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sludge Gas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Sludge Gas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "기타-바이오가스",
    "category": "바이오매스",
    "name": "기타 바이오가스",
    "state": "기체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 50.4,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Other Biogas · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 14.9,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Other Biogas · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Other Biogas · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 54,600 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=14.9 kg/GJ, B=1) 유도값 = 54633.3333.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Biogas · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Other Biogas · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        }
      }
    }
  },
  {
    "id": "도시폐기물-바이오매스",
    "category": "바이오매스",
    "name": "도시폐기물 (바이오매스)",
    "state": "고체",
    "activityUnit": null,
    "heat": {
      "unit": null,
      "t1_net": {
        "value": 11.6,
        "unit": "MJ/kg",
        "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
          "row": "Table 1.2 · Municipal Wastes (biomass fraction) · Net Calorific Value",
          "page": "1.18–1.19",
          "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
          "reviewedAt": "2026-09-02" }
      },
      "t1_gross": null,
      "t2_net": null
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 27.3,
          "unit": "tC/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.3 · Municipal Wastes (biomass fraction) · Default Carbon Content",
            "page": "1.21–1.22",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
            "reviewedAt": "2026-09-02" }
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH1, "maturity": "verified",
            "row": "Table 1.4 · Municipal Wastes (biomass fraction) · CO2 Emission Factor",
            "page": "1.23–1.24",
            "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = 100,000 kg/TJ. 표 하단 계산식 C = A × B × 44/12 × 1000 (A=27.3 kg/GJ, B=1) 유도값 = 100100.0000.",
            "reviewedAt": "2026-09-02" }
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Municipal Wastes (biomass fraction) · CH4 Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.2 · Municipal Wastes (biomass fraction) · N2O Emission Factor",
            "page": "2.16–2.17",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
            "reviewedAt": "2026-09-02" }
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Municipal Wastes (biomass fraction) [Table 2.4 준용] · CH4 Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": { ...IPCC_2006_VOL2_CH2, "maturity": "verified",
            "row": "Table 2.5 · Municipal Wastes (biomass fraction) [Table 2.4 준용] · N2O Emission Factor",
            "page": "2.22–2.23",
            "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). kg/TJ on Net Calorific Basis. 참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석.",
            "reviewedAt": "2026-09-02" }
        }
      }
    }
  }
];
