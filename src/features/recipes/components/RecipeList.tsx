"use client";

import { useState } from "react";
import { ChevronRight, Utensils } from "lucide-react";

import type { RecommendedRecipeResponse, RecipeWithIngredients } from "@/lib/types/ui";

import { RecipeHeroCard } from "./RecipeHeroCard";
import { RecipeConfirmModal } from "./RecipeConfirmModal";

type RecipeListProps = {
  recipes: RecommendedRecipeResponse[];
};

/**
 * おすすめレシピ一覧
 *
 * @param recipes - おすすめレシピ一覧（最大3件）
 * @returns 1件目をヒーローカード、2件目以降をサブカードで表示。詳細モーダルを開く
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

  if (recipes.length === 0) {
    return (
      <div className="rounded-xl bg-card border border-border px-6 py-10 text-center">
        <p className="text-sm text-muted-foreground">現在の在庫で作れるレシピがありません</p>
        <p className="mt-1 text-xs text-muted-foreground">食品を登録するとレシピが提案されます</p>
      </div>
    );
  }

  const [heroRecipe, ...subRecipes] = recipes;

  return (
    <div className="flex flex-col gap-4">
      {fetchError && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{fetchError}</p>
      )}

      {/* 1件目: ヒーローカード */}
      <RecipeHeroCard
        recipe={heroRecipe}
        onUse={handleViewDetail}
        isLoading={loadingId === heroRecipe.id}
      />

      {/* 2件目以降: サブカード */}
      {subRecipes.map((recipe) => (
        <button
          key={recipe.id}
          onClick={() => handleViewDetail(recipe)}
          disabled={loadingId === recipe.id}
          className="flex items-center gap-[14px] rounded-[20px] bg-card p-4 text-left disabled:opacity-50 w-full"
        >
          <div className="flex items-center justify-center shrink-0 rounded-[14px] bg-secondary h-14 w-14">
            <Utensils size={28} className="text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="text-[15px] font-bold text-foreground">
              {loadingId === recipe.id ? "読込中..." : recipe.title}
            </p>
            {recipe.ingredient_names.length > 0 && (
              <p className="text-xs text-muted-foreground truncate">
                {recipe.ingredient_names.join("・")}
              </p>
            )}
          </div>
          <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
        </button>
      ))}

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
