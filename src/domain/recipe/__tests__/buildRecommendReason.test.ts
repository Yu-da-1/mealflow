import { describe, expect, it } from "vitest";
import { buildRecommendReason } from "../buildRecommendReason";
import type { RecipeWithIngredients } from "@/lib/types/ui";

const makeRecipe = (keys: string[]): RecipeWithIngredients =>
  ({
    id: "r1",
    ingredients: keys.map((key) => ({ recipe_match_key: key, is_required: true })),
  }) as RecipeWithIngredients;

describe("buildRecommendReason", () => {
  it("should return expiring ingredient message when a matching ingredient is expiring", () => {
    const recipe = makeRecipe(["egg"]);
    const expiringKeys = new Set(["egg"]);
    const keyToDisplayName = new Map([["egg", "卵"]]);

    const reason = buildRecommendReason(recipe, expiringKeys, keyToDisplayName);

    expect(reason).toBe("期限が近い卵を使えます");
  });

  it("should fall back to key name when display name is not found", () => {
    const recipe = makeRecipe(["egg"]);
    const expiringKeys = new Set(["egg"]);
    const keyToDisplayName = new Map<string, string>();

    const reason = buildRecommendReason(recipe, expiringKeys, keyToDisplayName);

    expect(reason).toBe("期限が近いeggを使えます");
  });

  it("should return generic message when no ingredients are expiring", () => {
    const recipe = makeRecipe(["egg", "milk"]);
    const expiringKeys = new Set<string>();
    const keyToDisplayName = new Map([["egg", "卵"]]);

    const reason = buildRecommendReason(recipe, expiringKeys, keyToDisplayName);

    expect(reason).toBe("今ある食材だけで作れます");
  });

  it("should use the first expiring ingredient found", () => {
    const recipe = makeRecipe(["egg", "milk"]);
    const expiringKeys = new Set(["egg", "milk"]);
    const keyToDisplayName = new Map([
      ["egg", "卵"],
      ["milk", "牛乳"],
    ]);

    const reason = buildRecommendReason(recipe, expiringKeys, keyToDisplayName);

    expect(reason).toBe("期限が近い卵を使えます");
  });
});
