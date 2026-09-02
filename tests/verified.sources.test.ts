/**
 * verified 매핑 파이프라인 검증.
 *
 * src/data/verified/*.json 매핑에 있는 값들이 실제로
 *   1) primarySource.maturity === "verified" 로 승격됐고
 *   2) row (조항 위치) 가 붙어 있고
 *   3) 문서 docId 가 매핑 파일과 일치하는지
 * 를 확인한다.
 *
 * 매핑 파일이 추가될 때마다 여기에 describe 블록 추가.
 */

import { describe, expect, it } from "vitest";
import { FUELS } from "@/data/factors/fuels.gen";
import { OXIDATION } from "@/data/factors/oxidation.gen";
import { GWP } from "@/data/factors/gwp.gen";

describe("verified: K-ETS 별표 6 (산화계수)", () => {
  const cases: Array<{ state: "고체" | "액체" | "기체"; tier: "t1" | "t2"; expectedValue: number }> = [
    { state: "고체", tier: "t1", expectedValue: 1.0 },
    { state: "고체", tier: "t2", expectedValue: 0.98 },
    { state: "액체", tier: "t1", expectedValue: 1.0 },
    { state: "액체", tier: "t2", expectedValue: 0.99 },
    { state: "기체", tier: "t1", expectedValue: 1.0 },
    { state: "기체", tier: "t2", expectedValue: 0.995 },
  ];

  it.each(cases)(
    "$state $tier 은 primarySource.maturity=verified · docId=kets-annex-6 · row 명시",
    ({ state, tier, expectedValue }) => {
      const m = OXIDATION[state][tier];
      if (!m) throw new Error(`${state} ${tier} measurement 없음`);
      expect(m.value).toBeCloseTo(expectedValue, 10);
      expect(m.primarySource.maturity).toBe("verified");
      expect(m.primarySource.docId).toBe("kets-annex-6");
      expect(m.primarySource.row).toBeDefined();
      expect(m.primarySource.row).toMatch(/④ 산화계수/);
      expect(m.primarySource.reviewedAt).toBeDefined();
    },
  );

  it("K-ETS 별표 6 문서 자체 정보가 승격됨 (별표 6 정식 명칭 · 고시번호 · URL)", () => {
    const m = OXIDATION["고체"]["t2"];
    if (!m) throw new Error();
    const ps = m.primarySource;
    expect(ps.doc).toContain("별표 6");
    expect(ps.edition).toContain("2025");
    expect(ps.part).toContain("배출활동별 온실가스 배출량");
    expect(ps.url).toBeDefined();
    expect(ps.url).toContain("gmi.go.kr");
  });
});

describe("verified: IPCC 2006 GL Vol.2 Ch.1 (T1 열량 · 탄소함량 · CO2 EF)", () => {
  // 대표 연료 몇 개만 검증 (parity 는 build 시점에 전수 검증됨)
  const crude = FUELS.find((f) => f.id === "원유");
  const anthracite = FUELS.find((f) => f.id === "국내-무연탄");
  const naturalGas = FUELS.find((f) => f.id === "천연가스LNG");

  it("원유 T1 NCV: Table 1.2 · Crude Oil · 42.3 MJ/kg", () => {
    expect(crude).toBeDefined();
    const m = crude!.heat.t1_net!;
    expect(m.value).toBeCloseTo(42.3, 10);
    expect(m.primarySource.maturity).toBe("verified");
    expect(m.primarySource.row).toContain("Table 1.2");
    expect(m.primarySource.row).toContain("Crude Oil");
    expect(m.primarySource.page).toBe("1.18–1.19");
  });

  it("원유 T1 탄소함량: Table 1.3 · Crude Oil · 20.0 tC/TJ", () => {
    const m = crude!.ef.t1.tC_per_TJ!;
    expect(m.value).toBeCloseTo(20.0, 10);
    expect(m.primarySource.maturity).toBe("verified");
    expect(m.primarySource.row).toContain("Table 1.3");
    expect(m.primarySource.page).toBe("1.21–1.22");
  });

  it("원유 T1 CO2 EF: Table 1.4 · Crude Oil · 73,333.33 kg/TJ (계산식 유도값)", () => {
    const m = crude!.ef.t1.CO2!;
    expect(m.value).toBeCloseTo(20.0 * 44 / 12 * 1000, 6);
    expect(m.primarySource.maturity).toBe("verified");
    expect(m.primarySource.row).toContain("Table 1.4");
    expect(m.primarySource.page).toBe("1.23–1.24");
    expect(m.primarySource.note).toContain("73,300");
    expect(m.primarySource.note).toContain("44/12");
  });

  it("무연탄 T1 값들: Anthracite 매핑", () => {
    expect(anthracite).toBeDefined();
    expect(anthracite!.heat.t1_net!.value).toBeCloseTo(26.7, 10);
    expect(anthracite!.heat.t1_net!.primarySource.row).toContain("Anthracite");
    expect(anthracite!.ef.t1.tC_per_TJ!.value).toBeCloseTo(26.8, 10);
    expect(anthracite!.ef.t1.CO2!.primarySource.maturity).toBe("verified");
  });

  it("천연가스(LNG) T1 값들: Natural Gas 매핑", () => {
    expect(naturalGas).toBeDefined();
    expect(naturalGas!.heat.t1_net!.value).toBeCloseTo(48.0, 10);
    expect(naturalGas!.heat.t1_net!.primarySource.row).toContain("Natural Gas");
    expect(naturalGas!.ef.t1.CO2!.value).toBeCloseTo(15.3 * 44 / 12 * 1000, 4);
    expect(naturalGas!.ef.t1.CO2!.primarySource.maturity).toBe("verified");
  });

  it("IPCC Vol.2 Ch.1 문서 자체 정보가 승격됨 (URL · 표 목록 · verified)", () => {
    const m = crude!.heat.t1_net!;
    const ps = m.primarySource;
    expect(ps.docId).toBe("ipcc-2006-vol2-ch1");
    expect(ps.publisher).toContain("IPCC");
    expect(ps.url).toContain("V2_1_Ch1_Introduction.pdf");
    expect(ps.table).toContain("Table 1.2");
    expect(ps.table).toContain("Table 1.4");
  });

  it("국내 특유 연료 (부생연료 등) 는 IPCC 표에 없어 승격되지 않음 (asserted 유지)", () => {
    const propane = FUELS.find((f) => f.id === "프로판LPG1호");
    expect(propane).toBeDefined();
    // 프로판은 T1 값 자체가 없음 (xlsm 에 미기입) → measurement null
    expect(propane!.heat.t1_net).toBeNull();

    const bA = FUELS.find((f) => f.id === "B-A유");
    expect(bA).toBeDefined();
    expect(bA!.heat.t1_net).toBeNull();
  });
});

