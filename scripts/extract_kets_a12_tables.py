"""K-ETS 별표 12 PDF 에서 표를 pdfplumber 의 table 추출로 정밀히 뽑는다."""
from pathlib import Path
import pdfplumber
import json

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "docs" / "refs" / "kets-annex-12.pdf"
OUT = ROOT / "docs" / "refs" / "kets-annex-12-tables.json"

result = {"pages": []}
with pdfplumber.open(PDF) as pdf:
    for i, page in enumerate(pdf.pages, 1):
        tables = page.extract_tables()
        result["pages"].append({
            "page": i,
            "tables": tables,
        })

with OUT.open("w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"[write] {OUT}")
for p in result["pages"]:
    print(f"  page {p['page']}: {len(p['tables'])} tables")
    for ti, t in enumerate(p["tables"]):
        print(f"    table {ti}: {len(t)} rows x {max(len(r) for r in t) if t else 0} cols")
