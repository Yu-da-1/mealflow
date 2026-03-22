import { supabase } from "@/server/supabase";

import type { FoodMasterRow } from "@/lib/types/database";

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
