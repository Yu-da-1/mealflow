// DB由来の型定義（XxxRow）

export type FoodMasterRow = {
  id: string;
  display_name: string;
  category: string;
  subcategory: string | null;
  recipe_match_key: string;
  parent_recipe_match_key: string | null;
  default_expiry_type: "best_before" | "use_by";
  default_expiry_days: number;
  aliases: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type InventoryLotRow = {
  id: string;
  food_master_id: string;
  quantity: number;
  purchased_at: string;
  expiry_date: string | null;
  expiry_type: "best_before" | "use_by";
  expiry_source: "estimated" | "manual";
  status: "active" | "consumed" | "discarded";
  created_at: string;
  updated_at: string;
};

export type CreateInventoryLotInput = {
  food_master_id: string;
  quantity: number;
  purchased_at: string;
  expiry_date?: string | null;
  expiry_type: "best_before" | "use_by";
  expiry_source: "estimated" | "manual";
};

export type UpdateInventoryLotInput = {
  quantity?: number;
  expiry_date?: string | null;
  expiry_type?: "best_before" | "use_by";
  expiry_source?: "estimated" | "manual";
  status?: "active" | "consumed" | "discarded";
};

export type RecipeRow = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  cooking_time_minutes: number | null;
  instructions: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RecipeIngredientRow = {
  id: string;
  recipe_id: string;
  recipe_match_key: string;
  is_required: boolean;
  created_at: string;
};

export type RecipeRecommendationLogRow = {
  id: string;
  recipe_id: string;
  recommended_on: string;
  created_at: string;
};

export type ConsumeFromRecipeInput = {
  recipe_id: string;
  ingredient_keys: string[];
};
