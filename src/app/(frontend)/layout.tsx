import type { Metadata } from "next";
import "./globals.css";

import { Sidebar } from "@/features/layout/components/Sidebar";

export const metadata: Metadata = {
  title: "MealFlow",
  description: "冷蔵庫管理・献立提案アプリ",
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">{children}</main>
      </body>
    </html>
  );
}
