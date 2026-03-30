## Phase 5-0: 共通レイアウト（サイドバー）✅

- ブランチ: `feature/ui-layout`
- PR: このグループ完了後に1PR

### タスク

- [x] `src/features/layout/` にサイドバーコンポーネント作成
- [x] `src/app/(frontend)/layout.tsx` にサイドバー組み込み
- [x] Tailwind でオレンジ系カラーをカスタム設定（tailwind.config.ts）

---

## Phase 5-1: ホーム画面

- ブランチ: `feature/ui-home`
- PR: このグループ完了後に1PR

### 完了条件

- 期限が近い食品リストが表示される（期限順）
- おすすめレシピが3件表示される
- 各レシピカードから「詳細を見る」でレシピ詳細画面へ遷移できる

### タスク

- [ ] `src/features/home/` にホームページコンポーネント作成
- [ ] `src/app/(frontend)/page.tsx` にホームページ組み込み
- [ ] GET /api/inventory から期限近い食品を取得して表示
- [ ] GET /api/recipes/recommended からレシピを取得して表示
