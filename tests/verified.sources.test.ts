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