describe("verified: IPCC 2006 GL Vol.2 Ch.2 (T1 CH4·N2O EF, Energy Industries)", () => {
  const crude = FUELS.find((f) => f.id === "원유");
  const anthracite = FUELS.find((f) => f.id === "국내-무연탄");
  const naturalGas = FUELS.find((f) => f.id === "천연가스LNG");
  const wood = FUELS.find((f) => f.id === "목재목재폐기물");
  const charcoal = FUELS.find((f) => f.id === "목탄");

  it("원유 T1 CH4/N2O: Table 2.2 · Crude Oil · 3 / 0.6 kg/TJ", () => {
    const ch4 = crude!.ef.t1.CH4!;
    const n2o = crude!.ef.t1.N2O!;
    expect(ch4.value).toBeCloseTo(3, 10);
    expect(n2o.value).toBeCloseTo(0.6, 10);
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-2006-vol2-ch2");
    expect(ch4.primarySource.row).toContain("Table 2.2");
    expect(ch4.primarySource.row).toContain("Crude Oil");
    expect(ch4.primarySource.page).toBe("2.16–2.17");
    expect(n2o.primarySource.maturity).toBe("verified");
  });

  it("무연탄 T1 CH4=1 · N2O=1.5 (Table 2.2 Energy Industries 특유 — T2.3/2.4=10, T2.5=300 이 아님)", () => {
    const ch4 = anthracite!.ef.t1.CH4!;
    const n2o = anthracite!.ef.t1.N2O!;
    expect(ch4.value).toBe(1);
    expect(n2o.value).toBe(1.5);
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.row).toContain("Anthracite");
  });

  it("천연가스 T1 CH4=1 · N2O=0.1 (기체 그룹)", () => {
    const ch4 = naturalGas!.ef.t1.CH4!;
    const n2o = naturalGas!.ef.t1.N2O!;
    expect(ch4.value).toBe(1);
    expect(n2o.value).toBe(0.1);
    expect(ch4.primarySource.row).toContain("Natural Gas");
  });

  it("목재/목재폐기물 T1 CH4=30 · N2O=4 (바이오매스 그룹)", () => {
    const ch4 = wood!.ef.t1.CH4!;
    const n2o = wood!.ef.t1.N2O!;
    expect(ch4.value).toBe(30);
    expect(n2o.value).toBe(4);
    expect(ch4.primarySource.row).toContain("Wood");
  });

  it("목탄 CH4 는 우리 xlsm 값(30)이 IPCC Table 2.2(200)과 불일치 → asserted 유지", () => {
    // 원본 xlsm 저자가 잘못 넣었거나 다른 자료 참조. 승격 취소되어 카탈로그 기본값(asserted 아닌 verified) 사용.
    // 우리 sources.ts 는 문서 자체를 verified 로 승격했지만 이 값 매핑은 mismatch 로 취소됨.
    // 결과: primarySource === IPCC_2006_VOL2_CH2 원본 카탈로그 상수 (row 없음)
    const ch4 = charcoal!.ef.t1.CH4!;
    expect(ch4.value).toBe(30);
    // spread override 가 적용 안 됐으므로 row 필드가 없음 (문서 자체 정보만)
    expect(ch4.primarySource.row).toBeUndefined();
    // 문서 자체는 여전히 verified maturity (sources.ts 상수)
    expect(ch4.primarySource.maturity).toBe("verified");
    // N2O 는 매칭 성공 → row 있음
    const n2o = charcoal!.ef.t1.N2O!;
    expect(n2o.value).toBe(4);
    expect(n2o.primarySource.row).toContain("Charcoal");
  });

  it("IPCC Vol.2 Ch.2 문서 자체 정보가 승격됨", () => {
    const m = crude!.ef.t1.CH4!;
    const ps = m.primarySource;
    expect(ps.docId).toBe("ipcc-2006-vol2-ch2");
    expect(ps.publisher).toContain("IPCC");
    expect(ps.url).toContain("V2_2_Ch2_Stationary_Combustion.pdf");
    expect(ps.part).toContain("Chapter 2");
    expect(ps.table).toContain("Table 2.2");
    expect(ps.table).toContain("Table 2.5");
  });
});

