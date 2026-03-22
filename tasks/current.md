## Phase 1-1: 型定義・Repository

- ブランチ: `feature/inventory-types-repository`
- PR: このグループ完了後に1PR

### 完了条件

- 型定義が揃っている
- RepositoryからSupabaseのデータが取得できる

### タスク

- [x] 型定義（FoodMasterRow / InventoryLotRow / InventorySummaryItem）
- [x] foodMasterRepository（検索）
- [x] inventoryRepository（CRUD）

### plan

- 影響ファイル:
  - src/lib/types/database.ts（FoodMasterRow / InventoryLotRow / 入力型を追加）
  - src/lib/types/ui.ts（InventorySummaryItem を追加）
  - src/server/repositories/foodMasterRepository.ts（新規）
  - src/server/repositories/inventoryRepository.ts（新規）
- 実装順:
  1. database.ts に FoodMasterRow / InventoryLotRow / CreateInventoryLotInput / UpdateInventoryLotInput を定義
  2. ui.ts に InventorySummaryItem を定義
  3. foodMasterRepository.ts を実装（searchFoodMasters）
  4. inventoryRepository.ts を実装（getActiveInventoryLots / createInventoryLot / updateInventoryLot / deleteInventoryLot）
- 設計メモ:
  - InventorySummaryItem は集約済みUI型（food_master + lots の結合結果）。集約ロジック自体はPhase 1-2以降のdomain層で実装
  - repository は supabase を直接呼ぶ。エラーは throw してAPIルートでハンドリング
