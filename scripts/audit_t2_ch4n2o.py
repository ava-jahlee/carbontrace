"""fuels.gen.ts 의 실제 T2 CH4/N2O 값을 뽑아서 IPCC Table 2.5 와 다른 것 목록화."""
import json
import re
from pathlib import Path

TS = Path("src/data/factors/fuels.gen.ts").read_text(encoding="utf-8")

# 각 fuel 블록 파싱 (id 부터 다음 id 까지)
FUEL_PATTERN = re.compile(r'"id":\s*"([^"]+)"')
matches = list(FUEL_PATTERN.finditer(TS))

results = []
for i, m in enumerate(matches):
    fuel_id = m.group(1)
    start = m.start()
    end = matches[i + 1].start() if i + 1 < len(matches) else len(TS)
    block = TS[start:end]

    # T2 블록 찾기 (heat 는 스킵, ef.t2 만)
    t2_start = block.find('"t2": {')
    # 두 번째 t2 (ef.t2) 는 첫 번째 t2 (heat.t2_net 뒤) 다음
    if t2_start == -1:
        continue
    # 실제 ef.t2 는 group 필드가 있는 블록
    t2_block_start = block.find('"group"', t2_start)
    if t2_block_start == -1:
        # 다른 t2 블록 시도
        alt = block.find('"t2": {', t2_start + 1)
        if alt == -1:
            continue
        t2_block_start = alt
    t2_end = block.find('\n      }', t2_block_start) + 100
    t2_block = block[t2_start:t2_end]

    ch4_m = re.search(r'"CH4":\s*\{\s*"value":\s*([\d.]+)', t2_block)
    n2o_m = re.search(r'"N2O":\s*\{\s*"value":\s*([\d.]+)', t2_block)

    ch4 = float(ch4_m.group(1)) if ch4_m else None
    n2o = float(n2o_m.group(1)) if n2o_m else None

    if ch4 is not None or n2o is not None:
        results.append({"id": fuel_id, "ch4": ch4, "n2o": n2o})

# 출력
out = Path("docs/refs/t2_ch4n2o_audit.txt")
out.parent.mkdir(parents=True, exist_ok=True)
lines = ["fuel_id | T2 CH4 | T2 N2O"]
lines.append("-" * 60)
for r in results:
    lines.append(f"{r['id']:40} | {r['ch4']!s:>6} | {r['n2o']!s:>6}")

out.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {len(results)} fuels to {out}")
