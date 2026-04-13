import type { Metadata } from "next";
import "./globals.css";

import { BottomTabBar } from "@/features/layout/components/BottomTabBar";
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
        <main className="flex-1 overflow-y-auto pb-[95px] sm:pb-0 bg-background">{children}</main>
        <BottomTabBar />
      </body>
    </html>
  );
}
