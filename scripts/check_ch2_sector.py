"""우리 fuels.gen.ts T1 CH4/N2O 값이 IPCC Ch.2 어느 섹터 표와 일치하는지 진단.

Table 2.2 (Energy Industries) 와 Table 2.3 (Manufacturing) 는 대부분 값이 같지만
석탄류 CH4 값이 결정적으로 다르다: 2.2 → 1, 2.3 → 10.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "src" / "data" / "raw"

with (RAW_DIR / "sheet__Law&GL22.json").open(encoding="utf-8") as fp:
    law = json.load(fp)

rows = law["rows"]

def num(row, idx):
    if len(row) <= idx or row[idx] is None:
        return None
    v = row[idx].get("v")
    try:
        return float(v)
    except (TypeError, ValueError):
        return None

# 결정적 연료 (섹터별 값이 다른 것)
print("Fuel                                  | T1 CH4 | T1 N2O | which sector?")
print("-" * 80)

# 결정 기준 (IPCC Ch.2):
#   석탄류 CH4:  T2.2=1     T2.3=10    T2.4=10    T2.5=300
#   석탄류 N2O:  1.5 across
#   Wood CH4:   T2.2=30    T2.3=30    T2.4=300   T2.5=300 
sector_hints = {
    ("Coal-CH4", 1): "Table 2.2 (Energy Industries)",
    ("Coal-CH4", 10): "Table 2.3 (Manufacturing/Construction) or 2.4",
    ("Coal-CH4", 300): "Table 2.5 (Residential/Agriculture)",
    ("Wood-CH4", 30): "Table 2.2 or 2.3",
    ("Wood-CH4", 300): "Table 2.4 or 2.5",
}

diagnostics = []

for i in range(35, 98):
    row = rows[i]
    name_cell = row[1] if len(row) > 1 else None
    if not name_cell or name_cell.get("v") is None:
        continue
    name = name_cell["v"]
    category = row[0].get("v") if len(row) > 0 and row[0] else ""
    ch4 = num(row, 4)  # E: T1 CH4
    n2o = num(row, 5)  # F: T1 N2O

    hint = ""
    if category == "석탄류" and ch4 is not None:
        hint = sector_hints.get(("Coal-CH4", int(ch4)), f"(unknown: {ch4})")
    elif "목재" in str(name) and ch4 is not None:
        hint = sector_hints.get(("Wood-CH4", int(ch4)), f"(unknown: {ch4})")

    diagnostics.append((str(name)[:36], str(ch4), str(n2o), hint))

for name, ch4, n2o, hint in diagnostics:
    print(f"{name:<36}  | {ch4:>6} | {n2o:>6} | {hint}")
