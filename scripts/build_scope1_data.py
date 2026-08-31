"""
_Law&GL22 시트에서 Scope 1 관련 데이터 (연료·산화계수·GWP) 를
TypeScript 데이터 모듈로 변환한다.

v0.2 (2026-08-31): 근거 구조 개편.
  이전:  { value, unit, sourceCell: "_Law&GL22!K69", sourceDoc: "IPCC 2006 GL, Table 1.4" }
         → 실제로는 내 xlsm 좌표. 감사자가 그 xlsm 파일을 열어봐야 하는 반쪽짜리 출처.
  변경:  { value, unit, primarySource: <문서 카탈로그 참조> }
         → 진짜 원문서 (IPCC PDF, GIR 공식 자료, K-ETS 지침 등) 로 바로 역추적.

primarySource 는 src/data/sources.ts 의 상수를 TS 심볼로 직접 참조한다
(플레이스홀더 __TS_REF__NAME__END__ 를 최종 렌더 시 심볼로 치환).

Usage:  python scripts/build_scope1_data.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "raw"
OUT_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "factors"

# ─────────────────────────────────────────────────────────────
# _Law&GL22 실제 컬럼 매핑
# ─────────────────────────────────────────────────────────────
COL_CATEGORY = "A"
COL_NAME = "B"
COL_T1_TC = "C"
COL_T1_CO2 = "D"
COL_T1_CH4 = "E"
COL_T1_N2O = "F"
COL_T1_EF_UNIT = "G"
COL_T2_GROUP = "H"
COL_T2_TC = "I"
COL_T2_CO2 = "J"
COL_T2_CH4 = "K"
COL_T2_N2O = "L"
COL_T2_EF_UNIT = "M"
COL_T1_NET_HEAT = "O"
COL_T1_GROSS_HEAT = "P"
COL_T2_NET_HEAT = "Q"
COL_HEAT_UNIT = "R"
COL_STATE = "T"

FUEL_ROW_START = 36
FUEL_ROW_END_FOR_SCOPE1 = 98

# ─────────────────────────────────────────────────────────────
# 문서 카탈로그 참조 (src/data/sources.ts 의 export 심볼명과 일치해야 함)
# ─────────────────────────────────────────────────────────────
SRC_IPCC_CH1 = "IPCC_2006_VOL2_CH1"
SRC_IPCC_CH2 = "IPCC_2006_VOL2_CH2"
SRC_KETS_A6 = "KETS_ANNEX_6"
SRC_KETS_A12 = "KETS_ANNEX_12"
SRC_GIR_17 = "GIR_EF_2017"


def col_letter_to_index(letter: str) -> int:
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1


def get_cell(sheet_rows, row_1based: int, col_letter: str):
    r = row_1based - 1
    c = col_letter_to_index(col_letter)
    if r < 0 or r >= len(sheet_rows):
        return None
    row = sheet_rows[r]
    if c < 0 or c >= len(row):
        return None
    return row[c]


def cell_value(cell):
    if cell is None:
        return None
    return cell.get("v")


def as_number(v):
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip()
    if s in ("", "-", "—", "–"):
        return None
    try:
        return float(s)
    except ValueError:
        return None


def slugify(text) -> str:
    s = str(text).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[()\[\]/\\.]", "", s)
    return s


def m(value, unit: str, primary_source_ref: str):
    """감사 근거 포함 계수 값. 값이 없으면 None."""
    if value is None:
        return None
    return {
        "value": value,
        "unit": unit,
        "primarySource": f"__TS_REF__{primary_source_ref}__END__",
    }


def build_fuels(sheet):
    rows = sheet["rows"]
    out = []

    for row_1based in range(FUEL_ROW_START, FUEL_ROW_END_FOR_SCOPE1 + 1):
        category = cell_value(get_cell(rows, row_1based, COL_CATEGORY))
        name = cell_value(get_cell(rows, row_1based, COL_NAME))
        if not name:
            continue
        state = cell_value(get_cell(rows, row_1based, COL_STATE))

        t1_ef_unit = cell_value(get_cell(rows, row_1based, COL_T1_EF_UNIT)) or "kgGHG/TJ"
        t1_co2 = as_number(cell_value(get_cell(rows, row_1based, COL_T1_CO2)))
        t1_ch4 = as_number(cell_value(get_cell(rows, row_1based, COL_T1_CH4)))
        t1_n2o = as_number(cell_value(get_cell(rows, row_1based, COL_T1_N2O)))
        t1_tc = as_number(cell_value(get_cell(rows, row_1based, COL_T1_TC)))

        t2_ef_unit = cell_value(get_cell(rows, row_1based, COL_T2_EF_UNIT)) or "kgGHG/TJ"
        t2_group = cell_value(get_cell(rows, row_1based, COL_T2_GROUP))
        t2_co2 = as_number(cell_value(get_cell(rows, row_1based, COL_T2_CO2)))
        t2_ch4 = as_number(cell_value(get_cell(rows, row_1based, COL_T2_CH4)))
        t2_n2o = as_number(cell_value(get_cell(rows, row_1based, COL_T2_N2O)))
        t2_tc = as_number(cell_value(get_cell(rows, row_1based, COL_T2_TC)))

        heat_unit = cell_value(get_cell(rows, row_1based, COL_HEAT_UNIT))
        t1_net = as_number(cell_value(get_cell(rows, row_1based, COL_T1_NET_HEAT)))
        t1_gross = as_number(cell_value(get_cell(rows, row_1based, COL_T1_GROSS_HEAT)))
        t2_net = as_number(cell_value(get_cell(rows, row_1based, COL_T2_NET_HEAT)))

        activity_unit = None
        if heat_unit == "MJ/kg":
            activity_unit = "ton-연료"
        elif heat_unit == "MJ/L":
            activity_unit = "kL-연료"
        elif heat_unit == "MJ/Nm3":
            activity_unit = "천m³-연료"

        fuel = {
            "id": slugify(name),
            "category": category,
            "name": name,
            "state": state,
            "activityUnit": activity_unit,
            "heat": {
                "unit": heat_unit,
                "t1_net":   m(t1_net,   heat_unit or "MJ/kg", SRC_IPCC_CH1),
                "t1_gross": m(t1_gross, heat_unit or "MJ/kg", SRC_IPCC_CH1),
                "t2_net":   m(t2_net,   heat_unit or "MJ/kg", SRC_KETS_A12),
            },
            "ef": {
                "t1_unit": t1_ef_unit,
                "t2_unit": t2_ef_unit,
                "t1": {
                    "tC_per_TJ": m(t1_tc,  "tC/TJ",    SRC_IPCC_CH1),
                    "CO2":       m(t1_co2, t1_ef_unit, SRC_IPCC_CH1),
                    "CH4":       m(t1_ch4, t1_ef_unit, SRC_IPCC_CH1),
                    "N2O":       m(t1_n2o, t1_ef_unit, SRC_IPCC_CH1),
                },
                "t2": {
                    "group":     t2_group,
                    "tC_per_TJ": m(t2_tc,  "tC/TJ",    SRC_GIR_17),
                    "CO2":       m(t2_co2, t2_ef_unit, SRC_GIR_17),
                    "CH4":       m(t2_ch4, t2_ef_unit, SRC_GIR_17),
                    "N2O":       m(t2_n2o, t2_ef_unit, SRC_GIR_17),
                },
            },
        }
        out.append(fuel)

    return out


def build_oxidation(sheet):
    """산화계수: _Law&GL22 상단 표. T1 은 IPCC 관례(기본 1), T2 는 K-ETS 별첨6."""
    rows = sheet["rows"]
    table = {}
    row_map = {"고체": 14, "액체": 15, "기체": 16}
    for state, r in row_map.items():
        t1 = as_number(cell_value(get_cell(rows, r, "M")))
        t2 = as_number(cell_value(get_cell(rows, r, "N")))
        table[state] = {
            "t1": m(t1, "-", SRC_IPCC_CH2),
            "t2": m(t2, "-", SRC_KETS_A6),
        }
    return table


def build_gwp():
    """GWP: 각 개정판 IPCC 원서 직접 참조. 한국 국가 인벤토리는 SAR 채택."""
    def g(value: float, ref: str):
        return {
            "value": value,
            "unit": "-",
            "primarySource": f"__TS_REF__{ref}__END__",
        }

    return {
        "SAR": {
            "label": "국가 인벤토리 (IPCC SAR 1995 채택)",
            "CO2": g(1,   "NATIONAL_INVENTORY_REPORT"),
            "CH4": g(21,  "NATIONAL_INVENTORY_REPORT"),
            "N2O": g(310, "NATIONAL_INVENTORY_REPORT"),
        },
        "AR4": {
            "label": "IPCC AR4 (2007)",
            "CO2": g(1,   "IPCC_AR4"),
            "CH4": g(25,  "IPCC_AR4"),
            "N2O": g(298, "IPCC_AR4"),
        },
        "AR5": {
            "label": "IPCC AR5 (2014)",
            "CO2": g(1,   "IPCC_AR5"),
            "CH4": g(28,  "IPCC_AR5"),
            "N2O": g(265, "IPCC_AR5"),
        },
        "AR6": {
            "label": "IPCC AR6 (2021)",
            "CO2": g(1,     "IPCC_AR6"),
            "CH4": g(27.9,  "IPCC_AR6"),
            "N2O": g(273,   "IPCC_AR6"),
        },
    }


TS_HEADER_TEMPLATE = """/**
 * carbontrace — Scope 1 계수 데이터.  자동 생성 파일.
 * 원본 파이프라인: scripts/build_scope1_data.py  ({source_xlsm})
 *
 * 이 파일을 직접 편집하지 마세요.
 * primary source (원문서 카탈로그) 는 src/data/sources.ts 참조.
 */

