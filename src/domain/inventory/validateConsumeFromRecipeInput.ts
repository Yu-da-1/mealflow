import type { ConsumeFromRecipeInput } from "@/lib/types/database";

type ValidationResult =
  | { valid: true; input: ConsumeFromRecipeInput }
  | { valid: false; error: string };

/**
 * POST /api/inventory/consume-from-recipe のリクエストボディをバリデートする。
 *
 * @param body - 任意の未検証オブジェクト
 * @returns バリデーション結果。valid=true の場合は型付きの input を含む
 */
export const validateConsumeFromRecipeInput = (body: unknown): ValidationResult => {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (!b.recipe_id || typeof b.recipe_id !== "string") {
    return { valid: false, error: "Missing required field: recipe_id" };
  }

  if (!Array.isArray(b.ingredient_keys) || b.ingredient_keys.length === 0) {
    return { valid: false, error: "ingredient_keys must be a non-empty array" };
  }

  if (!b.ingredient_keys.every((k: unknown) => typeof k === "string")) {
    return { valid: false, error: "ingredient_keys must be an array of strings" };
  }

  return {
    valid: true,
    input: {
      recipe_id: b.recipe_id,
      ingredient_keys: b.ingredient_keys as string[],
    },
  };
};
