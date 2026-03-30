"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import type { InventorySummaryItem } from "@/lib/types/ui";

import { InventoryDetailModal } from "./InventoryDetailModal";

type InventoryListProps = {
  items: InventorySummaryItem[];
};

const formatExpiry = (date: string | null, type: "best_before" | "use_by" | null): string => {
  if (!date) return "期限なし";
  const label = type === "use_by" ? "消費" : "賞味";
  return `${label}: ${date}`;
};

/**
 * 食品一覧コンポーネント
 *
 * @param items - 食品サマリ一覧（ソート済み）
 * @returns 食品カード一覧とモーダル
 */
export function InventoryList({ items }: InventoryListProps) {
  const [selectedItem, setSelectedItem] = useState<InventorySummaryItem | null>(null);

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">まだ食品が登録されていません</p>;
  }

  return (
    <>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.food_master_id}>
            <button
              onClick={() => setSelectedItem(item)}
              className="flex w-full items-center justify-between rounded-lg bg-card border border-border px-4 py-3 text-left hover:border-primary/50 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.display_name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.total_quantity}個　
                  {formatExpiry(item.nearest_expiry_date, item.nearest_expiry_type)}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-xs text-muted-foreground">詳細を見る</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <InventoryDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
