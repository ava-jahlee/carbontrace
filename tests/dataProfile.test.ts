/**
 * dataProfile 테스트.
 *
 * xlsm-original / xlsm-corrected / gir22-latest 세 프로파일이
 * 각각 다른 배출계수를 사용하는지 검증.
 */

import { describe, expect, it } from "vitest";
import { calculateScope1 } from "@/lib/calc/scope1";
import {
  countOverrides,
  DATA_PROFILE_LABELS,
  getOverride,
  type DataProfile,
} from "@/data/factors/corrections";

describe("DataProfile 카탈로그", () => {
  it("3 개 profile 정의됨", () => {
    expect(DATA_PROFILE_LABELS["xlsm-original"]).toBeDefined();
    expect(DATA_PROFILE_LABELS["xlsm-corrected"]).toBeDefined();
    expect(DATA_PROFILE_LABELS["gir22-latest"]).toBeDefined();
  });

  it("xlsm-original 은 override 0 건 (파리티 보존)", () => {
    expect(countOverrides("xlsm-original")).toBe(0);
  });

  it("xlsm-corrected 은 override 최소 30 건 (등유·항공유 4 + CH4/N2O 오작성 다수)", () => {
    const n = countOverrides("xlsm-corrected");
    expect(n).toBeGreaterThan(30);
  });

  it("gir22-latest 은 xlsm-corrected 보다 더 많음 (GIR 2022.1 25개 추가)", () => {
    expect(countOverrides("gir22-latest")).toBeGreaterThan(countOverrides("xlsm-corrected"));
  });

  it("등유 T2 CO2 override 값 검증 (xlsm-corrected)", () => {
    const ovr = getOverride("xlsm-corrected", "fuel.등유-기타-등유.ef.t2.CO2");
    expect(ovr?.value).toBeCloseTo(73152.66666666667, 10);
    // CO2 는 tC 로부터 파생되므로 note 는 파생값 설명. tC 필드에 뒤바꿈 원인 명시.
    const tCovr = getOverride("xlsm-corrected", "fuel.등유-기타-등유.ef.t2.tC_per_TJ");
    expect(tCovr?.primarySource.note).toContain("뒤바꿔");
  });

  it("항공유 T2 CO2 override 값 검증 (xlsm-corrected)", () => {
    const ovr = getOverride("xlsm-corrected", "fuel.제트용-등유-항공유.ef.t2.CO2");
    expect(ovr?.value).toBeCloseTo(73080.33333333333, 10);
  });

  it("석탄 N2O 정정: 아역청탄 xlsm 1.4 → corrected 1.5", () => {
    const ovr = getOverride("xlsm-corrected", "fuel.아역청탄-하위-유연탄.ef.t2.N2O");
    expect(ovr?.value).toBe(1.5);
  });

  it("가스류 정정: 매립지-가스 xlsm 300/4 → corrected 5/0.1", () => {
    const ch4 = getOverride("xlsm-corrected", "fuel.매립지-가스.ef.t2.CH4");
    const n2o = getOverride("xlsm-corrected", "fuel.매립지-가스.ef.t2.N2O");
    expect(ch4?.value).toBe(5);
    expect(n2o?.value).toBe(0.1);
  });

  it("GIR 2022.1: 경유 20.111 → 20.090", () => {
    const ovr = getOverride("gir22-latest", "fuel.경유-가스디젤-오일.ef.t2.tC_per_TJ");
    expect(ovr?.value).toBe(20.09);
  });

  it("GIR 2022.1: 도시가스LNG 15.272 → 15.236", () => {
    const ovr = getOverride("gir22-latest", "fuel.도시가스LNG.ef.t2.tC_per_TJ");
    expect(ovr?.value).toBe(15.236);
  });
});

