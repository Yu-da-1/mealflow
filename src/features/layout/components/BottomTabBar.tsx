"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, House, Package, ScanBarcode } from "lucide-react";

const tabItems = [
  { href: "/", label: "ホーム", icon: House },
  { href: "/inventory", label: "食品", icon: Package },
  { href: "/inventory/new", label: "スキャン", icon: ScanBarcode },
  { href: "/recipes", label: "レシピ", icon: BookOpen },
] as const;

/**
 * モバイル向け底部タブバー
 *
 * ピル型コンテナの中にタブを並べ、アクティブタブを primary 色で塗り潰す。
 *
 * @returns 底部タブバーコンポーネント（sm未満でのみ表示）
 */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[95px] items-center bg-card px-[21px] pb-[21px] pt-3 sm:hidden">
      {/* ピル型コンテナ */}
      <div className="flex h-[62px] w-full rounded-[36px] border border-border bg-card p-1">
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
              className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-[26px] transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
