## Phase 5-3: 食品登録画面

- ブランチ: `feature/ui-food-register`
- PR: このグループ完了後に1PR

### 完了条件

- 食品名（マスタ検索）・数量・購入日・期限種別を入力できる
- 「自動設定」選択時は期限日が自動入力される
- 登録後に食品一覧へリダイレクトされる

### タスク

- [x] `src/features/inventory/` に食品登録フォームコンポーネント作成
- [x] `src/app/(frontend)/inventory/new/page.tsx` 作成
- [x] GET /api/food-masters で食品名インクリメンタル検索
- [x] POST /api/inventory で登録処理

### plan

- 影響ファイル:
  - `src/features/inventory/components/FoodRegisterForm.tsx`（新規・Client Component）
  - `src/app/(frontend)/inventory/new/page.tsx`（新規・Server Component ラッパー）
- 実装方針:
  - フォームは全部 useState で管理（TanStack Query / RHF は未インストール）
  - 食品名入力 → 300ms debounce で GET /api/food-masters?query=... → サジェスト表示
  - マスタ選択 + 購入日入力 → `purchased_at + default_expiry_days` でクライアント側期限自動計算 → expiryDate にセット
  - 登録成功後 → router.push('/inventory')
- 実装順:
  1. FoodRegisterForm.tsx
  2. inventory/new/page.tsx
