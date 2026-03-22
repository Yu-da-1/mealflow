import type { UpdateInventoryLotInput } from "@/lib/types/database";

type ValidationResult =
  | { valid: true; input: UpdateInventoryLotInput }
  | { valid: false; error: string };

export const validateUpdateInventoryLotInput = (body: unknown): ValidationResult => {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;
  const input: UpdateInventoryLotInput = {};

  if ("quantity" in b) {
    if (typeof b.quantity !== "number") {
      return { valid: false, error: "Invalid field: quantity" };
    }
    input.quantity = b.quantity;
  }

  if ("expiry_date" in b) {
    if (b.expiry_date !== null && typeof b.expiry_date !== "string") {
      return { valid: false, error: "Invalid field: expiry_date" };
    }
    input.expiry_date = b.expiry_date as string | null;
  }

  if ("expiry_type" in b) {
    if (b.expiry_type !== "best_before" && b.expiry_type !== "use_by") {
      return { valid: false, error: "Invalid field: expiry_type" };
    }
    input.expiry_type = b.expiry_type;
  }

  if ("expiry_source" in b) {
    if (b.expiry_source !== "estimated" && b.expiry_source !== "manual") {
      return { valid: false, error: "Invalid field: expiry_source" };
    }
    input.expiry_source = b.expiry_source;
  }

  if ("status" in b) {
    if (b.status !== "active" && b.status !== "consumed" && b.status !== "discarded") {
      return { valid: false, error: "Invalid field: status" };
    }
    input.status = b.status;
  }

  return { valid: true, input };
};
