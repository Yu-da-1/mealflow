import { NextResponse } from "next/server";

import { resolveBarcodeResult } from "@/domain/barcode/resolveBarcodeResult";
import { findFoodMasterByJanCode } from "@/server/repositories/janCodeRepository";
import { fetchFromOpenFoodFacts } from "@/server/repositories/openFoodFactsRepository";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
): Promise<NextResponse> => {
  try {
    const { code } = await params;

    const master = await findFoodMasterByJanCode(code);

    // マスタヒット時は OFF を呼ばずに即返す
    if (master) {
      const result = resolveBarcodeResult(master);
      return NextResponse.json(result);
    }

    const off = await fetchFromOpenFoodFacts(code);
    const result = resolveBarcodeResult(null, off);

    if (!result) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};
