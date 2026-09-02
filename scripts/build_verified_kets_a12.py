"""K-ETS 별표 12 (연료별 국가 고유 발열량) → verified JSON 생성.

원본: docs/refs/kets-annex-12.pdf 의 표 A "연료별 국가 고유 발열량".
    페이지 1-2 에 걸쳐 27개 연료 + 전기 2개 = 29개 값.
    본 스크립트는 우리 xlsm 에 T2 net 값이 있는 26개만 매핑
    (도시가스LPG 는 xlsm 미기입, 전기는 Scope 1 대상 아님).

매칭 방식:
  1. 별표 12 값(순발열량)을 하드코딩
  2. xlsm 실제 값과 대조
  3. 일치하면 verified 승격 · row/page/note 부여
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"
OUT = ROOT / "src" / "data" / "verified" / "kets-annex-12.json"


COL_NAME = "B"
COL_T2_NET_HEAT = "Q"
COL_HEAT_UNIT = "R"

FUEL_ROW_START = 36
FUEL_ROW_END = 98


# ─────────────────────────────────────────────────────────────
# 별표 12 표 A · 27개 연료 순발열량 (페이지 1-2)
# key = 우리 xlsm slugified fuel_id
# value = { row_label, net_ncv, unit, page }
# ─────────────────────────────────────────────────────────────
KETS_A12_NCV: dict[str, dict] = {
    # p.1
    "원유":                     {"row": "원유",                 "ncv": 42.2, "unit": "MJ/kg",  "page": "1"},
    "휘발유-자동차용-가솔린":       {"row": "휘발유",               "ncv": 30.4, "unit": "MJ/L",   "page": "1"},
    "등유-기타-등유":             {"row": "등유",                 "ncv": 34.2, "unit": "MJ/L",   "page": "1"},
    "경유-가스디젤-오일":          {"row": "경유",                 "ncv": 35.2, "unit": "MJ/L",   "page": "1"},
    "B-A유":                    {"row": "B-A유",                "ncv": 36.4, "unit": "MJ/L",   "page": "1"},
    "B-B유":                    {"row": "B-B유",                "ncv": 38.0, "unit": "MJ/L",   "page": "1"},
    "B-C유-잔여-석유연료":         {"row": "B-C유",                "ncv": 39.2, "unit": "MJ/L",   "page": "1"},
    "프로판LPG1호":              {"row": "프로판(LPG1호)",         "ncv": 46.3, "unit": "MJ/kg",  "page": "1"},
    "부탄LPG3호":               {"row": "부탄(LPG3호)",           "ncv": 45.7, "unit": "MJ/kg",  "page": "1"},
    "납사-나프타":               {"row": "나프타",                "ncv": 29.9, "unit": "MJ/L",   "page": "1"},
    "용제-백유":                 {"row": "용제",                  "ncv": 30.3, "unit": "MJ/L",   "page": "1"},
    "제트용-등유-항공유":          {"row": "항공유",                "ncv": 33.9, "unit": "MJ/L",   "page": "1"},
    "아스팔트-역청":              {"row": "아스팔트",              "ncv": 39.2, "unit": "MJ/kg",  "page": "1"},
    "윤활유":                   {"row": "윤활유",                "ncv": 37.3, "unit": "MJ/L",   "page": "1"},
    "석유-코크스":               {"row": "석유코크스",             "ncv": 34.2, "unit": "MJ/kg",  "page": "1"},
    "부생연료-1호":              {"row": "부생연료유1호",           "ncv": 34.6, "unit": "MJ/L",   "page": "1"},
    "부생연료-2호":              {"row": "부생연료유2호",           "ncv": 37.7, "unit": "MJ/L",   "page": "1"},
    "천연가스LNG":               {"row": "천연가스(LNG)",         "ncv": 49.4, "unit": "MJ/kg",  "page": "1"},
    "도시가스LNG":               {"row": "도시가스(LNG)",         "ncv": 38.9, "unit": "MJ/Nm³", "page": "1"},
    "도시가스LPG":               {"row": "도시가스(LPG)",         "ncv": 58.4, "unit": "MJ/Nm³", "page": "1"},
    "국내-무연탄":                {"row": "국내무연탄",             "ncv": 19.4, "unit": "MJ/kg",  "page": "1"},
    "연료용-수입-무연탄":          {"row": "연료용 수입무연탄",       "ncv": 20.5, "unit": "MJ/kg",  "page": "1"},
    "원료용-수입-무연탄":          {"row": "원료용 수입무연탄",       "ncv": 24.7, "unit": "MJ/kg",  "page": "1"},
    "연료용-유연탄-기타-유연탄":     {"row": "연료용 유연탄(역청탄)",   "ncv": 23.7, "unit": "MJ/kg",  "page": "1"},
    "원료용-유연탄-점결탄":         {"row": "원료용 유연탄(역청탄)",   "ncv": 28.0, "unit": "MJ/kg",  "page": "1-2"},
    # p.2
    "아역청탄-하위-유연탄":         {"row": "아역청탄",              "ncv": 19.9, "unit": "MJ/kg",  "page": "2"},
    "코크스로-코크스-석탄":         {"row": "코크스",               "ncv": 28.9, "unit": "MJ/kg",  "page": "2"},
    # 전기(발전기준) 8.9 · 전기(소비기준) 9.6 은 Scope 1 대상 아님 → 스킵
}


# ─────────────────────────────────────────────────────────────
# xlsm 파싱 유틸 (build_scope1_data.py 와 동일 규칙)
# ─────────────────────────────────────────────────────────────

def col_letter_to_index(letter: str) -> int:
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1


def get_cell(rows, row_1based, col_letter):
    r = row_1based - 1
    c = col_letter_to_index(col_letter)
    if r < 0 or r >= len(rows):
        return None
    row = rows[r]
    if c < 0 or c >= len(row):
        return None
    return row[c]


def cell_value(cell):
    return None if cell is None else cell.get("v")


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


def load_actual_t2_ncv() -> dict[str, tuple[float, str]]:
    """xlsm 에서 fuel_id → (t2_net_value, unit) 로드."""
    with RAW.open(encoding="utf-8") as f:
        raw = json.load(f)
    rows = raw["rows"]
    out: dict[str, tuple[float, str]] = {}
    for r in range(FUEL_ROW_START, FUEL_ROW_END + 1):
        name = cell_value(get_cell(rows, r, COL_NAME))
        if not name:
            continue
        fuel_id = slugify(name)
        t2 = as_number(cell_value(get_cell(rows, r, COL_T2_NET_HEAT)))
        unit = cell_value(get_cell(rows, r, COL_HEAT_UNIT))
        if t2 is not None:
            out[fuel_id] = (t2, unit)
    return out


# ─────────────────────────────────────────────────────────────
# 매핑 빌드
# ─────────────────────────────────────────────────────────────

def build_mapping() -> tuple[dict, list[str], list[str]]:
    actuals = load_actual_t2_ncv()
    entries: dict[str, dict] = {}
    warnings: list[str] = []
    missing_in_xlsm: list[str] = []

    for fuel_id, spec in KETS_A12_NCV.items():
        if fuel_id not in actuals:
            missing_in_xlsm.append(fuel_id)
            continue

        actual_value, actual_unit = actuals[fuel_id]

        # 값 대조
        if abs(actual_value - spec["ncv"]) > 1e-6:
            warnings.append(
                f"[MISMATCH] {fuel_id}: xlsm={actual_value} vs 별표12={spec['ncv']}"
            )
            continue

        note = (
            f"K-ETS 지침 별표 12 (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). "
            f"순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단)."
        )
        # 단위 표기 불일치 (xlsm 는 천연가스LNG 를 MJ/L 로 잘못 표기) 주석
        if actual_unit and actual_unit != spec["unit"]:
            note += (
                f" 단위 표기 참고: 별표 12 원표는 {spec['unit']}, "
                f"xlsm 은 {actual_unit} 로 기록되어 있으나 값 자체(순발열량)는 동일."
            )

        entries[f"fuel.{fuel_id}.heat.t2_net"] = {
            "row": f"표 A · {spec['row']} · 순발열량",
            "page": spec["page"],
            "expectedValue": spec["ncv"],
            "note": note,
        }

    result = {
        "$schema": "verified-source-map v1",
        "docId": "kets-annex-12",
        "reviewedAt": "2026-09-02",
        "reviewNote": (
            "K-ETS 배출권거래제 지침 별표 12 (제15조제2항 관련) · "
            "표 A '연료별 국가 고유 발열량 (에너지법 시행규칙 별표)'. "
            "T2 순발열량 매핑. 전기(발전/소비기준)는 Scope 1 대상 아님으로 제외."
        ),
        "entries": entries,
    }

    return result, warnings, missing_in_xlsm


def main():
    result, warnings, missing = build_mapping()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"[write] {OUT.relative_to(ROOT)}")
    print(f"[entries] {len(result['entries'])} matched")
    if missing:
        print(f"[skip] {len(missing)} in KETS_A12_NCV but not in xlsm:")
        for f in missing:
            print(f"  - {f}")
    if warnings:
        print(f"[WARN] {len(warnings)} value mismatches:", file=sys.stderr)
        for w in warnings:
            print(f"  {w}", file=sys.stderr)


if __name__ == "__main__":
    main()
