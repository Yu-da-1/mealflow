"use client";

import { Utensils } from "lucide-react";

import type { RecommendedRecipeResponse } from "@/lib/types/ui";

type RecipeHeroCardProps = {
  recipe: RecommendedRecipeResponse;
  onUse: (recipe: RecommendedRecipeResponse) => void;
  isLoading: boolean;
};

/**
 * レシピ一覧の1件目に表示するヒーローカード
 *
 * @param recipe - 表示するレシピ
 * @param onUse - 「このレシピを使う」ボタン押下時のコールバック
 * @param isLoading - 詳細取得中フラグ
 * @returns 画像エリア・食材・期限バッジ・CTA ボタンを含む大きいカード
 */
export function RecipeHeroCard({ recipe, onUse, isLoading }: RecipeHeroCardProps) {
  const ingredientsText = recipe.ingredient_names.join("・");

  return (
    <div className="rounded-[20px] bg-card overflow-hidden">
      {/* 画像エリア */}
      <div className="flex items-center justify-center bg-secondary h-[140px]">
        <Utensils size={40} className="text-muted-foreground" />
      </div>

      {/* ボディ */}
      <div className="px-4 pt-[14px] pb-4 flex flex-col gap-[10px]">
        <p className="text-base font-bold text-foreground">{recipe.title}</p>
        {ingredientsText && <p className="text-xs text-muted-foreground">{ingredientsText}</p>}

        {/* フッター: バッジ + CTA ボタン */}
        <div className="flex items-center justify-between">
          <div>
            {recipe.has_expiring_ingredients && (
              <span className="rounded-full bg-[var(--color-error)] px-3 py-1 text-[11px] font-semibold text-[var(--color-error-foreground)]">
                期限間近食材あり
              </span>
            )}
          </div>
          <button
            onClick={() => onUse(recipe)}
            disabled={isLoading}
            className="rounded-full bg-primary px-[18px] py-2 text-[13px] font-bold text-white disabled:opacity-50"
          >
            {isLoading ? "読込中..." : "このレシピを使う"}
          </button>
        </div>
      </div>
    </div>
  );
}