describe("verified: IPCC 2006 GL Vol.2 Ch.2 Table 2.5 (T2 CH4·N2O, Residential+Agriculture)", () => {
  const crude = FUELS.find((f) => f.id === "원유");
  const anthracite = FUELS.find((f) => f.id === "국내-무연탄");
  const peat = FUELS.find((f) => f.id === "이탄-토탄");
  const lng = FUELS.find((f) => f.id === "천연가스LNG");
  const charcoal = FUELS.find((f) => f.id === "목탄");
  const wood = FUELS.find((f) => f.id === "목재목재폐기물");

  it("원유 T2 CH4/N2O: Table 2.5 · Crude Oil · 10 / 0.6 kg/TJ (액체 그룹)", () => {
    const ch4 = crude!.ef.t2.CH4!;
    const n2o = crude!.ef.t2.N2O!;
    expect(ch4.value).toBe(10);
    expect(n2o.value).toBe(0.6);
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-2006-vol2-ch2");
    expect(ch4.primarySource.row).toContain("Table 2.5");
    expect(ch4.primarySource.row).toContain("Crude Oil");
    expect(ch4.primarySource.page).toBe("2.22–2.23");
    expect(ch4.primarySource.note).toContain("Residential");
    expect(ch4.primarySource.note).toContain("Tier 1");
    expect(n2o.primarySource.maturity).toBe("verified");
  });

  it("천연가스 T2 CH4=5 · N2O=0.1 (기체 그룹)", () => {
    const ch4 = lng!.ef.t2.CH4!;
    const n2o = lng!.ef.t2.N2O!;
    expect(ch4.value).toBe(5);
    expect(n2o.value).toBe(0.1);
    expect(ch4.primarySource.row).toContain("Natural Gas");
    expect(ch4.primarySource.maturity).toBe("verified");
  });

  it("이탄(Peat) T2 CH4=300 · N2O=1.4 (Peat 만 N2O=1.4, 다른 석탄은 1.5)", () => {
    const ch4 = peat!.ef.t2.CH4!;
    const n2o = peat!.ef.t2.N2O!;
    expect(ch4.value).toBe(300);
    expect(n2o.value).toBe(1.4);
    expect(n2o.primarySource.maturity).toBe("verified");
    expect(n2o.primarySource.row).toContain("Peat");
  });

  it("무연탄 T2 CH4 는 verified (300) · N2O 는 xlsm 1.4 vs Table 2.5 1.5 불일치 → GIR 유지", () => {
    // CH4 = 300 은 Table 2.5 값과 일치 → verified 승격
    const ch4 = anthracite!.ef.t2.CH4!;
    expect(ch4.value).toBe(300);
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-2006-vol2-ch2");
    expect(ch4.primarySource.row).toContain("Anthracite");

    // N2O = 1.4 는 Table 2.5 값 (1.5) 과 불일치 → GIR 유지 (원본 xlsm 이 Peat 값을 오적용한 것으로 판정)
    const n2o = anthracite!.ef.t2.N2O!;
    expect(n2o.value).toBe(1.4);
    expect(n2o.primarySource.docId).toBe("gir-ef-2017");
    expect(n2o.primarySource.row).toBeUndefined();
  });

  it("목탄 T2 CH4/N2O = 200/1.0 · Charcoal 매핑 verified (T1 CH4=30 은 불일치라 asserted 였음)", () => {
    const ch4 = charcoal!.ef.t2.CH4!;
    const n2o = charcoal!.ef.t2.N2O!;
    expect(ch4.value).toBe(200);
    expect(n2o.value).toBe(1.0);
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.row).toContain("Charcoal");
    expect(n2o.primarySource.row).toContain("Charcoal");
  });

  it("목재/목재폐기물 T2 CH4=300 · N2O=4 (바이오매스 그룹 · Wood/Wood Waste)", () => {
    const ch4 = wood!.ef.t2.CH4!;
    const n2o = wood!.ef.t2.N2O!;
    expect(ch4.value).toBe(300);
    expect(n2o.value).toBe(4);
    expect(ch4.primarySource.row).toContain("Wood");
    expect(ch4.primarySource.maturity).toBe("verified");
  });

  it("고로가스 T2 CH4/N2O 는 xlsm 300/4 vs Table 2.5 5/0.1 → GIR_EF_2017 유지 (원본 xlsm 그룹 오분류)", () => {
    const bfg = FUELS.find((f) => f.id === "고로가스");
    expect(bfg).toBeDefined();
    const ch4 = bfg!.ef.t2.CH4!;
    const n2o = bfg!.ef.t2.N2O!;
    expect(ch4.value).toBe(300);
    expect(n2o.value).toBe(4);
    expect(ch4.primarySource.docId).toBe("gir-ef-2017");
    expect(n2o.primarySource.docId).toBe("gir-ef-2017");
    // GIR_EF_2017 문서 자체는 verified (2017년 승인 국가고유 배출계수) 이지만
    // T2 CH4/N2O 는 verified 매핑 대상이 아니므로 row 없이 문서만 상속.
  });

  it("매립지·슬러지·기타 바이오가스 T2 는 xlsm 300/4 vs Table 2.5 5/0.1 → GIR 유지", () => {
    for (const id of ["매립지-가스", "슬러지-가스", "기타-바이오가스"]) {
      const f = FUELS.find((x) => x.id === id);
      expect(f, id).toBeDefined();
      expect(f!.ef.t2.CH4!.primarySource.docId).toBe("gir-ef-2017");
      expect(f!.ef.t2.N2O!.primarySource.docId).toBe("gir-ef-2017");
    }
  });

  it("아황산염 잿물 T2 는 xlsm 300/4 vs Table 2.5 3/2 → GIR 유지 (특수 연료 그룹)", () => {
    const sl = FUELS.find((f) => f.id === "아황산염-잿물");
    expect(sl).toBeDefined();
    expect(sl!.ef.t2.CH4!.primarySource.docId).toBe("gir-ef-2017");
    expect(sl!.ef.t2.N2O!.primarySource.docId).toBe("gir-ef-2017");
  });
});

