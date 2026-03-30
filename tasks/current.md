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

- [x] `src/features/home/` にホームページコンポーネント作成
- [x] `src/app/(frontend)/page.tsx` にホームページ組み込み
- [x] GET /api/inventory から期限近い食品を取得して表示
- [x] GET /api/recipes/recommended からレシピを取得して表示

### plan

- 影響ファイル:
  - `src/features/home/components/HomeExpirationSection.tsx`（新規）
  - `src/features/home/components/HomeRecipeSection.tsx`（新規）
  - `src/app/(frontend)/page.tsx`（更新）
  - `src/app/(frontend)/loading.tsx`（新規）
- データ取得方針:
  - `page.tsx` は `src/app/` 配下（ESLint制限なし）なので repositories + domain を直接呼ぶ
  - レシピ推薦は API ルートと同じ関数群（buildInventoryKeySet / matchRecipe / scoreRecipe / buildRecommendReason）を使う
  - feature コンポーネントはプレゼンテーショナル（props を受け取るだけ）
- 実装順:
  1. HomeExpirationSection.tsx（期限リスト表示）
  2. HomeRecipeSection.tsx（レシピカード表示）
  3. page.tsx（データ取得 + レイアウト）
  4. loading.tsx（スケルトン）
