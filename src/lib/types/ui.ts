// UI用の共通型定義

import type { InventoryLotRow, RecipeIngredientRow, RecipeRow } from "./database";

export type InventorySummaryItem = {
  food_master_id: string;
  display_name: string;
  category: string;
  total_quantity: number;
  nearest_expiry_date: string | null;
  nearest_expiry_type: "best_before" | "use_by" | null;
  lots: InventoryLotRow[];
};

export type RecipeWithIngredients = RecipeRow & {
  ingredients: RecipeIngredientRow[];
};

export type RecommendedRecipeResponse = {
  id: string;
  title: string;
  description: string | null;
  cooking_time_minutes: number | null;
  instructions: string | null;
  reason: string;
};
