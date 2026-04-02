## Phase 7-3: バリデーションのテスト

- ブランチ: `test/domain-validation`
- PR: このグループ完了後に1PR

### 完了条件

- 3つのバリデーション関数の正常系・各フィールドの異常系がテストされている
- `pnpm vitest run` がパスする

### タスク

- [x] `validateCreateInventoryLotInput`: 正常系・food_master_id 欠損・quantity が 0/小数/文字列・purchased_at の日付フォーマット不正・expiry_date の日付フォーマット不正
- [x] `validateUpdateInventoryLotInput`: 正常系（各フィールド個別更新）・quantity が数値以外・expiry_type/expiry_source/status が不正値
- [x] `validateConsumeFromRecipeInput`: 正常系・recipe_id 欠損・ingredient_keys が空配列・文字列以外の要素を含む

### plan

- 影響ファイル（新規作成）:
  - `src/domain/inventory/__tests__/validateCreateInventoryLotInput.test.ts`
  - `src/domain/inventory/__tests__/validateUpdateInventoryLotInput.test.ts`
  - `src/domain/inventory/__tests__/validateConsumeFromRecipeInput.test.ts`
- 実装順:
  1. `validateCreateInventoryLotInput.test.ts`
  2. `validateUpdateInventoryLotInput.test.ts`
  3. `validateConsumeFromRecipeInput.test.ts`
- 結果: 72件全パス（累計）
