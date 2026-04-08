import { describe, expect, it } from "vitest";
import { resolveBarcodeResult } from "../resolveBarcodeResult";
import type { FoodMasterRow } from "@/lib/types/database";

const masterRow: FoodMasterRow = {
  id: "uuid-egg",
  display_name: "卵",
  category: "乳卵類",
  subcategory: null,
  recipe_match_key: "egg",
  parent_recipe_match_key: null,
  default_expiry_type: "best_before",
  default_expiry_days: 14,
  aliases: [],
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

describe("resolveBarcodeResult", () => {
  it("should return master source when food_master is found", () => {
    const result = resolveBarcodeResult(masterRow, { found: false });

    expect(result).toEqual({
      source: "master",
      food_master_id: "uuid-egg",
      display_name: "卵",
      default_expiry_days: 14,
      default_expiry_type: "best_before",
    });
  });

  it("should return open_food_facts source when master is null but OFF hits", () => {
    const result = resolveBarcodeResult(null, { found: true, displayName: "有機たまご" });

    expect(result).toEqual({
      source: "open_food_facts",
      food_master_id: null,
      display_name: "有機たまご",
      default_expiry_days: null,
      default_expiry_type: null,
    });
  });

  it("should return null when both master and OFF miss", () => {
    const result = resolveBarcodeResult(null, { found: false });

    expect(result).toBeNull();
  });

  it("should prefer master over OFF when both are available", () => {
    const result = resolveBarcodeResult(masterRow, { found: true, displayName: "別の名前" });

    expect(result?.source).toBe("master");
    expect(result?.display_name).toBe("卵");
  });
});
