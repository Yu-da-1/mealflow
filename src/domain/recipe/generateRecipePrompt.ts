import { z } from "zod";

export const ClaudeRecipeIngredientSchema = z.object({
  recipe_match_key: z.string(),
  display_name: z.string(),
  is_required: z.boolean(),
});

export const ClaudeGeneratedRecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  cooking_time_minutes: z.number(),
  instructions: z.string(),
  reason: z.string(),
  ingredients: z.array(ClaudeRecipeIngredientSchema),
});

export const ClaudeRecipesResponseSchema = z.object({
  recipes: z.array(ClaudeGeneratedRecipeSchema),
});

export type ClaudeGeneratedRecipe = z.infer<typeof ClaudeGeneratedRecipeSchema>;
export type ClaudeRecipesResponse = z.infer<typeof ClaudeRecipesResponseSchema>;

export type IngredientForPrompt = {
  recipe_match_key: string;
  display_name: string;
  is_expiring: boolean;
};

export function buildRecipeGenerationPrompt(
  ingredients: IngredientForPrompt[],
  recentTitles: string[],
  count: number,
): string {
  const ingredientLines = ingredients
    .map(
      (i) =>
        `- ${i.display_name}（key: ${i.recipe_match_key}）${i.is_expiring ? " 【期限が近い】" : ""}`,
    )
    .join("\n");

  const recentSection =
    recentTitles.length > 0
      ? `\n直近で提案したレシピ（これらと同じタイトルは避けてください）:\n${recentTitles.map((t) => `- ${t}`).join("\n")}\n`
      : "";

  return `冷蔵庫にある食材を使った日本語レシピを${count}件提案してください。

【利用可能な食材】
${ingredientLines}
${recentSection}
以下のJSON形式のみで回答してください。前置き・説明文は不要です。

{
  "recipes": [
    {
      "title": "レシピ名",
      "description": "一言説明（40字以内）",
      "cooking_time_minutes": 20,
      "instructions": "1. 手順1\\n2. 手順2\\n3. 手順3",
      "reason": "提案理由（30字以内）",
      "ingredients": [
        {
          "recipe_match_key": "上記リストのkeyのいずれか",
          "display_name": "食材の表示名",
          "is_required": true
        }
      ]
    }
  ]
}

ルール:
- 在庫の食材を主体にしたレシピにする
- 【期限が近い】食材を優先的に使う
- 調味料（醤油・塩・砂糖・油など）はingredientsに含めない
- ingredientsのrecipe_match_keyは必ず上記リストに存在するkeyを使う
- is_required: true は主要食材、false はあると良い食材`;
}
