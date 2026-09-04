import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// ─────────────────────────────────────────────────────────────
// 폰트 시스템 · IBM Plex 삼종 통일 (workspace DESIGN.md · 세리프 안티)
//   - Sans      (latin)
//   - Sans KR   (한국어 UI · grotesque)
//   - Mono      (숫자 · 코드 · mono 대괄호 뱃지)
// ─────────────────────────────────────────────────────────────

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexSansKR = IBM_Plex_Sans_KR({
  variable: "--font-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "carbontrace — 감사 가능한 온실가스 배출량 계산기",
  description:
    "IPCC 2006 GL 과 K-ETS 지침을 그대로 따르는 온실가스 배출량 산정 도구. 모든 수치에는 근거가 필요합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${plexSans.variable} ${plexSansKR.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
