import type { CreateInventoryLotInput, FoodMasterRow } from "@/lib/types/database";

type ExpiryResult = Pick<CreateInventoryLotInput, "expiry_date" | "expiry_type" | "expiry_source">;

export const applyExpiryRule = (
  purchased_at: string,
  expiry_date: string | null | undefined,
  foodMaster: Pick<FoodMasterRow, "default_expiry_type" | "default_expiry_days">,
): ExpiryResult => {
  if (expiry_date) {
    return {
      expiry_date,
      expiry_type: foodMaster.default_expiry_type,
      expiry_source: "manual",
    };
  }

  const base = new Date(purchased_at);
  base.setDate(base.getDate() + foodMaster.default_expiry_days);
  const computed = base.toISOString().slice(0, 10);

  return {
    expiry_date: computed,
    expiry_type: foodMaster.default_expiry_type,
    expiry_source: "estimated",
  };
};
