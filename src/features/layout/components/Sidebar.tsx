"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Package, PlusCircle, Utensils } from "lucide-react";

const navItems = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/inventory", label: "食品一覧", icon: Package },
  { href: "/inventory/new", label: "食品登録", icon: PlusCircle },
  { href: "/recipes", label: "レシピ", icon: BookOpen },
] as const;

/**
 * アプリ全体の共通サイドバー
 *
 * @returns サイドバーコンポーネント（ロゴ・ナビ・ユーザー情報）
 */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-60 flex-col bg-sidebar border-r border-sidebar-border">
      {/* ロゴ */}
      <div className="flex items-center gap-2 px-6 py-5">
        <Utensils size={18} className="text-primary" />
        <span className="font-bold text-primary text-base">MealFlow</span>
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 px-3">
        <p className="px-3 mb-1 text-xs text-sidebar-foreground">メニュー</p>
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            // "/" は完全一致、それ以外は前方一致でアクティブ判定
            const isActive =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ユーザー情報（MVP: プレースホルダー表示） */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-medium text-sidebar-accent-foreground">
            U
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-sidebar-accent-foreground truncate">ユーザー</p>
            <p className="text-xs text-sidebar-foreground truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
