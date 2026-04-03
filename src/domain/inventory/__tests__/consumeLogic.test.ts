import { describe, expect, it } from "vitest";
import { computeConsumption } from "../consumeLogic";
import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";

// ---- shared fixtures ----

const baseMaster = (overrides: Partial<FoodMasterRow> = {}): FoodMasterRow => ({
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

const baseLot = (overrides: Partial<InventoryLotRow> = {}): InventoryLotRow => ({
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

describe("computeConsumption", () => {
  it("should consume 1 unit from a single matching lot", () => {
    const lots = [baseLot({ id: "lot-1", quantity: 3 })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toEqual([{ id: "lot-1", quantity: 2, status: "active" }]);
  });

  it("should set status to consumed when quantity reaches 0", () => {
    const lots = [baseLot({ id: "lot-1", quantity: 1 })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toEqual([{ id: "lot-1", quantity: 0, status: "consumed" }]);
  });

  it("should prioritize lot with nearest expiry_date", () => {
    const lots = [
      baseLot({ id: "lot-early", food_master_id: "fm-1", expiry_date: "2024-01-10" }),
      baseLot({ id: "lot-late", food_master_id: "fm-1", expiry_date: "2024-01-20" }),
    ];
    const masters = [baseMaster()];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toHaveLength(1);
    expect(updates[0].id).toBe("lot-early");
  });

  it("should prioritize lot with oldest purchased_at when expiry_date is equal", () => {
    const lots = [
      baseLot({
        id: "lot-new",
        food_master_id: "fm-1",
        expiry_date: "2024-01-15",
        purchased_at: "2024-01-05",
      }),
      baseLot({
        id: "lot-old",
        food_master_id: "fm-1",
        expiry_date: "2024-01-15",
        purchased_at: "2024-01-01",
      }),
    ];
    const masters = [baseMaster()];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toHaveLength(1);
    expect(updates[0].id).toBe("lot-old");
  });

  it("should place lots with null expiry_date at the end", () => {
    const lots = [
      baseLot({ id: "lot-null", food_master_id: "fm-1", expiry_date: null }),
      baseLot({ id: "lot-dated", food_master_id: "fm-1", expiry_date: "2024-01-15" }),
    ];
    const masters = [baseMaster()];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toHaveLength(1);
    expect(updates[0].id).toBe("lot-dated");
  });

  it("should match via parent_recipe_match_key", () => {
    const lots = [baseLot({ id: "lot-1", food_master_id: "fm-1", quantity: 2 })];
    const masters = [
      baseMaster({ recipe_match_key: "chicken_thigh", parent_recipe_match_key: "chicken" }),
    ];

    const updates = computeConsumption(lots, masters, ["chicken"]);

    expect(updates).toEqual([{ id: "lot-1", quantity: 1, status: "active" }]);
  });

  it("should return empty array when ingredient key has no matching master", () => {
    const lots = [baseLot()];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const updates = computeConsumption(lots, masters, ["milk"]);

    expect(updates).toHaveLength(0);
  });

  it("should skip lots with quantity 0", () => {
    const lots = [
      baseLot({ id: "lot-empty", food_master_id: "fm-1", quantity: 0, expiry_date: "2024-01-10" }),
      baseLot({
        id: "lot-available",
        food_master_id: "fm-1",
        quantity: 2,
        expiry_date: "2024-01-20",
      }),
    ];
    const masters = [baseMaster()];

    const updates = computeConsumption(lots, masters, ["egg"]);

    expect(updates).toHaveLength(1);
    expect(updates[0].id).toBe("lot-available");
  });

  it("should consume from multiple different ingredient keys independently", () => {
    const lots = [
      baseLot({ id: "lot-egg", food_master_id: "fm-egg", quantity: 2 }),
      baseLot({ id: "lot-milk", food_master_id: "fm-milk", quantity: 1 }),
    ];
    const masters = [
      baseMaster({ id: "fm-egg", recipe_match_key: "egg" }),
      baseMaster({ id: "fm-milk", recipe_match_key: "milk" }),
    ];

    const updates = computeConsumption(lots, masters, ["egg", "milk"]);

    expect(updates).toHaveLength(2);
    expect(updates.find((u) => u.id === "lot-egg")).toEqual({
      id: "lot-egg",
      quantity: 1,
      status: "active",
    });
    expect(updates.find((u) => u.id === "lot-milk")).toEqual({
      id: "lot-milk",
      quantity: 0,
      status: "consumed",
    });
  });
});
