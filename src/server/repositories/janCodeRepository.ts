import { getSupabase } from "@/server/supabase";

import type { FoodMasterRow } from "@/lib/types/database";

/**
 * JAN コードで food_masters を検索する
 *
 * @param janCode - 検索する JAN コード
 * @returns 一致した食品マスタ。存在しない場合は null
 */
export const findFoodMasterByJanCode = async (janCode: string): Promise<FoodMasterRow | null> => {
  const { data, error } = await getSupabase()
    .from("food_master_jan_codes")
    .select("food_masters(*)")
    .eq("jan_code", janCode)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return data.food_masters as unknown as FoodMasterRow;
};
