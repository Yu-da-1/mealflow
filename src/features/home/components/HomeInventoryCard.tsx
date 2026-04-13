import { Refrigerator } from "lucide-react";

type HomeInventoryCardProps = {
  count: number;
};

/**
 * ホーム画面の在庫サマリカード
 *
 * 登録済み食品の種類数をカード形式で表示する。
 *
 * @param count - 登録済み食品の種類数
 * @returns 在庫サマリカードコンポーネント
 */
export function HomeInventoryCard({ count }: HomeInventoryCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-card px-[18px] py-4">
      {/* テキスト */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">現在の在庫</span>
        <span className="text-lg font-bold text-foreground">{count} 種類の食品</span>
      </div>

      {/* アイコン */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <Refrigerator size={24} className="text-primary" />
      </div>
    </div>
  );
}
