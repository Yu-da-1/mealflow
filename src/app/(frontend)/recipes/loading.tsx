function SkeletonCard() {
  return (
    <li className="rounded-xl bg-card border border-border px-5 py-5 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-3 w-1/3 rounded bg-muted" />
          <div className="h-3 w-1/4 rounded bg-muted" />
          <div className="h-3 w-full rounded bg-muted" />
        </div>
        <div className="h-8 w-16 shrink-0 rounded-md bg-muted" />
      </div>
    </li>
  );
}

export default function RecipesLoading() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">おすすめレシピ</h1>
        <p className="mt-1 text-sm text-muted-foreground">レシピを生成しています...</p>
      </div>
      <ul className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </ul>
    </div>
  );
}
