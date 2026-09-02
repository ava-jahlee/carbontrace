"""IPCC Ch.2 Table 2.2/2.3/2.4/2.5 텍스트 뽑기."""
from __future__ import annotations

import sys
from pathlib import Path

import pdfplumber

sys.stdout.reconfigure(encoding="utf-8")

PDF_PATH = Path(__file__).resolve().parent.parent / "docs" / "refs" / "ipcc-2006-vol2-ch2.pdf"

TABLE_PAGES = {
    "Table 2.2 (Energy Industries)":         [16, 17],
    "Table 2.3 (Manufacturing/Construction)": [18, 19],
    "Table 2.4 (Commercial/Institutional)":   [20, 21],
    "Table 2.5 (Residential+Agriculture)":    [22, 23],
}


def main():
    with pdfplumber.open(PDF_PATH) as pdf:
        for label, pages in TABLE_PAGES.items():
            print(f"\n{'=' * 80}\n  {label}  (pages: {pages})\n{'=' * 80}\n")
            for pnum in pages:
                page = pdf.pages[pnum - 1]
                text = page.extract_text() or ""
                print(f"\n--- page {pnum} ---")
                print(text)


if __name__ == "__main__":
    main()
