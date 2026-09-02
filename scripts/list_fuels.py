"""디버그: fuels.gen.ts 의 fuel id · T1 열량 · T1 탄소함량 · T1 CO2 EF 나열."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
RAW_DIR = ROOT / "src" / "data" / "raw"

with (RAW_DIR / "sheet__Law&GL22.json").open(encoding="utf-8") as fp:
    law = json.load(fp)


def cval(cell):
    return cell.get("v") if cell else None


rows = law["rows"]
print(f"{'idx':>3} {'category':<8} {'name':<32} {'state':<6} {'t1_net':>8} {'t1_tc':>8} {'t1_co2':>10}")
for i in range(35, 98):
    row = rows[i]
    name = cval(row[1]) if len(row) > 1 else None
    if not name:
        continue
    category = cval(row[0]) if len(row) > 0 else ""
    state = cval(row[19]) if len(row) > 19 else ""       # T
    t1_net = cval(row[14]) if len(row) > 14 else ""      # O
    t1_tc = cval(row[2]) if len(row) > 2 else ""         # C
    t1_co2 = cval(row[3]) if len(row) > 3 else ""        # D
    print(f"{i+1:>3} {str(category)[:8]:<8} {str(name)[:32]:<32} {str(state)[:6]:<6} {str(t1_net):>8} {str(t1_tc):>8} {str(t1_co2):>10}")
