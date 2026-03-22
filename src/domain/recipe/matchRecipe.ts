import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";
import type { RecipeWithIngredients } from "@/lib/types/ui";

export type InventoryKeySet = {
  availableKeys: Set<string>;
  expiringKeys: Set<string>;
};

export const buildInventoryKeySet = (
  lots: InventoryLotRow[],
  foodMasters: FoodMasterRow[],
  today: string,
): InventoryKeySet => {
  const masterMap = new Map(foodMasters.map((fm) => [fm.id, fm]));

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  const availableKeys = new Set<string>();
  const expiringKeys = new Set<string>();

  for (const lot of lots) {
    const master = masterMap.get(lot.food_master_id);
    if (!master) continue;

    availableKeys.add(master.recipe_match_key);
    if (master.parent_recipe_match_key) {
      availableKeys.add(master.parent_recipe_match_key);
    }

    if (lot.expiry_date === today || lot.expiry_date === tomorrowStr) {
      expiringKeys.add(master.recipe_match_key);
      if (master.parent_recipe_match_key) {
        expiringKeys.add(master.parent_recipe_match_key);
      }
    }
  }

  return { availableKeys, expiringKeys };
};

export const matchRecipe = (recipe: RecipeWithIngredients, availableKeys: Set<string>): boolean => {
  const requiredIngredients = recipe.ingredients.filter((i) => i.is_required);
  return requiredIngredients.every((i) => availableKeys.has(i.recipe_match_key));
};
