import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";
import type { InventorySummaryItem } from "@/lib/types/ui";

export const buildInventorySummary = (
  lots: InventoryLotRow[],
  foodMasters: FoodMasterRow[],
): InventorySummaryItem[] => {
  const masterMap = new Map(foodMasters.map((fm) => [fm.id, fm]));

  const grouped = new Map<string, InventoryLotRow[]>();
  for (const lot of lots) {
    const existing = grouped.get(lot.food_master_id) ?? [];
    existing.push(lot);
    grouped.set(lot.food_master_id, existing);
  }

  const items: InventorySummaryItem[] = [];
  for (const [food_master_id, lotGroup] of grouped) {
    const master = masterMap.get(food_master_id);
    if (!master) continue;

    const total_quantity = lotGroup.reduce((sum, l) => sum + l.quantity, 0);

    const lotsWithExpiry = lotGroup.filter((l) => l.expiry_date !== null);
    lotsWithExpiry.sort((a, b) => a.expiry_date!.localeCompare(b.expiry_date!));
    const nearest = lotsWithExpiry[0] ?? null;

    items.push({
      food_master_id,
      display_name: master.display_name,
      category: master.category,
      total_quantity,
      nearest_expiry_date: nearest?.expiry_date ?? null,
      nearest_expiry_type: nearest?.expiry_type ?? null,
      lots: lotGroup,
    });
  }

  return items;
};
