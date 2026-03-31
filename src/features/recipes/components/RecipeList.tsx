"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import type { RecommendedRecipeResponse, RecipeWithIngredients } from "@/lib/types/ui";

import { RecipeConfirmModal } from "./RecipeConfirmModal";

type RecipeListProps = {
  recipes: RecommendedRecipeResponse[];
};

/**
 * おすすめレシピ一覧
 *
 * @param recipes - おすすめレシピ一覧（最大3件）
 * @returns レシピカード一覧。「詳細を見る」で食材確認モーダルを開く
 */
export function RecipeList({ recipes }: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithIngredients | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const handleViewDetail = async (recipe: RecommendedRecipeResponse) => {
    setLoadingId(recipe.id);
    setFetchError(null);
    try {
      const res = await fetch(`/api/recipes/${recipe.id}`);
      if (!res.ok) {
        setFetchError("レシピの詳細取得に失敗しました");
        return;
      }
      const data: RecipeWithIngredients = await res.json();
      setSelectedRecipe(data);
      setSelectedReason(recipe.reason);
    } catch {
      setFetchError("レシピの詳細取得に失敗しました");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      {fetchError && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{fetchError}</p>
      )}

      {recipes.length === 0 ? (
        <div className="rounded-xl bg-card border border-border px-6 py-10 text-center">
          <p className="text-sm text-muted-foreground">現在の在庫で作れるレシピがありません</p>
          <p className="mt-1 text-xs text-muted-foreground">食品を登録するとレシピが提案されます</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="rounded-xl bg-card border border-border px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-base font-semibold text-foreground">{recipe.title}</p>
                  <p className="text-xs text-primary">{recipe.reason}</p>
                  {recipe.cooking_time_minutes !== null && (
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {recipe.cooking_time_minutes}分
                    </p>
                  )}
                  {recipe.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleViewDetail(recipe)}
                  disabled={loadingId === recipe.id}
                  className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-sidebar transition-colors disabled:opacity-50"
                >
                  {loadingId === recipe.id ? "読込中..." : "詳細を見る"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedRecipe && (
        <RecipeConfirmModal
          recipe={selectedRecipe}
          reason={selectedReason}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
