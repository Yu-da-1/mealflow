## Phase 2-1: 期限自動設定（ドメインロジック・API更新）

- ブランチ: `feature/expiry-auto-setting`
- PR: このグループ完了後に1PR

### 完了条件

- 食品登録時に期限が自動設定される

### タスク

- [x] expiryRules.ts（期限自動設定ロジック）
- [x] POST /api/inventory に期限自動設定を組み込む

### plan

- 影響ファイル:
  - src/domain/inventory/expiryRules.ts（新規・純粋関数）
  - src/domain/inventory/validateCreateInventoryLotInput.ts（更新・expiry_type/expiry_source を除去）
  - src/server/repositories/foodMasterRepository.ts（getFoodMasterById を追加）
  - src/app/api/inventory/route.ts（POST を更新）
- 実装順:
  1. expiryRules.ts を実装（applyExpiryRule 純粋関数）
  2. validateCreateInventoryLotInput を更新（リクエスト body から expiry_type/expiry_source を除去）
  3. foodMasterRepository に getFoodMasterById を追加
  4. POST /api/inventory を更新（food_master 取得 → applyExpiryRule → createInventoryLot）
- 設計メモ:
  - expiry_date が null/未入力 → purchased_at + default_expiry_days で計算、expiry_source = 'estimated'
  - expiry_date が入力済み → そのまま使用、expiry_source = 'manual'
  - expiry_type は常に food_master.default_expiry_type を使用（クライアントから指定しない）
  - food_master が見つからない場合は 404 を返す
