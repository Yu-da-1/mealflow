import type { RecipeWithIngredients } from "@/lib/types/ui";

export const scoreRecipe = (
  recipe: RecipeWithIngredients,
  availableKeys: Set<string>,
  expiringKeys: Set<string>,
): number => {
  let expiringCount = 0;
  let matchedCount = 0;

  for (const ingredient of recipe.ingredients) {
    const key = ingredient.recipe_match_key;
    if (availableKeys.has(key)) {
      matchedCount++;
      if (expiringKeys.has(key)) {
        expiringCount++;
      }
    }
  }

  return expiringCount * 20 + matchedCount * 10;
};
