import { buildInventoryKeySet, matchRecipe } from "@/domain/recipe/matchRecipe";
import { scoreRecipe } from "@/domain/recipe/scoreRecipe";
import { buildRecommendReason } from "@/domain/recipe/buildRecommendReason";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import {
  getActiveRecipesWithIngredients,
  getRecentlyRecommendedRecipeIds,
} from "@/server/repositories/recipeRepository";
import type { RecommendedRecipeResponse } from "@/lib/types/ui";
import { RecipeList } from "@/features/recipes/components/RecipeList";

const RECOMMEND_COUNT = 3;

export default async function RecipesPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [lots, recentIds, recipes] = await Promise.all([
    getActiveInventoryLots(),
    getRecentlyRecommendedRecipeIds(),
    getActiveRecipesWithIngredients(),
  ]);

  const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
  const foodMasters = await getFoodMastersByIds(foodMasterIds);

  const { availableKeys, expiringKeys } = buildInventoryKeySet(lots, foodMasters, today);
  const keyToDisplayName = new Map(foodMasters.map((fm) => [fm.recipe_match_key, fm.display_name]));

  const recentIdSet = new Set(recentIds);
  const recommended: RecommendedRecipeResponse[] = recipes
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

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">おすすめレシピ</h1>
        <p className="mt-1 text-sm text-muted-foreground">在庫をもとに提案したレシピです</p>
      </div>
      <RecipeList recipes={recommended} />
    </div>
  );
}
