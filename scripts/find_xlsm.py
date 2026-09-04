"""Windows 파일 시스템에서 원본 xlsm 정확한 경로 얻기."""
import os
from pathlib import Path

root = Path(r"C:\Workspace\Private")
for name in os.listdir(root):
    print(repr(name))
    p = root / name
    if p.is_dir():
        try:
            for sub in os.listdir(p):
                if "GHGCalc" in sub and sub.endswith(".xlsm"):
                    print(f"  FOUND: {p / sub}")
                    print(f"  repr : {repr(str(p / sub))}")
        except PermissionError:
            pass
