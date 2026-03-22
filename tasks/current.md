## Phase 3-2: レシピAPIルート・seedデータ

- ブランチ: `feature/recipe-api-seed`
- PR: このグループ完了後に1PR

### 完了条件

- おすすめレシピAPIが3件返す
- 直近3日の提案済みレシピが除外される

### タスク

- [x] GET /api/recipes/recommended
- [x] GET /api/recipes/:id
- [x] レシピseedデータ（30〜50件）

### plan

- 影響ファイル:
  - src/lib/types/ui.ts（RecommendedRecipeResponse を追加）
  - src/domain/recipe/buildRecommendReason.ts（新規・reason文字列生成）
  - src/server/repositories/recipeRepository.ts（getRecipeById を追加）
  - src/app/api/recipes/recommended/route.ts（新規・GET）
  - src/app/api/recipes/[recipeId]/route.ts（新規・GET）
  - supabase/seed.sql（新規・レシピ35件 + ingredients）
- 実装順:
  1. ui.ts に RecommendedRecipeResponse を追加
  2. buildRecommendReason.ts を実装
  3. recipeRepository に getRecipeById を追加
  4. GET /api/recipes/recommended を実装
  5. GET /api/recipes/:id を実装
  6. supabase/seed.sql を作成
- 設計メモ:
  - recommended レスポンスは id/title/description/cooking_time_minutes/reason のみ（docs/api.md準拠）
  - reason: 期限切れ間近の食材があれば「期限が近いXXを使えます」、なければ「今ある食材だけで作れます」
  - seed.sql は INSERT文。recipe_match_key は food_masters で使う想定のキー
