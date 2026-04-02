import { describe, expect, it } from "vitest";
import { validateUpdateInventoryLotInput } from "../validateUpdateInventoryLotInput";

describe("validateUpdateInventoryLotInput", () => {
  it("should return valid with empty object", () => {
    const result = validateUpdateInventoryLotInput({});

    expect(result.valid).toBe(true);
  });

  it("should return valid when only quantity is provided", () => {
    const result = validateUpdateInventoryLotInput({ quantity: 5 });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input.quantity).toBe(5);
    }
  });

  it("should return valid when only expiry_date is provided", () => {
    const result = validateUpdateInventoryLotInput({ expiry_date: "2024-01-15" });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input.expiry_date).toBe("2024-01-15");
    }
  });

  it("should return valid when expiry_date is null", () => {
    const result = validateUpdateInventoryLotInput({ expiry_date: null });

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.input.expiry_date).toBeNull();
    }
  });

  it("should return invalid when body is null", () => {
    const result = validateUpdateInventoryLotInput(null);

    expect(result.valid).toBe(false);
  });

  it("should return invalid when quantity is not a number", () => {
    const result = validateUpdateInventoryLotInput({ quantity: "five" });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/quantity/);
    }
  });

  it("should return invalid when expiry_type has invalid value", () => {
    const result = validateUpdateInventoryLotInput({ expiry_type: "unknown" });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/expiry_type/);
    }
  });

  it("should return valid for each allowed expiry_type value", () => {
    expect(validateUpdateInventoryLotInput({ expiry_type: "best_before" }).valid).toBe(true);
    expect(validateUpdateInventoryLotInput({ expiry_type: "use_by" }).valid).toBe(true);
  });

  it("should return invalid when expiry_source has invalid value", () => {
    const result = validateUpdateInventoryLotInput({ expiry_source: "unknown" });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/expiry_source/);
    }
  });

  it("should return valid for each allowed expiry_source value", () => {
    expect(validateUpdateInventoryLotInput({ expiry_source: "estimated" }).valid).toBe(true);
    expect(validateUpdateInventoryLotInput({ expiry_source: "manual" }).valid).toBe(true);
  });

  it("should return invalid when status has invalid value", () => {
    const result = validateUpdateInventoryLotInput({ status: "unknown" });

    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error).toMatch(/status/);
    }
  });

  it("should return valid for each allowed status value", () => {
    expect(validateUpdateInventoryLotInput({ status: "active" }).valid).toBe(true);
    expect(validateUpdateInventoryLotInput({ status: "consumed" }).valid).toBe(true);
    expect(validateUpdateInventoryLotInput({ status: "discarded" }).valid).toBe(true);
  });
});
