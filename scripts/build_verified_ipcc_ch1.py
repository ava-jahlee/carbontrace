"""
IPCC 2006 GL Vol.2 Ch.1 원문 확인 결과를 바탕으로
verified/ipcc-2006-vol2-ch1.json 매핑 파일을 자동 생성한다.

원문 참조:
- Table 1.2 (Default Net Calorific Values, TJ/Gg = MJ/kg): p.1.18–1.19
- Table 1.3 (Default Values of Carbon Content, kg/GJ = tC/TJ): p.1.21–1.22
- Table 1.4 (Default CO2 Emission Factors for Combustion, kg/TJ): p.1.23–1.24

CO2 EF 는 표 하단 계산식으로 유도된다:
    C = A × B × 44/12 × 1000
    A = Carbon content (kg/GJ),  B = Oxidation factor (default 1)
표 표시값(예: 73,300)은 반올림 결과이며, 우리 xlsm 은 정확한 계산값(예: 73,333.33)을 저장.
매핑에서는 정확값을 expectedValue 로 넣고 표 반올림값을 note 로 첨부한다.

Usage:  python scripts/build_verified_ipcc_ch1.py
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "src" / "data" / "raw"
VERIFIED_DIR = ROOT / "src" / "data" / "verified"

# ─────────────────────────────────────────────────────────────
# IPCC 2006 GL Vol.2 Ch.1 원문 값
#   fuel_id (우리 slugify 규칙 결과) → {
#     "ipcc_name": IPCC 표기 영어명,
#     "ncv": Table 1.2 NCV (TJ/Gg = MJ/kg),
#     "cc":  Table 1.3 Carbon Content (kg/GJ = tC/TJ),
#     "co2_rounded": Table 1.4 표시값 (반올림, kg/TJ),
#     "page_ncv" / "page_cc" / "page_co2": 페이지 표기 (1.18 형식)
#   }
#
# CO2 EF 정확값은 cc × 44/12 × 1000 으로 우리가 계산해 검증한다.
# ─────────────────────────────────────────────────────────────
IPCC_FUELS = {
    # 석유류
    "원유":                    {"ipcc_name": "Crude Oil",                  "ncv": 42.3, "cc": 20.0, "co2_rounded":  73300},
    "오리멀젼":                {"ipcc_name": "Orimulsion",                 "ncv": 27.5, "cc": 21.0, "co2_rounded":  77000},
    "액성천연가스":            {"ipcc_name": "Natural Gas Liquids",         "ncv": 44.2, "cc": 17.5, "co2_rounded":  64200},
    "휘발유-자동차용-가솔린":  {"ipcc_name": "Motor Gasoline",             "ncv": 44.3, "cc": 18.9, "co2_rounded":  69300},
    "항공용-가솔린":           {"ipcc_name": "Aviation Gasoline",           "ncv": 44.3, "cc": 19.1, "co2_rounded":  70000},
    "제트용-가솔린":           {"ipcc_name": "Jet Gasoline",                "ncv": 44.3, "cc": 19.1, "co2_rounded":  70000},
    "제트용-등유-항공유":      {"ipcc_name": "Jet Kerosene",                "ncv": 44.1, "cc": 19.5, "co2_rounded":  71500},
    "등유-기타-등유":          {"ipcc_name": "Other Kerosene",              "ncv": 43.8, "cc": 19.6, "co2_rounded":  71900},
    "혈암유":                  {"ipcc_name": "Shale Oil",                   "ncv": 38.1, "cc": 20.0, "co2_rounded":  73300},
    "경유-가스디젤-오일":      {"ipcc_name": "Gas/Diesel Oil",              "ncv": 43.0, "cc": 20.2, "co2_rounded":  74100},
    "B-C유-잔여-석유연료":    {"ipcc_name": "Residual Fuel Oil",           "ncv": 40.4, "cc": 21.1, "co2_rounded":  77400},
    "LPG-액화석유가스":        {"ipcc_name": "Liquefied Petroleum Gases",   "ncv": 47.3, "cc": 17.2, "co2_rounded":  63100},
    "에탄":                    {"ipcc_name": "Ethane",                      "ncv": 46.4, "cc": 16.8, "co2_rounded":  61600},
    "납사-나프타":             {"ipcc_name": "Naphtha",                    "ncv": 44.5, "cc": 20.0, "co2_rounded":  73300},
    "아스팔트-역청":           {"ipcc_name": "Bitumen",                     "ncv": 40.2, "cc": 22.0, "co2_rounded":  80700},
    "윤활유":                  {"ipcc_name": "Lubricants",                  "ncv": 40.2, "cc": 20.0, "co2_rounded":  73300},
    "석유-코크스":             {"ipcc_name": "Petroleum Coke",              "ncv": 32.5, "cc": 26.6, "co2_rounded":  97500},
    "정유공장-원료-정제-원료": {"ipcc_name": "Refinery Feedstocks",         "ncv": 43.0, "cc": 20.0, "co2_rounded":  73300},
    "정제가스":                {"ipcc_name": "Refinery Gas",                "ncv": 49.5, "cc": 15.7, "co2_rounded":  57600},
    "파라핀왁스밀랍":          {"ipcc_name": "Paraffin Waxes",              "ncv": 40.2, "cc": 20.0, "co2_rounded":  73300},
    "용제-백유":               {"ipcc_name": "White Spirit and SBP",        "ncv": 40.2, "cc": 20.0, "co2_rounded":  73300},
    "재생유-기타석유제품":     {"ipcc_name": "Other Petroleum Products",    "ncv": 40.2, "cc": 20.0, "co2_rounded":  73300},

    # 석탄류
    "국내-무연탄":             {"ipcc_name": "Anthracite",                  "ncv": 26.7, "cc": 26.8, "co2_rounded":  98300},
    "연료용-수입-무연탄":      {"ipcc_name": "Anthracite",                  "ncv": 26.7, "cc": 26.8, "co2_rounded":  98300},
    "원료용-수입-무연탄":      {"ipcc_name": "Anthracite",                  "ncv": 26.7, "cc": 26.8, "co2_rounded":  98300},
    "원료용-유연탄-점결탄":    {"ipcc_name": "Coking Coal",                 "ncv": 28.2, "cc": 25.8, "co2_rounded":  94600},
    "연료용-유연탄-기타-유연탄": {"ipcc_name": "Other Bituminous Coal",     "ncv": 25.8, "cc": 25.8, "co2_rounded":  94600},
    "아역청탄-하위-유연탄":    {"ipcc_name": "Sub-Bituminous Coal",         "ncv": 18.9, "cc": 26.2, "co2_rounded":  96100},
    "갈탄":                    {"ipcc_name": "Lignite",                     "ncv": 11.9, "cc": 27.6, "co2_rounded": 101000},
    "유혈암-및-역청암":        {"ipcc_name": "Oil Shale and Tar Sands",     "ncv":  8.9, "cc": 29.1, "co2_rounded": 107000},
    "갈색-연탄":               {"ipcc_name": "Brown Coal Briquettes",       "ncv": 20.7, "cc": 26.6, "co2_rounded":  97500},
    "특허-연료":               {"ipcc_name": "Patent Fuel",                 "ncv": 20.7, "cc": 26.6, "co2_rounded":  97500},
    "코크스로-코크스-석탄":    {"ipcc_name": "Coke Oven Coke and Lignite Coke", "ncv": 28.2, "cc": 29.2, "co2_rounded": 107000},
    "가스-공장-코크스-가스-코크스": {"ipcc_name": "Gas Coke",                "ncv": 28.2, "cc": 29.2, "co2_rounded": 107000},
    "콜타르":                  {"ipcc_name": "Coal Tar",                    "ncv": 28.0, "cc": 22.0, "co2_rounded":  80700},

    # 가스류
    "가스공장-가스":           {"ipcc_name": "Gas Works Gas",               "ncv": 38.7, "cc": 12.1, "co2_rounded":  44400},
    "코크스로-가스":           {"ipcc_name": "Coke Oven Gas",               "ncv": 38.7, "cc": 12.1, "co2_rounded":  44400},
    "고로가스":                {"ipcc_name": "Blast Furnace Gas",           "ncv": 2.47, "cc": 70.8, "co2_rounded": 260000},
    "산소-강철로-가스":        {"ipcc_name": "Oxygen Steel Furnace Gas",    "ncv": 7.06, "cc": 49.6, "co2_rounded": 182000},
    "천연가스LNG":             {"ipcc_name": "Natural Gas",                 "ncv": 48.0, "cc": 15.3, "co2_rounded":  56100},

    # 기타 화석연료
    "도시폐기물-비-바이오매스": {"ipcc_name": "Municipal Wastes (non-biomass fraction)", "ncv": 10.0, "cc": 25.0, "co2_rounded":  91700},
    "산업-폐기물":             {"ipcc_name": "Industrial Wastes",           "ncv": None, "cc": 39.0, "co2_rounded": 143000},
    "폐유":                    {"ipcc_name": "Waste Oil",                   "ncv": 40.2, "cc": 20.0, "co2_rounded":  73300},
    "이탄-토탄":               {"ipcc_name": "Peat",                        "ncv": 9.76, "cc": 28.9, "co2_rounded": 106000},

    # 바이오매스
    "목재목재폐기물":          {"ipcc_name": "Wood/Wood Waste",             "ncv": 15.6, "cc": 30.5, "co2_rounded": 112000},
    "아황산염-잿물":           {"ipcc_name": "Sulphite lyes (black liquor)", "ncv": 11.8, "cc": 26.0, "co2_rounded":  95300},
    "기타-주요한-고체-바이오매스": {"ipcc_name": "Other Primary Solid Biomass", "ncv": 11.6, "cc": 27.3, "co2_rounded": 100000},
    "목탄":                    {"ipcc_name": "Charcoal",                    "ncv": 29.5, "cc": 30.5, "co2_rounded": 112000},
    "바이오-가솔린":           {"ipcc_name": "Biogasoline",                 "ncv": 27.0, "cc": 19.3, "co2_rounded":  70800},
    "바이오-디젤":             {"ipcc_name": "Biodiesels (Liquid)",         "ncv": 27.0, "cc": 19.3, "co2_rounded":  70800},
    "기타-액체-바이오매스":    {"ipcc_name": "Other Liquid Biofuels",       "ncv": 27.4, "cc": 21.7, "co2_rounded":  79600},
    "매립지-가스":             {"ipcc_name": "Landfill Gas",                "ncv": 50.4, "cc": 14.9, "co2_rounded":  54600},
    "슬러지-가스":             {"ipcc_name": "Sludge Gas",                  "ncv": 50.4, "cc": 14.9, "co2_rounded":  54600},
    "기타-바이오가스":         {"ipcc_name": "Other Biogas",                "ncv": 50.4, "cc": 14.9, "co2_rounded":  54600},
    "도시폐기물-바이오매스":   {"ipcc_name": "Municipal Wastes (biomass fraction)", "ncv": 11.6, "cc": 27.3, "co2_rounded": 100000},
}


def compute_co2_exact(cc: float) -> float:
    """IPCC Table 1.4 계산식: EF = carbon_content × oxidation × 44/12 × 1000"""
    return cc * 44.0 / 12.0 * 1000.0


def check_close(a: float, b: float, rel_tol: float = 1e-9, abs_tol: float = 1e-9) -> bool:
    if a == b:
        return True
    return abs(a - b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)


def load_fuel_actuals():
    """우리 raw xlsm 에서 각 fuel id 별 T1 값 뽑기 (build_scope1_data.py 와 동일 규칙)."""
    import re as _re
    from pathlib import Path as _Path
    sys.path.insert(0, str(_Path(__file__).parent))
    # slugify 규칙 통일
    def slugify(text):
        s = str(text).strip()
        s = _re.sub(r"\s+", "-", s)
        s = _re.sub(r"[()\[\]/\\.]", "", s)
        return s

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
            if v is None:
                return None
            try:
                return float(v)
            except (TypeError, ValueError):
                return None
        result[fid] = {
            "name": name,
            "t1_net":  num(14),  # O
            "t1_tc":   num(2),   # C
            "t1_co2":  num(3),   # D
        }
    return result


def main():
    actuals = load_fuel_actuals()

    entries: dict[str, dict] = {}
    matched = []
    mismatched = []
    unmapped_actuals = []
    unmapped_ipcc = []

    for fid, ipcc in IPCC_FUELS.items():
        actual = actuals.get(fid)
        if not actual:
            unmapped_ipcc.append(fid)
            continue

        ipcc_name = ipcc["ipcc_name"]

        # NCV 매핑
        if ipcc["ncv"] is not None and actual["t1_net"] is not None:
            if check_close(ipcc["ncv"], actual["t1_net"]):
                entries[f"fuel.{fid}.heat.t1_net"] = {
                    "row": f"Table 1.2 · {ipcc_name} · Net Calorific Value",
                    "page": "1.18–1.19",
                    "expectedValue": actual["t1_net"],
                    "note": f"IPCC 2006 GL Vol.2 Ch.1 Table 1.2 Default Net Calorific Values. TJ/Gg = MJ/kg.",
                }
                matched.append((fid, "heat.t1_net"))
            else:
                mismatched.append((fid, "heat.t1_net", ipcc["ncv"], actual["t1_net"]))

        # Carbon content (tC/TJ)
        if ipcc["cc"] is not None and actual["t1_tc"] is not None:
            if check_close(ipcc["cc"], actual["t1_tc"]):
                entries[f"fuel.{fid}.ef.t1.tC_per_TJ"] = {
                    "row": f"Table 1.3 · {ipcc_name} · Default Carbon Content",
                    "page": "1.21–1.22",
                    "expectedValue": actual["t1_tc"],
                    "note": "IPCC 2006 GL Vol.2 Ch.1 Table 1.3 Default Values of Carbon Content. kg/GJ = tC/TJ.",
                }
                matched.append((fid, "ef.t1.tC_per_TJ"))
            else:
                mismatched.append((fid, "ef.t1.tC_per_TJ", ipcc["cc"], actual["t1_tc"]))

        # CO2 EF: 표시값(반올림) 과 계산식 유도값(정확) 두 값이 있음. 우리 xlsm 은 정확값.
        if ipcc["cc"] is not None and actual["t1_co2"] is not None:
            co2_exact = compute_co2_exact(ipcc["cc"])
            if check_close(co2_exact, actual["t1_co2"], rel_tol=1e-6):
                entries[f"fuel.{fid}.ef.t1.CO2"] = {
                    "row": f"Table 1.4 · {ipcc_name} · CO2 Emission Factor",
                    "page": "1.23–1.24",
                    "expectedValue": actual["t1_co2"],
                    "note": f"IPCC 2006 GL Vol.2 Ch.1 Table 1.4. 표시값(반올림) = {ipcc['co2_rounded']:,} kg/TJ. "
                            f"표 하단 계산식 C = A × B × 44/12 × 1000 (A={ipcc['cc']} kg/GJ, B=1) 유도값 = {co2_exact:.4f}.",
                }
                matched.append((fid, "ef.t1.CO2"))
            else:
                mismatched.append((fid, "ef.t1.CO2", co2_exact, actual["t1_co2"]))

    for fid in actuals:
        if fid not in IPCC_FUELS:
            unmapped_actuals.append(fid)

    # 정렬 (fuel-id 사전순 → 필드순)
    entries = dict(sorted(entries.items()))

    doc = {
        "$schema": "verified-source-map v1",
        "docId": "ipcc-2006-vol2-ch1",
        "reviewedAt": "2026-09-02",
        "reviewNote": (
            "IPCC 2006 Guidelines for National Greenhouse Gas Inventories · Volume 2 (Energy) · Chapter 1 "
            "원문 PDF (https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_1_Ch1_Introduction.pdf) "
            "직접 확인. Table 1.2 (NCV) · Table 1.3 (Carbon Content) · Table 1.4 (CO2 EF) 각 행 매핑. "
            "국내 특유 연료 (부생연료, 프로판, 부탄, 도시가스 등) 는 IPCC 표에 없어 이 매핑에 포함되지 않음."
        ),
        "entries": entries,
    }

    VERIFIED_DIR.mkdir(parents=True, exist_ok=True)
    out = VERIFIED_DIR / "ipcc-2006-vol2-ch1.json"
    with out.open("w", encoding="utf-8") as fp:
        json.dump(doc, fp, ensure_ascii=False, indent=2)

    print(f"[write] {out.relative_to(ROOT)}  ({len(entries)} entries)")
    print(f"  matched   : {len(matched)}")
    print(f"  mismatched: {len(mismatched)}")
    if mismatched:
        print("  ─ mismatch 상세 ─")
        for fid, field, exp, act in mismatched:
            print(f"    {fid} / {field}: expected={exp}, actual={act}")
    if unmapped_ipcc:
        print(f"  unmapped (IPCC 표에 있으나 우리 fuel id 매치 실패): {unmapped_ipcc}")
    if unmapped_actuals:
        print(f"  국내 특유 연료 (IPCC 표에 없음, 건너뜀): {len(unmapped_actuals)} 개")
        for fid in unmapped_actuals:
            print(f"    - {fid} ({actuals[fid]['name']})")


if __name__ == "__main__":
    main()
