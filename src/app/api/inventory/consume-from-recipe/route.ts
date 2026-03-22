import { NextRequest, NextResponse } from "next/server";

import { computeConsumption } from "@/domain/inventory/consumeLogic";
import { validateConsumeFromRecipeInput } from "@/domain/inventory/validateConsumeFromRecipeInput";
import {
  batchUpdateInventoryLots,
  getActiveInventoryLots,
} from "@/server/repositories/inventoryRepository";
import { getFoodMastersByIds } from "@/server/repositories/foodMasterRepository";
import { createRecommendationLog } from "@/server/repositories/recipeRepository";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateConsumeFromRecipeInput(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { recipe_id, ingredient_keys } = validation.input;

  try {
    const lots = await getActiveInventoryLots();
    const foodMasterIds = [...new Set(lots.map((l) => l.food_master_id))];
    const foodMasters = await getFoodMastersByIds(foodMasterIds);

    const updates = computeConsumption(lots, foodMasters, ingredient_keys);

    await batchUpdateInventoryLots(updates);

    await createRecommendationLog(recipe_id);

    return NextResponse.json({ updated: updates.length });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to consume inventory" }, { status: 500 });
  }
};
