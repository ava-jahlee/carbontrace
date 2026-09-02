"""
IPCC 2006 GL Vol.2 Ch.2 (Stationary Combustion) 원문 값을 하드코딩해서
verified/ipcc-2006-vol2-ch2.json 을 자동 생성한다.

우리 원본 xlsm 저자가 채택한 섹터는 Table 2.2 (Energy Industries).
검증: 석탄류 CH4=1 (T2.2), N2O=1.5 로 우리 값과 일치. Table 2.3 이었으면 CH4=10.

원문 참조:
- Table 2.2 (Energy Industries): p.2.16–2.17
- 우리 fuel id 별 CH4/N2O EF 하드코딩 → 우리 xlsm 값과 대조 → 매칭 시 verified 로 승격.

Usage: python scripts/build_verified_ipcc_ch2.py
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "src" / "data" / "raw"
VERIFIED_DIR = ROOT / "src" / "data" / "verified"

# ─────────────────────────────────────────────────────────────
# IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Energy Industries) 원문 값
#   fuel_id → { ipcc_name, ch4, n2o }
#
# 값이 대부분 fuel-group 별로 같음. 예:
#   석유류 (Crude Oil-Bitumen-...): CH4=3, N2O=0.6
#   LPG/Ethane/Refinery Gas/가스류: CH4=1, N2O=0.1
#   석탄류 (Anthracite 등): CH4=1, N2O=1.5
#   폐기물/Wood: CH4=30, N2O=4
#   Sulphite lyes (black liquor): CH4=3, N2O=2
#   Charcoal: CH4=200, N2O=4  ← 우리 xlsm 값(30)과 불일치, 승격 안 됨
#   바이오 액체: CH4=3, N2O=0.6
#   바이오가스: CH4=1, N2O=0.1
# ─────────────────────────────────────────────────────────────
IPCC_CH2_T22 = {
    # 석유류
    "원유":                   {"ipcc_name": "Crude Oil",                  "ch4": 3,   "n2o": 0.6},
    "오리멀젼":               {"ipcc_name": "Orimulsion",                 "ch4": 3,   "n2o": 0.6},
    "액성천연가스":           {"ipcc_name": "Natural Gas Liquids",         "ch4": 3,   "n2o": 0.6},
    "휘발유-자동차용-가솔린": {"ipcc_name": "Motor Gasoline",             "ch4": 3,   "n2o": 0.6},
    "항공용-가솔린":          {"ipcc_name": "Aviation Gasoline",           "ch4": 3,   "n2o": 0.6},
    "제트용-가솔린":          {"ipcc_name": "Jet Gasoline",                "ch4": 3,   "n2o": 0.6},
    "제트용-등유-항공유":     {"ipcc_name": "Jet Kerosene",                "ch4": 3,   "n2o": 0.6},
    "등유-기타-등유":         {"ipcc_name": "Other Kerosene",              "ch4": 3,   "n2o": 0.6},
    "혈암유":                 {"ipcc_name": "Shale Oil",                   "ch4": 3,   "n2o": 0.6},
    "경유-가스디젤-오일":     {"ipcc_name": "Gas/Diesel Oil",              "ch4": 3,   "n2o": 0.6},
    "B-C유-잔여-석유연료":   {"ipcc_name": "Residual Fuel Oil",           "ch4": 3,   "n2o": 0.6},
    "LPG-액화석유가스":       {"ipcc_name": "Liquefied Petroleum Gases",   "ch4": 1,   "n2o": 0.1},
    "에탄":                   {"ipcc_name": "Ethane",                      "ch4": 1,   "n2o": 0.1},
    "납사-나프타":            {"ipcc_name": "Naphtha",                    "ch4": 3,   "n2o": 0.6},
    "아스팔트-역청":          {"ipcc_name": "Bitumen",                     "ch4": 3,   "n2o": 0.6},
    "윤활유":                 {"ipcc_name": "Lubricants",                  "ch4": 3,   "n2o": 0.6},
    "석유-코크스":            {"ipcc_name": "Petroleum Coke",              "ch4": 3,   "n2o": 0.6},
    "정유공장-원료-정제-원료":{"ipcc_name": "Refinery Feedstocks",         "ch4": 3,   "n2o": 0.6},
    "정제가스":               {"ipcc_name": "Refinery Gas",                "ch4": 1,   "n2o": 0.1},
    "파라핀왁스밀랍":         {"ipcc_name": "Paraffin Waxes",              "ch4": 3,   "n2o": 0.6},
    "용제-백유":              {"ipcc_name": "White Spirit and SBP",        "ch4": 3,   "n2o": 0.6},
    "재생유-기타석유제품":    {"ipcc_name": "Other Petroleum Products",    "ch4": 3,   "n2o": 0.6},

    # 석탄류 (CH4=1, N2O=1.5)
    "국내-무연탄":            {"ipcc_name": "Anthracite",                  "ch4": 1,   "n2o": 1.5},
    "연료용-수입-무연탄":     {"ipcc_name": "Anthracite",                  "ch4": 1,   "n2o": 1.5},
    "원료용-수입-무연탄":     {"ipcc_name": "Anthracite",                  "ch4": 1,   "n2o": 1.5},
    "원료용-유연탄-점결탄":   {"ipcc_name": "Coking Coal",                 "ch4": 1,   "n2o": 1.5},
    "연료용-유연탄-기타-유연탄": {"ipcc_name": "Other Bituminous Coal",   "ch4": 1,   "n2o": 1.5},
    "아역청탄-하위-유연탄":   {"ipcc_name": "Sub-Bituminous Coal",         "ch4": 1,   "n2o": 1.5},
    "갈탄":                   {"ipcc_name": "Lignite",                     "ch4": 1,   "n2o": 1.5},
    "유혈암-및-역청암":       {"ipcc_name": "Oil Shale and Tar Sands",     "ch4": 1,   "n2o": 1.5},
    "갈색-연탄":              {"ipcc_name": "Brown Coal Briquettes",       "ch4": 1,   "n2o": 1.5},
    "특허-연료":              {"ipcc_name": "Patent Fuel",                 "ch4": 1,   "n2o": 1.5},
    "코크스로-코크스-석탄":   {"ipcc_name": "Coke Oven Coke and Lignite Coke", "ch4": 1, "n2o": 1.5},
    # Gas Coke: CH4=1, N2O=0.1 (기체 코크스는 가스류로 취급됨)
    "가스-공장-코크스-가스-코크스": {"ipcc_name": "Gas Coke",             "ch4": 1,   "n2o": 0.1},
    "콜타르":                 {"ipcc_name": "Coal Tar",                    "ch4": 1,   "n2o": 1.5},

    # 가스류 (CH4=1, N2O=0.1)
    "가스공장-가스":          {"ipcc_name": "Gas Works Gas",               "ch4": 1,   "n2o": 0.1},
    "코크스로-가스":          {"ipcc_name": "Coke Oven Gas",               "ch4": 1,   "n2o": 0.1},
    "고로가스":               {"ipcc_name": "Blast Furnace Gas",           "ch4": 1,   "n2o": 0.1},
    "산소-강철로-가스":       {"ipcc_name": "Oxygen Steel Furnace Gas",    "ch4": 1,   "n2o": 0.1},
    "천연가스LNG":            {"ipcc_name": "Natural Gas",                 "ch4": 1,   "n2o": 0.1},

    # 기타 화석연료
    "도시폐기물-비-바이오매스": {"ipcc_name": "Municipal Wastes (non-biomass fraction)", "ch4": 30, "n2o": 4},
    "산업-폐기물":            {"ipcc_name": "Industrial Wastes",           "ch4": 30,  "n2o": 4},
    "폐유":                   {"ipcc_name": "Waste Oils",                  "ch4": 30,  "n2o": 4},
    "이탄-토탄":              {"ipcc_name": "Peat",                        "ch4": 1,   "n2o": 1.5},

    # 바이오매스
    "목재목재폐기물":         {"ipcc_name": "Wood/Wood Waste",             "ch4": 30,  "n2o": 4},
    "아황산염-잿물":          {"ipcc_name": "Sulphite lyes (black liquor)", "ch4": 3,  "n2o": 2},
    "기타-주요한-고체-바이오매스": {"ipcc_name": "Other Primary Solid Biomass", "ch4": 30, "n2o": 4},
    # Charcoal: Table 2.2 = CH4=200, N2O=4. 우리 xlsm CH4=30 → mismatch, note 로 남김
    "목탄":                   {"ipcc_name": "Charcoal",                    "ch4": 200, "n2o": 4},
    "바이오-가솔린":          {"ipcc_name": "Biogasoline",                 "ch4": 3,   "n2o": 0.6},
    "바이오-디젤":            {"ipcc_name": "Biodiesels (Liquid)",         "ch4": 3,   "n2o": 0.6},
    "기타-액체-바이오매스":   {"ipcc_name": "Other Liquid Biofuels",       "ch4": 3,   "n2o": 0.6},
    "매립지-가스":            {"ipcc_name": "Landfill Gas",                "ch4": 1,   "n2o": 0.1},
    "슬러지-가스":            {"ipcc_name": "Sludge Gas",                  "ch4": 1,   "n2o": 0.1},
    "기타-바이오가스":        {"ipcc_name": "Other Biogas",                "ch4": 1,   "n2o": 0.1},
    "도시폐기물-바이오매스":  {"ipcc_name": "Municipal Wastes (biomass fraction)", "ch4": 30, "n2o": 4},
}


def slugify(text) -> str:
    s = str(text).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[()\[\]/\\.]", "", s)
    return s


def close(a, b, rel_tol=1e-9, abs_tol=1e-9):
    if a is None or b is None:
        return False
    if a == b:
        return True
    return abs(a - b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)


def load_actuals():
    with (RAW_DIR / "sheet__Law&GL22.json").open(encoding="utf-8") as fp:
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
            "name": name,
            "t1_ch4": num(4),  # E
            "t1_n2o": num(5),  # F
        }
    return result


def main():
    actuals = load_actuals()
    entries = {}
    matched, mismatched, missing = [], [], []

    for fid, ipcc in IPCC_CH2_T22.items():
        actual = actuals.get(fid)
        if not actual:
            missing.append(fid)
            continue
        ipcc_name = ipcc["ipcc_name"]

        for gas_key, ipcc_val, our_field in [
            ("CH4", ipcc["ch4"], actual["t1_ch4"]),
            ("N2O", ipcc["n2o"], actual["t1_n2o"]),
        ]:
            if our_field is None:
                continue
            if close(ipcc_val, our_field):
                entries[f"fuel.{fid}.ef.t1.{gas_key}"] = {
                    "row": f"Table 2.2 · {ipcc_name} · {gas_key} Emission Factor",
                    "page": "2.16–2.17",
                    "expectedValue": our_field,
                    "note": f"IPCC 2006 GL Vol.2 Ch.2 Table 2.2 (Default EF for Stationary Combustion in Energy Industries). kg/TJ on Net Calorific Basis.",
                }
                matched.append((fid, gas_key))
            else:
                mismatched.append((fid, gas_key, ipcc_val, our_field, ipcc_name))

    entries = dict(sorted(entries.items()))

    doc = {
        "$schema": "verified-source-map v1",
        "docId": "ipcc-2006-vol2-ch2",
        "reviewedAt": "2026-09-02",
        "reviewNote": (
            "IPCC 2006 Guidelines for National Greenhouse Gas Inventories · Volume 2 (Energy) · Chapter 2 (Stationary Combustion) "
            "원문 PDF (https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf) "
            "Table 2.2 (Energy Industries, p.2.16–2.17) 직접 확인. 우리 xlsm 은 K-ETS 대상 사업체 배출을 상정하므로 "
            "Table 2.2 (Energy Industries) 를 채택. 석탄류 CH4=1 값이 T2.2 와 정확히 일치 (T2.3/T2.4=10, T2.5=300 이 아님)."
        ),
        "entries": entries,
    }

    VERIFIED_DIR.mkdir(parents=True, exist_ok=True)
    out = VERIFIED_DIR / "ipcc-2006-vol2-ch2.json"
    with out.open("w", encoding="utf-8") as fp:
        json.dump(doc, fp, ensure_ascii=False, indent=2)

    print(f"[write] {out.relative_to(ROOT)}  ({len(entries)} entries)")
    print(f"  matched   : {len(matched)}")
    print(f"  mismatched: {len(mismatched)}")
    if mismatched:
        print("  ─ mismatch 상세 (승격 안 됨, asserted 유지) ─")
        for fid, field, ipcc_val, our_val, ipcc_name in mismatched:
            print(f"    {fid} ({ipcc_name}) / {field}: IPCC T2.2 = {ipcc_val}, our = {our_val}")


if __name__ == "__main__":
    main()
