import { supabase } from "@/server/supabase";

import type { RecipeIngredientRow, RecipeRow } from "@/lib/types/database";
import type { RecipeWithIngredients } from "@/lib/types/ui";

export const getRecipeById = async (id: string): Promise<RecipeWithIngredients | null> => {
  const { data: recipe, error: recipeError } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (recipeError) throw recipeError;
  if (!recipe) return null;

  const { data: ingredients, error: ingredientsError } = await supabase
    .from("recipe_ingredients")
    .select("*")
    .eq("recipe_id", id);

  if (ingredientsError) throw ingredientsError;

  return { ...(recipe as RecipeRow), ingredients: ingredients as RecipeIngredientRow[] };
};

export const getActiveRecipesWithIngredients = async (): Promise<RecipeWithIngredients[]> => {
  const { data: recipes, error: recipesError } = await supabase
    .from("recipes")
    .select("*")
    .eq("is_active", true);

  if (recipesError) throw recipesError;

  const recipeIds = (recipes as RecipeRow[]).map((r) => r.id);
  if (recipeIds.length === 0) return [];

  const { data: ingredients, error: ingredientsError } = await supabase
    .from("recipe_ingredients")
    .select("*")
    .in("recipe_id", recipeIds);

  if (ingredientsError) throw ingredientsError;

  const ingredientsByRecipeId = new Map<string, RecipeIngredientRow[]>();
  for (const ingredient of ingredients as RecipeIngredientRow[]) {
    const existing = ingredientsByRecipeId.get(ingredient.recipe_id) ?? [];
    existing.push(ingredient);
    ingredientsByRecipeId.set(ingredient.recipe_id, existing);
  }

  return (recipes as RecipeRow[]).map((recipe) => ({
    ...recipe,
    ingredients: ingredientsByRecipeId.get(recipe.id) ?? [],
  }));
};

export const getRecentlyRecommendedRecipeIds = async (days: number = 3): Promise<string[]> => {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("recipe_recommendation_logs")
    .select("recipe_id")
    .gte("recommended_on", sinceStr);

  if (error) throw error;
  return [...new Set((data as { recipe_id: string }[]).map((r) => r.recipe_id))];
};