import type {{ {ts_types} }} from "./types";
{source_imports}

export const {var_name}: {ts_type} = {body};
"""


def collect_refs(obj, out):
    if isinstance(obj, dict):
        for v in obj.values():
            collect_refs(v, out)
    elif isinstance(obj, list):
        for v in obj:
            collect_refs(v, out)
    elif isinstance(obj, str):
        mm = re.match(r"__TS_REF__(\w+)__END__$", obj)
        if mm:
            out.append(mm.group(1))


def write_ts(path: Path, data, var_name: str, ts_type: str, ts_types_import: str, source_xlsm: str):
    body = json.dumps(data, ensure_ascii=False, indent=2)
    body = re.sub(r'"__TS_REF__(\w+)__END__"', r"\1", body)

    refs = []
    collect_refs(data, refs)
    imports_line = ""
    if refs:
        unique_refs = sorted(set(refs))
        imports_line = f'import {{ {", ".join(unique_refs)} }} from "@/data/sources";'

    content = TS_HEADER_TEMPLATE.format(
        source_xlsm=source_xlsm,
        ts_types=ts_types_import,
        source_imports=imports_line,
        var_name=var_name,
        ts_type=ts_type,
        body=body,
    )
    path.write_text(content, encoding="utf-8")
    print(f"[write] {path.name}  refs: {', '.join(sorted(set(refs))) if refs else '—'}")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    law_path = RAW_DIR / "sheet__Law&GL22.json"
    with law_path.open(encoding="utf-8") as fp:
        law = json.load(fp)

    manifest_path = RAW_DIR / "manifest.json"
    with manifest_path.open(encoding="utf-8") as fp:
        manifest = json.load(fp)
    source_xlsm = manifest.get("source", "GHGCalc_V0m_lja.xlsm")

    fuels = build_fuels(law)
    oxidation = build_oxidation(law)
    gwp = build_gwp()

    write_ts(OUT_DIR / "fuels.gen.ts",     fuels,     "FUELS",     "Fuel[]",         "Fuel", source_xlsm)
    write_ts(OUT_DIR / "oxidation.gen.ts", oxidation, "OXIDATION", "OxidationTable", "OxidationTable", source_xlsm)
    write_ts(OUT_DIR / "gwp.gen.ts",       gwp,       "GWP",       "GwpTables",      "GwpTables", source_xlsm)

    print()
    print(f"fuels     : {len(fuels)} entries")
    print(f"oxidation : {list(oxidation.keys())}")
    print(f"gwp       : {list(gwp.keys())}")


if __name__ == "__main__":
    main()
