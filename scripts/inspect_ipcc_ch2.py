"""IPCC 2006 GL Vol.2 Ch.2 PDF 페이지별 표 위치 파악."""
from __future__ import annotations

import re
import sys
from pathlib import Path

import pdfplumber

sys.stdout.reconfigure(encoding="utf-8")

PDF_PATH = Path(__file__).resolve().parent.parent / "docs" / "refs" / "ipcc-2006-vol2-ch2.pdf"


def main():
    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"pages: {len(pdf.pages)}")
        for i, page in enumerate(pdf.pages, 1):
            text = page.extract_text() or ""
            matches = re.findall(r"TABLE\s+2\.\d+", text, re.IGNORECASE)
            if matches:
                head = text[:250].replace("\n", " | ")
                print(f"page {i:3d}  tables: {matches}  head: {head[:180]}")


if __name__ == "__main__":
    main()
