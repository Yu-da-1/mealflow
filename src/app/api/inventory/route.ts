import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { buildInventorySummary } from "@/domain/inventory/buildInventorySummary";
import { applyExpiryRule } from "@/domain/inventory/expiryRules";
import { validateCreateInventoryLotInput } from "@/domain/inventory/validateCreateInventoryLotInput";
import { getFoodMasterById, getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import {
  createInventoryLot,
  getActiveInventoryLots,
} from "@/server/repositories/inventoryRepository";

export const GET = async (): Promise<NextResponse> => {
  try {
    const lots = await getActiveInventoryLots();
    const ids = [...new Set(lots.map((l) => l.food_master_id))];
    const foodMasters = await getFoodMastersByIds(ids);
    const summary = buildInventorySummary(lots, foodMasters);
    return NextResponse.json(summary);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateCreateInventoryLotInput(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const foodMaster = await getFoodMasterById(validation.input.food_master_id);
    if (!foodMaster) {
      return NextResponse.json({ error: "Food master not found" }, { status: 404 });
    }

    const expiry = applyExpiryRule(
      validation.input.purchased_at,
      validation.input.expiry_date,
      foodMaster,
    );

    const lot = await createInventoryLot({
      food_master_id: validation.input.food_master_id,
      quantity: validation.input.quantity,
      purchased_at: validation.input.purchased_at,
      ...expiry,
    });
    revalidateTag("recommended-recipes", {});
    return NextResponse.json(lot, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create inventory lot" }, { status: 500 });
  }
};
