"""xlsm T2 CH4/N2O 값과 IPCC Vol.2 Ch.2 Table 2.5 (Residential + Agriculture) 대조.

발견 배경:
  - K-ETS 별표 6 은 CH4/N2O 를 Tier 1 만 규정 (별표 10 참조). Tier 2 규정 없음.
  - xlsm 이 T2 컬럼에 넣은 CH4/N2O 값들은 IPCC Ch.2 Table 2.5 (Residential and Agriculture) 값.
  - xlsm T1 은 Table 2.2 (Energy Industries), T2 는 Table 2.5 로 두 부문을 담아둔 것.
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"


# IPCC Vol.2 Ch.2 Table 2.5 · fuel_id → { row_label, CH4, N2O, page }
IPCC_T25: dict[str, dict] = {
    # 액체
    "원유":                     {"row": "Table 2.5 · Crude Oil",             "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "오리멀젼":                  {"row": "Table 2.5 · Orimulsion",            "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "액성천연가스":               {"row": "Table 2.5 · Natural Gas Liquids",   "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "휘발유-자동차용-가솔린":       {"row": "Table 2.5 · Motor Gasoline",        "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "항공용-가솔린":             {"row": "Table 2.5 · Aviation Gasoline",     "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "제트용-가솔린":             {"row": "Table 2.5 · Jet Gasoline",          "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "제트용-등유-항공유":         {"row": "Table 2.5 · Jet Kerosene",          "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "등유-기타-등유":             {"row": "Table 2.5 · Other Kerosene",        "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "혈암유":                    {"row": "Table 2.5 · Shale Oil",             "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "경유-가스디젤-오일":          {"row": "Table 2.5 · Gas/Diesel Oil",        "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "B-A유":                    {"row": "Table 2.5 · Residual Fuel Oil",     "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "B-B유":                    {"row": "Table 2.5 · Residual Fuel Oil",     "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "B-C유-잔여-석유연료":         {"row": "Table 2.5 · Residual Fuel Oil",     "CH4": 10, "N2O": 0.6,  "page": "2.22"},
    "부생연료-1호":               {"row": "Table 2.5 · Residual Fuel Oil (부생연료는 등유·B-C유 대체용, kerosene/RFO EF 준용)", "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "부생연료-2호":               {"row": "Table 2.5 · Residual Fuel Oil (부생연료는 등유·B-C유 대체용, kerosene/RFO EF 준용)", "CH4": 10, "N2O": 0.6, "page": "2.22"},
    # LPG/기체
    "LPG-액화석유가스":           {"row": "Table 2.5 · Liquefied Petroleum Gases", "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "프로판LPG1호":               {"row": "Table 2.5 · Liquefied Petroleum Gases", "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "부탄LPG3호":                {"row": "Table 2.5 · Liquefied Petroleum Gases", "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "에탄":                      {"row": "Table 2.5 · Ethane",                 "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "천연가스LNG":                {"row": "Table 2.5 · Natural Gas",            "CH4": 5, "N2O": 0.1, "page": "2.23"},
    "도시가스LNG":                {"row": "Table 2.5 · Natural Gas (도시가스도 LNG 기반이므로 준용)", "CH4": 5, "N2O": 0.1, "page": "2.23"},
    "도시가스LPG":                {"row": "Table 2.5 · Liquefied Petroleum Gases (도시가스LPG 는 LPG 준용)", "CH4": 5, "N2O": 0.1, "page": "2.22"},
    # 석유류 기타
    "납사-나프타":                {"row": "Table 2.5 · Naphtha",                "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "아스팔트-역청":              {"row": "Table 2.5 · Bitumen",                "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "윤활유":                    {"row": "Table 2.5 · Lubricants",             "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "석유-코크스":                {"row": "Table 2.5 · Petroleum Coke",         "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "정유공장-원료-정제-원료":     {"row": "Table 2.5 · Refinery Feedstocks",    "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "파라핀왁스밀랍":             {"row": "Table 2.5 · Paraffin Waxes",         "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "용제-백유":                  {"row": "Table 2.5 · White Spirit and SBP",   "CH4": 10, "N2O": 0.6, "page": "2.22"},
    "재생유-기타석유제품":         {"row": "Table 2.5 · Other Petroleum Products", "CH4": 10, "N2O": 0.6, "page": "2.22"},
    # 정제가스 · 기체 유도 gas 는 Table 2.5 상 5/0.1 (xlsm 는 다른 값 사용 → 매칭 안 됨)
    "정제가스":                  {"row": "Table 2.5 · Refinery Gas",           "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "가스-공장-코크스-가스-코크스": {"row": "Table 2.5 · Gas Coke",               "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "가스공장-가스":              {"row": "Table 2.5 · Gas Works Gas",          "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "코크스로-가스":              {"row": "Table 2.5 · Coke Oven Gas",          "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "고로가스":                   {"row": "Table 2.5 · Blast Furnace Gas",      "CH4": 5, "N2O": 0.1, "page": "2.22"},
    "산소-강철로-가스":            {"row": "Table 2.5 · Oxygen Steel Furnace Gas", "CH4": 5, "N2O": 0.1, "page": "2.23"},
    "매립지-가스":                {"row": "Table 2.5 · Landfill Gas",           "CH4": 5, "N2O": 0.1, "page": "2.23"},
    "슬러지-가스":                {"row": "Table 2.5 · Sludge Gas",             "CH4": 5, "N2O": 0.1, "page": "2.23"},
    "기타-바이오가스":            {"row": "Table 2.5 · Other Biogas",           "CH4": 5, "N2O": 0.1, "page": "2.23"},
    # 석탄류 · N2O = 1.5 (Peat 만 1.4)
    "국내-무연탄":                {"row": "Table 2.5 · Anthracite",             "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "연료용-수입-무연탄":          {"row": "Table 2.5 · Anthracite",             "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "원료용-수입-무연탄":          {"row": "Table 2.5 · Anthracite",             "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "원료용-유연탄-점결탄":         {"row": "Table 2.5 · Coking Coal",            "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "연료용-유연탄-기타-유연탄":    {"row": "Table 2.5 · Other Bituminous Coal",  "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "아역청탄-하위-유연탄":         {"row": "Table 2.5 · Sub-Bituminous Coal",    "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "갈탄":                      {"row": "Table 2.5 · Lignite",                "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "유혈암-및-역청암":            {"row": "Table 2.5 · Oil Shale and Tar Sands", "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "갈색-연탄":                  {"row": "Table 2.5 · Brown Coal Briquettes",  "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "특허-연료":                  {"row": "Table 2.5 · Patent Fuel",            "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "코크스로-코크스-석탄":         {"row": "Table 2.5 · Coke Oven Coke and Lignite Coke", "CH4": 300, "N2O": 1.5, "page": "2.22"},
    "콜타르":                    {"row": "Table 2.5 · Coal Tar",               "CH4": 300, "N2O": 1.5, "page": "2.22"},
    # 이탄
    "이탄-토탄":                  {"row": "Table 2.5 · Peat",                   "CH4": 300, "N2O": 1.4, "page": "2.23"},
    # 바이오매스·폐기물
    "도시폐기물-비-바이오매스":    {"row": "Table 2.5 · Municipal Wastes (non-biomass fraction)", "CH4": 300, "N2O": 4.0, "page": "2.23"},
    "산업-폐기물":               {"row": "Table 2.5 · Industrial Wastes",      "CH4": 300, "N2O": 4.0, "page": "2.23"},
    "폐유":                      {"row": "Table 2.5 · Waste Oils",             "CH4": 300, "N2O": 4.0, "page": "2.23"},
    "목재목재폐기물":             {"row": "Table 2.5 · Wood / Wood Waste",      "CH4": 300, "N2O": 4.0, "page": "2.23"},
    "아황산염-잿물":              {"row": "Table 2.5 · Sulphite Lyes (Black Liquor)", "CH4": 3, "N2O": 2.0, "page": "2.23"},
    "기타-주요한-고체-바이오매스": {"row": "Table 2.5 · Other Primary Solid Biomass", "CH4": 300, "N2O": 4.0, "page": "2.23"},
    "목탄":                      {"row": "Table 2.5 · Charcoal",               "CH4": 200, "N2O": 1.0, "page": "2.23"},
    "바이오-가솔린":              {"row": "Table 2.5 · Biogasoline",            "CH4": 10, "N2O": 0.6, "page": "2.23"},
    "바이오-디젤":                {"row": "Table 2.5 · Biodiesels",             "CH4": 10, "N2O": 0.6, "page": "2.23"},
    "기타-액체-바이오매스":        {"row": "Table 2.5 · Other Liquid Biofuels",  "CH4": 10, "N2O": 0.6, "page": "2.23"},
    "도시폐기물-바이오매스":       {"row": "Table 2.4 · Municipal Wastes (biomass fraction) [Table 2.5 는 명시 없음, Table 2.4 준용]", "CH4": 300, "N2O": 4.0, "page": "2.21"},
}

COL_NAME = "B"
COL_T2_CH4 = "K"
COL_T2_N2O = "L"

FUEL_ROW_START = 36
FUEL_ROW_END = 98


def col_letter_to_index(letter):
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1

def get_cell(rows, r, c_letter):
    r -= 1
    c = col_letter_to_index(c_letter)
    if r < 0 or r >= len(rows) or c < 0 or c >= len(rows[r]): return None
    return rows[r][c]

def cell_value(cell):
    return None if cell is None else cell.get("v")

def as_number(v):
    if v is None: return None
    if isinstance(v, (int, float)): return float(v)
    s = str(v).strip()
    if s in ("", "-", "—", "–"): return None
    try: return float(s)
    except: return None

def slugify(text):
    s = str(text).strip()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[()\[\]/\\.]", "", s)
    return s


def main():
    with RAW.open(encoding="utf-8") as f:
        raw = json.load(f)
    rows = raw["rows"]

    actuals = {}
    for r in range(FUEL_ROW_START, FUEL_ROW_END + 1):
        name = cell_value(get_cell(rows, r, COL_NAME))
        if not name: continue
        fid = slugify(name)
        ch4 = as_number(cell_value(get_cell(rows, r, COL_T2_CH4)))
        n2o = as_number(cell_value(get_cell(rows, r, COL_T2_N2O)))
        if ch4 is not None or n2o is not None:
            actuals[fid] = {"CH4": ch4, "N2O": n2o}

    out = ROOT / "docs" / "refs" / "t2_ch4n2o_diff.txt"
    with out.open("w", encoding="utf-8") as f:
        f.write(f"{'fuel_id':32s} | {'CH4 T2.5':>8s} | {'CH4 xlsm':>9s} | {'N2O T2.5':>8s} | {'N2O xlsm':>9s} | match\n")
        f.write("-" * 90 + "\n")
        ch4_matched = []
        n2o_matched = []
        ch4_mismatch = []
        n2o_mismatch = []
        for fid, spec in IPCC_T25.items():
            if fid not in actuals:
                f.write(f"{fid:32s} | {spec['CH4']:>8.1f} | {'없음':>9s} | {spec['N2O']:>8.1f} | {'없음':>9s} | -\n")
                continue
            xch4 = actuals[fid]["CH4"]
            xn2o = actuals[fid]["N2O"]
            m_ch4 = xch4 is not None and abs(xch4 - spec["CH4"]) < 1e-6
            m_n2o = xn2o is not None and abs(xn2o - spec["N2O"]) < 1e-6
            marker = f"{'CH4:O' if m_ch4 else 'CH4:X'} {'N2O:O' if m_n2o else 'N2O:X'}"
            f.write(f"{fid:32s} | {spec['CH4']:>8.1f} | {xch4 if xch4 else 0:>9.1f} | {spec['N2O']:>8.1f} | {xn2o if xn2o else 0:>9.1f} | {marker}\n")
            if m_ch4: ch4_matched.append(fid)
            else:     ch4_mismatch.append((fid, xch4, spec["CH4"]))
            if m_n2o: n2o_matched.append(fid)
            else:     n2o_mismatch.append((fid, xn2o, spec["N2O"]))

        f.write(f"\n[요약] CH4 매칭 {len(ch4_matched)}/{len(IPCC_T25)} · N2O 매칭 {len(n2o_matched)}/{len(IPCC_T25)}\n")

        f.write(f"\n[CH4 매칭 fuel_id]\n")
        for fid in ch4_matched: f.write(f"    {fid!r},\n")
        f.write(f"\n[CH4 불일치]\n")
        for fid, xv, iv in ch4_mismatch: f.write(f"    {fid}: xlsm={xv} vs IPCC={iv}\n")

        f.write(f"\n[N2O 매칭 fuel_id]\n")
        for fid in n2o_matched: f.write(f"    {fid!r},\n")
        f.write(f"\n[N2O 불일치]\n")
        for fid, xv, iv in n2o_mismatch: f.write(f"    {fid}: xlsm={xv} vs IPCC={iv}\n")

    print(f"[write] {out}")
    print(f"[CH4] matched {len(ch4_matched)} · mismatched {len(ch4_mismatch)}")
    print(f"[N2O] matched {len(n2o_matched)} · mismatched {len(n2o_mismatch)}")


if __name__ == "__main__":
    main()
