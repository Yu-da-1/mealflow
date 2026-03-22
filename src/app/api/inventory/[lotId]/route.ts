import { NextRequest, NextResponse } from "next/server";

import { validateUpdateInventoryLotInput } from "@/domain/inventory/validateUpdateInventoryLotInput";
import { deleteInventoryLot, updateInventoryLot } from "@/server/repositories/inventoryRepository";

type Params = { params: Promise<{ lotId: string }> };

export const PATCH = async (request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { lotId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateUpdateInventoryLotInput(body);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const lot = await updateInventoryLot(lotId, validation.input);
    return NextResponse.json(lot);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update inventory lot" }, { status: 500 });
  }
};

export const DELETE = async (_request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { lotId } = await params;

  try {
    await deleteInventoryLot(lotId);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete inventory lot" }, { status: 500 });
  }
};
