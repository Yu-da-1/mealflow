## Phase 1-2: APIルート

- ブランチ: `feature/inventory-api-routes`
- PR: このグループ完了後に1PR

### 完了条件

- 全APIエンドポイントがレスポンスを返す

### タスク

- [x] GET /api/food-masters
- [x] GET /api/inventory（集約）
- [x] POST /api/inventory
- [x] PATCH /api/inventory/:lotId
- [x] DELETE /api/inventory/:lotId

### plan

- 影響ファイル:
  - src/server/repositories/foodMasterRepository.ts（getFoodMastersByIds を追加）
  - src/domain/inventory/buildInventorySummary.ts（新規・純粋集約関数）
  - src/app/api/food-masters/route.ts（新規・GET）
  - src/app/api/inventory/route.ts（新規・GET / POST）
  - src/app/api/inventory/[lotId]/route.ts（新規・PATCH / DELETE）
- 実装順:
  1. foodMasterRepository に getFoodMastersByIds を追加
  2. domain/inventory/buildInventorySummary.ts を実装
  3. GET /api/food-masters
  4. GET /api/inventory（集約）・POST /api/inventory
  5. PATCH /api/inventory/:lotId・DELETE /api/inventory/:lotId
- 設計メモ:
  - 集約ロジック（buildInventorySummary）は domain 層の純粋関数
  - POST は Phase 1-2 では expiry_date/type/source をリクエストからそのまま受け取る（Phase 2 で自動設定を追加）
  - エラーハンドリングは API ルートで行い、Supabase エラーは 500、バリデーションエラーは 400 で返す
