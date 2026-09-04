/**
 * Docs 카탈로그 · /docs 랜딩과 각 페이지 메타.
 *
 * 소스 · docs/*.md 5개.
 * 3 그룹으로 분류 · 감사·검증 · 데이터 · 개발·릴리스.
 */

export type DocGroup = "audit" | "data" | "dev";

export interface DocEntry {
  /** URL slug · /docs/{slug} */
  slug: string;
  /** 원본 markdown 파일 이름 (docs/ 하위) */
  file: string;
  /** 화면에 표시할 제목 */
  title: string;
  /** 부제·설명 */
  subtitle: string;
  /** 상위 그룹 */
  group: DocGroup;
}

export const DOC_GROUPS: Record<DocGroup, { title: string; kicker: string; hint: string }> = {
  audit: {
    title: "감사 · 검증",
    kicker: "audit / verify",
    hint: "제3자 검증기관·심사원이 특정 값을 원문서까지 역추적하는 방법",
  },
  data: {
    title: "데이터",
    kicker: "data / methodology",
    hint: "어떤 값을 쓰는가 · 원문서 근거는 무엇인가",
  },
  dev: {
    title: "개발 · 릴리스",
    kicker: "dev / release",
    hint: "도구를 확장·정정하려면 · 버전별 변경 이력",
  },
};

export const DOCS: DocEntry[] = [
  {
    slug: "audit-guide",
    file: "AUDIT-GUIDE.md",
    title: "감사자용 walkthrough",
    subtitle: "제3자 검증기관·심사원이 특정 값을 원문서까지 역추적하는 표준 5단계",
    group: "audit",
  },
  {
    slug: "primary-source-note",
    file: "PRIMARY-SOURCE-NOTE-STANDARD.md",
    title: "Primary source note 표준",
    subtitle: "PrimarySource.note 필드 작성 규칙 · muted · 사실 · 마침표",
    group: "audit",
  },
  {
    slug: "data-profiles",
    file: "DATA-PROFILES.md",
    title: "데이터 프로파일 상세",
    subtitle: "3 프로파일 (원본·정정·최신) · 각 정정 fuel 별 표 · 원문서 근거",
    group: "data",
  },
  {
    slug: "development",
    file: "DEVELOPMENT.md",
    title: "개발자 가이드",
    subtitle: "신규 배출원·데이터 프로파일·계수 추가 5단계",
    group: "dev",
  },
  {
    slug: "changelog",
    file: "CHANGELOG.md",
    title: "Changelog",
    subtitle: "버전별 릴리스 노트 · v0.1 → v0.9",
    group: "dev",
  },
];

/** slug 로 찾기 */
export function findDoc(slug: string): DocEntry | undefined {
  return DOCS.find((d) => d.slug === slug);
}

/** 그룹별 목록 */
export function docsByGroup(group: DocGroup): DocEntry[] {
  return DOCS.filter((d) => d.group === group);
}
