// UI用の共通型定義

import type { InventoryLotRow } from "./database";

export type InventorySummaryItem = {
  food_master_id: string;
  display_name: string;
  category: string;
  total_quantity: number;
  nearest_expiry_date: string | null;
  nearest_expiry_type: "best_before" | "use_by" | null;
  lots: InventoryLotRow[];
};
