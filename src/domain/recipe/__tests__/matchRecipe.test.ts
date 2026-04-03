import { describe, expect, it } from "vitest";
import { buildInventoryKeySet, matchRecipe } from "../matchRecipe";
import type { FoodMasterRow, InventoryLotRow } from "@/lib/types/database";
import type { RecipeWithIngredients } from "@/lib/types/ui";

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

const makeRecipe = (ingredients: { key: string; required: boolean }[]): RecipeWithIngredients =>
  ({
    id: "r1",
    ingredients: ingredients.map(({ key, required }) => ({
      recipe_match_key: key,
      is_required: required,
    })),
  }) as RecipeWithIngredients;

// ---- buildInventoryKeySet ----

describe("buildInventoryKeySet", () => {
  it("should add recipe_match_key to availableKeys", () => {
    const lots = [baseLot({ expiry_date: "2024-06-01" })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const { availableKeys } = buildInventoryKeySet(lots, masters, "2024-01-01");

    expect(availableKeys.has("egg")).toBe(true);
  });

  it("should also add parent_recipe_match_key to availableKeys when present", () => {
    const lots = [baseLot()];
    const masters = [
      baseMaster({ recipe_match_key: "chicken_thigh", parent_recipe_match_key: "chicken" }),
    ];

    const { availableKeys } = buildInventoryKeySet(lots, masters, "2024-01-01");

    expect(availableKeys.has("chicken_thigh")).toBe(true);
    expect(availableKeys.has("chicken")).toBe(true);
  });

  it("should add key to expiringKeys when expiry_date is today", () => {
    const today = "2024-01-10";
    const lots = [baseLot({ expiry_date: today })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const { expiringKeys } = buildInventoryKeySet(lots, masters, today);

    expect(expiringKeys.has("egg")).toBe(true);
  });

  it("should add key to expiringKeys when expiry_date is tomorrow", () => {
    const today = "2024-01-10";
    const lots = [baseLot({ expiry_date: "2024-01-11" })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const { expiringKeys } = buildInventoryKeySet(lots, masters, today);

    expect(expiringKeys.has("egg")).toBe(true);
  });

  it("should not add key to expiringKeys when expiry_date is after tomorrow", () => {
    const today = "2024-01-10";
    const lots = [baseLot({ expiry_date: "2024-01-12" })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const { expiringKeys } = buildInventoryKeySet(lots, masters, today);

    expect(expiringKeys.has("egg")).toBe(false);
  });

  it("should not add key to expiringKeys when expiry_date is null", () => {
    const today = "2024-01-10";
    const lots = [baseLot({ expiry_date: null })];
    const masters = [baseMaster({ recipe_match_key: "egg" })];

    const { expiringKeys } = buildInventoryKeySet(lots, masters, today);

    expect(expiringKeys.has("egg")).toBe(false);
  });

  it("should also add parent_recipe_match_key to expiringKeys when ingredient is expiring", () => {
    const today = "2024-01-10";
    const lots = [baseLot({ expiry_date: today })];
    const masters = [
      baseMaster({ recipe_match_key: "chicken_thigh", parent_recipe_match_key: "chicken" }),
    ];

    const { expiringKeys } = buildInventoryKeySet(lots, masters, today);

    expect(expiringKeys.has("chicken_thigh")).toBe(true);
    expect(expiringKeys.has("chicken")).toBe(true);
  });

  it("should skip lots whose food_master_id has no matching master", () => {
    const lots = [baseLot({ food_master_id: "unknown" })];
    const masters = [baseMaster({ id: "fm-1" })];

    const { availableKeys } = buildInventoryKeySet(lots, masters, "2024-01-01");

    expect(availableKeys.size).toBe(0);
  });
});

// ---- matchRecipe ----

describe("matchRecipe", () => {
  it("should return true when all required ingredients are available", () => {
    const recipe = makeRecipe([
      { key: "egg", required: true },
      { key: "milk", required: true },
    ]);
    const availableKeys = new Set(["egg", "milk"]);

    expect(matchRecipe(recipe, availableKeys)).toBe(true);
  });

  it("should return false when a required ingredient is missing", () => {
    const recipe = makeRecipe([
      { key: "egg", required: true },
      { key: "milk", required: true },
    ]);
    const availableKeys = new Set(["egg"]);

    expect(matchRecipe(recipe, availableKeys)).toBe(false);
  });

  it("should return true when optional ingredients are missing but required ones are available", () => {
    const recipe = makeRecipe([
      { key: "egg", required: true },
      { key: "cheese", required: false },
    ]);
    const availableKeys = new Set(["egg"]);

    expect(matchRecipe(recipe, availableKeys)).toBe(true);
  });

  it("should return true when there are no required ingredients", () => {
    const recipe = makeRecipe([{ key: "cheese", required: false }]);
    const availableKeys = new Set<string>();

    expect(matchRecipe(recipe, availableKeys)).toBe(true);
  });
});
