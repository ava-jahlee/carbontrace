"""
_Law&GL22 시트를 사람이 훑기 좋게 요약해 준다.
- 각 행의 열 A~U 값을 한 줄로 출력.
- 값이 너무 길면 잘라서 출력.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

from openpyxl.utils import get_column_letter

RAW = Path(__file__).resolve().parent.parent / "src" / "data" / "raw" / "sheet__Law&GL22.json"


def cell_str(cell):
    if cell is None:
        return ""
    v = cell.get("v")
    if v is None:
        return ""
    if isinstance(v, float):
        s = f"{v:.6g}"
    else:
        s = str(v).replace("\n", " ")
    return s if len(s) <= 22 else s[:19] + "…"


def main() -> int:
    with RAW.open(encoding="utf-8") as fp:
        sheet = json.load(fp)
    rows = sheet["rows"]
    max_col = sheet["max_col"]

    header = "row | " + " | ".join(f"{get_column_letter(c+1):>3}" for c in range(max_col))
    print(header)
    print("-" * len(header))
    for r, row in enumerate(rows, start=1):
        cells = [f"{cell_str(row[c]):>3}"[:22] for c in range(max_col)]
        # widen: use 22 width for each col
        line = " | ".join(f"{cell_str(row[c]):22s}" for c in range(max_col))
        print(f"{r:>3} | {line}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
