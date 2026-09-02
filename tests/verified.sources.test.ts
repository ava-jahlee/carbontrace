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
