"""
_Law&GL22 시트에서 Scope 1 관련 데이터 (연료·산화계수·GWP) 를
TypeScript 데이터 모듈로 변환한다.

각 계수 값은 반드시 다음 세 가지를 같이 갖는다:
  - value        : 숫자
  - unit         : 단위 문자열
  - sourceCell   : 원본 xlsm 의 시트!셀 주소 (예: "_Law&GL22!E36")
  - sourceDoc    : 근거 문서 (예: "IPCC 2006 GL", "국가고유(17년)")

이 감사 근거가 UI 셀 팝오버에 그대로 표시된다.

Usage:  python scripts/build_scope1_data.py
"""
from __future__ import annotations

import json
import re
from pathlib import Path

RAW_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "raw"
OUT_DIR = Path(__file__).resolve().parent.parent / "src" / "data" / "factors"

# ─────────────────────────────────────────────────────────────
# _Law&GL22 시트 실제 컬럼 매핑 (원본 xlsm 상 컬럼 문자 기준)
#
# 주의: 문서 02_Main시트_분석.md 는 VLOOKUP relative index (B=1) 로 설명함.
#       하지만 파일 자체는 A 열부터 시작하고 A 열이 "분류" 이다.
#       Main 수식의 range B35:U100 에서 B가 VLOOKUP 1열 = 연료명.
#
# 헤더 행 35:
#   A=분류 / B=연료 / C=tC/TJ T1 / D=CO2 T1 / E=CH4 T1 / F=N2O T1 / G=단위 T1 /
#   H=구분 T2 / I=tC/TJ T2 / J=CO2 T2 / K=CH4 T2 / L=N2O T2 / M=단위 T2 / N=(빈) /
#   O=순발열량 T1 / P=총발열량 T1 / Q=순발열량 T2 / R=단위(열량) / S=산화계수 T1 값 /
#   T=상온 / U=산화계수 T2 값
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
COL_OX_T1 = "S"
COL_STATE = "T"
COL_OX_T2 = "U"

# 연료 데이터 행 범위 (원유 = 36, 열평균 = 103; 전력/열 스팀은 별도)
FUEL_ROW_START = 36
FUEL_ROW_END_FOR_SCOPE1 = 98   # 바이오매스 도시폐기물까지 (99~103 은 전력/열 → Scope 2)

# 산화계수 참조 테이블 (_Law&GL22!L14:O16)
#   L14 라벨 / M14=T1 / N14=T2 / O14=(T3 사용자입력)
OX_TABLE = {
    # (state_kr): {t1: (value, "L14:M16" 셀), t2: (value, cell)}
    "고체": ("M14", "N14"),
    "액체": ("M15", "N15"),
    "기체": ("M16", "N16"),
}

# GWP 테이블 (_Law&GL22!K24:L26)
#   K24=CO2 / L24=1 / K25=CH4 / L25=21 / K26=N2O / L26=310
GWP_KR_CELLS = {
    "CO2": "L24",
    "CH4": "L25",
    "N2O": "L26",
}

# IPCC 개정판 GWP (문서 상수. xlsm 밖 근거)
GWP_TABLES = {
    "SAR": {"label": "국가 인벤토리 (SAR 1995)", "CO2": 1, "CH4": 21, "N2O": 310,
             "source": "IPCC Second Assessment Report (1995) / 한국 국가인벤토리 채택"},
    "AR4": {"label": "IPCC AR4 (2007)",           "CO2": 1, "CH4": 25, "N2O": 298,
             "source": "IPCC Fourth Assessment Report (2007), 100-year GWP"},
    "AR5": {"label": "IPCC AR5 (2014)",           "CO2": 1, "CH4": 28, "N2O": 265,
             "source": "IPCC Fifth Assessment Report (2014), 100-year GWP, w/o feedback"},
    "AR6": {"label": "IPCC AR6 (2021)",           "CO2": 1, "CH4": 27.9, "N2O": 273,
             "source": "IPCC Sixth Assessment Report (2021), 100-year GWP-100"},
}


def col_letter_to_index(letter: str) -> int:
    """엑셀 열 문자열 → 0-based 인덱스."""
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1


def cell_addr(sheet: str, col: str, row: int) -> str:
    return f"{sheet}!{col}{row}"


def get_cell(sheet_rows: list, row_1based: int, col_letter: str):
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
    """엑셀 값 → 숫자 or None ('-' 등 dash 는 None)."""
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
    """연료명 → id 로 쓸 slug (한글 유지, 공백/특수문자만 정리)."""
    s = str(text).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[()\[\]/\\.]", "", s)
    return s


