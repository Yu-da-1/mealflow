import { NextResponse } from "next/server";

import { generateAndSaveRecipes } from "@/server/repositories/claudeRecipeRepository";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import {
  createRecommendationLog,
  getRecentlyRecommendedTitles,
} from "@/server/repositories/recipeRepository";
import type { IngredientForPrompt } from "@/domain/recipe/generateRecipePrompt";

const RECOMMEND_COUNT = 3;

export const GET = async (): Promise<NextResponse> => {
  try {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().slice(0, 10);

    const [lots, recentTitles] = await Promise.all([
      getActiveInventoryLots(),
      getRecentlyRecommendedTitles(),
    ]);

    if (lots.length === 0) {
      return NextResponse.json([]);
    }

    const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
    const foodMasters = await getFoodMastersByIds(foodMasterIds);

    const expiringIds = new Set(
      lots.filter((l) => l.expiry_date && l.expiry_date <= tomorrow).map((l) => l.food_master_id),
    );

    const ingredients: IngredientForPrompt[] = foodMasters.map((fm) => ({
      recipe_match_key: fm.recipe_match_key,
      display_name: fm.display_name,
      is_expiring: expiringIds.has(fm.id),
    }));

    const recipes = await generateAndSaveRecipes(ingredients, recentTitles, RECOMMEND_COUNT);

    await Promise.all(recipes.map((r) => createRecommendationLog(r.id)));

    const response = recipes.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      cooking_time_minutes: r.cooking_time_minutes,
      instructions: r.instructions,
      reason: r.reason,
    }));

    return NextResponse.json(response);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch recommended recipes" }, { status: 500 });
  }
};
