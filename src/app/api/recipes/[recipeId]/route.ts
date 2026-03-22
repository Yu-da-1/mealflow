import { NextRequest, NextResponse } from "next/server";

import { getRecipeById } from "@/server/repositories/recipeRepository";

type Params = { params: Promise<{ recipeId: string }> };

export const GET = async (_request: NextRequest, { params }: Params): Promise<NextResponse> => {
  const { recipeId } = await params;

  try {
    const recipe = await getRecipeById(recipeId);
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    return NextResponse.json(recipe);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
};
