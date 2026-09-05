import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages 정적 호스트 · compute01 / Vercel 안 탐.
  // API route · 서버 전용 기능 없음 · 동적 페이지는 전부 generateStaticParams.
  output: "export",
};

export default nextConfig;
