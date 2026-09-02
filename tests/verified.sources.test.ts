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
