import { getSupabase } from "@/server/supabase";

import type {
  CreateInventoryLotInput,
  InventoryLotRow,
  UpdateInventoryLotInput,
} from "@/lib/types/database";
import type { LotUpdate } from "@/domain/inventory/consumeLogic";

/**
 * ステータスが active な在庫ロットを期限昇順で取得する
 *
 * @returns アクティブな在庫ロット一覧
 */
export const getActiveInventoryLots = async (): Promise<InventoryLotRow[]> => {
  const { data, error } = await getSupabase()
    .from("inventory_lots")
    .select("*")
    .eq("status", "active")
    .order("expiry_date", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data;
};

/**
 * 在庫ロットを新規作成する
 *
 * @param input - 作成する在庫ロットの入力値
 * @returns 作成された在庫ロット
 */
export const createInventoryLot = async (
  input: CreateInventoryLotInput,
): Promise<InventoryLotRow> => {
  const { data, error } = await getSupabase()
    .from("inventory_lots")
    .insert(input)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * 指定IDの在庫ロットを更新する
 *
 * @param id - 更新対象の在庫ロットID
 * @param input - 更新内容
 * @returns 更新後の在庫ロット
 */
export const updateInventoryLot = async (
  id: string,
  input: UpdateInventoryLotInput,
): Promise<InventoryLotRow> => {
  const { data, error } = await getSupabase()
    .from("inventory_lots")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * 指定IDの在庫ロットを削除する
 *
 * @param id - 削除対象の在庫ロットID
 */
export const deleteInventoryLot = async (id: string): Promise<void> => {
  const { error } = await getSupabase().from("inventory_lots").delete().eq("id", id);

  if (error) throw error;
};

/**
 * 複数の在庫ロットをまとめて更新する
 *
 * @param updates - 更新対象のロットと新しい数量・ステータスの一覧
 */
export const batchUpdateInventoryLots = async (updates: LotUpdate[]): Promise<void> => {
  if (updates.length === 0) return;

  // ロットごとに update を発行する（upsert は意図しない INSERT を起こすため使わない）
  await Promise.all(
    updates.map(async (u) => {
      const { error } = await getSupabase()
        .from("inventory_lots")
        .update({ quantity: u.quantity, status: u.status })
        .eq("id", u.id);
      if (error) throw error;
    }),
  );
};
