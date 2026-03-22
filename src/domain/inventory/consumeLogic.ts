import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";

export type LotUpdate = {
  id: string;
  quantity: number;
  status: "active" | "consumed";
};

/**
 * ingredient_keys（recipe_match_key）に対応する在庫ロットの減算差分を計算する。
 * 各 key につき 1 単位を消費し、expiry_date 近い順 → purchased_at 古い順でロットを優先する。
 * quantity が 0 になったロットは status='consumed' にする。
 *
 * @param lots - アクティブな在庫ロット一覧
 * @param foodMasters - 在庫に対応する食品マスタ一覧
 * @param ingredientKeys - 消費対象の recipe_match_key リスト
 * @returns 更新が必要なロットの差分リスト
 */
export const computeConsumption = (
  lots: InventoryLotRow[],
  foodMasters: FoodMasterRow[],
  ingredientKeys: string[],
): LotUpdate[] => {
  // ミュータブルなロット状態コピーを作成（純粋関数の中で状態を追跡するため）
  const lotQuantities = new Map<string, number>(lots.map((l) => [l.id, l.quantity]));

  const updates = new Map<string, LotUpdate>();

  for (const key of ingredientKeys) {
    // ingredient_key に一致するマスタを探す（recipe_match_key または parent_recipe_match_key）
    const matchedMasterIds = foodMasters
      .filter((fm) => fm.recipe_match_key === key || fm.parent_recipe_match_key === key)
      .map((fm) => fm.id);

    if (matchedMasterIds.length === 0) continue;

    // 対象ロットを expiry_date 近い順 → purchased_at 古い順でソート
    const candidateLots = lots
      .filter((l) => matchedMasterIds.includes(l.food_master_id))
      .sort((a, b) => {
        // expiry_date が null のロットは末尾
        if (a.expiry_date === null && b.expiry_date === null) return 0;
        if (a.expiry_date === null) return 1;
        if (b.expiry_date === null) return -1;
        const expiryDiff = a.expiry_date.localeCompare(b.expiry_date);
        if (expiryDiff !== 0) return expiryDiff;
        return a.purchased_at.localeCompare(b.purchased_at);
      });

    // 先頭ロットから 1 単位消費
    for (const lot of candidateLots) {
      const currentQty = lotQuantities.get(lot.id) ?? lot.quantity;
      if (currentQty <= 0) continue;

      const newQty = currentQty - 1;
      lotQuantities.set(lot.id, newQty);
      updates.set(lot.id, {
        id: lot.id,
        quantity: newQty,
        status: newQty === 0 ? "consumed" : "active",
      });
      break;
    }
  }

  return [...updates.values()];
};
