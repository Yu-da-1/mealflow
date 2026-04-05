// DBを参照するためビルド時の静的プリレンダリングを無効化する
export const dynamic = "force-dynamic";

import Link from "next/link";
import { PlusCircle } from "lucide-react";

import { buildInventorySummary } from "@/domain/inventory/buildInventorySummary";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import { InventoryList } from "@/features/inventory/components/InventoryList";

import type { InventorySummaryItem } from "@/lib/types/ui";

/**
 * 日付文字列を優先度に変換する
 *
 * 0: 期限当日
 * 1: 期限翌日
 * 2: それ以外の期限あり
 * 3: 期限なし
 */
const expiryPriority = (date: string | null, today: string, tomorrow: string): number => {
  if (!date) return 3;
  if (date === today) return 0;
  if (date === tomorrow) return 1;
  return 2;
};

/**
 * 期限順に食品サマリをソートする
 *
 * @param items - 食品サマリ一覧
 * @param today - 基準日（YYYY-MM-DD）
 * @returns ソート済み一覧（当日→翌日→期限近い順→期限なし）
 */
const sortByExpiry = (items: InventorySummaryItem[], today: string): InventorySummaryItem[] => {
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  return [...items].sort((a, b) => {
    const pa = expiryPriority(a.nearest_expiry_date, today, tomorrowStr);
    const pb = expiryPriority(b.nearest_expiry_date, today, tomorrowStr);

    if (pa !== pb) return pa - pb;

    // 同一優先度内では期限日の昇順（期限なし同士は同順）
    if (!a.nearest_expiry_date || !b.nearest_expiry_date) return 0;
    return a.nearest_expiry_date.localeCompare(b.nearest_expiry_date);
  });
};

export default async function InventoryPage() {
  const lots = await getActiveInventoryLots();
  const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
  const foodMasters = await getFoodMastersByIds(foodMasterIds);
  const summary = buildInventorySummary(lots, foodMasters);

  const today = new Date().toISOString().slice(0, 10);
  const sorted = sortByExpiry(summary, today);

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-foreground">食品一覧</h1>
        <Link
          href="/inventory/new"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          <PlusCircle size={15} />
          食品を追加
        </Link>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        {sorted.length > 0 ? `${sorted.length} 種類` : ""}
      </p>

      <InventoryList items={sorted} />
    </div>
  );
}
