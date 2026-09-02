"""K-ETS 별표 12 (연료별 국가 고유 발열량 및 배출계수) → verified JSON 생성.

원본: docs/refs/kets-annex-12.pdf.
  - 표 A '연료별 국가 고유 발열량' (페이지 1-2)  : 27개 연료 (전기 2개 제외)
  - 표 B '연료별 국가고유 배출계수' (페이지 3-4) : 25개 연료 (석유 16 + 가스 3 + 석탄 6)

표 A 매핑: T2 순발열량 27개.
표 B 매핑: 매칭되는 xlsm 값이 있는 21개 연료 × (tC + CO2) = 42개.
    (등유·경유·항공유·도시가스LNG 4개는 xlsm 값이 별표 12 와 달라 스킵 → GIR_EF_2017 유지)

매칭 방식:
  1. 별표 12 값을 하드코딩
  2. xlsm 실제 값과 대조 (CO2 는 tC × 44/12 × 1000 계산식으로 유도된 값과 대조)
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
COL_T2_TC = "I"
COL_T2_CO2 = "J"
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
# 별표 12 표 B · 25개 연료 배출계수 (페이지 3-4)
# tC: kgC/TJ (xlsm 는 tC/TJ = 동일 단위)
# CO2: kgCO2/TJ (별표 표기 반올림값 · xlsm 는 tC × 44/12 × 1000 유도값)
# 등유·경유 병합, 천연가스·도시가스(LNG) 병합
# ─────────────────────────────────────────────────────────────
KETS_A12_EF: dict[str, dict] = {
    # 석유(16)
    "휘발유-자동차용-가솔린":       {"row": "표 B · 석유(16) · 휘발유",              "tC": 19.548, "co2_display": 71600, "page": "3"},
    "B-A유":                     {"row": "표 B · 석유(16) · B-A유",                "tC": 20.657, "co2_display": 75700, "page": "3"},
    "B-B유":                     {"row": "표 B · 석유(16) · B-B유",                "tC": 21.384, "co2_display": 78400, "page": "3"},
    "B-C유-잔여-석유연료":         {"row": "표 B · 석유(16) · B-C유",                "tC": 21.929, "co2_display": 80300, "page": "3"},
    "납사-나프타":                {"row": "표 B · 석유(16) · 나프타",               "tC": 19.157, "co2_display": 70200, "page": "3"},
    "용제-백유":                  {"row": "표 B · 석유(16) · 용제",                 "tC": 19.172, "co2_display": 70200, "page": "3"},
    "아스팔트-역청":              {"row": "표 B · 석유(16) · 아스팔트",             "tC": 21.544, "co2_display": 78900, "page": "3"},
    "석유-코크스":                {"row": "표 B · 석유(16) · 석유코크스",           "tC": 26.086, "co2_display": 95600, "page": "3"},
    "윤활유":                     {"row": "표 B · 석유(16) · 윤활유",               "tC": 19.979, "co2_display": 73200, "page": "3"},
    "부생연료-1호":               {"row": "표 B · 석유(16) · 부생연료 1호",          "tC": 20.067, "co2_display": 73500, "page": "3"},
    "부생연료-2호":               {"row": "표 B · 석유(16) · 부생연료 2호",          "tC": 21.729, "co2_display": 79600, "page": "3"},
    "프로판LPG1호":               {"row": "표 B · 석유(16) · 프로판(LPG1호)",        "tC": 17.641, "co2_display": 64600, "page": "3"},
    "부탄LPG3호":                {"row": "표 B · 석유(16) · 부탄(LPP3호)",          "tC": 18.107, "co2_display": 66300, "page": "3"},
    # 가스(3): 천연가스·도시가스(LNG) 는 별표 12 표 B 에서 병합 · 도시가스(LNG) 는 xlsm 값 다름 (15.272) → 스킵
    "천연가스LNG":                {"row": "표 B · 가스(3) · 천연가스·도시가스(LNG) 병합", "tC": 15.312, "co2_display": 56100, "page": "3"},
    "도시가스LPG":                {"row": "표 B · 가스(3) · 도시가스(LPG)",          "tC": 17.454, "co2_display": 64000, "page": "3"},
    # 석탄(6)
    "국내-무연탄":                {"row": "표 B · 석탄(6) · 국내무연탄",            "tC": 30.185, "co2_display": 110600, "page": "3"},
    "연료용-수입-무연탄":          {"row": "표 B · 석탄(6) · 수입무연탄(연료용)",    "tC": 27.404, "co2_display": 100400, "page": "3"},
    "원료용-수입-무연탄":          {"row": "표 B · 석탄(6) · 수입무연탄(원료용)",    "tC": 29.909, "co2_display": 109600, "page": "3"},
    "연료용-유연탄-기타-유연탄":    {"row": "표 B · 석탄(6) · 유연탄(연료용)",        "tC": 25.951, "co2_display": 95100, "page": "3"},
    "원료용-유연탄-점결탄":        {"row": "표 B · 석탄(6) · 유연탄(원료용)",        "tC": 25.963, "co2_display": 95100, "page": "3"},
    "아역청탄-하위-유연탄":        {"row": "표 B · 석탄(6) · 아역청탄",              "tC": 26.468, "co2_display": 97000, "page": "4"},
    # 등유·경유·항공유·도시가스LNG 는 xlsm 값과 별표 12 값 불일치 → 스킵 (GIR_EF_2017 유지)
    # 참고: xlsm 등유 tC(19.931) 와 항공유 tC(19.969) 는 별표 12 값 (등유 19,969 / 항공유 19,931) 과
    #       정확히 뒤바뀌어 있어 원본 xlsm 오작성 가능성 있음.
}


def co2_from_tc(tc: float) -> float:
    """IPCC 관례: CO2 배출계수 (kgCO2/TJ) = tC (tC/TJ) × 44/12 × 1000."""
    return tc * 44 / 12 * 1000


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


def load_actuals() -> dict[str, dict]:
    """xlsm 에서 fuel_id → { t2_net, unit, t2_tc, t2_co2 } 로드."""
    with RAW.open(encoding="utf-8") as f:
        raw = json.load(f)
    rows = raw["rows"]
    out: dict[str, dict] = {}
    for r in range(FUEL_ROW_START, FUEL_ROW_END + 1):
        name = cell_value(get_cell(rows, r, COL_NAME))
        if not name:
            continue
        fuel_id = slugify(name)
        out[fuel_id] = {
            "t2_net": as_number(cell_value(get_cell(rows, r, COL_T2_NET_HEAT))),
            "unit": cell_value(get_cell(rows, r, COL_HEAT_UNIT)),
            "t2_tc": as_number(cell_value(get_cell(rows, r, COL_T2_TC))),
            "t2_co2": as_number(cell_value(get_cell(rows, r, COL_T2_CO2))),
        }
    return out


# ─────────────────────────────────────────────────────────────
# 매핑 빌드
# ─────────────────────────────────────────────────────────────

def build_mapping() -> tuple[dict, list[str], list[str]]:
    actuals = load_actuals()
    entries: dict[str, dict] = {}
    warnings: list[str] = []
    skipped: list[str] = []

    # ── 표 A · T2 순발열량 매핑 ────────────────────────────
    for fuel_id, spec in KETS_A12_NCV.items():
        if fuel_id not in actuals or actuals[fuel_id]["t2_net"] is None:
            skipped.append(f"[표 A NCV 미기입] {fuel_id}")
            continue
        actual_value = actuals[fuel_id]["t2_net"]
        actual_unit = actuals[fuel_id]["unit"]

        if abs(actual_value - spec["ncv"]) > 1e-6:
            warnings.append(
                f"[표 A MISMATCH] {fuel_id}: xlsm={actual_value} vs 별표12={spec['ncv']}"
            )
            continue

        note = (
            f"K-ETS 지침 별표 12 표 A (연료별 국가 고유 발열량, 에너지법 시행규칙 별표 기반). "
            f"순발열량. 자료출처: 국제표준규격에 따른 석유류 발열량 분석연구 (에너지관리공단)."
        )
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

    # ── 표 B · T2 tC (탄소배출계수) 매핑 ──────────────────
    for fuel_id, spec in KETS_A12_EF.items():
        if fuel_id not in actuals or actuals[fuel_id]["t2_tc"] is None:
            skipped.append(f"[표 B tC 미기입] {fuel_id}")
            continue
        actual_tc = actuals[fuel_id]["t2_tc"]
        if abs(actual_tc - spec["tC"]) > 1e-6:
            warnings.append(
                f"[표 B tC MISMATCH] {fuel_id}: xlsm={actual_tc} vs 별표12={spec['tC']}"
            )
            continue
        entries[f"fuel.{fuel_id}.ef.t2.tC_per_TJ"] = {
            "row": f"{spec['row']} · 탄소배출계수 (kgC/TJ)",
            "page": spec["page"],
            "expectedValue": spec["tC"],
            "note": (
                "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). "
                "탄소배출계수 (kgC/TJ = tC/TJ). "
                "비고: 에너지법 시행규칙에 의해 2017년 12월 고시된 발열량 기준으로 개발. "
                "석탄의 발열량은 인수식(引受式) 기준 (코크스는 건식 기준)."
            ),
        }

    # ── 표 B · T2 CO2 배출계수 매핑 ─────────────────────
    for fuel_id, spec in KETS_A12_EF.items():
        if fuel_id not in actuals or actuals[fuel_id]["t2_co2"] is None:
            skipped.append(f"[표 B CO2 미기입] {fuel_id}")
            continue
        actual_co2 = actuals[fuel_id]["t2_co2"]
        expected_co2_calc = co2_from_tc(spec["tC"])
        if abs(actual_co2 - expected_co2_calc) > 1e-3:
            warnings.append(
                f"[표 B CO2 MISMATCH] {fuel_id}: xlsm={actual_co2} vs 계산유도={expected_co2_calc:.4f}"
            )
            continue
        entries[f"fuel.{fuel_id}.ef.t2.CO2"] = {
            "row": f"{spec['row']} · 이산화탄소 배출계수 (kgCO2/TJ)",
            "page": spec["page"],
            "expectedValue": actual_co2,
            "note": (
                "K-ETS 지침 별표 12 표 B (연료별 국가고유 배출계수). "
                f"표 표기 반올림값 = {spec['co2_display']:,} kgCO2/TJ. "
                f"본 값은 표 하단 관례 (kgCO2/TJ = tC × 44/12 × 1000) 유도값 = {expected_co2_calc:.4f}. "
                "tC 대비 소수점 오차만 있음."
            ),
        }

    result = {
        "$schema": "verified-source-map v1",
        "docId": "kets-annex-12",
        "reviewedAt": "2026-09-02",
        "reviewNote": (
            "K-ETS 배출권거래제 지침 별표 12 (제15조제2항 관련). "
            "표 A '연료별 국가 고유 발열량' (에너지법 시행규칙 별표) - T2 순발열량 27개. "
            "표 B '연료별 국가고유 배출계수' - 21개 연료 tC + CO2 = 42개. "
            "표 B 제외 4개 (등유·경유·항공유·도시가스LNG): xlsm 값이 별표 12 와 달라 GIR 별도 공표계수 채택으로 추정. "
            "특히 xlsm 등유 tC(19.931) 와 항공유 tC(19.969) 는 별표 12 값(등유 19.969 / 항공유 19.931)과 정확히 뒤바뀌어 있어 원본 xlsm 오작성 가능성."
        ),
        "entries": entries,
    }

    return result, warnings, skipped


def main():
    result, warnings, skipped = build_mapping()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"[write] {OUT.relative_to(ROOT)}")
    print(f"[entries] {len(result['entries'])} verified mappings")
    if skipped:
        print(f"[skip] {len(skipped)} (xlsm 미기입):")
        for s in skipped:
            print(f"  {s}")
    if warnings:
        print(f"[WARN] {len(warnings)} value mismatches (GIR 별도 공표계수 유지 · verified 승격 안 됨):", file=sys.stderr)
        for w in warnings:
            print(f"  {w}", file=sys.stderr)


if __name__ == "__main__":
    main()
