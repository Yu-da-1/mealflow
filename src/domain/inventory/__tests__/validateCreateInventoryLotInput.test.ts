import { describe, expect, it } from "vitest";
import { validateCreateInventoryLotInput } from "../validateCreateInventoryLotInput";

describe("validateCreateInventoryLotInput", () => {
  it("should return valid result with all fields provided", () => {
    const body = {
      food_master_id: "fm-1",
      quantity: 3,
      purchased_at: "2024-01-01",
      expiry_date: "2024-01-15",
    };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input).toEqual(body);
    }
  });

  it("should return valid result without expiry_date", () => {
    const body = {
      food_master_id: "fm-1",
      quantity: 3,
      purchased_at: "2024-01-01",
    };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input.expiry_date).toBeNull();
    }
  });

  it("should return invalid when body is null", () => {
    const result = validateCreateInventoryLotInput(null);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when food_master_id is missing", () => {
    const body = { quantity: 3, purchased_at: "2024-01-01" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/food_master_id/);
    }
  });

  it("should return invalid when quantity is 0", () => {
    const body = { food_master_id: "fm-1", quantity: 0, purchased_at: "2024-01-01" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/quantity/);
    }
  });

  it("should return invalid when quantity is a decimal", () => {
    const body = { food_master_id: "fm-1", quantity: 1.5, purchased_at: "2024-01-01" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when quantity is a string", () => {
    const body = { food_master_id: "fm-1", quantity: "3", purchased_at: "2024-01-01" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when purchased_at has invalid date format", () => {
    const body = { food_master_id: "fm-1", quantity: 1, purchased_at: "01-01-2024" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/purchased_at/);
    }
  });

  it("should return invalid when purchased_at is not a real date", () => {
    const body = { food_master_id: "fm-1", quantity: 1, purchased_at: "2024-99-99" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when expiry_date has invalid date format", () => {
    const body = { food_master_id: "fm-1", quantity: 1, purchased_at: "2024-01-01", expiry_date: "not-a-date" };

    const result = validateCreateInventoryLotInput(body);

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/expiry_date/);
    }
  });
});
