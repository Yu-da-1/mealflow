"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Clock, CheckCircle } from "lucide-react";

import type { RecipeWithIngredients, RecommendedRecipeResponse } from "@/lib/types/ui";

type RecipeConfirmModalProps = {
  recipe: RecipeWithIngredients;
  reason: RecommendedRecipeResponse["reason"];
  onClose: () => void;
};

/**
 * レシピ確認・確定モーダル
 *
 * @param recipe - 詳細を表示するレシピ（食材一覧含む）
 * @param reason - おすすめ理由（推薦ロジックによる説明文）
 * @param onClose - モーダルを閉じるコールバック
 * @returns 食材確認・在庫減算確定が可能なモーダル
 */
export function RecipeConfirmModal({ recipe, reason, onClose }: RecipeConfirmModalProps) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const ingredient_keys = recipe.ingredients.map((i) => i.recipe_match_key);
      const res = await fetch("/api/inventory/consume-from-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id: recipe.id, ingredient_keys }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError((data as { error?: string }).error ?? "確定に失敗しました");
        return;
      }
      router.push("/inventory");
    } catch {
      setError("確定に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const requiredIngredients = recipe.ingredients.filter((i) => i.is_required);
  const optionalIngredients = recipe.ingredients.filter((i) => !i.is_required);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl bg-card shadow-xl mx-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">{recipe.title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar transition-colors"
            aria-label="閉じる"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* レシピ情報 */}
          <div className="space-y-1">
            <p className="text-xs text-primary">{reason}</p>
            {recipe.cooking_time_minutes !== null && (
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                {recipe.cooking_time_minutes}分
              </p>
            )}
            {recipe.description && (
              <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
            )}
          </div>

          {/* 使用食材 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">使用食材</p>

            {requiredIngredients.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">必須</p>
                <ul className="flex flex-wrap gap-1.5">
                  {requiredIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      {ingredient.recipe_match_key}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {optionalIngredients.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">任意</p>
                <ul className="flex flex-wrap gap-1.5">
                  {optionalIngredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="rounded-full bg-sidebar px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {ingredient.recipe_match_key}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* アクション */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <button
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <CheckCircle size={14} />
              {submitting ? "処理中..." : "確定する"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
