/**
 * 냉매 계산기 테스트.
 * GWP 판별 정확한 값과 계산 로직 검증.
 */

import { describe, expect, it } from "vitest";
import { calculateRefrigerant, sumRefrigerants, type RefrigerantResult } from "@/lib/calc/refrigerant";
import { REFRIGERANTS, findRefrigerant } from "@/data/factors/refrigerants.gen";

describe("냉매 카탈로그", () => {
  it("최소 10개 냉매 정의", () => {
    expect(REFRIGERANTS.length).toBeGreaterThanOrEqual(10);
  });

  it("주요 HFC 있음: HFC-134a, HFC-32, HFC-125, HFC-143a, HFC-152a", () => {
    for (const id of ["HFC-134a", "HFC-32", "HFC-125", "HFC-143a", "HFC-152a"]) {
      expect(findRefrigerant(id)).toBeDefined();
    }
  });

  it("블렌드 있음: R-410A, R-404A, R-407C", () => {
    for (const id of ["R-410A", "R-404A", "R-407C"]) {
      expect(findRefrigerant(id)).toBeDefined();
    }
  });

  it("SF6, NF3 있음", () => {
    expect(findRefrigerant("SF6")).toBeDefined();
    expect(findRefrigerant("NF3")).toBeDefined();
  });

  it("각 냉매 SAR/AR4/AR5/AR6 GWP 정의 (NF3 SAR 는 null)", () => {
    for (const r of REFRIGERANTS) {
      expect(r.gwp100.AR4).toBeDefined();
      expect(r.gwp100.AR5).toBeDefined();
      expect(r.gwp100.AR6).toBeDefined();
      if (r.id !== "NF3") {
        expect(r.gwp100.SAR).toBeDefined();
      } else {
        expect(r.gwp100.SAR).toBeNull();
      }
    }
  });
});

describe("HFC-134a GWP 값 (교차 검증)", () => {
  const r = findRefrigerant("HFC-134a")!;

  it("SAR = 1300", () => expect(r.gwp100.SAR?.value).toBe(1300));
  it("AR4 = 1430", () => expect(r.gwp100.AR4?.value).toBe(1430));
  it("AR5 = 1300", () => expect(r.gwp100.AR5?.value).toBe(1300));
  it("AR6 = 1530", () => expect(r.gwp100.AR6?.value).toBe(1530));
});

describe("R-410A 블렌드 GWP 계산", () => {
  const r = findRefrigerant("R-410A")!;

  it("AR6 = 0.5×771 + 0.5×3740 = 2255.5", () => {
    expect(r.gwp100.AR6?.value).toBeCloseTo(2255.5, 6);
  });

  it("AR4 = 0.5×675 + 0.5×3500 = 2087.5", () => {
    expect(r.gwp100.AR4?.value).toBeCloseTo(2087.5, 6);
  });
});

describe("calculateRefrigerant · HFC-134a 5 kg 유출 (AR6)", () => {
  const r = calculateRefrigerant({
    refrigerantId: "HFC-134a",
    leakedKg: 5,
    gwpAssessment: "AR6",
  });

  it("에러 없음", () => expect("error" in r).toBe(false));

  it("tCO2eq = 5 × 1530 × 10⁻³ = 7.65", () => {
    if ("error" in r) throw new Error(r.error);
    expect(r.tCo2eq.value).toBeCloseTo(7.65, 10);
    expect(r.tCo2eq.unit).toBe("tCO2eq");
  });

  it("GWP 근거에 AR6 Table 7.SM.7 참조", () => {
    if ("error" in r) throw new Error(r.error);
    const gwpInput = r.gwp.inputs[0];
    expect(gwpInput.kind).toBe("measurement");
    if (gwpInput.kind === "measurement") {
      expect(gwpInput.measurement.primarySource.docId).toBe("ipcc-ar6-2021-sm7");
    }
  });

  it("방법론 근거에 IPCC 2006 Vol.3 Ch.7 참조", () => {
    if ("error" in r) throw new Error(r.error);
    const methodInput = r.methodology.inputs[0];
    expect(methodInput.kind).toBe("measurement");
    if (methodInput.kind === "measurement") {
      expect(methodInput.measurement.primarySource.docId).toBe("ipcc-2006-vol3-ch7");
    }
  });
});

describe("calculateRefrigerant · R-410A 10 kg 유출 · GWP 판 비교", () => {
  const inputBase = { refrigerantId: "R-410A", leakedKg: 10 };

  it("K-ETS 실무 (SAR): 10 × 1725 × 10⁻³ = 17.25 tCO2eq", () => {
    const r = calculateRefrigerant({ ...inputBase, gwpAssessment: "SAR" });
    if ("error" in r) throw new Error(r.error);
    expect(r.tCo2eq.value).toBeCloseTo(17.25, 10);
  });

  it("국가 인벤토리 (AR5): 10 × 1923.5 × 10⁻³ = 19.235 tCO2eq", () => {
    const r = calculateRefrigerant({ ...inputBase, gwpAssessment: "AR5" });
    if ("error" in r) throw new Error(r.error);
    expect(r.tCo2eq.value).toBeCloseTo(19.235, 10);
  });

  it("국제 공시 (AR6): 10 × 2255.5 × 10⁻³ = 22.555 tCO2eq", () => {
    const r = calculateRefrigerant({ ...inputBase, gwpAssessment: "AR6" });
    if ("error" in r) throw new Error(r.error);
    expect(r.tCo2eq.value).toBeCloseTo(22.555, 10);
  });
});

describe("NF3 SAR 미정의 처리", () => {
  it("NF3 + SAR 이면 error", () => {
    const r = calculateRefrigerant({
      refrigerantId: "NF3",
      leakedKg: 1,
      gwpAssessment: "SAR",
    });
    expect("error" in r).toBe(true);
  });

  it("NF3 + AR6 은 warning 포함", () => {
    const r = calculateRefrigerant({
      refrigerantId: "NF3",
      leakedKg: 1,
      gwpAssessment: "AR6",
    });
    if ("error" in r) throw new Error(r.error);
    expect(r.warnings.length).toBeGreaterThan(0);
    expect(r.warnings[0]).toContain("NF3");
  });
});

describe("sumRefrigerants · 여러 냉매 합산", () => {
  it("HFC-134a 5kg + R-410A 3kg (AR6) 합산", () => {
    const raw = [
      calculateRefrigerant({ refrigerantId: "HFC-134a", leakedKg: 5, gwpAssessment: "AR6" }),
      calculateRefrigerant({ refrigerantId: "R-410A", leakedKg: 3, gwpAssessment: "AR6" }),
    ];
    const results: RefrigerantResult[] = raw.filter(
      (r): r is RefrigerantResult => !("error" in r),
    );
    const sum = sumRefrigerants(results);
    expect(sum?.value).toBeCloseTo(5 * 1530 * 1e-3 + 3 * 2255.5 * 1e-3, 10);
  });

  it("빈 배열이면 null", () => {
    expect(sumRefrigerants([])).toBeNull();
  });
});
