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

export type BarcodeResponse = {
  source: "master" | "open_food_facts";
  food_master_id: string | null;
  display_name: string;
  category: string | null;
  default_expiry_days: number | null;
  default_expiry_type: "best_before" | "use_by" | null;
};

export type OffProductResult = { found: true; displayName: string } | { found: false };

export type RecommendedRecipeResponse = {
  id: string;
  title: string;
  description: string | null;
  cooking_time_minutes: number | null;
  instructions: string | null;
  reason: string;
  ingredient_names: string[];
  has_expiring_ingredients: boolean;
};
