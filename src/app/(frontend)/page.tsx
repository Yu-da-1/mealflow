import Link from "next/link";
import { PlusCircle } from "lucide-react";

import type { FoodMasterRow } from "@/lib/types/database";
import type {
  InventorySummaryItem,
  RecommendedRecipeResponse,
  RecipeWithIngredients,
} from "@/lib/types/ui";
import { buildInventorySummary } from "@/domain/inventory/buildInventorySummary";
import { buildInventoryKeySet, matchRecipe } from "@/domain/recipe/matchRecipe";
import { scoreRecipe } from "@/domain/recipe/scoreRecipe";
import { buildRecommendReason } from "@/domain/recipe/buildRecommendReason";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import {
  getActiveRecipesWithIngredients,
  getRecentlyRecommendedRecipeIds,
} from "@/server/repositories/recipeRepository";
import { HomeExpirationSection } from "@/features/home/components/HomeExpirationSection";
import { HomeRecipeSection } from "@/features/home/components/HomeRecipeSection";

const RECOMMEND_COUNT = 3;
const EXPIRATION_DISPLAY_LIMIT = 5;

type ExpiringResult = {
  displayedItems: InventorySummaryItem[];
  hasMore: boolean;
};

function buildExpiringResult(
  summary: InventorySummaryItem[],
  today: string,
  tomorrow: string,
): ExpiringResult {
  const items = summary
    .filter((item) => item.nearest_expiry_date === today || item.nearest_expiry_date === tomorrow)
    .sort((a, b) => {
      if (a.nearest_expiry_date === today && b.nearest_expiry_date !== today) return -1;
      if (a.nearest_expiry_date !== today && b.nearest_expiry_date === today) return 1;
      return 0;
    });
  return {
    displayedItems: items.slice(0, EXPIRATION_DISPLAY_LIMIT),
    hasMore: items.length > EXPIRATION_DISPLAY_LIMIT,
  };
}

function buildRecommendedRecipes(
  recipes: RecipeWithIngredients[],
  recentIds: string[],
  availableKeys: Set<string>,
  expiringKeys: Set<string>,
  foodMasters: FoodMasterRow[],
): RecommendedRecipeResponse[] {
  const keyToDisplayName = new Map(foodMasters.map((fm) => [fm.recipe_match_key, fm.display_name]));
  const recentIdSet = new Set(recentIds);
  return recipes
    .filter((r) => !recentIdSet.has(r.id))
    .filter((r) => matchRecipe(r, availableKeys))
    .map((r) => ({ recipe: r, score: scoreRecipe(r, availableKeys, expiringKeys) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, RECOMMEND_COUNT)
    .map(({ recipe }) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      cooking_time_minutes: recipe.cooking_time_minutes,
      reason: buildRecommendReason(recipe, expiringKeys, keyToDisplayName),
    }));
}

export default async function HomePage() {
  const today = new Date().toISOString().slice(0, 10);

  const [lots, recentIds, recipes] = await Promise.all([
    getActiveInventoryLots(),
    getRecentlyRecommendedRecipeIds(),
    getActiveRecipesWithIngredients(),
  ]);

  const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
  const foodMasters = await getFoodMastersByIds(foodMasterIds);

  const summary = buildInventorySummary(lots, foodMasters);
  const { availableKeys, expiringKeys, tomorrow } = buildInventoryKeySet(lots, foodMasters, today);

  const { displayedItems, hasMore } = buildExpiringResult(summary, today, tomorrow);
  const recommendedRecipes = buildRecommendedRecipes(
    recipes,
    recentIds,
    availableKeys,
    expiringKeys,
    foodMasters,
  );

  const isEmpty = lots.length === 0;

  return (
    <div className="p-6 max-w-2xl">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-foreground">ホーム</h1>
        <Link
          href="/inventory/new"
          className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
        >
          <PlusCircle size={15} />
          食品を追加
        </Link>
      </div>

      {/* 在庫サマリ */}
      <p className="mb-6 text-sm text-muted-foreground">
        {isEmpty ? "まだ食品が登録されていません" : `${summary.length} 種類の食品があります`}
      </p>

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">食品を追加するとレシピ提案が表示されます</p>
      ) : (
        <div className="space-y-8">
          <HomeExpirationSection items={displayedItems} today={today} hasMore={hasMore} />
          <HomeRecipeSection recipes={recommendedRecipes} />
        </div>
      )}
    </div>
  );
}
