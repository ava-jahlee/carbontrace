/**
 * Scope 2 파리티 테스트.
 *
 * 원본 xlsm (GHGCalc_V0m_lja) Main 시트 D42 · E42 셀 값과 대조.
 * xlsm 원본은 CO2 만 계산 (F39 GWP=1) 하고 CH4/N2O 는 표기만 하므로
 * 여기서도 총 tCO2eq 는 CO2 배출량과 근사하되 CH4/N2O 항도 합해 비교.
 */

import { describe, expect, it } from "vitest";
import { calculateScope2 } from "@/lib/calc/scope2";

describe("Scope 2 · KDHC 열 배출계수 · 4기 수도권지사 · 1 TJ", () => {
  const result = calculateScope2({
    kind: "heat-kdhc",
    amount: 1,
    phase: "4기",
    district: "수도권지사",
    gwpStandard: "SAR",
  });

  it("에러 없이 계산됨", () => {
    expect("error" in result).toBe(false);
  });

  it("CO2 = 35.991 tCO2 (xlsm E42 값 · 1 TJ × 35,991 kgCO2/TJ × 0.001)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.co2.tGhg.value).toBeCloseTo(35.991, 10);
    expect(result.co2.tCo2eq.value).toBeCloseTo(35.991, 10);
  });

  it("CH4 = 0.6519 kg × SAR GWP 21 = 0.01369 tCO2eq (xlsm 미계산이지만 정확한 값)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.ch4.tGhg.value).toBeCloseTo(0.0006519, 10);
    expect(result.ch4.tCo2eq.value).toBeCloseTo(0.0006519 * 21, 10);
  });

  it("N2O = 0.0661 kg × SAR GWP 310 = 0.02049 tCO2eq (xlsm 미계산이지만 정확한 값)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.n2o.tGhg.value).toBeCloseTo(0.0000661, 10);
    expect(result.n2o.tCo2eq.value).toBeCloseTo(0.0000661 * 310, 10);
  });

  it("총합 tCO2eq = 35.991 + 0.01369 + 0.02049 ≈ 36.025", () => {
    if ("error" in result) throw new Error(result.error);
    const expected = 35.991 + 0.0006519 * 21 + 0.0000661 * 310;
    expect(result.totalCo2eq.value).toBeCloseTo(expected, 8);
  });
});

describe("Scope 2 · 전력 · 소비단 · GIR 2022년 승인 · 1 MWh", () => {
  const result = calculateScope2({
    kind: "power",
    amount: 1,
    vintage: "2022",
    location: "소비단",
    gwpStandard: "SAR",
  });

  it("에러 없이 계산됨", () => {
    expect("error" in result).toBe(false);
  });

  it("CO2 = 0.4747 tCO2 (474.7 kg/MWh × 1 MWh × 0.001)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.co2.tGhg.value).toBeCloseTo(0.4747, 10);
    expect(result.co2.tCo2eq.value).toBeCloseTo(0.4747, 10);
  });

  it("총합 ≈ CO2 + CH4×21 + N2O×310 (SAR)", () => {
    if ("error" in result) throw new Error(result.error);
    const expected = 0.4747 + 0.0125 * 0.001 * 21 + 0.01 * 0.001 * 310;
    expect(result.totalCo2eq.value).toBeCloseTo(expected, 10);
  });
});

describe("Scope 2 · 전력 · 소비단 · GIR 2017년 승인 · 1 MWh (xlsm 기본값)", () => {
  const result = calculateScope2({
    kind: "power",
    amount: 1,
    vintage: "2017",
    location: "소비단",
    gwpStandard: "SAR",
  });

  it("CO2 = 0.4567 tCO2 (xlsm _Law&GL22 J100 = 456.7 kg/MWh)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.co2.tGhg.value).toBeCloseTo(0.4567, 10);
  });
});

describe("Scope 2 · 국가 통합 열 (열병합) · asserted + warning", () => {
  const result = calculateScope2({
    kind: "heat-national",
    amount: 1,
    heatKind: "열병합",
    gwpStandard: "SAR",
  });

  it("에러 없이 계산됨 · warning 포함", () => {
    if ("error" in result) throw new Error("error unexpected");
    expect(result.warnings.length).toBeGreaterThan(0);
    expect(result.warnings[0]).toContain("원출처 미상");
  });

  it("CO2 = 60.760 tCO2 (열병합 60,760 kg/TJ × 1 TJ × 0.001)", () => {
    if ("error" in result) throw new Error(result.error);
    expect(result.co2.tGhg.value).toBeCloseTo(60.76, 10);
  });

  it("배출계수 primary source note 에 ⚠ 표시", () => {
    if ("error" in result) throw new Error(result.error);
    const ef = result.co2.emissionFactor;
    const measurementInput = ef.inputs.find((i) => i.kind === "measurement");
    expect(measurementInput?.kind).toBe("measurement");
    if (measurementInput?.kind === "measurement") {
      expect(measurementInput.measurement.primarySource.note?.startsWith("⚠")).toBe(true);
    }
  });
});

describe("Scope 2 · Sources 카탈로그", () => {
  it("GIR_POWER_2017 · GIR_POWER_2022 · GIR_POWER_LATEST · KDHC_HEAT_EF · KETS_HEAT_EF 등록", async () => {
    const { SOURCES } = await import("@/data/sources");
    expect(SOURCES.GIR_POWER_2017).toBeDefined();
    expect(SOURCES.GIR_POWER_2017.maturity).toBe("verified");
    expect(SOURCES.GIR_POWER_2022).toBeDefined();
    expect(SOURCES.GIR_POWER_2022.maturity).toBe("verified");
    expect(SOURCES.GIR_POWER_LATEST).toBeDefined();
    expect(SOURCES.GIR_POWER_LATEST.note).toContain("0.4173");   // 2023년 판
    expect(SOURCES.GIR_POWER_LATEST.note).toContain("0.4541");   // 2020~2022 평균
    expect(SOURCES.KDHC_HEAT_EF).toBeDefined();
    expect(SOURCES.KETS_HEAT_EF).toBeDefined();
    expect(SOURCES.KETS_HEAT_EF.maturity).toBe("asserted");
  });

  it("GIR_POWER_2017 note 에 발전단·소비단 값 명시", async () => {
    const { SOURCES } = await import("@/data/sources");
    const p = SOURCES.GIR_POWER_2017;
    expect(p.note).toContain("440.1");    // 발전단 CO2
    expect(p.note).toContain("456.7");    // 소비단 CO2
    expect(p.note).toContain("0.4401");
    expect(p.note).toContain("0.4567");
  });
});
