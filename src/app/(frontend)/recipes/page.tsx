import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { getActiveInventoryLots } from "@/server/repositories/inventoryRepository";
import {
  getRecentlyRecommendedTitles,
  createRecommendationLog,
} from "@/server/repositories/recipeRepository";
import { generateAndSaveRecipes } from "@/server/repositories/claudeRecipeRepository";
import type { IngredientForPrompt } from "@/domain/recipe/generateRecipePrompt";
import { RecipeList } from "@/features/recipes/components/RecipeList";

const RECOMMEND_COUNT = 3;

export default async function RecipesPage() {
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().slice(0, 10);

  const [lots, recentTitles] = await Promise.all([
    getActiveInventoryLots(),
    getRecentlyRecommendedTitles(),
  ]);

  if (lots.length === 0) {
    return (
      <div className="p-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-foreground">おすすめレシピ</h1>
          <p className="mt-1 text-sm text-muted-foreground">在庫をもとに提案したレシピです</p>
        </div>
        <p className="text-muted-foreground text-sm">食品を追加するとレシピ提案が表示されます</p>
      </div>
    );
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

  const recommended = recipes.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    cooking_time_minutes: r.cooking_time_minutes,
    instructions: r.instructions,
    reason: r.reason,
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
