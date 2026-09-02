"""
IPCC 2006 GL Vol.2 Ch.1 PDF 에서 Table 1.2 (NCV) · 1.3 (Carbon Content) · 1.4 (CO2 EF) 를
텍스트로 뽑는다. 파싱은 어렵더라도 우선 원문 확인용.

Usage:  python scripts/extract_ipcc_ch1_tables.py > docs/refs/ipcc-ch1-tables.txt
"""
from __future__ import annotations

from pathlib import Path

import pdfplumber

PDF_PATH = Path(__file__).resolve().parent.parent / "docs" / "refs" / "ipcc-2006-vol2-ch1.pdf"

TABLE_PAGES = {
    "Table 1.2 (NCV, MJ/kg)":         [18, 19],
    "Table 1.3 (Carbon Content, kg/GJ)": [21, 22],
    "Table 1.4 (CO2 EF, kg/TJ)":      [23, 24],
}


def main():
    with pdfplumber.open(PDF_PATH) as pdf:
        for label, pages in TABLE_PAGES.items():
            print(f"\n{'=' * 80}")
            print(f"  {label}")
            print(f"  pages: {pages}")
            print(f"{'=' * 80}\n")
            for pnum in pages:
                page = pdf.pages[pnum - 1]
                text = page.extract_text() or ""
                print(f"\n--- page {pnum} ---")
                print(text)


if __name__ == "__main__":
    main()
