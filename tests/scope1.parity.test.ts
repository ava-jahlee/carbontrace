/**
 * Scope 1 계산 엔진이 원본 xlsm 과 값이 정확히 일치하는지 검증한다.
 *
 * 기준 값 = 원본 GHGCalc_V0m_lja.xlsm 이 저장 시점에 계산해 둔 결과.
 * 이 파리티가 깨지면 → carbontrace 는 원본 스프레드시트의 대체품이 될 수 없다.
 */

import { describe, expect, it } from "vitest";
import { calculateScope1 } from "@/lib/calc/scope1";

describe("Scope 1 파리티: 원본 xlsm 저장값과 정확히 일치해야 한다", () => {
  it("아역청탄 (하위 유연탄), 사용량 1 ton, 열량 T1 · 배출 T2 · 산화 T2, GWP=SAR", () => {
    // 원본 xlsm Main 시트 저장값:
    //   G20 (CO2 tGHG)  = 1.7975477519999998
    //   G21 (CH4 tGHG)  = 0.00567
    //   G22 (N2O tGHG)  = 2.6459999999999997e-05
    //   H20 (CO2 tCO2eq)= 1.7975477519999998
    //   H21 (CH4 tCO2eq)= 0.11907
    //   H22 (N2O tCO2eq)= 0.008202599999999999
    //   G25 (∑tCO2eq)    = 1.9248203519999998
    const r = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);

    expect(r.heatFactor?.value).toBeCloseTo(18.9, 10);
    expect(r.oxidation?.value).toBeCloseTo(0.98, 10);

    expect(r.co2.emissionFactor?.value).toBeCloseTo(97049.33333333333, 6);
    expect(r.co2.tGhg?.value).toBeCloseTo(1.7975477519999998, 12);
    expect(r.co2.tCo2eq?.value).toBeCloseTo(1.7975477519999998, 12);

    expect(r.ch4.emissionFactor?.value).toBeCloseTo(300, 10);
    expect(r.ch4.tGhg?.value).toBeCloseTo(0.00567, 12);
    expect(r.ch4.tCo2eq?.value).toBeCloseTo(0.11907, 10);

    expect(r.n2o.emissionFactor?.value).toBeCloseTo(1.4, 10);
    expect(r.n2o.tGhg?.value).toBeCloseTo(2.6459999999999997e-5, 15);
    expect(r.n2o.tCo2eq?.value).toBeCloseTo(0.008202599999999999, 12);

    expect(r.totalCo2eq.value).toBeCloseTo(1.9248203519999998, 10);
  });

  it("도시가스(LNG), 사용량 1 천m³, 열량 T2 · 배출 T2 · 산화 T2, GWP=SAR", () => {
    // 원본 xlsm 참조:
    //   열량계수 T2 순발열량 = 38.9 MJ/Nm³   (Q82. P82=43.1 은 총발열량 자리로 계산 미사용)
    //   배출계수 T2 CO2 = 55997.33333 kg/TJ  (J82)
    //   배출계수 T2 CH4 = 5,  N2O = 0.1
    //   산화계수 T2 기체 = 0.995              (참조표 N16, 도시가스 자체 U82=0.98 은 참고값)
    const HEAT_T2 = 38.9;
    const EF_CO2 = 55997.33333333333;
    const OX_T2_GAS = 0.995;

    const r = calculateScope1({
      fuelId: "도시가스LNG",
      amount: 1,
      heatTier: "T2",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);

    expect(r.heatFactor?.value).toBeCloseTo(HEAT_T2, 10);
    expect(r.oxidation?.value).toBeCloseTo(OX_T2_GAS, 10);

    const expectedCO2tGhg = 1 * HEAT_T2 * EF_CO2 * OX_T2_GAS * 1e-6;
    expect(r.co2.tGhg?.value).toBeCloseTo(expectedCO2tGhg, 10);
    expect(r.co2.tCo2eq?.value).toBeCloseTo(expectedCO2tGhg * 1, 10);

    const expectedCH4tGhg = 1 * HEAT_T2 * 5 * 1e-6;
    expect(r.ch4.tGhg?.value).toBeCloseTo(expectedCH4tGhg, 12);
    expect(r.ch4.tCo2eq?.value).toBeCloseTo(expectedCH4tGhg * 21, 10);

    const expectedN2OtGhg = 1 * HEAT_T2 * 0.1 * 1e-6;
    expect(r.n2o.tGhg?.value).toBeCloseTo(expectedN2OtGhg, 14);
    expect(r.n2o.tCo2eq?.value).toBeCloseTo(expectedN2OtGhg * 310, 12);

    expect(r.totalCo2eq.value).toBeCloseTo(
      expectedCO2tGhg + expectedCH4tGhg * 21 + expectedN2OtGhg * 310,
      10,
    );
  });

  it("경유 (가스/디젤 오일), 사용량 1 kL, 열량 T2 · 배출 T2 · 산화 T2, GWP=SAR", () => {
    // 원본 데이터:
    //   열량계수 T2 = 35.2 MJ/L (Q45)
    //   배출계수 T2: CO2 73740.33, CH4 10, N2O 0.6
    //   산화계수 T2 액체 = 0.99
    const r = calculateScope1({
      fuelId: "경유-가스디젤-오일",
      amount: 1,
      heatTier: "T2",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);

    expect(r.heatFactor?.value).toBeCloseTo(35.2, 10);
    expect(r.oxidation?.value).toBeCloseTo(0.99, 10);
    expect(r.co2.emissionFactor?.value).toBeCloseTo(73740.33333333333, 6);

    const expectedCO2tGhg = 1 * 35.2 * 73740.33333333333 * 0.99 * 1e-6;
    expect(r.co2.tGhg?.value).toBeCloseTo(expectedCO2tGhg, 10);
  });
});

describe("Scope 1 감사 근거 (primary source): 값마다 원문서가 붙는다", () => {
  it("아역청탄 T2 배출계수 CO2 → GIR 국가고유 배출계수", () => {
    const r = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);
    const efInputs = r.co2.emissionFactor?.inputs ?? [];
    const meas = efInputs.find((i) => i.kind === "measurement");
    if (!meas || meas.kind !== "measurement") throw new Error("배출계수에 measurement 근거가 붙어있지 않음");
    const ps = meas.measurement.primarySource;
    expect(ps.kind).toBe("gir");
    expect(ps.docId).toBe("gir-ef-2017");
    expect(ps.publisher).toContain("GIR");
  });

  it("아역청탄 T1 열량계수 → IPCC 2006 GL Vol.2 Ch.1", () => {
    const r = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);
    const meas = r.heatFactor?.inputs.find((i) => i.kind === "measurement");
    if (!meas || meas.kind !== "measurement") throw new Error("열량계수 근거 누락");
    const ps = meas.measurement.primarySource;
    expect(ps.kind).toBe("ipcc-2006");
    expect(ps.docId).toBe("ipcc-2006-vol2-ch1");
    expect(ps.url).toBeDefined();
  });

  it("도시가스(LNG) T2 산화계수 → K-ETS 지침 별첨6", () => {
    const r = calculateScope1({
      fuelId: "도시가스LNG",
      amount: 1,
      heatTier: "T2",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);
    const meas = r.oxidation?.inputs.find((i) => i.kind === "measurement");
    if (!meas || meas.kind !== "measurement") throw new Error("산화계수 근거 누락");
    const ps = meas.measurement.primarySource;
    expect(ps.kind).toBe("kets-guideline");
    expect(ps.docId).toBe("kets-annex-6");
  });

  it("GWP (SAR) → 국가 인벤토리 보고서 (한국이 채택한 GWP)", () => {
    const r = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);
    const meas = r.co2.gwp.inputs.find((i) => i.kind === "measurement");
    if (!meas || meas.kind !== "measurement") throw new Error("GWP 근거 누락");
    const ps = meas.measurement.primarySource;
    expect(ps.kind).toBe("national-inventory");
    expect(ps.docId).toBe("national-inventory");
  });

  it("총 tCO2eq 는 세 GHG 종의 tCO2eq 로부터 파생된다 (감사자가 파고들 수 있음)", () => {
    const r = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
    });
    if ("error" in r) throw new Error(r.error);
    expect(r.totalCo2eq.inputs.length).toBe(3);
    expect(r.totalCo2eq.inputs.every((i) => i.kind === "derived")).toBe(true);
  });
});
