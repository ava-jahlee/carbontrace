"""fuels.gen.ts 에서 각 연료의 T2 net 발열량 값을 뽑아 (id, value) 로 출력.
build 스크립트가 참조하는 raw JSON (_Law&GL22 시트) 기반.
"""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))

RAW = ROOT / "src" / "data" / "raw" / "sheet__Law&GL22.json"

COL_NAME = "B"
COL_T2_NET_HEAT = "Q"
COL_HEAT_UNIT = "R"

FUEL_ROW_START = 19
FUEL_ROW_END = 82


def col_letter_to_index(letter: str) -> int:
    idx = 0
    for ch in letter:
        idx = idx * 26 + (ord(ch.upper()) - ord("A") + 1)
    return idx - 1


def get_cell(sheet_rows, row_1based, col_letter):
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


def main():
    with RAW.open(encoding="utf-8") as f:
        raw = json.load(f)
    rows = raw["rows"]

    have = []
    missing = []
    for r in range(FUEL_ROW_START, FUEL_ROW_END + 1):
        name = cell_value(get_cell(rows, r, COL_NAME))
        if not name:
            continue
        fuel_id = slugify(name)
        t2 = as_number(cell_value(get_cell(rows, r, COL_T2_NET_HEAT)))
        unit = cell_value(get_cell(rows, r, COL_HEAT_UNIT))
        if t2 is not None:
            have.append((fuel_id, name, t2, unit))
        else:
            missing.append((fuel_id, name))

    print(f"[T2 net 값 있음: {len(have)}개]")
    for i, (fid, name, v, u) in enumerate(have, 1):
        print(f"  {i:2d}. {fid:35s}  ({name}) = {v} {u}")

    print(f"\n[T2 net 값 없음: {len(missing)}개]")
    for fid, name in missing:
        print(f"  {fid:35s}  ({name})")


if __name__ == "__main__":
    main()
