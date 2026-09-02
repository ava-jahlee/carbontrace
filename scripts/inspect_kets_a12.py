"""K-ETS 별표 12 PDF 페이지 구조 파악. 각 페이지 텍스트를 파일로 저장."""
from pathlib import Path
import pdfplumber

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "docs" / "refs" / "kets-annex-12.pdf"
OUT = ROOT / "docs" / "refs" / "kets-annex-12.txt"

with pdfplumber.open(PDF) as pdf, OUT.open("w", encoding="utf-8") as f:
    f.write(f"pages: {len(pdf.pages)}\n\n")
    for i, page in enumerate(pdf.pages, 1):
        text = page.extract_text() or ""
        f.write(f"\n===== page {i} =====\n")
        f.write(text)
        f.write("\n")

print(f"[ok] wrote {OUT} ({len(open(OUT, encoding='utf-8').read())} chars)")