def make_measurement(value, unit: str, source_cell: str, source_doc: str):
    """감사 근거 포함 계수 값 객체.  값이 None 이면 그대로 None 리턴."""
    if value is None:
        return None
    return {
        "value": value,
        "unit": unit,
        "sourceCell": source_cell,
        "sourceDoc": source_doc,
    }


def build_fuels(sheet):
    rows = sheet["rows"]
    sheet_name = sheet["name"]  # "_Law&GL22"
    out = []

    for row_1based in range(FUEL_ROW_START, FUEL_ROW_END_FOR_SCOPE1 + 1):
        category = cell_value(get_cell(rows, row_1based, COL_CATEGORY))
        name = cell_value(get_cell(rows, row_1based, COL_NAME))
        if not name:
            continue
        state = cell_value(get_cell(rows, row_1based, COL_STATE))  # 고체/액체/기체

        # T1 (IPCC 2006 GL) 배출계수
        t1_ef_unit = cell_value(get_cell(rows, row_1based, COL_T1_EF_UNIT)) or "kgGHG/TJ"
        t1_co2 = as_number(cell_value(get_cell(rows, row_1based, COL_T1_CO2)))
        t1_ch4 = as_number(cell_value(get_cell(rows, row_1based, COL_T1_CH4)))
        t1_n2o = as_number(cell_value(get_cell(rows, row_1based, COL_T1_N2O)))
        t1_tc  = as_number(cell_value(get_cell(rows, row_1based, COL_T1_TC)))

        # T2 (국가고유 - 17년 xlsm 기준; 22년은 별도 스프레드시트에서 병합)
        t2_ef_unit = cell_value(get_cell(rows, row_1based, COL_T2_EF_UNIT)) or "kgGHG/TJ"
        t2_group = cell_value(get_cell(rows, row_1based, COL_T2_GROUP))
        t2_co2 = as_number(cell_value(get_cell(rows, row_1based, COL_T2_CO2)))
        t2_ch4 = as_number(cell_value(get_cell(rows, row_1based, COL_T2_CH4)))
        t2_n2o = as_number(cell_value(get_cell(rows, row_1based, COL_T2_N2O)))
        t2_tc  = as_number(cell_value(get_cell(rows, row_1based, COL_T2_TC)))

        # 열량계수
        heat_unit = cell_value(get_cell(rows, row_1based, COL_HEAT_UNIT))  # MJ/kg 등
        t1_net = as_number(cell_value(get_cell(rows, row_1based, COL_T1_NET_HEAT)))
        t1_gross = as_number(cell_value(get_cell(rows, row_1based, COL_T1_GROSS_HEAT)))
        t2_net = as_number(cell_value(get_cell(rows, row_1based, COL_T2_NET_HEAT)))

        # 산화계수 T1/T2 (연료 자체 열이 아닌 별도 표에서 상온 기준 조회. 참고용)
        ox_t1 = as_number(cell_value(get_cell(rows, row_1based, COL_OX_T1)))
        ox_t2 = as_number(cell_value(get_cell(rows, row_1based, COL_OX_T2)))

        # 사용량 기본 단위 추정 (열량계수 단위로부터)
        # MJ/kg → ton-연료  /  MJ/L → kL-연료  /  MJ/Nm3 → 천m³-연료
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
            "activityUnit": activity_unit,   # 사용자 입력 사용량의 단위
            "heat": {
                "unit": heat_unit,
                "t1_net":   make_measurement(t1_net,   heat_unit or "MJ/kg", cell_addr(sheet_name, COL_T1_NET_HEAT,   row_1based), "IPCC 2006 GL (순발열량)"),
                "t1_gross": make_measurement(t1_gross, heat_unit or "MJ/kg", cell_addr(sheet_name, COL_T1_GROSS_HEAT, row_1based), "IPCC 2006 GL (총발열량)"),
                "t2_net":   make_measurement(t2_net,   heat_unit or "MJ/kg", cell_addr(sheet_name, COL_T2_NET_HEAT,   row_1based), "국가고유 발열량 (17년, 별첨12)"),
            },
            "ef": {
                "t1_unit": t1_ef_unit,
                "t2_unit": t2_ef_unit,
                "t1": {
                    "tC_per_TJ": make_measurement(t1_tc,  "tC/TJ",       cell_addr(sheet_name, COL_T1_TC,  row_1based), "IPCC 2006 GL, Table 1.2/1.3/1.4"),
                    "CO2":       make_measurement(t1_co2, t1_ef_unit,    cell_addr(sheet_name, COL_T1_CO2, row_1based), "IPCC 2006 GL, Table 1.4"),
                    "CH4":       make_measurement(t1_ch4, t1_ef_unit,    cell_addr(sheet_name, COL_T1_CH4, row_1based), "IPCC 2006 GL, Table 1.4"),
                    "N2O":       make_measurement(t1_n2o, t1_ef_unit,    cell_addr(sheet_name, COL_T1_N2O, row_1based), "IPCC 2006 GL, Table 1.4"),
                },
                "t2": {
                    "group":     t2_group,
                    "tC_per_TJ": make_measurement(t2_tc,  "tC/TJ",       cell_addr(sheet_name, COL_T2_TC,  row_1based), "GIR 국가고유 배출계수 (17년)"),
                    "CO2":       make_measurement(t2_co2, t2_ef_unit,    cell_addr(sheet_name, COL_T2_CO2, row_1based), "GIR 국가고유 배출계수 (17년)"),
                    "CH4":       make_measurement(t2_ch4, t2_ef_unit,    cell_addr(sheet_name, COL_T2_CH4, row_1based), "GIR 국가고유 배출계수 (17년)"),
                    "N2O":       make_measurement(t2_n2o, t2_ef_unit,    cell_addr(sheet_name, COL_T2_N2O, row_1based), "GIR 국가고유 배출계수 (17년)"),
                },
            },
            "_rowSource": cell_addr(sheet_name, COL_NAME, row_1based),
        }
        out.append(fuel)

    return out


