import { describe, expect, it } from "vitest";
import { scoreRecipe } from "../scoreRecipe";
import type { RecipeWithIngredients } from "@/lib/types/ui";

const makeRecipe = (keys: string[]): RecipeWithIngredients =>
  ({
    id: "r1",
    ingredients: keys.map((key) => ({ recipe_match_key: key, is_required: true })),
  }) as RecipeWithIngredients;

describe("scoreRecipe", () => {
  it("should return 0 when no ingredients match", () => {
    const recipe = makeRecipe(["egg"]);
    const availableKeys = new Set<string>();
    const expiringKeys = new Set<string>();

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(0);
  });

  it("should add 10 points per matched ingredient", () => {
    const recipe = makeRecipe(["egg", "milk"]);
    const availableKeys = new Set(["egg", "milk"]);
    const expiringKeys = new Set<string>();

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(20);
  });

  it("should add 20 points per expiring ingredient on top of match points", () => {
    const recipe = makeRecipe(["egg"]);
    const availableKeys = new Set(["egg"]);
    const expiringKeys = new Set(["egg"]);

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(30); // 10 (match) + 20 (expiring)
  });

  it("should only count expiring bonus for ingredients that are also available", () => {
    const recipe = makeRecipe(["egg"]);
    const availableKeys = new Set<string>();
    const expiringKeys = new Set(["egg"]);

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(0);
  });

  it("should accumulate scores across multiple ingredients", () => {
    const recipe = makeRecipe(["egg", "milk", "butter"]);
    const availableKeys = new Set(["egg", "milk", "butter"]);
    const expiringKeys = new Set(["egg", "milk"]);

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    // egg: 10+20, milk: 10+20, butter: 10
    expect(score).toBe(70);
  });
});
