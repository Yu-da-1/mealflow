import Link from "next/link";

import type { InventorySummaryItem } from "@/lib/types/ui";

type HomeExpirationSectionProps = {
  items: InventorySummaryItem[];
  today: string;
  hasMore: boolean;
};

/**
 * ホーム画面の「期限が近い食品」セクション
 *
 * @param items - 期限が当日・翌日の食品リスト（最大5件）
 * @param today - 基準日（YYYY-MM-DD）
 * @param hasMore - 5件を超える場合に「もっと見る」を表示するフラグ
 * @returns 期限が近い食品一覧セクション
 */
export function HomeExpirationSection({ items, today, hasMore }: HomeExpirationSectionProps) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground mb-3">期限が近い食品</h2>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">期限が近い食品はありません</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => {
            const isToday = item.nearest_expiry_date === today;
            return (
              <li
                key={item.food_master_id}
                className="flex items-center justify-between rounded-lg bg-card px-4 py-3 border border-border"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      isToday ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isToday ? "今日" : "明日"}
                  </span>
                  <span className="text-sm font-medium text-foreground">{item.display_name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.total_quantity}個</span>
              </li>
            );
          })}
        </ul>
      )}

      {hasMore && (
        <div className="mt-3">
          <Link href="/inventory" className="text-sm text-primary hover:underline">
            もっと見る →
          </Link>
        </div>
      )}
    </section>
  );
}
