## Phase 5-4: おすすめレシピ画面

- ブランチ: `feature/ui-recipes`
- PR: このグループ完了後に1PR

### 完了条件

- おすすめレシピ3件がカード表示される
- 「詳細を見る」で使用食材の確認モーダルが開く
- 「確定する」で在庫減算APIが呼ばれ食品一覧へ遷移する

### タスク

- [x] `src/features/recipes/` にレシピ一覧ページコンポーネント作成
- [x] `src/app/(frontend)/recipes/page.tsx` 作成
- [x] GET /api/recipes/recommended からレシピ取得・表示
- [x] 食材確認モーダルコンポーネント作成
- [x] POST /api/inventory/consume-from-recipe で在庫減算
