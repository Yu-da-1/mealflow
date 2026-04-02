## Phase 7-1: レシピ関連ロジックのテスト

- ブランチ: `test/domain-recipe`
- PR: このグループ完了後に1PR

### 完了条件

- `scoreRecipe` / `matchRecipe` / `buildInventoryKeySet` / `buildRecommendReason` の全ケースがテストされている
- `pnpm vitest run` がパスする

### タスク

- [x] `scoreRecipe`: 期限切れ食材あり・なし・複数一致のスコア計算
- [x] `matchRecipe`: 必須食材がすべて揃う・一部欠ける・任意食材のみのケース
- [x] `buildInventoryKeySet`: `parent_recipe_match_key` の展開・期限当日/翌日の expiringKeys 判定・期限なしロット
- [x] `buildRecommendReason`: 期限切れ食材あり（表示名あり/なし）・期限切れなし

### plan

- 影響ファイル（新規作成）:
  - `src/domain/recipe/__tests__/scoreRecipe.test.ts`
  - `src/domain/recipe/__tests__/matchRecipe.test.ts`
  - `src/domain/recipe/__tests__/buildRecommendReason.test.ts`
  - （`matchRecipe.ts` に `buildInventoryKeySet` も含まれているため同ファイルでテスト）
- 実装順:
  1. `scoreRecipe.test.ts`
  2. `matchRecipe.test.ts`（`buildInventoryKeySet` + `matchRecipe`）
  3. `buildRecommendReason.test.ts`
- 結果: 22件全パス