describe("verified: K-ETS 별표 12 (T2 순발열량 27개)", () => {
  const crude = FUELS.find((f) => f.id === "원유");
  const gasoline = FUELS.find((f) => f.id === "휘발유-자동차용-가솔린");
  const bC = FUELS.find((f) => f.id === "B-C유-잔여-석유연료");
  const anthracite = FUELS.find((f) => f.id === "국내-무연탄");
  const lng = FUELS.find((f) => f.id === "천연가스LNG");
  const cityLng = FUELS.find((f) => f.id === "도시가스LNG");
  const propane = FUELS.find((f) => f.id === "프로판LPG1호");
  const coke = FUELS.find((f) => f.id === "코크스로-코크스-석탄");

  it("원유 T2 순발열량: 표 A · 원유 · 42.2 MJ/kg", () => {
    const h = crude!.heat.t2_net!;
    expect(h.value).toBeCloseTo(42.2, 10);
    expect(h.unit).toBe("MJ/kg");
    expect(h.primarySource.maturity).toBe("verified");
    expect(h.primarySource.docId).toBe("kets-annex-12");
    expect(h.primarySource.row).toBe("표 A · 원유 · 순발열량");
    expect(h.primarySource.page).toBe("1");
  });

  it("휘발유 T2 순발열량: 30.4 MJ/L", () => {
    expect(gasoline!.heat.t2_net!.value).toBeCloseTo(30.4, 10);
    expect(gasoline!.heat.t2_net!.primarySource.row).toContain("휘발유");
  });

  it("B-C유 T2 순발열량: 39.2 MJ/L", () => {
    expect(bC!.heat.t2_net!.value).toBeCloseTo(39.2, 10);
    expect(bC!.heat.t2_net!.primarySource.row).toContain("B-C유");
  });

  it("국내무연탄 T2 순발열량: 19.4 MJ/kg", () => {
    expect(anthracite!.heat.t2_net!.value).toBeCloseTo(19.4, 10);
    expect(anthracite!.heat.t2_net!.primarySource.row).toContain("국내무연탄");
  });

  it("천연가스(LNG) T2 순발열량: 49.4 (별표 12 원표 MJ/kg vs xlsm MJ/L 단위 표기 불일치 note 포함)", () => {
    const h = lng!.heat.t2_net!;
    expect(h.value).toBeCloseTo(49.4, 10);
    expect(h.primarySource.row).toContain("천연가스");
    expect(h.primarySource.note).toContain("단위 표기");
    expect(h.primarySource.note).toContain("MJ/kg");
  });

  it("도시가스(LNG) T2 순발열량: 38.9 MJ/Nm³", () => {
    expect(cityLng!.heat.t2_net!.value).toBeCloseTo(38.9, 10);
    expect(cityLng!.heat.t2_net!.primarySource.row).toContain("도시가스");
  });

  it("프로판(LPG1호) T2 순발열량: 46.3 MJ/kg", () => {
    expect(propane!.heat.t2_net!.value).toBeCloseTo(46.3, 10);
    expect(propane!.heat.t2_net!.primarySource.row).toContain("프로판");
  });

  it("코크스 T2 순발열량: 28.9 MJ/kg · 페이지 2", () => {
    expect(coke!.heat.t2_net!.value).toBeCloseTo(28.9, 10);
    expect(coke!.heat.t2_net!.primarySource.row).toContain("코크스");
    expect(coke!.heat.t2_net!.primarySource.page).toBe("2");
  });

  it("K-ETS 별표 12 문서 자체 정보가 승격됨 (별표 12 정식 명칭 · 고시번호 · URL · 표 목록)", () => {
    const ps = crude!.heat.t2_net!.primarySource;
    expect(ps.doc).toContain("별표 12");
    expect(ps.edition).toContain("2025");
    expect(ps.part).toContain("연료별 국가 고유 발열량 및 배출계수");
    expect(ps.part).toContain("제15조제2항");
    expect(ps.table).toContain("표 A");
    expect(ps.url).toContain("law.go.kr");
  });

  it("도시가스(LPG) T2 순발열량: 58.4 MJ/Nm³", () => {
    const cityLpg = FUELS.find((f) => f.id === "도시가스LPG");
    expect(cityLpg!.heat.t2_net!.value).toBeCloseTo(58.4, 10);
    expect(cityLpg!.heat.t2_net!.primarySource.row).toContain("도시가스(LPG)");
    expect(cityLpg!.heat.t2_net!.primarySource.maturity).toBe("verified");
  });
});

