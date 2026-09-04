/**
 * audit/summary 테스트.
 * Calculated 트리 순회가 정확히 primary source 를 세는지 검증.
 */

import { describe, expect, it } from "vitest";
import { calculateScope1 } from "@/lib/calc/scope1";
import { calculateScope2 } from "@/lib/calc/scope2";
import { summarizeAll } from "@/lib/audit/summary";

describe("summarizeAll · Scope 1 아역청탄 1 ton (xlsm-original)", () => {
  const r = calculateScope1({
    fuelId: "아역청탄-하위-유연탄",
    amount: 1,
    heatTier: "T1",
    efTier: "T2",
    gwpStandard: "SAR",
  });

  if ("error" in r) throw new Error(r.error);
  const summary = summarizeAll([r.totalCo2eq]);

  it("계수가 최소 여러 건 사용됨 (열량계수 + EF 3종 + 산화계수 + GWP 3종)", () => {
    expect(summary.totalMeasurements).toBeGreaterThan(5);
  });

  it("여러 원문서 참조됨", () => {
    expect(summary.usedDocIds.length).toBeGreaterThan(1);
  });

  it("사용자 입력 (사용량) 최소 3건 (CO2/CH4/N2O 각각 amount 재사용)", () => {
    expect(summary.userInputs).toBeGreaterThanOrEqual(3);
  });

  it("상수 (단위환산 등) 사용됨", () => {
    expect(summary.constants).toBeGreaterThan(0);
  });

  it("성숙도 합 = 총 계수", () => {
    const m = summary.maturityCounts;
    expect(m.verified + m.documented + m.asserted + m.pending).toBe(summary.totalMeasurements);
  });
});

describe("summarizeAll · Scope 1 등유 xlsm-original vs xlsm-corrected", () => {
  const rOrig = calculateScope1({
    fuelId: "등유-기타-등유",
    amount: 1,
    heatTier: "T1",
    efTier: "T2",
    gwpStandard: "SAR",
    dataProfile: "xlsm-original",
  });
  const rCorr = calculateScope1({
    fuelId: "등유-기타-등유",
    amount: 1,
    heatTier: "T1",
    efTier: "T2",
    gwpStandard: "SAR",
    dataProfile: "xlsm-corrected",
  });

  if ("error" in rOrig || "error" in rCorr) throw new Error("unexpected error");

  it("xlsm-original: 등유 CO2 EF 에 warning 1건 (⚠ 원본 뒤바꿈)", () => {
    const s = summarizeAll([rOrig.totalCo2eq]);
    expect(s.warnings.length).toBeGreaterThanOrEqual(1);
    // note 에 뒤바꿈 or 오작성 관련 언급
    const hasSwap = s.warnings.some(
      (w) => w.note.includes("뒤바꿈") || w.note.includes("뒤바꿔") || w.note.includes("오작성"),
    );
    expect(hasSwap).toBe(true);
  });

  it("xlsm-corrected: 등유는 warning 없음 (정정판 사용)", () => {
    const s = summarizeAll([rCorr.totalCo2eq]);
    const hasSwap = s.warnings.some(
      (w) => w.note.includes("뒤바꿈") || w.note.includes("뒤바꿔"),
    );
    expect(hasSwap).toBe(false);
  });
});

describe("summarizeAll · Scope 2 열/스팀 국가통합 (asserted + warning)", () => {
  const r = calculateScope2({
    kind: "heat-national",
    amount: 1,
    heatKind: "열병합",
    gwpStandard: "SAR",
  });

  if ("error" in r) throw new Error(r.error);
  const summary = summarizeAll([r.totalCo2eq]);

  it("asserted 최소 1건 (KETS_HEAT_EF 사용)", () => {
    expect(summary.maturityCounts.asserted).toBeGreaterThanOrEqual(1);
  });

  it("warning 최소 1건 (⚠ 원출처 미상)", () => {
    expect(summary.warnings.length).toBeGreaterThanOrEqual(1);
    const isMissing = summary.warnings.some((w) => w.note.includes("원출처 미상"));
    expect(isMissing).toBe(true);
  });
});

describe("summarizeAll · Scope 2 KDHC 지사별 (documented, warning 없음)", () => {
  const r = calculateScope2({
    kind: "heat-kdhc",
    amount: 1,
    phase: "4기",
    district: "수도권지사",
    gwpStandard: "SAR",
  });

  if ("error" in r) throw new Error(r.error);
  const summary = summarizeAll([r.totalCo2eq]);

  it("KDHC 소스는 documented 성숙도", () => {
    expect(summary.maturityCounts.documented).toBeGreaterThanOrEqual(1);
  });

  it("warning 없음", () => {
    // KDHC EF 는 note 에 ⚠ 없음
    const hasKdhcWarning = summary.warnings.some((w) => w.docLabel.includes("한국지역난방공사"));
    expect(hasKdhcWarning).toBe(false);
  });
});

describe("summarizeAll · null 처리", () => {
  it("빈 배열이면 zero summary", () => {
    const s = summarizeAll([]);
    expect(s.totalMeasurements).toBe(0);
    expect(s.warnings.length).toBe(0);
    expect(s.usedDocIds.length).toBe(0);
  });

  it("null 원소 무시", () => {
    const s = summarizeAll([null, undefined]);
    expect(s.totalMeasurements).toBe(0);
  });
});
