"""K-ETS 별표 6 PDF 페이지 텍스트 덤프."""
from pathlib import Path
import pdfplumber

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "docs" / "refs" / "kets-annex-6.pdf"
OUT = ROOT / "docs" / "refs" / "kets-annex-6.txt"

with pdfplumber.open(PDF) as pdf, OUT.open("w", encoding="utf-8") as f:
    f.write(f"pages: {len(pdf.pages)}\n\n")
    for i, page in enumerate(pdf.pages, 1):
        text = page.extract_text() or ""
        f.write(f"\n===== page {i} =====\n")
        f.write(text)
        f.write("\n")

print(f"[ok] wrote {OUT}")
