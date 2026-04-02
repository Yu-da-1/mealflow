import { describe, expect, it } from "vitest";
import { validateConsumeFromRecipeInput } from "../validateConsumeFromRecipeInput";

describe("validateConsumeFromRecipeInput", () => {
  it("should return valid with recipe_id and ingredient_keys", () => {
    const body = { recipe_id: "r-1", ingredient_keys: ["egg", "milk"] };

    const result = validateConsumeFromRecipeInput(body);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input).toEqual(body);
    }
  });

  it("should return invalid when body is null", () => {
    const result = validateConsumeFromRecipeInput(null);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when recipe_id is missing", () => {
    const body = { ingredient_keys: ["egg"] };

    const result = validateConsumeFromRecipeInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/recipe_id/);
    }
  });

  it("should return invalid when ingredient_keys is an empty array", () => {
    const body = { recipe_id: "r-1", ingredient_keys: [] };

    const result = validateConsumeFromRecipeInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/ingredient_keys/);
    }
  });

  it("should return invalid when ingredient_keys is not an array", () => {
    const body = { recipe_id: "r-1", ingredient_keys: "egg" };

    const result = validateConsumeFromRecipeInput(body);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when ingredient_keys contains non-string elements", () => {
    const body = { recipe_id: "r-1", ingredient_keys: ["egg", 123] };

    const result = validateConsumeFromRecipeInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/ingredient_keys/);
    }
  });
});
