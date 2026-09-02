"""fuels.gen.ts 에서 각 연료의 T2 배출계수 (tC/CO2/CH4/N2O) 값을 뽑아 리스트업.
build 스크립트가 참조하는 raw JSON (_Law&GL22 시트) 기반.
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"

COL_NAME = "B"
COL_T2_GROUP = "H"
COL_T2_TC = "I"
COL_T2_CO2 = "J"
COL_T2_CH4 = "K"
COL_T2_N2O = "L"

FUEL_ROW_START = 36
FUEL_ROW_END = 98


def col_letter_to_index(letter: str) -> int:
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1


def get_cell(rows, row_1based, col_letter):
    r = row_1based - 1
    c = col_letter_to_index(col_letter)
    if r < 0 or r >= len(rows) or c < 0 or c >= len(rows[r]):
        return None
    return rows[r][c]


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


def main():
    with RAW.open(encoding="utf-8") as f:
        raw = json.load(f)
    rows = raw["rows"]

    out = ROOT / "docs" / "refs" / "t2_ef_list.txt"
    with out.open("w", encoding="utf-8") as fout:
        fout.write("fuel_id | name | T2 group | tC | CO2 | CH4 | N2O\n")
        fout.write("-" * 100 + "\n")
        have_count = 0
        for r in range(FUEL_ROW_START, FUEL_ROW_END + 1):
            name = cell_value(get_cell(rows, r, COL_NAME))
            if not name:
                continue
            fid = slugify(name)
            grp = cell_value(get_cell(rows, r, COL_T2_GROUP))
            tc = as_number(cell_value(get_cell(rows, r, COL_T2_TC)))
            co2 = as_number(cell_value(get_cell(rows, r, COL_T2_CO2)))
            ch4 = as_number(cell_value(get_cell(rows, r, COL_T2_CH4)))
            n2o = as_number(cell_value(get_cell(rows, r, COL_T2_N2O)))
            has_any = any(v is not None for v in [tc, co2, ch4, n2o])
            marker = "★" if has_any else "·"
            fout.write(f"{marker} {fid:35s} | {name:30s} | grp={grp} | tC={tc} | CO2={co2} | CH4={ch4} | N2O={n2o}\n")
            if has_any:
                have_count += 1
        fout.write(f"\n총 {have_count} 개 연료가 T2 값(하나라도)을 가짐\n")

    print(f"[write] {out}")


if __name__ == "__main__":
    main()
