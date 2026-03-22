## Phase 4-1: 在庫減算（バックエンド）

- ブランチ: `feature/inventory-consume`
- PR: このグループ完了後に1PR

### 完了条件

- レシピ確定後に在庫が減算される
- 提案履歴が記録される

### タスク

- [x] consumeLogic.ts（在庫減算ロジック）
- [x] POST /api/inventory/consume-from-recipe
- [x] recipe_recommendation_logs 記録処理

### plan

- 影響ファイル:
  - `src/lib/types/database.ts`（ConsumeFromRecipeInput 型追加）
  - `src/domain/inventory/consumeLogic.ts`（新規: 在庫減算ロジック純粋関数）
  - `src/domain/inventory/validateConsumeFromRecipeInput.ts`（新規: 入力バリデーション）
  - `src/server/repositories/inventoryRepository.ts`（batchUpdateInventoryLots 追加）
  - `src/server/repositories/recipeRepository.ts`（createRecommendationLog 追加）
  - `src/app/api/inventory/consume-from-recipe/route.ts`（新規: POSTルート）
- 実装順:
  1. 型定義を追加する（ConsumeFromRecipeInput）
  2. consumeLogic.ts（純粋関数: 食材キーから消費対象ロットとその更新内容を算出）
  3. validateConsumeFromRecipeInput.ts（リクエスト入力のバリデーション）
  4. inventoryRepository に batchUpdateInventoryLots を追加
  5. recipeRepository に createRecommendationLog を追加
  6. POST /api/inventory/consume-from-recipe ルートを実装
- 設計メモ:
  - consumeLogic は副作用なし。ロット更新内容の差分を返す
  - 各 ingredient_key について 1 単位を消費
  - ロット優先順: expiry_date 近い順（null は末尾）→ purchased_at 古い順
  - quantity が 0 になったロットは status='consumed' にする
