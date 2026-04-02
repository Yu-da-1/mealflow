import { describe, expect, it } from "vitest";
import { applyExpiryRule } from "../expiryRules";
import type { FoodMasterRow } from "@/lib/types/database";

const baseMaster = (overrides: Partial<Pick<FoodMasterRow, "default_expiry_type" | "default_expiry_days">>) => ({
  default_expiry_type: "best_before" as const,
  default_expiry_days: 7,
  ...overrides,
});

describe("applyExpiryRule", () => {
  it("should return manual source when expiry_date is provided", () => {
    const master = baseMaster({});

    const result = applyExpiryRule("2024-01-01", "2024-01-10", master);

    expect(result).toEqual({
      expiry_date: "2024-01-10",
      expiry_type: "best_before",
      expiry_source: "manual",
    });
  });

  it("should return estimated source when expiry_date is not provided", () => {
    const master = baseMaster({ default_expiry_days: 7 });

    const result = applyExpiryRule("2024-01-01", null, master);

    expect(result.expiry_source).toBe("estimated");
  });

  it("should calculate expiry_date by adding default_expiry_days to purchased_at", () => {
    const master = baseMaster({ default_expiry_days: 14 });

    const result = applyExpiryRule("2024-01-01", null, master);

    expect(result.expiry_date).toBe("2024-01-15");
  });

  it("should copy default_expiry_type from food master", () => {
    const master = baseMaster({ default_expiry_type: "use_by" });

    const result = applyExpiryRule("2024-01-01", null, master);

    expect(result.expiry_type).toBe("use_by");
  });

  it("should also copy default_expiry_type from food master when expiry_date is manually provided", () => {
    const master = baseMaster({ default_expiry_type: "use_by" });

    const result = applyExpiryRule("2024-01-01", "2024-01-10", master);

    expect(result.expiry_type).toBe("use_by");
  });

  it("should handle undefined expiry_date the same as null", () => {
    const master = baseMaster({ default_expiry_days: 3 });

    const result = applyExpiryRule("2024-01-01", undefined, master);

    expect(result.expiry_source).toBe("estimated");
    expect(result.expiry_date).toBe("2024-01-04");
  });
});
