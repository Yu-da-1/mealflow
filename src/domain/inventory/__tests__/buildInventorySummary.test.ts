import { describe, expect, it } from "vitest";
import { buildInventorySummary } from "../buildInventorySummary";
import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";

// ---- shared fixtures ----

const baseMaster = (overrides: Partial<FoodMasterRow>): FoodMasterRow => ({
  id: "fm-1",
  display_name: "卵",
  category: "dairy",
  subcategory: null,
  recipe_match_key: "egg",
  parent_recipe_match_key: null,
  default_expiry_type: "best_before",
  default_expiry_days: 14,
  aliases: [],
  is_active: true,
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

const baseLot = (overrides: Partial<InventoryLotRow>): InventoryLotRow => ({
  id: "lot-1",
  food_master_id: "fm-1",
  quantity: 3,
  purchased_at: "2024-01-01",
  expiry_date: "2024-01-15",
  expiry_type: "best_before",
  expiry_source: "estimated",
  status: "active",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z",
  ...overrides,
});

// ---- tests ----

describe("buildInventorySummary", () => {
  it("should sum quantities across multiple lots of the same food", () => {
    const lots = [
      baseLot({ id: "lot-1", quantity: 3 }),
      baseLot({ id: "lot-2", quantity: 5 }),
    ];
    const masters = [baseMaster()];

    const summary = buildInventorySummary(lots, masters);

    expect(summary).toHaveLength(1);
    expect(summary[0].total_quantity).toBe(8);
  });

  it("should select the nearest expiry_date among lots", () => {
    const lots = [
      baseLot({ id: "lot-far", expiry_date: "2024-01-20" }),
      baseLot({ id: "lot-near", expiry_date: "2024-01-10" }),
    ];
    const masters = [baseMaster()];

    const summary = buildInventorySummary(lots, masters);

    expect(summary[0].nearest_expiry_date).toBe("2024-01-10");
  });

  it("should set nearest_expiry_date to null when all lots have no expiry_date", () => {
    const lots = [
      baseLot({ id: "lot-1", expiry_date: null }),
      baseLot({ id: "lot-2", expiry_date: null }),
    ];
    const masters = [baseMaster()];

    const summary = buildInventorySummary(lots, masters);

    expect(summary[0].nearest_expiry_date).toBeNull();
    expect(summary[0].nearest_expiry_type).toBeNull();
  });

  it("should use expiry_type of the lot with nearest expiry_date", () => {
    const lots = [
      baseLot({ id: "lot-near", expiry_date: "2024-01-10", expiry_type: "use_by" }),
      baseLot({ id: "lot-far", expiry_date: "2024-01-20", expiry_type: "best_before" }),
    ];
    const masters = [baseMaster()];

    const summary = buildInventorySummary(lots, masters);

    expect(summary[0].nearest_expiry_type).toBe("use_by");
  });

  it("should skip lots whose food_master_id has no matching master", () => {
    const lots = [baseLot({ food_master_id: "unknown" })];
    const masters = [baseMaster({ id: "fm-1" })];

    const summary = buildInventorySummary(lots, masters);

    expect(summary).toHaveLength(0);
  });

  it("should produce separate summary items for different food masters", () => {
    const lots = [
      baseLot({ id: "lot-egg", food_master_id: "fm-egg" }),
      baseLot({ id: "lot-milk", food_master_id: "fm-milk" }),
    ];
    const masters = [
      baseMaster({ id: "fm-egg", display_name: "卵" }),
      baseMaster({ id: "fm-milk", display_name: "牛乳" }),
    ];

    const summary = buildInventorySummary(lots, masters);

    expect(summary).toHaveLength(2);
    expect(summary.map((s) => s.display_name).sort()).toEqual(["卵", "牛乳"].sort());
  });

  it("should ignore lots with null expiry_date when selecting nearest expiry among mixed lots", () => {
    const lots = [
      baseLot({ id: "lot-null", expiry_date: null }),
      baseLot({ id: "lot-dated", expiry_date: "2024-01-15" }),
    ];
    const masters = [baseMaster()];

    const summary = buildInventorySummary(lots, masters);

    expect(summary[0].nearest_expiry_date).toBe("2024-01-15");
  });
});
