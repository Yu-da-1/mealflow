import { getSupabase } from "@/server/supabase";

import type { FoodMasterRow } from "@/lib/types/database";

/**
 * 指定IDの食品マスタを取得する
 *
 * @param id - 食品マスタのID
 * @returns 食品マスタ。存在しない場合は null
 */
export const getFoodMasterById = async (id: string): Promise<FoodMasterRow | null> => {
  const { data, error } = await getSupabase()
    .from("food_masters")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
};

/**
 * 指定IDリストに対応する食品マスタを一括取得する
 *
 * @param ids - 食品マスタのIDリスト
 * @returns 該当する食品マスタ一覧。空配列の場合は即座に空を返す
 */
export const getFoodMastersByIds = async (ids: string[]): Promise<FoodMasterRow[]> => {
  if (ids.length === 0) return [];
  const { data, error } = await getSupabase().from("food_masters").select("*").in("id", ids);

  if (error) throw error;
  return data;
};

/**
 * 表示名の部分一致で食品マスタを検索する
 *
 * @param query - 検索クエリ
 * @returns 条件に一致する有効な食品マスタ一覧（表示名昇順）
 */
export const searchFoodMasters = async (query: string): Promise<FoodMasterRow[]> => {
  const { data, error } = await getSupabase()
    .from("food_masters")
    .select("*")
    .eq("is_active", true)
    .ilike("display_name", `%${query}%`)
    .order("display_name");

  if (error) throw error;
  return data;
};
