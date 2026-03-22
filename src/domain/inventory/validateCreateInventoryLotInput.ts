import type { CreateInventoryLotInput } from "@/lib/types/database";

type ValidationResult =
  | { valid: true; input: CreateInventoryLotInput }
  | { valid: false; error: string };

export const validateCreateInventoryLotInput = (body: unknown): ValidationResult => {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (!b.food_master_id || typeof b.food_master_id !== "string") {
    return { valid: false, error: "Missing required fields" };
  }
  if (!b.quantity || typeof b.quantity !== "number") {
    return { valid: false, error: "Missing required fields" };
  }
  if (!b.purchased_at || typeof b.purchased_at !== "string") {
    return { valid: false, error: "Missing required fields" };
  }
  if (b.expiry_type !== "best_before" && b.expiry_type !== "use_by") {
    return { valid: false, error: "Missing required fields" };
  }
  if (b.expiry_source !== "estimated" && b.expiry_source !== "manual") {
    return { valid: false, error: "Missing required fields" };
  }

  return {
    valid: true,
    input: {
      food_master_id: b.food_master_id,
      quantity: b.quantity,
      purchased_at: b.purchased_at,
      expiry_date: typeof b.expiry_date === "string" ? b.expiry_date : null,
      expiry_type: b.expiry_type,
      expiry_source: b.expiry_source,
    },
  };
};
