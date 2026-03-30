export default function Loading() {
  return (
    <div className="p-6 max-w-2xl animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-20 rounded bg-sidebar-accent" />
        <div className="h-9 w-28 rounded-lg bg-sidebar-accent" />
      </div>

      <div className="mb-6 h-4 w-40 rounded bg-sidebar-accent" />

      <div className="space-y-8">
        {/* 期限セクション */}
        <div>
          <div className="mb-3 h-5 w-32 rounded bg-sidebar-accent" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-lg bg-sidebar-accent" />
            ))}
          </div>
        </div>

        {/* レシピセクション */}
        <div>
          <div className="mb-3 h-5 w-36 rounded bg-sidebar-accent" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-sidebar-accent" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
