import type { RecipeWithIngredients } from "@/lib/types/ui";

export const buildRecommendReason = (
  recipe: RecipeWithIngredients,
  expiringKeys: Set<string>,
  keyToDisplayName: Map<string, string>,
): string => {
  const expiringIngredient = recipe.ingredients.find((i) => expiringKeys.has(i.recipe_match_key));

  if (expiringIngredient) {
    const name =
      keyToDisplayName.get(expiringIngredient.recipe_match_key) ??
      expiringIngredient.recipe_match_key;
    return `期限が近い${name}を使えます`;
  }

  return "今ある食材だけで作れます";
};
