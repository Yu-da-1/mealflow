import { supabase } from "@/server/supabase";

import type {
  CreateInventoryLotInput,
  InventoryLotRow,
  UpdateInventoryLotInput,
} from "@/lib/types/database";
import type { LotUpdate } from "@/domain/inventory/consumeLogic";

export const getActiveInventoryLots = async (): Promise<InventoryLotRow[]> => {
  const { data, error } = await supabase
    .from("inventory_lots")
    .select("*")
    .eq("status", "active")
    .order("expiry_date", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data;
};

export const createInventoryLot = async (
  input: CreateInventoryLotInput,
): Promise<InventoryLotRow> => {
  const { data, error } = await supabase.from("inventory_lots").insert(input).select().single();

  if (error) throw error;
  return data;
};

export const updateInventoryLot = async (
  id: string,
  input: UpdateInventoryLotInput,
): Promise<InventoryLotRow> => {
  const { data, error } = await supabase
    .from("inventory_lots")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteInventoryLot = async (id: string): Promise<void> => {
  const { error } = await supabase.from("inventory_lots").delete().eq("id", id);

  if (error) throw error;
};

export const batchUpdateInventoryLots = async (updates: LotUpdate[]): Promise<void> => {
  if (updates.length === 0) return;

  // ロットごとに update を発行する（upsert は意図しない INSERT を起こすため使わない）
  await Promise.all(
    updates.map(async (u) => {
      const { error } = await supabase
        .from("inventory_lots")
        .update({ quantity: u.quantity, status: u.status })
        .eq("id", u.id);
      if (error) throw error;
    }),
  );
};