describe("verified: K-ETS 별표 12 표 B (T2 국가고유 배출계수 21개 연료 · tC + CO2)", () => {
  const gasoline = FUELS.find((f) => f.id === "휘발유-자동차용-가솔린");
  const bC = FUELS.find((f) => f.id === "B-C유-잔여-석유연료");
  const propane = FUELS.find((f) => f.id === "프로판LPG1호");
  const lng = FUELS.find((f) => f.id === "천연가스LNG");
  const cityLpg = FUELS.find((f) => f.id === "도시가스LPG");
  const anthracite = FUELS.find((f) => f.id === "국내-무연탄");
  const subBit = FUELS.find((f) => f.id === "아역청탄-하위-유연탄");

  it("휘발유 T2 tC: 표 B · 석유(16) · 휘발유 · 19.548 kgC/TJ", () => {
    const tc = gasoline!.ef.t2.tC_per_TJ!;
    expect(tc.value).toBeCloseTo(19.548, 10);
    expect(tc.primarySource.maturity).toBe("verified");
    expect(tc.primarySource.docId).toBe("kets-annex-12");
    expect(tc.primarySource.row).toContain("표 B");
    expect(tc.primarySource.row).toContain("휘발유");
    expect(tc.primarySource.row).toContain("탄소배출계수");
    expect(tc.primarySource.page).toBe("3");
  });

  it("휘발유 T2 CO2: 71,676 kgCO2/TJ (tC × 44/12 × 1000 유도값 · 표기 71,600)", () => {
    const co2 = gasoline!.ef.t2.CO2!;
    expect(co2.value).toBeCloseTo(19.548 * 44 / 12 * 1000, 4);
    expect(co2.primarySource.maturity).toBe("verified");
    expect(co2.primarySource.docId).toBe("kets-annex-12");
    expect(co2.primarySource.note).toContain("71,600");
    expect(co2.primarySource.note).toContain("44/12");
  });

  it("B-C유 T2 tC/CO2 verified", () => {
    expect(bC!.ef.t2.tC_per_TJ!.value).toBeCloseTo(21.929, 10);
    expect(bC!.ef.t2.tC_per_TJ!.primarySource.maturity).toBe("verified");
    expect(bC!.ef.t2.CO2!.primarySource.maturity).toBe("verified");
  });

  it("프로판(LPG1호) T2 tC: 17.641 · 석유(16) 그룹 (별표 12 표 B 는 프로판/부탄을 석유 구분에 편성)", () => {
    expect(propane!.ef.t2.tC_per_TJ!.value).toBeCloseTo(17.641, 10);
    expect(propane!.ef.t2.tC_per_TJ!.primarySource.row).toContain("석유(16)");
    expect(propane!.ef.t2.tC_per_TJ!.primarySource.row).toContain("프로판");
  });

  it("천연가스(LNG) T2 tC: 15.312 · 가스(3) 그룹 (도시가스LNG 와 병합값)", () => {
    expect(lng!.ef.t2.tC_per_TJ!.value).toBeCloseTo(15.312, 10);
    expect(lng!.ef.t2.tC_per_TJ!.primarySource.row).toContain("가스(3)");
    expect(lng!.ef.t2.tC_per_TJ!.primarySource.row).toContain("병합");
  });

  it("도시가스(LPG) T2 tC: 17.454 · 가스(3) 단독", () => {
    expect(cityLpg!.ef.t2.tC_per_TJ!.value).toBeCloseTo(17.454, 10);
    expect(cityLpg!.ef.t2.tC_per_TJ!.primarySource.row).toContain("도시가스(LPG)");
  });

  it("국내무연탄 T2 tC/CO2: 석탄(6) · 30.185 kgC/TJ", () => {
    expect(anthracite!.ef.t2.tC_per_TJ!.value).toBeCloseTo(30.185, 10);
    expect(anthracite!.ef.t2.tC_per_TJ!.primarySource.row).toContain("석탄(6)");
    expect(anthracite!.ef.t2.tC_per_TJ!.primarySource.note).toContain("인수식");
  });

  it("아역청탄 T2 페이지 4 (표 B 마지막 행)", () => {
    expect(subBit!.ef.t2.tC_per_TJ!.value).toBeCloseTo(26.468, 10);
    expect(subBit!.ef.t2.tC_per_TJ!.primarySource.page).toBe("4");
  });

  it("등유·항공유 T2 는 xlsm 뒤바꿈 오작성 → GIR_EF_2017 asserted 유지 (verified 승격 안 됨, warning note)", () => {
    const kerosene = FUELS.find((f) => f.id === "등유-기타-등유");
    const jet = FUELS.find((f) => f.id === "제트용-등유-항공유");

    // xlsm 값 (뒤바뀜)
    expect(kerosene!.ef.t2.tC_per_TJ!.value).toBeCloseTo(19.931, 10);
    expect(jet!.ef.t2.tC_per_TJ!.value).toBeCloseTo(19.969, 10);

    for (const f of [kerosene!, jet!]) {
      const ps = f.ef.t2.tC_per_TJ!.primarySource;
      expect(ps.docId).toBe("gir-ef-2017");
      // verified 승격 안 됨 (row/page 없음, note 만 오버라이드)
      expect(ps.row).toBeUndefined();
      expect(ps.note?.startsWith("⚠")).toBe(true);
    }
  });

  it("경유·도시가스(LNG) T2 는 GIR 2017년 승인 세분화값 verified 승격 (KEEI 표 17~ 열 대조)", () => {
    const diesel = FUELS.find((f) => f.id === "경유-가스디젤-오일");
    const cityLng = FUELS.find((f) => f.id === "도시가스LNG");

    expect(diesel!.ef.t2.tC_per_TJ!.value).toBeCloseTo(20.111, 10);
    expect(cityLng!.ef.t2.tC_per_TJ!.value).toBeCloseTo(15.272, 10);

    for (const f of [diesel!, cityLng!]) {
      const ps = f.ef.t2.tC_per_TJ!.primarySource;
      expect(ps.docId).toBe("gir-ef-2017");
      expect(ps.maturity).toBe("verified");
      expect(ps.row).toContain("국가고유 세분화값");
      expect(ps.page).toContain("KEEI 표 2");
      expect(ps.note).toContain("GIR 2017년 승인");
      expect(ps.note).toContain("병합");
    }
  });
});

