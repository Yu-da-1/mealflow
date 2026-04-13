import Link from "next/link";
import { Plus } from "lucide-react";

/**
 * ホーム画面のヒーローエリア
 *
 * プライマリカラーの背景に挨拶テキスト・タイトル・食品追加ボタンを表示する。
 *
 * @returns ヒーローエリアコンポーネント
 */
export function HomeHero() {
  return (
    <div className="flex items-end justify-between bg-primary px-5 pb-4 pt-5">
      {/* 挨拶 + タイトル */}
      <div className="flex flex-col gap-1">
        <span className="text-[13px] text-white/70">こんにちは 👋</span>
        <span className="text-[22px] font-bold text-white">今日の献立</span>
      </div>

      {/* 食品追加ボタン */}
      <Link
        href="/inventory/new"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20"
        aria-label="食品を追加"
      >
        <Plus size={22} className="text-white" />
      </Link>
    </div>
  );
}
