import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "주식내비 키우Me — AI 주식 길잡이",
  description:
    "AI 주식 상담 서비스. 초보 투자자를 위한 친절한 주식 정보 안내. 피넛츠 만화 스타일로 즐겁게 배우자!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface antialiased" style={{ fontFamily: '"Comic Neue", cursive, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