describe("documented: GIR 국가고유 배출계수 · 2022.1 공표 (연료연소 부문 25개)", () => {
  // GIR_EF_2022 는 어떤 fuel 에도 직접 참조되지 않지만 (K-ETS 별표 12 값 우선),
  // sources.ts 카탈로그 상수로 등록되어 있어 감사자가 최신 국가 공표값을 참조할 수 있다.
  it("SOURCES 카탈로그에 GIR_EF_2022 등록되고 verified 문서 자체 승격", async () => {
    const { SOURCES } = await import("@/data/sources");
    const gir22 = SOURCES.GIR_EF_2022;
    expect(gir22).toBeDefined();
    expect(gir22.docId).toBe("gir-ef-2022");
    expect(gir22.maturity).toBe("verified");
    expect(gir22.edition).toContain("2022");
    expect(gir22.part).toContain("25개");
    expect(gir22.table).toContain("연료연소 부문");
    expect(gir22.url).toContain("gir.go.kr");
    expect(gir22.reviewedAt).toBe("2026-09-02");
    // note 에 대표 값 25개가 hardcoded 로 명시되어야 감사자가 원문 대조 가능
    expect(gir22.note).toContain("19.731");   // 휘발유
    expect(gir22.note).toContain("19.926");   // 등유
    expect(gir22.note).toContain("20.090");   // 경유
    expect(gir22.note).toContain("19.956");   // 항공유(JET-A1)
    expect(gir22.note).toContain("15.236");   // 도시가스(LNG)
    expect(gir22.note).toContain("29.705");   // 국내무연탄
  });
});

