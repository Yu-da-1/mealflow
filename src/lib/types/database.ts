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
