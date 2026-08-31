/**
 * carbontrace — Scope 1 계수 데이터
 * 생성: scripts/build_scope1_data.py
 * 원본: C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm
 *
 * 이 파일은 자동 생성됩니다. 직접 편집하지 마세요.
 * 원본 값이 바뀌면 xlsm 을 갱신하고 스크립트를 재실행하세요.
 */

import type { Fuel, OxidationTable, GwpTables } from "./types";

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
        "sourceCell": "_Law&GL22!O36",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 45.0,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P36",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 42.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q36",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C36",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D36",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E36",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F36",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K36",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L36",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B36"
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
        "sourceCell": "_Law&GL22!O37",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C37",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 77000.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D37",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E37",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F37",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K37",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L37",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B37"
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
        "sourceCell": "_Law&GL22!O38",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C38",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 64166.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D38",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E38",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F38",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "천연가스",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K38",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L38",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B38"
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
        "sourceCell": "_Law&GL22!O39",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 32.7,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P39",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 30.4,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q39",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 18.9,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C39",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 69299.99999999999,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D39",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E39",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F39",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.548,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I39",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 71676.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J39",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K39",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L39",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B39"
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
        "sourceCell": "_Law&GL22!O40",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C40",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D40",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E40",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F40",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K40",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L40",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B40"
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
        "sourceCell": "_Law&GL22!O41",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C41",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D41",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E41",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F41",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K41",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L41",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B41"
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
        "sourceCell": "_Law&GL22!O42",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 36.5,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P42",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 33.9,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q42",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.5,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C42",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 71500.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D42",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E42",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F42",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.969,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I42",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73219.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J42",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K42",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L42",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B42"
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
        "sourceCell": "_Law&GL22!O43",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 36.7,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P43",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q43",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.6,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C43",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 71866.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D43",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E43",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F43",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.931,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I43",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73080.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J43",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K43",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L43",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B43"
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
        "sourceCell": "_Law&GL22!O44",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C44",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D44",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E44",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F44",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K44",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L44",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B44"
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
        "sourceCell": "_Law&GL22!O45",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 37.8,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P45",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 35.2,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q45",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.2,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C45",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 74066.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D45",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E45",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F45",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.111,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I45",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73740.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J45",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K45",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L45",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B45"
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
        "sourceCell": "_Law&GL22!P46",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 36.4,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q46",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!E46",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F46",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.657,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I46",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 75742.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J46",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K46",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L46",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B46"
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
        "sourceCell": "_Law&GL22!P47",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 38.0,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q47",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!E47",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F47",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.384,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I47",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 78408.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J47",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K47",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L47",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B47"
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
        "sourceCell": "_Law&GL22!O48",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 41.7,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P48",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q48",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 21.1,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C48",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 77366.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D48",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E48",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F48",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.929,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I48",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 80406.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J48",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K48",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L48",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B48"
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
        "sourceCell": "_Law&GL22!P49",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 34.6,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q49",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I49",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73579.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J49",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K49",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L49",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B49"
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
        "sourceCell": "_Law&GL22!P50",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 37.7,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q50",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I50",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 79673.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J50",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K50",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L50",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B50"
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
        "sourceCell": "_Law&GL22!O51",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C51",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 63066.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D51",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E51",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F51",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K51",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L51",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B51"
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
        "sourceCell": "_Law&GL22!P52",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 46.3,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q52",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I52",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 64683.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J52",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K52",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L52",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B52"
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
        "sourceCell": "_Law&GL22!P53",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 45.7,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q53",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I53",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 66392.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J53",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K53",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L53",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B53"
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
        "sourceCell": "_Law&GL22!O54",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C54",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 61600.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D54",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E54",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F54",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "LPG",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K54",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L54",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B54"
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
        "sourceCell": "_Law&GL22!O55",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 32.3,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P55",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 29.9,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q55",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C55",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D55",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E55",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F55",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.157,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I55",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 70242.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J55",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K55",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L55",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B55"
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
        "sourceCell": "_Law&GL22!O56",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 41.4,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P56",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q56",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 22.0,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C56",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D56",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E56",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F56",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.544,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I56",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 78994.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J56",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K56",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L56",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B56"
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
        "sourceCell": "_Law&GL22!O57",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 40.0,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P57",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 37.3,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q57",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C57",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D57",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E57",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F57",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.979,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I57",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73256.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J57",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K57",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L57",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B57"
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
        "sourceCell": "_Law&GL22!O58",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 35.0,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P58",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q58",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.6,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C58",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D58",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E58",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F58",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 26.086,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I58",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 95648.66666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J58",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K58",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L58",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B58"
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
        "sourceCell": "_Law&GL22!O59",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C59",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D59",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E59",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F59",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K59",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L59",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B59"
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
        "sourceCell": "_Law&GL22!O60",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C60",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 57566.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D60",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E60",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F60",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K60",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L60",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B60"
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
        "sourceCell": "_Law&GL22!O61",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C61",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D61",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E61",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F61",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K61",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L61",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B61"
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
        "sourceCell": "_Law&GL22!O62",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 32.8,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P62",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 30.3,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q62",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C62",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D62",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E62",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F62",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.172,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I62",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 70297.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J62",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K62",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L62",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B62"
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
        "sourceCell": "_Law&GL22!O63",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C63",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D63",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E63",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F63",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.067,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I63",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 73579.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J63",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K63",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L63",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B63"
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
        "sourceCell": "_Law&GL22!O64",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 19.8,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P64",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 19.4,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q64",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C64",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D64",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E64",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F64",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 30.185,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I64",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 110678.33333333331,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J64",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K64",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L64",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B64"
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
        "sourceCell": "_Law&GL22!O65",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 21.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P65",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 20.5,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q65",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C65",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D65",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E65",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F65",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 27.404,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I65",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 100481.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J65",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K65",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L65",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B65"
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
        "sourceCell": "_Law&GL22!O66",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 25.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P66",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 24.7,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q66",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C66",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D66",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E66",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F66",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 29.909,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I66",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 109666.33333333331,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J66",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K66",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L66",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B66"
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
        "sourceCell": "_Law&GL22!O67",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 29.2,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P67",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 28.0,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q67",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C67",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D67",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E67",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F67",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.963,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I67",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 95197.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J67",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K67",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L67",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B67"
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
        "sourceCell": "_Law&GL22!O68",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 24.8,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P68",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 23.7,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q68",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C68",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D68",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E68",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F68",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.951,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I68",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 95153.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J68",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K68",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L68",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B68"
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
        "sourceCell": "_Law&GL22!O69",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 21.4,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P69",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 19.9,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q69",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.2,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C69",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 96066.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D69",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E69",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F69",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 26.468,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I69",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 97049.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J69",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K69",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L69",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B69"
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
        "sourceCell": "_Law&GL22!O70",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C70",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 101200.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D70",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E70",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F70",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K70",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L70",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B70"
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
        "sourceCell": "_Law&GL22!O71",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C71",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 106700.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D71",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E71",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F71",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K71",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L71",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B71"
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
        "sourceCell": "_Law&GL22!O72",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C72",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D72",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E72",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F72",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K72",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L72",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B72"
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
        "sourceCell": "_Law&GL22!O73",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C73",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D73",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E73",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F73",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K73",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L73",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B73"
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
        "sourceCell": "_Law&GL22!O74",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 29.0,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!P74",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 28.9,
        "unit": "MJ/kg",
        "sourceCell": "_Law&GL22!Q74",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 29.2,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C74",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D74",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E74",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F74",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K74",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L74",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B74"
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
        "sourceCell": "_Law&GL22!O75",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C75",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D75",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E75",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F75",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K75",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L75",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B75"
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
        "sourceCell": "_Law&GL22!O76",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C76",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D76",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E76",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F76",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K76",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L76",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B76"
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
        "sourceCell": "_Law&GL22!O77",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C77",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D77",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E77",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F77",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K77",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L77",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B77"
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
        "sourceCell": "_Law&GL22!O78",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C78",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D78",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E78",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F78",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K78",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L78",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B78"
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
        "sourceCell": "_Law&GL22!O79",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C79",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 259600.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D79",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E79",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F79",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K79",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L79",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B79"
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
        "sourceCell": "_Law&GL22!O80",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C80",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 181866.66666666666,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D80",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E80",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F80",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K80",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L80",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B80"
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
        "sourceCell": "_Law&GL22!O81",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
      },
      "t1_gross": {
        "value": 54.7,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!P81",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 49.4,
        "unit": "MJ/L",
        "sourceCell": "_Law&GL22!Q81",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 15.3,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!C81",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 56100.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D81",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E81",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F81",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "천연가스",
        "tC_per_TJ": {
          "value": 15.312,
          "unit": "tC/TJ",
          "sourceCell": "_Law&GL22!I81",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 56144.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J81",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K81",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L81",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B81"
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
        "sourceCell": "_Law&GL22!P82",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 38.9,
        "unit": "MJ/Nm3",
        "sourceCell": "_Law&GL22!Q82",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I82",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 55997.333333333336,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J82",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K82",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L82",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B82"
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
        "sourceCell": "_Law&GL22!P83",
        "sourceDoc": "IPCC 2006 GL (총발열량)"
      },
      "t2_net": {
        "value": 58.4,
        "unit": "MJ/Nm3",
        "sourceCell": "_Law&GL22!Q83",
        "sourceDoc": "국가고유 발열량 (17년, 별첨12)"
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
          "sourceCell": "_Law&GL22!I83",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CO2": {
          "value": 63998.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!J83",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "CH4": {
          "value": 5.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K83",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L83",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B83"
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
        "sourceCell": "_Law&GL22!O84",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C84",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 91666.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D84",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E84",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F84",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K84",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L84",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B84"
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
          "sourceCell": "_Law&GL22!C85",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 143000.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D85",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E85",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F85",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K85",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L85",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B85"
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
        "sourceCell": "_Law&GL22!O86",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C86",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D86",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E86",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F86",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K86",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L86",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B86"
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
        "sourceCell": "_Law&GL22!O87",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C87",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 105966.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D87",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E87",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F87",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K87",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.4,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L87",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B87"
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
        "sourceCell": "_Law&GL22!O88",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C88",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D88",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E88",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F88",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "목재/폐목재",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K88",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L88",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B88"
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
        "sourceCell": "_Law&GL22!O89",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C89",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 95333.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D89",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E89",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 2.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F89",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K89",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L89",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B89"
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
        "sourceCell": "_Law&GL22!O90",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C90",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D90",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E90",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F90",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "목재/폐목재",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K90",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L90",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B90"
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
        "sourceCell": "_Law&GL22!O91",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C91",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D91",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E91",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F91",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "숯(목탄)",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 200.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K91",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L91",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B91"
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
        "sourceCell": "_Law&GL22!O92",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C92",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D92",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E92",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F92",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K92",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L92",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B92"
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
        "sourceCell": "_Law&GL22!O93",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C93",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D93",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E93",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F93",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 10.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K93",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L93",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B93"
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
        "sourceCell": "_Law&GL22!O94",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C94",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 79566.66666666667,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D94",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E94",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F94",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K94",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L94",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B94"
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
        "sourceCell": "_Law&GL22!O95",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C95",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D95",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E95",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F95",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K95",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L95",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B95"
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
        "sourceCell": "_Law&GL22!O96",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C96",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D96",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E96",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F96",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K96",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L96",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B96"
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
        "sourceCell": "_Law&GL22!O97",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C97",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D97",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E97",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F97",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K97",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L97",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B97"
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
        "sourceCell": "_Law&GL22!O98",
        "sourceDoc": "IPCC 2006 GL (순발열량)"
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
          "sourceCell": "_Law&GL22!C98",
          "sourceDoc": "IPCC 2006 GL, Table 1.2/1.3/1.4"
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!D98",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!E98",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!F98",
          "sourceDoc": "IPCC 2006 GL, Table 1.4"
        }
      },
      "t2": {
        "group": "기타 바이오매스 및 폐기물",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 300.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!K98",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "sourceCell": "_Law&GL22!L98",
          "sourceDoc": "GIR 국가고유 배출계수 (17년)"
        }
      }
    },
    "_rowSource": "_Law&GL22!B98"
  }
];
