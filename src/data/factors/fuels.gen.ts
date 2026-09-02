/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  (C:\Workspace\My\온실가스\GHGCalc_V0m_lja.xlsm)
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 * 값 수준 원문서 매핑은 src/data/verified/*.json 참조.
 */

import type { Fuel } from "./types";
import { GIR_EF_2017, IPCC_2006_VOL2_CH1, KETS_ANNEX_12 } from "@/data/sources";

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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 45.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 42.2,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 77000.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 64166.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 32.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 30.4,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 18.9,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 69299.99999999999,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.548,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 71676.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 70033.33333333334,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 36.5,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 33.9,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.5,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 71500.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.969,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 73219.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 36.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 19.6,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 71866.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.931,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 73080.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 37.8,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 35.2,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.2,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 74066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.111,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 73740.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 20.657,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 75742.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.384,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 78408.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 41.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 21.1,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 77366.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.929,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 80406.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 79673.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 63066.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "LPG",
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 64683.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 66392.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 61600.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "LPG",
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 32.3,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 29.9,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.157,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 70242.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 41.4,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 39.2,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 22.0,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 21.544,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 78994.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 40.0,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 37.3,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.979,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 73256.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 35.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 34.2,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.6,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 26.086,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 95648.66666666664,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 57566.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 32.8,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 30.3,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 20.0,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석유",
        "tC_per_TJ": {
          "value": 19.172,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 70297.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 19.8,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 19.4,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 30.185,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 110678.33333333331,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 21.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 20.5,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 27.404,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 100481.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 25.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 24.7,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.8,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 98266.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 29.909,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 109666.33333333331,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 29.2,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 28.0,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.963,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 95197.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 24.8,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 23.7,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 25.8,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 94600.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 25.951,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 95153.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 21.4,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 19.9,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 26.2,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 96066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "석탄",
        "tC_per_TJ": {
          "value": 26.468,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 97049.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 101200.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 106700.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 97533.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 29.0,
        "unit": "MJ/kg",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 28.9,
        "unit": "MJ/kg",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 29.2,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 107066.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 80666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 44366.666666666664,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 259600.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 181866.66666666666,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t1_gross": {
        "value": 54.7,
        "unit": "MJ/L",
        "primarySource": IPCC_2006_VOL2_CH1
      },
      "t2_net": {
        "value": 49.4,
        "unit": "MJ/L",
        "primarySource": KETS_ANNEX_12
      }
    },
    "ef": {
      "t1_unit": "kgGHG/TJ",
      "t2_unit": "kgGHG/TJ",
      "t1": {
        "tC_per_TJ": {
          "value": 15.3,
          "unit": "tC/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 56100.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "천연가스",
        "tC_per_TJ": {
          "value": 15.312,
          "unit": "tC/TJ",
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 56144.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 55997.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": KETS_ANNEX_12
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
          "primarySource": GIR_EF_2017
        },
        "CO2": {
          "value": 63998.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 91666.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 143000.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 73333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 105966.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 1.5,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "목재/폐목재",
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 95333.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 2.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "목재/폐목재",
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 111833.33333333333,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        }
      },
      "t2": {
        "group": "숯(목탄)",
        "tC_per_TJ": null,
        "CO2": null,
        "CH4": {
          "value": 200.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
        },
        "N2O": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": GIR_EF_2017
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 70766.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 79566.66666666667,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 3.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.6,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 54633.333333333336,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 1.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 0.1,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
        "primarySource": IPCC_2006_VOL2_CH1
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
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CO2": {
          "value": 100100.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "CH4": {
          "value": 30.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
        },
        "N2O": {
          "value": 4.0,
          "unit": "kgGHG/TJ",
          "primarySource": IPCC_2006_VOL2_CH1
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
  }
];
