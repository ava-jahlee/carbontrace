/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 * 값 수준 원문서 매핑은 src/data/verified/*.json 참조.
 */

import type { GwpTables } from "./types";
import { IPCC_AR4, IPCC_AR5, IPCC_AR6, IPCC_SAR } from "@/data/sources";

export const GWP: GwpTables = {
  "SAR": {
    "label": "K-ETS 관례 · IPCC SAR (1995) 채택",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": { ...IPCC_SAR, "maturity": "verified",
        "row": "SPM · Table 4 · Direct GWP · CO2",
        "note": "정의상 항상 1. IPCC SAR WG1 SPM Table 4 및 Ch.2 Table 2.9.",
        "reviewedAt": "2026-09-02" }
    },
    "CH4": {
      "value": 21,
      "unit": "-",
      "primarySource": { ...IPCC_SAR, "maturity": "verified",
        "row": "SPM · Table 4 · Direct GWP · Methane (100-year)",
        "note": "IPCC SAR WG1 (1995) SPM Table 4. K-ETS 지침 별표 6 CO2 등가계수 규정에서 채택 (Feq,j: CO2=1, CH4=21, N2O=310).",
        "reviewedAt": "2026-09-02" }
    },
    "N2O": {
      "value": 310,
      "unit": "-",
      "primarySource": { ...IPCC_SAR, "maturity": "verified",
        "row": "SPM · Table 4 · Direct GWP · Nitrous Oxide (100-year)",
        "note": "IPCC SAR WG1 (1995) SPM Table 4. K-ETS 지침 채택 값.",
        "reviewedAt": "2026-09-02" }
    }
  },
  "AR4": {
    "label": "IPCC AR4 (2007)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": { ...IPCC_AR4, "maturity": "verified",
        "row": "WG1 Ch.2 · Table 2.14 · CO2",
        "note": "정의상 항상 1.",
        "reviewedAt": "2026-09-02" }
    },
    "CH4": {
      "value": 25,
      "unit": "-",
      "primarySource": { ...IPCC_AR4, "maturity": "verified",
        "row": "WG1 Ch.2 · Table 2.14 · CH4 (100-year, direct + indirect)",
        "note": "AR4 는 SAR 의 21 에서 25 로 상향. Direct GWP 에 troposphere O3, stratosphere H2O 등 indirect effects 포함.",
        "reviewedAt": "2026-09-02" }
    },
    "N2O": {
      "value": 298,
      "unit": "-",
      "primarySource": { ...IPCC_AR4, "maturity": "verified",
        "row": "WG1 Ch.2 · Table 2.14 · N2O (100-year)",
        "note": "SAR 의 310 에서 298 로 하향.",
        "reviewedAt": "2026-09-02" }
    }
  },
  "AR5": {
    "label": "IPCC AR5 (2013) · 한국 NIR 2024~ 채택",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": { ...IPCC_AR5, "maturity": "verified",
        "row": "WG1 Ch.8 · Appendix 8.A · Table 8.7 · CO2",
        "note": "정의상 항상 1.",
        "reviewedAt": "2026-09-02" }
    },
    "CH4": {
      "value": 28,
      "unit": "-",
      "primarySource": { ...IPCC_AR5, "maturity": "verified",
        "row": "WG1 Ch.8 · Appendix 8.A · Table 8.7 · CH4 (100-year, without climate-carbon feedback)",
        "note": "Table 8.7 은 두 열을 제공: (a) without climate-carbon feedback (CH4=28), (b) with climate-carbon feedback (CH4=34). 표준 인벤토리 관례는 (a) 값 사용. 한국 NIR (2024년~) 채택.",
        "reviewedAt": "2026-09-02" }
    },
    "N2O": {
      "value": 265,
      "unit": "-",
      "primarySource": { ...IPCC_AR5, "maturity": "verified",
        "row": "WG1 Ch.8 · Appendix 8.A · Table 8.7 · N2O (100-year, without climate-carbon feedback)",
        "note": "AR4 의 298 에서 265 로 하향. Without climate-carbon feedback 열.",
        "reviewedAt": "2026-09-02" }
    }
  },
  "AR6": {
    "label": "IPCC AR6 (2021)",
    "CO2": {
      "value": 1,
      "unit": "-",
      "primarySource": { ...IPCC_AR6, "maturity": "verified",
        "row": "WG1 Ch.7 · Table 7.SM.7 · CO2",
        "note": "정의상 항상 1.",
        "reviewedAt": "2026-09-02" }
    },
    "CH4": {
      "value": 27.9,
      "unit": "-",
      "primarySource": { ...IPCC_AR6, "maturity": "verified",
        "row": "WG1 Ch.7 · Supplementary Material · Table 7.SM.7 · CH4 (methane, radiative forcing only)",
        "note": "IPCC AR6 WG1 Ch.7 Supplementary Material Table 7.SM.7. 순수 methane radiative forcing 값 (oxidation 배제). Table 7.15 는 fossil methane 29.8 / non-fossil methane 27.0 을 분리 규정. GHG Protocol 등에서 실무적으로 fossil combustion 은 29.8, biogenic 은 27.0 을 권장하나 본 계산기는 통합 값 27.9 사용.",
        "reviewedAt": "2026-09-02" }
    },
    "N2O": {
      "value": 273,
      "unit": "-",
      "primarySource": { ...IPCC_AR6, "maturity": "verified",
        "row": "WG1 Ch.7 · Table 7.15 · N2O (100-year)",
        "note": "AR5 의 265 에서 273 으로 상향.",
        "reviewedAt": "2026-09-02" }
    }
  }
};
