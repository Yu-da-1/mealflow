import { NextRequest, NextResponse } from "next/server";

import { searchFoodMasters } from "@/server/repositories/foodMasterRepository";

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const query = request.nextUrl.searchParams.get("query") ?? "";

  try {
    const data = await searchFoodMasters(query);
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch food masters" }, { status: 500 });
  }
};
