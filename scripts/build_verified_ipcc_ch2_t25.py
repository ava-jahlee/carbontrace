"""
IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (Residential and Agriculture/Forestry/Fishing)
원문 값을 하드코딩해서 verified/ipcc-2006-vol2-ch2.json 을
Table 2.2 (T1) 매핑 + Table 2.5 (T2) 매핑으로 병합 생성한다.

배경 (별표 6 조사 중 발견):
  - K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정. Tier 2 규정 자체가 없음.
  - xlsm 이 T2 컬럼에 넣은 CH4/N2O 값들은 IPCC Ch.2 Table 2.5 (Residential 부문) 값.
  - 원본 xlsm 저자가 IPCC 다른 부문 표 (T1 = Energy Industries T2.2, T2 = Residential T2.5)
    두 개를 T1/T2 컬럼에 나눠 담아둔 것으로 해석.

원본 xlsm 오류 (12+24 = 36개 값 미매칭):
  - 석탄류 N2O: xlsm 1.4 vs Table 2.5 1.5 (Peat 값 오적용, 11개 fuel)
  - 여러 gas 류 (가스공장가스·코크스가스·고로가스·산소강철로가스·매립지가스·슬러지가스·기타바이오가스):
    xlsm 300/1.4~4.0 vs Table 2.5 5/0.1
  - 액성천연가스·정제가스·아황산염 잿물·기타 액체 바이오매스: 그룹 오분류
  이런 mismatch 는 verified 승격 안 되고 GIR_EF_2017 유지.

Usage: python scripts/build_verified_ipcc_ch2_t25.py
   (이 스크립트가 build_verified_ipcc_ch2.py 를 대체하며
    Table 2.2 T1 매핑도 재수록하여 하나의 JSON 으로 통합.)
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"
OUT = ROOT / "src" / "data" / "verified" / "ipcc-2006-vol2-ch2.json"


# ─────────────────────────────────────────────────────────────
# IPCC Vol.2 Ch.2 Table 2.2 (Energy Industries) — T1 매핑
# ─────────────────────────────────────────────────────────────
IPCC_T22 = {
    # 석유류: CH4=3, N2O=0.6
    "원유":                    {"ipcc_name": "Crude Oil",                  "ch4": 3, "n2o": 0.6},
    "오리멀젼":                 {"ipcc_name": "Orimulsion",                 "ch4": 3, "n2o": 0.6},
    "액성천연가스":              {"ipcc_name": "Natural Gas Liquids",         "ch4": 3, "n2o": 0.6},
    "휘발유-자동차용-가솔린":     {"ipcc_name": "Motor Gasoline",              "ch4": 3, "n2o": 0.6},
    "항공용-가솔린":            {"ipcc_name": "Aviation Gasoline",           "ch4": 3, "n2o": 0.6},
    "제트용-가솔린":            {"ipcc_name": "Jet Gasoline",                "ch4": 3, "n2o": 0.6},
    "제트용-등유-항공유":        {"ipcc_name": "Jet Kerosene",                "ch4": 3, "n2o": 0.6},
    "등유-기타-등유":           {"ipcc_name": "Other Kerosene",              "ch4": 3, "n2o": 0.6},
    "혈암유":                  {"ipcc_name": "Shale Oil",                   "ch4": 3, "n2o": 0.6},
    "경유-가스디젤-오일":        {"ipcc_name": "Gas/Diesel Oil",              "ch4": 3, "n2o": 0.6},
    "B-C유-잔여-석유연료":       {"ipcc_name": "Residual Fuel Oil",           "ch4": 3, "n2o": 0.6},
    "LPG-액화석유가스":          {"ipcc_name": "Liquefied Petroleum Gases",   "ch4": 1, "n2o": 0.1},
    "에탄":                    {"ipcc_name": "Ethane",                      "ch4": 1, "n2o": 0.1},
    "납사-나프타":              {"ipcc_name": "Naphtha",                    "ch4": 3, "n2o": 0.6},
    "아스팔트-역청":            {"ipcc_name": "Bitumen",                     "ch4": 3, "n2o": 0.6},
    "윤활유":                  {"ipcc_name": "Lubricants",                  "ch4": 3, "n2o": 0.6},
    "석유-코크스":              {"ipcc_name": "Petroleum Coke",              "ch4": 3, "n2o": 0.6},
    "정유공장-원료-정제-원료":    {"ipcc_name": "Refinery Feedstocks",         "ch4": 3, "n2o": 0.6},
    "정제가스":                 {"ipcc_name": "Refinery Gas",                "ch4": 1, "n2o": 0.1},
    "파라핀왁스밀랍":            {"ipcc_name": "Paraffin Waxes",              "ch4": 3, "n2o": 0.6},
    "용제-백유":                {"ipcc_name": "White Spirit and SBP",        "ch4": 3, "n2o": 0.6},
    "재생유-기타석유제품":       {"ipcc_name": "Other Petroleum Products",    "ch4": 3, "n2o": 0.6},
    # 석탄류: CH4=1, N2O=1.5
    "국내-무연탄":               {"ipcc_name": "Anthracite",                  "ch4": 1, "n2o": 1.5},
    "연료용-수입-무연탄":         {"ipcc_name": "Anthracite",                  "ch4": 1, "n2o": 1.5},
    "원료용-수입-무연탄":         {"ipcc_name": "Anthracite",                  "ch4": 1, "n2o": 1.5},
    "원료용-유연탄-점결탄":       {"ipcc_name": "Coking Coal",                 "ch4": 1, "n2o": 1.5},
    "연료용-유연탄-기타-유연탄":  {"ipcc_name": "Other Bituminous Coal",       "ch4": 1, "n2o": 1.5},
    "아역청탄-하위-유연탄":       {"ipcc_name": "Sub-Bituminous Coal",         "ch4": 1, "n2o": 1.5},
    "갈탄":                    {"ipcc_name": "Lignite",                     "ch4": 1, "n2o": 1.5},
    "유혈암-및-역청암":          {"ipcc_name": "Oil Shale and Tar Sands",     "ch4": 1, "n2o": 1.5},
    "갈색-연탄":                {"ipcc_name": "Brown Coal Briquettes",       "ch4": 1, "n2o": 1.5},
    "특허-연료":                {"ipcc_name": "Patent Fuel",                 "ch4": 1, "n2o": 1.5},
    "코크스로-코크스-석탄":       {"ipcc_name": "Coke Oven Coke and Lignite Coke", "ch4": 1, "n2o": 1.5},
    "가스-공장-코크스-가스-코크스": {"ipcc_name": "Gas Coke",                  "ch4": 1, "n2o": 0.1},
    "콜타르":                   {"ipcc_name": "Coal Tar",                    "ch4": 1, "n2o": 1.5},
    "가스공장-가스":             {"ipcc_name": "Gas Works Gas",               "ch4": 1, "n2o": 0.1},
    "코크스로-가스":             {"ipcc_name": "Coke Oven Gas",               "ch4": 1, "n2o": 0.1},
    "고로가스":                 {"ipcc_name": "Blast Furnace Gas",           "ch4": 1, "n2o": 0.1},
    "산소-강철로-가스":          {"ipcc_name": "Oxygen Steel Furnace Gas",    "ch4": 1, "n2o": 0.1},
    "천연가스LNG":               {"ipcc_name": "Natural Gas",                 "ch4": 1, "n2o": 0.1},
    # 기타 화석·바이오
    "도시폐기물-비-바이오매스":   {"ipcc_name": "Municipal Wastes (non-biomass fraction)", "ch4": 30, "n2o": 4},
    "산업-폐기물":              {"ipcc_name": "Industrial Wastes",           "ch4": 30, "n2o": 4},
    "폐유":                    {"ipcc_name": "Waste Oils",                  "ch4": 30, "n2o": 4},
    "이탄-토탄":                {"ipcc_name": "Peat",                        "ch4": 1, "n2o": 1.5},
    "목재목재폐기물":            {"ipcc_name": "Wood/Wood Waste",             "ch4": 30, "n2o": 4},
    "아황산염-잿물":             {"ipcc_name": "Sulphite lyes (black liquor)", "ch4": 3, "n2o": 2},
    "기타-주요한-고체-바이오매스": {"ipcc_name": "Other Primary Solid Biomass", "ch4": 30, "n2o": 4},
    "목탄":                    {"ipcc_name": "Charcoal",                    "ch4": 200, "n2o": 4},
    "바이오-가솔린":            {"ipcc_name": "Biogasoline",                 "ch4": 3, "n2o": 0.6},
    "바이오-디젤":              {"ipcc_name": "Biodiesels (Liquid)",         "ch4": 3, "n2o": 0.6},
    "기타-액체-바이오매스":      {"ipcc_name": "Other Liquid Biofuels",       "ch4": 3, "n2o": 0.6},
    "매립지-가스":              {"ipcc_name": "Landfill Gas",                "ch4": 1, "n2o": 0.1},
    "슬러지-가스":              {"ipcc_name": "Sludge Gas",                  "ch4": 1, "n2o": 0.1},
    "기타-바이오가스":           {"ipcc_name": "Other Biogas",                "ch4": 1, "n2o": 0.1},
    "도시폐기물-바이오매스":     {"ipcc_name": "Municipal Wastes (biomass fraction)", "ch4": 30, "n2o": 4},
}


# ─────────────────────────────────────────────────────────────
# IPCC Vol.2 Ch.2 Table 2.5 (Residential and Agriculture) — T2 매핑
# ─────────────────────────────────────────────────────────────
IPCC_T25 = {
    # 액체 석유류: CH4=10, N2O=0.6
    "원유":                    {"ipcc_name": "Crude Oil",                  "ch4": 10, "n2o": 0.6},
    "오리멀젼":                 {"ipcc_name": "Orimulsion",                 "ch4": 10, "n2o": 0.6},
    "액성천연가스":              {"ipcc_name": "Natural Gas Liquids",         "ch4": 10, "n2o": 0.6},
    "휘발유-자동차용-가솔린":     {"ipcc_name": "Motor Gasoline",              "ch4": 10, "n2o": 0.6},
    "항공용-가솔린":            {"ipcc_name": "Aviation Gasoline",           "ch4": 10, "n2o": 0.6},
    "제트용-가솔린":            {"ipcc_name": "Jet Gasoline",                "ch4": 10, "n2o": 0.6},
    "제트용-등유-항공유":        {"ipcc_name": "Jet Kerosene",                "ch4": 10, "n2o": 0.6},
    "등유-기타-등유":           {"ipcc_name": "Other Kerosene",              "ch4": 10, "n2o": 0.6},
    "혈암유":                  {"ipcc_name": "Shale Oil",                   "ch4": 10, "n2o": 0.6},
    "경유-가스디젤-오일":        {"ipcc_name": "Gas/Diesel Oil",              "ch4": 10, "n2o": 0.6},
    "B-A유":                   {"ipcc_name": "Residual Fuel Oil",           "ch4": 10, "n2o": 0.6},
    "B-B유":                   {"ipcc_name": "Residual Fuel Oil",           "ch4": 10, "n2o": 0.6},
    "B-C유-잔여-석유연료":       {"ipcc_name": "Residual Fuel Oil",           "ch4": 10, "n2o": 0.6},
    "부생연료-1호":             {"ipcc_name": "Residual Fuel Oil (부생연료는 액체석유 준용)", "ch4": 10, "n2o": 0.6},
    "부생연료-2호":             {"ipcc_name": "Residual Fuel Oil (부생연료는 액체석유 준용)", "ch4": 10, "n2o": 0.6},
    # LPG/기체: CH4=5, N2O=0.1
    "LPG-액화석유가스":          {"ipcc_name": "Liquefied Petroleum Gases",   "ch4": 5, "n2o": 0.1},
    "프로판LPG1호":              {"ipcc_name": "Liquefied Petroleum Gases (프로판은 LPG 준용)", "ch4": 5, "n2o": 0.1},
    "부탄LPG3호":               {"ipcc_name": "Liquefied Petroleum Gases (부탄은 LPG 준용)",   "ch4": 5, "n2o": 0.1},
    "에탄":                    {"ipcc_name": "Ethane",                      "ch4": 5, "n2o": 0.1},
    "천연가스LNG":               {"ipcc_name": "Natural Gas",                 "ch4": 5, "n2o": 0.1},
    "도시가스LNG":               {"ipcc_name": "Natural Gas (도시가스LNG 준용)",  "ch4": 5, "n2o": 0.1},
    "도시가스LPG":               {"ipcc_name": "Liquefied Petroleum Gases (도시가스LPG 준용)", "ch4": 5, "n2o": 0.1},
    # 석유류 기타 (액체): CH4=10, N2O=0.6
    "납사-나프타":              {"ipcc_name": "Naphtha",                    "ch4": 10, "n2o": 0.6},
    "아스팔트-역청":            {"ipcc_name": "Bitumen",                     "ch4": 10, "n2o": 0.6},
    "윤활유":                  {"ipcc_name": "Lubricants",                  "ch4": 10, "n2o": 0.6},
    "석유-코크스":              {"ipcc_name": "Petroleum Coke",              "ch4": 10, "n2o": 0.6},
    "정유공장-원료-정제-원료":    {"ipcc_name": "Refinery Feedstocks",         "ch4": 10, "n2o": 0.6},
    "정제가스":                 {"ipcc_name": "Refinery Gas",                "ch4": 5, "n2o": 0.1},
    "파라핀왁스밀랍":            {"ipcc_name": "Paraffin Waxes",              "ch4": 10, "n2o": 0.6},
    "용제-백유":                {"ipcc_name": "White Spirit and SBP",        "ch4": 10, "n2o": 0.6},
    "재생유-기타석유제품":       {"ipcc_name": "Other Petroleum Products",    "ch4": 10, "n2o": 0.6},
    # 유도 gas (기체): CH4=5, N2O=0.1
    "가스-공장-코크스-가스-코크스": {"ipcc_name": "Gas Coke",                  "ch4": 5, "n2o": 0.1},
    "가스공장-가스":             {"ipcc_name": "Gas Works Gas",               "ch4": 5, "n2o": 0.1},
    "코크스로-가스":             {"ipcc_name": "Coke Oven Gas",               "ch4": 5, "n2o": 0.1},
    "고로가스":                 {"ipcc_name": "Blast Furnace Gas",           "ch4": 5, "n2o": 0.1},
    "산소-강철로-가스":          {"ipcc_name": "Oxygen Steel Furnace Gas",    "ch4": 5, "n2o": 0.1},
    # 석탄류: CH4=300, N2O=1.5 (Peat 만 CH4=300, N2O=1.4)
    "국내-무연탄":               {"ipcc_name": "Anthracite",                  "ch4": 300, "n2o": 1.5},
    "연료용-수입-무연탄":         {"ipcc_name": "Anthracite",                  "ch4": 300, "n2o": 1.5},
    "원료용-수입-무연탄":         {"ipcc_name": "Anthracite",                  "ch4": 300, "n2o": 1.5},
    "원료용-유연탄-점결탄":       {"ipcc_name": "Coking Coal",                 "ch4": 300, "n2o": 1.5},
    "연료용-유연탄-기타-유연탄":  {"ipcc_name": "Other Bituminous Coal",       "ch4": 300, "n2o": 1.5},
    "아역청탄-하위-유연탄":       {"ipcc_name": "Sub-Bituminous Coal",         "ch4": 300, "n2o": 1.5},
    "갈탄":                    {"ipcc_name": "Lignite",                     "ch4": 300, "n2o": 1.5},
    "유혈암-및-역청암":          {"ipcc_name": "Oil Shale and Tar Sands",     "ch4": 300, "n2o": 1.5},
    "갈색-연탄":                {"ipcc_name": "Brown Coal Briquettes",       "ch4": 300, "n2o": 1.5},
    "특허-연료":                {"ipcc_name": "Patent Fuel",                 "ch4": 300, "n2o": 1.5},
    "코크스로-코크스-석탄":       {"ipcc_name": "Coke Oven Coke and Lignite Coke", "ch4": 300, "n2o": 1.5},
    "콜타르":                   {"ipcc_name": "Coal Tar",                    "ch4": 300, "n2o": 1.5},
    "이탄-토탄":                {"ipcc_name": "Peat",                        "ch4": 300, "n2o": 1.4},
    # 폐기물·바이오매스·바이오가스·바이오연료
    "도시폐기물-비-바이오매스":   {"ipcc_name": "Municipal Wastes (non-biomass fraction)", "ch4": 300, "n2o": 4.0},
    "산업-폐기물":              {"ipcc_name": "Industrial Wastes",           "ch4": 300, "n2o": 4.0},
    "폐유":                    {"ipcc_name": "Waste Oils",                  "ch4": 300, "n2o": 4.0},
    "목재목재폐기물":            {"ipcc_name": "Wood / Wood Waste",           "ch4": 300, "n2o": 4.0},
    "아황산염-잿물":             {"ipcc_name": "Sulphite Lyes (Black Liquor)", "ch4": 3, "n2o": 2.0},
    "기타-주요한-고체-바이오매스": {"ipcc_name": "Other Primary Solid Biomass", "ch4": 300, "n2o": 4.0},
    "목탄":                    {"ipcc_name": "Charcoal",                    "ch4": 200, "n2o": 1.0},
    "바이오-가솔린":            {"ipcc_name": "Biogasoline",                 "ch4": 10, "n2o": 0.6},
    "바이오-디젤":              {"ipcc_name": "Biodiesels",                  "ch4": 10, "n2o": 0.6},
    "기타-액체-바이오매스":      {"ipcc_name": "Other Liquid Biofuels",       "ch4": 10, "n2o": 0.6},
    "매립지-가스":              {"ipcc_name": "Landfill Gas",                "ch4": 5, "n2o": 0.1},
    "슬러지-가스":              {"ipcc_name": "Sludge Gas",                  "ch4": 5, "n2o": 0.1},
    "기타-바이오가스":           {"ipcc_name": "Other Biogas",                "ch4": 5, "n2o": 0.1},
    # Table 2.5 는 Municipal Wastes (biomass fraction) 를 명시하지 않지만 Table 2.4 는 명시 → Table 2.4 준용
    "도시폐기물-바이오매스":     {"ipcc_name": "Municipal Wastes (biomass fraction) [Table 2.4 준용]", "ch4": 300, "n2o": 4.0},
}


def slugify(text) -> str:
    s = str(text).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[()\[\]/\\.]", "", s)
    return s


def close(a, b, abs_tol=1e-9):
    if a is None or b is None:
        return False
    return abs(a - b) <= abs_tol


def load_actuals():
    with RAW.open(encoding="utf-8") as fp:
        law = json.load(fp)
    rows = law["rows"]
    result = {}
    for i in range(35, 98):
        row = rows[i]
        name_cell = row[1] if len(row) > 1 else None
        if not name_cell or name_cell.get("v") is None:
            continue
        name = name_cell["v"]
        fid = slugify(name)
        def num(idx):
            if len(row) <= idx or row[idx] is None:
                return None
            v = row[idx].get("v")
            try:
                return float(v)
            except (TypeError, ValueError):
                return None
        result[fid] = {
            "t1_ch4": num(4),   # E
            "t1_n2o": num(5),   # F
            "t2_ch4": num(10),  # K
            "t2_n2o": num(11),  # L
        }
    return result


def build_entries():
    actuals = load_actuals()
    entries: dict[str, dict] = {}
    stats = {"t1_matched": 0, "t1_mismatched": 0, "t2_matched": 0, "t2_mismatched": 0}
    t2_mismatch_detail: list[str] = []

    # ── Table 2.2 (T1) ─────────────────────────
    for fid, spec in IPCC_T22.items():
        act = actuals.get(fid)
        if not act:
            continue
        for gas, ipcc_v, act_v in [
            ("CH4", spec["ch4"], act["t1_ch4"]),
            ("N2O", spec["n2o"], act["t1_n2o"]),
        ]:
            if act_v is None:
                continue
            if close(ipcc_v, act_v):
                entries[f"fuel.{fid}.ef.t1.{gas}"] = {
                    "row": f"Table 2.2 · {spec['ipcc_name']} · {gas} Emission Factor",
                    "page": "2.16–2.17",
                    "expectedValue": act_v,
                    "note": "IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
                }
                stats["t1_matched"] += 1
            else:
                stats["t1_mismatched"] += 1

    # ── Table 2.5 (T2) ─────────────────────────
    for fid, spec in IPCC_T25.items():
        act = actuals.get(fid)
        if not act:
            continue
        for gas, ipcc_v, act_v in [
            ("CH4", spec["ch4"], act["t2_ch4"]),
            ("N2O", spec["n2o"], act["t2_n2o"]),
        ]:
            if act_v is None:
                continue
            if close(ipcc_v, act_v):
                entries[f"fuel.{fid}.ef.t2.{gas}"] = {
                    "row": f"Table 2.5 · {spec['ipcc_name']} · {gas} Emission Factor",
                    "page": "2.22–2.23",
                    "expectedValue": act_v,
                    "note": (
                        "IPCC 2006 GL Vol.2 Ch.2 Table 2.5 "
                        "(Default EF for Stationary Combustion in Residential and Agriculture/Forestry/Fishing/Fishing Farms Categories). "
                        "kg/TJ on Net Calorific Basis. "
                        "참고: K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 컬럼 값은 지침이 아닌 IPCC Ch.2 Table 2.5 원출처. "
                        "xlsm T1 = Table 2.2 (Energy Industries), T2 = Table 2.5 (Residential) 로 두 부문 담아둔 것으로 해석."
                    ),
                }
                stats["t2_matched"] += 1
            else:
                stats["t2_mismatched"] += 1
                t2_mismatch_detail.append(
                    f"    {fid} / {gas}: xlsm={act_v} vs IPCC T2.5={ipcc_v}"
                )

    entries = dict(sorted(entries.items()))

    doc = {
        "$schema": "verified-source-map v1",
        "docId": "ipcc-2006-vol2-ch2",
        "reviewedAt": "2026-09-02",
        "reviewNote": (
            "IPCC 2006 GL Vol.2 (Energy) · Chapter 2 (Stationary Combustion). "
            "T1 CH4/N2O = Table 2.2 (Energy Industries, p.2.16-2.17). "
            "T2 CH4/N2O = Table 2.5 (Residential and Agriculture/Forestry/Fishing, p.2.22-2.23). "
            "원본 xlsm 이 T1/T2 컬럼에 IPCC 두 부문 표를 나눠 담은 것으로 확인. "
            "K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정하므로 T2 값의 실제 원출처는 지침이 아닌 IPCC. "
            "일치하는 값은 verified 승격, 불일치 값은 GIR_EF_2017 유지 (원본 xlsm 오작성 의심)."
        ),
        "entries": entries,
    }

    return doc, stats, t2_mismatch_detail


def main():
    doc, stats, t2_mm = build_entries()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as fp:
        json.dump(doc, fp, ensure_ascii=False, indent=2)

    print(f"[write] {OUT.relative_to(ROOT)}  ({len(doc['entries'])} entries)")
    print(f"  T1 (Table 2.2): matched {stats['t1_matched']} · mismatched {stats['t1_mismatched']}")
    print(f"  T2 (Table 2.5): matched {stats['t2_matched']} · mismatched {stats['t2_mismatched']}")
    if t2_mm:
        print("  ─ T2 mismatch (승격 안 됨, GIR 유지) ─")
        for line in t2_mm:
            print(line)


if __name__ == "__main__":
    main()
