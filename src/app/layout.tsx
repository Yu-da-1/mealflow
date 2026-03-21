import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MealFlow",
  description: "冷蔵庫管理・献立提案アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
