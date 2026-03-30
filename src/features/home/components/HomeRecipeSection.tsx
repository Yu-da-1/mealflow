import Link from "next/link";
import { Clock } from "lucide-react";

import type { RecommendedRecipeResponse } from "@/lib/types/ui";

type HomeRecipeSectionProps = {
  recipes: RecommendedRecipeResponse[];
};

/**
 * ホーム画面の「おすすめレシピ」セクション
 *
 * @param recipes - おすすめレシピ一覧（最大3件）
 * @returns おすすめレシピカード一覧セクション
 */
export function HomeRecipeSection({ recipes }: HomeRecipeSectionProps) {
  return (
    <section>
      <h2 className="text-base font-semibold text-foreground mb-3">おすすめレシピ</h2>

      {recipes.length === 0 ? (
        <p className="text-sm text-muted-foreground">現在の在庫で作れるレシピがありません</p>
      ) : (
        <ul className="space-y-3">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="rounded-lg bg-card border border-border px-4 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{recipe.title}</p>
                  <p className="mt-1 text-xs text-primary">{recipe.reason}</p>
                  {recipe.cooking_time_minutes !== null && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {recipe.cooking_time_minutes}分
                    </p>
                  )}
                </div>
                <Link
                  href="/recipes"
                  className="shrink-0 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-sidebar transition-colors"
                >
                  詳細を見る
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
