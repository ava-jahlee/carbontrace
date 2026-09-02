"""
IPCC 2006 GL Vol.2 Ch.1 PDF 를 페이지별로 훑어
Table 1.2 (열량계수) / Table 1.3 (탄소함량) / Table 1.4 (배출계수) 가 어느 페이지에 있는지 파악한다.

Usage: python scripts/inspect_ipcc_ch1.py
"""
from __future__ import annotations

import re
from pathlib import Path

import pdfplumber

PDF_PATH = Path(__file__).resolve().parent.parent / "docs" / "refs" / "ipcc-2006-vol2-ch1.pdf"


def main():
    if not PDF_PATH.exists():
        raise SystemExit(f"! PDF not found: {PDF_PATH}")

    with pdfplumber.open(PDF_PATH) as pdf:
        print(f"pages: {len(pdf.pages)}")
        for i, page in enumerate(pdf.pages, 1):
            text = page.extract_text() or ""
            # 표 제목 캡처
            matches = re.findall(r"TABLE\s+1\.\d+", text, re.IGNORECASE)
            if matches:
                # 첫 줄 몇 개
                head = text[:200].replace("\n", " | ")
                print(f"page {i:3d}  tables: {matches}  head: {head[:120]}")


if __name__ == "__main__":
    main()
