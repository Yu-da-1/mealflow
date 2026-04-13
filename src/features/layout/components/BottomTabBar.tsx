"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Package, ScanLine } from "lucide-react";

const tabItems = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/inventory", label: "食品", icon: Package },
  { href: "/inventory/new", label: "スキャン", icon: ScanLine },
  { href: "/recipes", label: "レシピ", icon: BookOpen },
] as const;

/**
 * モバイル向け底部タブバー
 *
 * @returns 底部タブバーコンポーネント（sm未満でのみ表示）
 */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-stretch border-t border-border bg-background sm:hidden">
      {tabItems.map(({ href, label, icon: Icon }) => {
        // "/" は完全一致、それ以外は前方一致でアクティブ判定
        const isActive =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors ${
              isActive
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
