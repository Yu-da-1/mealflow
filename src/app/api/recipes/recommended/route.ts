import { NextResponse } from "next/server";

import { buildInventoryKeySet, matchRecipe } from "@/domain/recipe/matchRecipe";
import { buildRecommendReason } from "@/domain/recipe/buildRecommendReason";
import { scoreRecipe } from "@/domain/recipe/scoreRecipe";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import {
  getActiveRecipesWithIngredients,
  getRecentlyRecommendedRecipeIds,
} from "@/server/repositories/recipeRepository";

const RECOMMEND_COUNT = 3;

export const GET = async (): Promise<NextResponse> => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [lots, recentIds, recipes] = await Promise.all([
      getActiveInventoryLots(),
      getRecentlyRecommendedRecipeIds(),
      getActiveRecipesWithIngredients(),
    ]);

    const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
    const foodMasters = await getFoodMastersByIds(foodMasterIds);
    const { availableKeys, expiringKeys } = buildInventoryKeySet(lots, foodMasters, today);

    const keyToDisplayName = new Map(
      foodMasters.map((fm) => [fm.recipe_match_key, fm.display_name]),
    );

    const recentIdSet = new Set(recentIds);
    const candidates = recipes
      .filter((r) => !recentIdSet.has(r.id))
      .filter((r) => matchRecipe(r, availableKeys));

    const scored = candidates
      .map((r) => ({ recipe: r, score: scoreRecipe(r, availableKeys, expiringKeys) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, RECOMMEND_COUNT);

    const response = scored.map(({ recipe }) => ({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      cooking_time_minutes: recipe.cooking_time_minutes,
      reason: buildRecommendReason(recipe, expiringKeys, keyToDisplayName),
    }));

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch recommended recipes" }, { status: 500 });
  }
};