describe("warning: xlsm T2 EF 2개 값 원본 오작성 (등유·항공유 뒤바꿈)", () => {
  const kerosene = FUELS.find((f) => f.id === "등유-기타-등유");
  const jet = FUELS.find((f) => f.id === "제트용-등유-항공유");

  it("등유·항공유: xlsm 이 별표 12 값을 뒤바꿔 넣은 오작성 (⚠ 프리픽스 + 상세 정정 지침)", () => {
    const kNote = kerosene!.ef.t2.tC_per_TJ!.primarySource.note;
    const jNote = jet!.ef.t2.tC_per_TJ!.primarySource.note;

    expect(kNote).toBeDefined();
    expect(kNote!.startsWith("⚠")).toBe(true);
    expect(kNote).toContain("xlsm 원본 오작성");
    expect(kNote).toContain("항공유값(19.931)을 잘못 넣음");
    expect(kNote).toContain("정확한 별표 12 등유 = 19.969");
    expect(kNote).toContain("GIR 2022.1 등유 = 19.926");

    expect(jNote).toBeDefined();
    expect(jNote!.startsWith("⚠")).toBe(true);
    expect(jNote).toContain("xlsm 원본 오작성");
    expect(jNote).toContain("등유값(19.969)을 잘못 넣음");
    expect(jNote).toContain("정확한 별표 12 항공유 = 19.931");
    expect(jNote).toContain("GIR 2022.1 항공유(JET-A1) = 19.956");
  });

  it("2개 값 모두 asserted 유지 (verified 승격 안 됨) · reviewedAt 명시", () => {
    for (const [label, f] of [
      ["등유", kerosene!],
      ["항공유", jet!],
    ] as const) {
      const ps = f.ef.t2.tC_per_TJ!.primarySource;
      expect(ps.docId, label).toBe("gir-ef-2017");
      expect(ps.maturity, label).toBe("asserted");
      expect(ps.reviewedAt, label).toBe("2026-09-02");
      expect(ps.row, label).toBeUndefined();
    }
  });

  it("CO2 계수도 tC 뒤바꿈에 따른 파생 오류 note 포함 (2개 fuel)", () => {
    for (const [label, f, expected] of [
      ["등유", kerosene!, "별표 12 등유 = 73,153"],
      ["항공유", jet!, "별표 12 항공유 = 72,974"],
    ] as const) {
      const note = f.ef.t2.CO2!.primarySource.note;
      expect(note, label).toBeDefined();
      expect(note!.startsWith("⚠"), label).toBe(true);
      expect(note, label).toContain(expected);
    }
  });
});

describe("verified: GIR 2017년 승인 국가고유 배출계수 (2018.1 공표 추정 · 경유·도시가스LNG 세분화값)", () => {
  it("문서 자체가 verified 로 승격됨 (KEEI 학술지 대조 근거)", async () => {
    const { SOURCES } = await import("@/data/sources");
    const gir17 = SOURCES.GIR_EF_2017;
    expect(gir17.maturity).toBe("verified");
    expect(gir17.doc).toContain("2017년 승인");
    expect(gir17.edition).toContain("2018년 공표");
    expect(gir17.part).toContain("연료연소 부문");
    expect(gir17.table).toContain("GIR 승인 국가고유 배출계수");
    expect(gir17.url).toContain("gir.go.kr");
  });

  it("KEEI 표 17~ 열 대표값이 note 에 하드코딩됨 (감사용 대조 자료)", async () => {
    const { SOURCES } = await import("@/data/sources");
    const gir17 = SOURCES.GIR_EF_2017;
    expect(gir17.note).toBeDefined();
    expect(gir17.note).toContain("경유 20.111");
    expect(gir17.note).toContain("도시가스 15.272");
    expect(gir17.note).toContain("등유 19.969");
    expect(gir17.note).toContain("항공유 19.931");
    expect(gir17.note).toContain("천연가스 15.312");
    expect(gir17.note).toContain("국내무연탄 30.185");
    expect(gir17.note).toContain("민선영·최용옥");
    expect(gir17.note).toContain("에너지경제연구 23(1)");
  });

  it("경유 T2 tC/CO2 verified 승격 · GIR 2017 세분화값 20.111", () => {
    const diesel = FUELS.find((f) => f.id === "경유-가스디젤-오일");
    const tC = diesel!.ef.t2.tC_per_TJ!;
    expect(tC.value).toBeCloseTo(20.111, 10);
    expect(tC.primarySource.maturity).toBe("verified");
    expect(tC.primarySource.docId).toBe("gir-ef-2017");
    expect(tC.primarySource.row).toContain("경유");
    expect(tC.primarySource.row).toContain("세분화값");
    expect(tC.primarySource.page).toContain("KEEI 표 2");
    expect(tC.primarySource.note).toContain("2017년 승인");
    expect(tC.primarySource.note).toContain("등유·경유를 병합값(19,969)");

    const co2 = diesel!.ef.t2.CO2!;
    expect(co2.value).toBeCloseTo(73740.333333, 4);
    expect(co2.primarySource.maturity).toBe("verified");
    expect(co2.primarySource.note).toContain("20.111 × 44/12 × 1000");
  });

  it("도시가스LNG T2 tC/CO2 verified 승격 · GIR 2017 세분화값 15.272", () => {
    const cityLng = FUELS.find((f) => f.id === "도시가스LNG");
    const tC = cityLng!.ef.t2.tC_per_TJ!;
    expect(tC.value).toBeCloseTo(15.272, 10);
    expect(tC.primarySource.maturity).toBe("verified");
    expect(tC.primarySource.docId).toBe("gir-ef-2017");
    expect(tC.primarySource.row).toContain("도시가스");
    expect(tC.primarySource.row).toContain("세분화값");
    expect(tC.primarySource.page).toContain("KEEI 표 2");
    expect(tC.primarySource.note).toContain("2017년 승인");
    expect(tC.primarySource.note).toContain("천연가스·도시가스LNG 를 병합값(15,312)");

    const co2 = cityLng!.ef.t2.CO2!;
    expect(co2.value).toBeCloseTo(55997.333333, 4);
    expect(co2.primarySource.maturity).toBe("verified");
    expect(co2.primarySource.note).toContain("15.272 × 44/12 × 1000");
  });
});

