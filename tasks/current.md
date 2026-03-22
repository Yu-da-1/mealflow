## Phase 3-1: レシピ提案（ドメインロジック・Repository）

- ブランチ: `feature/recipe-domain-logic`
- PR: このグループ完了後に1PR

### 完了条件

- レシピの一致判定・スコアリングのロジックが動く

### タスク

- [x] matchRecipe.ts（一致判定）
- [x] scoreRecipe.ts（スコアリング）
- [x] recipeRepository

### plan

- 影響ファイル:
  - src/lib/types/database.ts（RecipeRow / RecipeIngredientRow / RecipeRecommendationLogRow を追加）
  - src/lib/types/ui.ts（RecipeWithIngredients を追加）
  - src/domain/recipe/matchRecipe.ts（新規・一致判定 + inventoryKeySet ビルド関数）
  - src/domain/recipe/scoreRecipe.ts（新規・スコアリング）
  - src/server/repositories/recipeRepository.ts（新規）
- 実装順:
  1. database.ts に RecipeRow / RecipeIngredientRow / RecipeRecommendationLogRow を追加
  2. ui.ts に RecipeWithIngredients を追加
  3. matchRecipe.ts を実装（buildInventoryKeySet / matchRecipe）
  4. scoreRecipe.ts を実装
  5. recipeRepository.ts を実装（getActiveRecipesWithIngredients / getRecentlyRecommendedRecipeIds）
- 設計メモ:
  - 一致判定: recipe_ingredient の recipe_match_key が在庫の recipe_match_key OR parent_recipe_match_key に含まれれば一致
  - is_required=true の食材が全て一致するレシピのみ候補
  - スコア = (期限当日・翌日の食材数 × 20) + (一致食材数 × 10)
  - buildInventoryKeySet は domain 層に置き、API ルートでロジックを書かないようにする
