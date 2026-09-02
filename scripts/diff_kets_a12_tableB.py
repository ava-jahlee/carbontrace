"""K-ETS 별표 12 표 B (T2 국가고유 배출계수) 값과 xlsm T2 값을 대조.
tC/TJ 만 비교 (CO2 는 tC × 44/12 × 1000 로 계산된 값이므로 tC 일치 = CO2 일치).
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"


# 별표 12 표 B — 25개 연료 tC 값 (kgC/TJ 단위, xlsm 는 tC/TJ = 동일)
# 등유·경유 병합 → 두 fuel_id 로 모두 매핑
# 천연가스·도시가스(LNG) 병합 → 두 fuel_id 로 모두 매핑
TABLE_B: dict[str, dict] = {
    # 석유(16)
    "휘발유-자동차용-가솔린":       {"row": "석유(16) · 휘발유",            "tC": 19.548, "co2": 71600},
    "등유-기타-등유":              {"row": "석유(16) · 등유·경유 (병합)",   "tC": 19.969, "co2": 73200},
    "경유-가스디젤-오일":           {"row": "석유(16) · 등유·경유 (병합)",   "tC": 19.969, "co2": 73200},
    "B-A유":                     {"row": "석유(16) · B-A유",               "tC": 20.657, "co2": 75700},
    "B-B유":                     {"row": "석유(16) · B-B유",               "tC": 21.384, "co2": 78400},
    "B-C유-잔여-석유연료":         {"row": "석유(16) · B-C유",               "tC": 21.929, "co2": 80300},
    "납사-나프타":                {"row": "석유(16) · 나프타",              "tC": 19.157, "co2": 70200},
    "용제-백유":                  {"row": "석유(16) · 용제",                "tC": 19.172, "co2": 70200},
    "제트용-등유-항공유":          {"row": "석유(16) · 항공유(JET-A1)",      "tC": 19.931, "co2": 73000},
    "아스팔트-역청":              {"row": "석유(16) · 아스팔트",            "tC": 21.544, "co2": 78900},
    "석유-코크스":                {"row": "석유(16) · 석유코크스",          "tC": 26.086, "co2": 95600},
    "윤활유":                     {"row": "석유(16) · 윤활유",              "tC": 19.979, "co2": 73200},
    "부생연료-1호":               {"row": "석유(16) · 부생연료 1호",         "tC": 20.067, "co2": 73500},
    "부생연료-2호":               {"row": "석유(16) · 부생연료 2호",         "tC": 21.729, "co2": 79600},
    "프로판LPG1호":               {"row": "석유(16) · 프로판(LPG1호)",       "tC": 17.641, "co2": 64600},
    "부탄LPG3호":                {"row": "석유(16) · 부탄(LPP3호)",         "tC": 18.107, "co2": 66300},
    # 가스(3)
    "천연가스LNG":                {"row": "가스(3) · 천연가스·도시가스(LNG) 병합", "tC": 15.312, "co2": 56100},
    "도시가스LNG":                {"row": "가스(3) · 천연가스·도시가스(LNG) 병합", "tC": 15.312, "co2": 56100},
    "도시가스LPG":                {"row": "가스(3) · 도시가스(LPG)",         "tC": 17.454, "co2": 64000},
    # 석탄(6)
    "국내-무연탄":                {"row": "석탄(6) · 국내무연탄",           "tC": 30.185, "co2": 110600},
    "연료용-수입-무연탄":          {"row": "석탄(6) · 수입무연탄(연료용)",   "tC": 27.404, "co2": 100400},
    "원료용-수입-무연탄":          {"row": "석탄(6) · 수입무연탄(원료용)",   "tC": 29.909, "co2": 109600},
    "연료용-유연탄-기타-유연탄":    {"row": "석탄(6) · 유연탄(연료용)",       "tC": 25.951, "co2": 95100},
    "원료용-유연탄-점결탄":        {"row": "석탄(6) · 유연탄(원료용)",       "tC": 25.963, "co2": 95100},
    "아역청탄-하위-유연탄":        {"row": "석탄(6) · 아역청탄",             "tC": 26.468, "co2": 97000},
}


COL_NAME = "B"
COL_T2_TC = "I"
COL_T2_CO2 = "J"

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
    if r < 0 or r >= len(rows) or c < 0 or c >= len(rows[r]):
        return None
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
        tc = as_number(cell_value(get_cell(rows, r, COL_T2_TC)))
        co2 = as_number(cell_value(get_cell(rows, r, COL_T2_CO2)))
        if tc is not None:
            actuals[fid] = {"tC": tc, "CO2": co2}

    out = ROOT / "docs" / "refs" / "kets_a12_tableB_diff.txt"
    with out.open("w", encoding="utf-8") as f:
        f.write(f"{'fuel_id':35s} | {'별표12 tC':>10s} | {'xlsm tC':>10s} | match\n")
        f.write("-" * 80 + "\n")
        match_count = 0
        mismatch_count = 0
        matched = []
        mismatched = []
        for fid, spec in TABLE_B.items():
            if fid not in actuals:
                f.write(f"{fid:35s} | {spec['tC']:>10.3f} | {'없음':>10s} | X\n")
                continue
            actual = actuals[fid]["tC"]
            match = abs(actual - spec["tC"]) < 1e-6
            marker = "O" if match else "X"
            f.write(f"{fid:35s} | {spec['tC']:>10.3f} | {actual:>10.3f} | {marker}\n")
            if match:
                match_count += 1
                matched.append(fid)
            else:
                mismatch_count += 1
                mismatched.append(fid)

        f.write(f"\n[요약] 총 {len(TABLE_B)}개 · 일치 {match_count}개 · 불일치 {mismatch_count}개\n")
        f.write(f"\n[매칭 fuel_id · KETS_A12 참조로 전환]\n")
        for fid in matched:
            f.write(f"    {fid!r},\n")
        f.write(f"\n[불일치 fuel_id · GIR_EF_2017 유지]\n")
        for fid in mismatched:
            f.write(f"    - {fid}\n")

    print(f"[write] {out}")
    print(f"[matched] {match_count} / [mismatched] {mismatch_count}")

if __name__ == "__main__":
    main()