def build_oxidation(sheet):
    """산화계수는 _Law&GL22!L14:O16 표 참조. 상온(고체/액체/기체) × Tier."""
    rows = sheet["rows"]
    sheet_name = sheet["name"]
    table = {}
    row_map = {"고체": 14, "액체": 15, "기체": 16}
    for state, r in row_map.items():
        # 표 구조: M열=T1 값, N열=T2 값
        t1 = as_number(cell_value(get_cell(rows, r, "M")))
        t2 = as_number(cell_value(get_cell(rows, r, "N")))
        table[state] = {
            "t1": make_measurement(t1, "-", cell_addr(sheet_name, "M", r), "온실가스 배출권거래제 지침 [별첨6]"),
            "t2": make_measurement(t2, "-", cell_addr(sheet_name, "N", r), "온실가스 배출권거래제 지침 [별첨6]"),
        }
    return table


def build_gwp():
    """국가 인벤토리(SAR)는 xlsm 셀에 값이 있고, AR4/AR5/AR6는 IPCC 상수."""
    return GWP_TABLES


def format_ts(obj, indent=0):
    """JSON → 사람이 읽기 좋은 TS literal.  ensure_ascii=False 로 한글 유지."""
    return json.dumps(obj, ensure_ascii=False, indent=2)


TS_HEADER = """/**
 * carbontrace — Scope 1 계수 데이터
 * 생성: scripts/build_scope1_data.py
 * 원본: {source_xlsm}
 *
 * 이 파일은 자동 생성됩니다. 직접 편집하지 마세요.
 * 원본 값이 바뀌면 xlsm 을 갱신하고 스크립트를 재실행하세요.
 */

import type {{ Fuel, OxidationTable, GwpTables }} from "./types";

"""


def write_ts(path: Path, name: str, ts_type: str, data, source_xlsm: str):
    body = format_ts(data)
    content = TS_HEADER.format(source_xlsm=source_xlsm) + f"export const {name}: {ts_type} = {body};\n"
    path.write_text(content, encoding="utf-8")
    print(f"[write] {path.relative_to(path.parent.parent.parent)}")


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

    write_ts(OUT_DIR / "fuels.gen.ts",     "FUELS",     "Fuel[]",         fuels,     source_xlsm)
    write_ts(OUT_DIR / "oxidation.gen.ts", "OXIDATION", "OxidationTable", oxidation, source_xlsm)
    write_ts(OUT_DIR / "gwp.gen.ts",       "GWP",       "GwpTables",      gwp,       source_xlsm)

    # 요약 로그
    print()
    print(f"fuels     : {len(fuels)} entries")
    print(f"oxidation : {list(oxidation.keys())}")
    print(f"gwp       : {list(gwp.keys())}")


if __name__ == "__main__":
    main()
