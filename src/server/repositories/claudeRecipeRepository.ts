import Anthropic from "@anthropic-ai/sdk";

import {
  buildRecipeGenerationPrompt,
  ClaudeRecipesResponseSchema,
  type ClaudeGeneratedRecipe,
  type IngredientForPrompt,
} from "@/domain/recipe/generateRecipePrompt";
import { getSupabase } from "@/server/supabase";
import type { RecipeRow } from "@/lib/types/database";

const CLAUDE_MODEL = "claude-haiku-4-5";
const SYSTEM_PROMPT =
  "あなたはレシピ提案AIです。必ず有効なJSONのみを出力してください。前置きや説明文は含めないでください。";

type SavedRecipe = {
  id: string;
  title: string;
  description: string | null;
  cooking_time_minutes: number | null;
  instructions: string | null;
  reason: string;
};

const parseClaudeResponse = (text: string): ClaudeGeneratedRecipe[] => {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in Claude response");
  const result = ClaudeRecipesResponseSchema.parse(JSON.parse(jsonMatch[0]));
  return result.recipes;
};

const saveRecipeToDb = async (recipe: ClaudeGeneratedRecipe): Promise<SavedRecipe> => {
  const { data: recipeRow, error: recipeError } = await getSupabase()
    .from("recipes")
    .insert({
      title: recipe.title,
      description: recipe.description,
      cooking_time_minutes: recipe.cooking_time_minutes,
      instructions: recipe.instructions,
      is_active: true,
    })
    .select()
    .single();

  if (recipeError || !recipeRow) {
    throw new Error(`Failed to save recipe: ${recipeError?.message}`);
  }

  if (recipe.ingredients.length > 0) {
    const { error: ingError } = await getSupabase()
      .from("recipe_ingredients")
      .insert(
        recipe.ingredients.map((ing) => ({
          recipe_id: (recipeRow as RecipeRow).id,
          recipe_match_key: ing.recipe_match_key,
          is_required: ing.is_required,
        })),
      );
    if (ingError) throw new Error(`Failed to save ingredients: ${ingError.message}`);
  }

  return {
    id: (recipeRow as RecipeRow).id,
    title: recipe.title,
    description: recipe.description,
    cooking_time_minutes: recipe.cooking_time_minutes,
    instructions: recipe.instructions,
    reason: recipe.reason,
  };
};

/**
 * Claude API でレシピを生成し、DB に保存する
 *
 * @param ingredients - プロンプトに渡す在庫食材の一覧
 * @param recentTitles - 重複提案を避けるための最近のレシピタイトル一覧
 * @param count - 生成するレシピ件数
 * @returns 保存されたレシピの一覧
 */
export const generateAndSaveRecipes = async (
  ingredients: IngredientForPrompt[],
  recentTitles: string[],
  count: number,
): Promise<SavedRecipe[]> => {
  const client = new Anthropic();
  const prompt = buildRecipeGenerationPrompt(ingredients, recentTitles, count);

  const message = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  const recipes = parseClaudeResponse(textBlock.text);
  return Promise.all(recipes.map(saveRecipeToDb));
};
