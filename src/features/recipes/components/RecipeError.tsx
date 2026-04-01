"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export function RecipeError() {
  const router = useRouter();

  return (
    <div className="rounded-xl bg-card border border-border px-6 py-10 text-center space-y-4">
      <p className="text-sm text-foreground font-medium">レシピを取得できませんでした</p>
      <p className="text-xs text-muted-foreground">しばらくしてからもう一度お試しください</p>
      <button
        onClick={() => router.refresh()}
        className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-sidebar transition-colors"
      >
        <RefreshCw size={14} />
        再試行
      </button>
    </div>
  );
}
