## Phase 7-2: 在庫ロジックのテスト

- ブランチ: `test/domain-inventory`
- PR: このグループ完了後に1PR

### 完了条件

- `computeConsumption` / `applyExpiryRule` / `buildInventorySummary` の全ケースがテストされている
- `pnpm vitest run` がパスする

### タスク

- [x] `computeConsumption`: 単一ロット消費・複数ロットの expiry_date 近い順優先・purchased_at 古い順優先・expiry_date null のロットが末尾・quantity=0 で consumed に遷移・`parent_recipe_match_key` 経由の一致
- [x] `applyExpiryRule`: expiry_date 指定あり（manual）・なし（estimated・日数計算の正確性）
- [x] `buildInventorySummary`: 複数ロットの合計数量・最近期限の選択・期限なしロットのみ

### plan

- 影響ファイル（新規作成）:
  - `src/domain/inventory/__tests__/consumeLogic.test.ts`
  - `src/domain/inventory/__tests__/expiryRules.test.ts`
  - `src/domain/inventory/__tests__/buildInventorySummary.test.ts`
- 実装順:
  1. `consumeLogic.test.ts`（最も複雑・ソートロジックを重点的にカバー）
  2. `expiryRules.test.ts`
  3. `buildInventorySummary.test.ts`
- 結果: 44件全パス（Phase 7-1 の 22件 + 今回 22件）
