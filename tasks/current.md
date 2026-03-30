## Phase 5-2: 食品一覧画面

- ブランチ: `feature/ui-food-list`
- PR: このグループ完了後に1PR

### 完了条件

- 登録済み食品がカード形式で表示される
- 各カードに食品名・数量・期限が表示される
- 「詳細を見る」でロット詳細モーダルが開く
- モーダル内でロットの追加・編集・削除ができる

### タスク

- [x] `src/features/inventory/` に食品一覧ページコンポーネント作成
- [x] `src/app/(frontend)/inventory/page.tsx` 作成
- [x] GET /api/inventory からデータ取得・表示
- [x] 食品詳細モーダルコンポーネント作成（ロット一覧・追加・削除）
- [x] ロット編集フォーム（PATCH /api/inventory/:lotId）

### plan

- 影響ファイル:
  - `src/features/inventory/components/InventoryList.tsx`（新規・Client Component）
  - `src/features/inventory/components/InventoryDetailModal.tsx`（新規・Client Component）
  - `src/app/(frontend)/inventory/page.tsx`（新規・Server Component）
- データフロー:
  - `page.tsx` が repositories から直接データ取得 → `InventoryList` に props として渡す
  - mutations（追加・編集・削除）後は `router.refresh()` で Server Component を再取得
  - 並び順: 期限当日 → 翌日 → 近い順 → なし/遠い順（page.tsx でソート）
- モーダル内容:
  - ロット一覧（数量・購入日・期限日・期限種別・設定元）
  - ロット追加フォーム（POST /api/inventory: food_master_id・quantity・purchased_at）
  - ロット編集（PATCH /api/inventory/:lotId: quantity・expiry_date・expiry_type）
  - ロット削除（DELETE /api/inventory/:lotId）
- 実装順:
  1. InventoryDetailModal.tsx（モーダル + ロット操作フォーム）
  2. InventoryList.tsx（カード一覧 + モーダル開閉制御）
  3. page.tsx（データ取得・ソート）
