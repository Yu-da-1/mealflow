const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: string): boolean =>
  DATE_PATTERN.test(value) && !isNaN(Date.parse(value));

type PostInventoryRequestBody = {
  food_master_id: string;
  quantity: number;
  purchased_at: string;
  expiry_date?: string | null;
};

type ValidationResult =
  | { valid: true; input: PostInventoryRequestBody }
  | { valid: false; error: string };

export const validateCreateInventoryLotInput = (body: unknown): ValidationResult => {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  if (!b.food_master_id || typeof b.food_master_id !== "string") {
    return { valid: false, error: "Missing required field: food_master_id" };
  }
  if (typeof b.quantity !== "number" || !Number.isInteger(b.quantity) || b.quantity < 1) {
    return { valid: false, error: "quantity must be an integer >= 1" };
  }
  if (!b.purchased_at || typeof b.purchased_at !== "string") {
    return { valid: false, error: "Missing required field: purchased_at" };
  }
  if (!isValidDate(b.purchased_at)) {
    return { valid: false, error: "purchased_at must be a valid date in YYYY-MM-DD format" };
  }

  const expiry_date = typeof b.expiry_date === "string" ? b.expiry_date : null;
  if (expiry_date !== null && !isValidDate(expiry_date)) {
    return { valid: false, error: "expiry_date must be a valid date in YYYY-MM-DD format" };
  }

  return {
    valid: true,
    input: {
      food_master_id: b.food_master_id,
      quantity: b.quantity,
      purchased_at: b.purchased_at,
      expiry_date,
    },
  };
};