describe("Scope 1 계산 · profile 별 결과 차이", () => {
  const baseInput = {
    fuelId: "등유-기타-등유",
    amount: 100,       // 100 ton
    heatTier: "T1" as const,
    efTier: "T2" as const,
    gwpStandard: "SAR" as const,
  };

  it("xlsm-original: 등유 T2 CO2 = 19.931 → 파생 CO2 계수", () => {
    const r = calculateScope1({ ...baseInput, dataProfile: "xlsm-original" });
    if ("error" in r) throw new Error(r.error);
    expect(r.co2.emissionFactor?.value).toBeCloseTo(73080.33333333333, 6);  // xlsm 원본 (뒤바뀐 값 = 항공유 값)
  });

  it("xlsm-corrected: 등유 T2 CO2 = 19.969 → 73153 (뒤바꿈 정정)", () => {
    const r = calculateScope1({ ...baseInput, dataProfile: "xlsm-corrected" });
    if ("error" in r) throw new Error(r.error);
    expect(r.co2.emissionFactor?.value).toBeCloseTo(73152.66666666667, 6);
    expect(r.co2.emissionFactor?.formula).toContain("xlsm-corrected");
  });

  it("gir22-latest: 등유 T2 CO2 = 19.926 → 73062 (GIR 최신)", () => {
    const r = calculateScope1({ ...baseInput, dataProfile: "gir22-latest" });
    if ("error" in r) throw new Error(r.error);
    const expected = (19.926 * 44 * 1000) / 12;   // = 73062
    expect(r.co2.emissionFactor?.value).toBeCloseTo(expected, 6);
    expect(r.co2.emissionFactor?.formula).toContain("gir22-latest");
  });

  it("아역청탄 profile 별 N2O 차이 (xlsm 1.4 → corrected 1.5)", () => {
    const rOrig = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
      dataProfile: "xlsm-original",
    });
    const rCorr = calculateScope1({
      fuelId: "아역청탄-하위-유연탄",
      amount: 1,
      heatTier: "T1",
      efTier: "T2",
      gwpStandard: "SAR",
      dataProfile: "xlsm-corrected",
    });
    if ("error" in rOrig) throw new Error(rOrig.error);
    if ("error" in rCorr) throw new Error(rCorr.error);
    expect(rOrig.n2o.emissionFactor?.value).toBe(1.4);
    expect(rCorr.n2o.emissionFactor?.value).toBe(1.5);
    // N2O 값 상승 → tCO2eq 도 상승
    expect(rCorr.n2o.tCo2eq!.value).toBeGreaterThan(rOrig.n2o.tCo2eq!.value);
  });

  it("매립지 가스 profile 별 CH4/N2O 대폭 감소 (300→5, 4→0.1)", () => {
    const inputBase = {
      fuelId: "매립지-가스",
      amount: 1,
      heatTier: "T1" as const,
      efTier: "T2" as const,
      gwpStandard: "SAR" as const,
    };
    const rOrig = calculateScope1({ ...inputBase, dataProfile: "xlsm-original" });
    const rCorr = calculateScope1({ ...inputBase, dataProfile: "xlsm-corrected" });
    if ("error" in rOrig) throw new Error(rOrig.error);
    if ("error" in rCorr) throw new Error(rCorr.error);
    // 300 → 5 = 60배 감소
    expect(rOrig.ch4.emissionFactor?.value).toBe(300);
    expect(rCorr.ch4.emissionFactor?.value).toBe(5);
    // 4 → 0.1 = 40배 감소
    expect(rOrig.n2o.emissionFactor?.value).toBe(4);
    expect(rCorr.n2o.emissionFactor?.value).toBe(0.1);
  });

  it("파리티 기본 정책: dataProfile 미지정 시 xlsm-original 동일", () => {
    const rExplicit = calculateScope1({
      ...baseInput,
      dataProfile: "xlsm-original",
    });
    const rDefault = calculateScope1(baseInput);   // 미지정
    if ("error" in rExplicit || "error" in rDefault) throw new Error("error unexpected");
    expect(rExplicit.totalCo2eq.value).toBe(rDefault.totalCo2eq.value);
  });
});

describe("Override primarySource note 표준화", () => {
  it("xlsm-corrected 등유 override note 에 '뒤바꿔' 문구", () => {
    const ovr = getOverride("xlsm-corrected", "fuel.등유-기타-등유.ef.t2.tC_per_TJ");
    expect(ovr?.primarySource.note).toContain("뒤바꿔");
    expect(ovr?.primarySource.maturity).toBe("verified");
  });

  it("gir22-latest note 에 '2022.1 공표' 문구", () => {
    const ovr = getOverride("gir22-latest", "fuel.경유-가스디젤-오일.ef.t2.tC_per_TJ");
    expect(ovr?.primarySource.note).toContain("2022.1 공표");
  });
});

describe("DataProfile 타입 안전성 · 모든 profile 값 (컴파일 타임)", () => {
  it("타입 exhaustive: 3 개 profile 모두 처리", () => {
    const profiles: DataProfile[] = ["xlsm-original", "xlsm-corrected", "gir22-latest"];
    for (const p of profiles) {
      expect(DATA_PROFILE_LABELS[p]).toBeDefined();
      expect(typeof countOverrides(p)).toBe("number");
    }
  });
});
