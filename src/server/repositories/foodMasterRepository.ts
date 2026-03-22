import { supabase } from "@/server/supabase";

import type { FoodMasterRow } from "@/lib/types/database";

export const getFoodMasterById = async (id: string): Promise<FoodMasterRow | null> => {
  const { data, error } = await supabase
    .from("food_masters")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export const getFoodMastersByIds = async (ids: string[]): Promise<FoodMasterRow[]> => {
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("food_masters").select("*").in("id", ids);

  if (error) throw error;
  return data;
};

export const searchFoodMasters = async (query: string): Promise<FoodMasterRow[]> => {
  const { data, error } = await supabase
    .from("food_masters")
    .select("*")
    .eq("is_active", true)
    .ilike("display_name", `%${query}%`)
    .order("display_name");

  if (error) throw error;
  return data;
};