describe("verified: GWP 4개 판 (SAR · AR4 · AR5 · AR6)", () => {
  it("SAR (K-ETS 채택 · CH4=21 · N2O=310)", () => {
    expect(GWP.SAR.CO2.value).toBe(1);
    expect(GWP.SAR.CH4.value).toBe(21);
    expect(GWP.SAR.N2O.value).toBe(310);

    for (const g of [GWP.SAR.CO2, GWP.SAR.CH4, GWP.SAR.N2O]) {
      expect(g.primarySource.maturity).toBe("verified");
      expect(g.primarySource.docId).toBe("ipcc-sar-1995");
      expect(g.primarySource.row).toBeDefined();
    }

    const sar = GWP.SAR.CH4;
    expect(sar.primarySource.publisher).toContain("IPCC");
    expect(sar.primarySource.edition).toContain("1995");
    expect(sar.primarySource.url).toContain("ipcc_sar_wg_I_full_report.pdf");
    expect(sar.primarySource.note).toContain("K-ETS");
    expect(GWP.SAR.label).toContain("K-ETS");
  });

  it("AR4 (CH4=25 · N2O=298 · Table 2.14)", () => {
    expect(GWP.AR4.CO2.value).toBe(1);
    expect(GWP.AR4.CH4.value).toBe(25);
    expect(GWP.AR4.N2O.value).toBe(298);

    const ch4 = GWP.AR4.CH4;
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-ar4-2007");
    expect(ch4.primarySource.row).toContain("Table 2.14");
    expect(ch4.primarySource.url).toContain("ar4-wg1-chapter2");
  });

  it("AR5 (CH4=28 · N2O=265 · Ch.8 Table 8.7 · without climate-carbon feedback)", () => {
    expect(GWP.AR5.CO2.value).toBe(1);
    expect(GWP.AR5.CH4.value).toBe(28);
    expect(GWP.AR5.N2O.value).toBe(265);

    const ch4 = GWP.AR5.CH4;
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-ar5-2014");
    expect(ch4.primarySource.row).toContain("Table 8.7");
    expect(ch4.primarySource.note).toContain("without climate-carbon feedback");
    expect(ch4.primarySource.url).toContain("WG1AR5_Chapter08");
    expect(GWP.AR5.label).toContain("NIR");
  });

  it("AR6 (CH4=27.9 · N2O=273 · methane fossil/non-fossil 구분 주의)", () => {
    expect(GWP.AR6.CO2.value).toBe(1);
    expect(GWP.AR6.CH4.value).toBeCloseTo(27.9, 10);
    expect(GWP.AR6.N2O.value).toBe(273);

    const ch4 = GWP.AR6.CH4;
    expect(ch4.primarySource.maturity).toBe("verified");
    expect(ch4.primarySource.docId).toBe("ipcc-ar6-2021");
    expect(ch4.primarySource.row).toContain("Table 7.SM.7");
    expect(ch4.primarySource.note).toContain("fossil methane 29.8");
    expect(ch4.primarySource.note).toContain("27.0");
    expect(ch4.primarySource.url).toContain("AR6_WGI_Chapter07");

    const n2o = GWP.AR6.N2O;
    expect(n2o.primarySource.row).toContain("Table 7.15");
  });
});
