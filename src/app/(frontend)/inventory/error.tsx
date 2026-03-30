"use client";

/**
 * 食品一覧ページのエラーバウンダリ
 *
 * getActiveInventoryLots / getFoodMastersByIds が例外をスローした場合に表示される。
 */
export default function InventoryError() {
  return (
    <div className="p-6 max-w-2xl">
      <p className="text-sm text-red-600">食品一覧の取得に失敗しました</p>
    </div>
  );
}
