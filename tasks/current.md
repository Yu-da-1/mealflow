## Phase 6-4: UI 更新

- ブランチ: `feature/recipe-ui-update`
- PR: このグループ完了後に1PR

### 完了条件

- レシピ生成中はローディング表示される
- 生成されたレシピの手順（instructions）がモーダル内に表示される

### タスク

- [x] レシピ生成中のローディング UI（スケルトンまたはスピナー）
- [x] レシピ詳細モーダルに手順（instructions）表示を追加
- [x] 手順のステップ番号付き表示（1. 〜 2. 〜 の形式）

### plan

- 影響ファイル:
  - `src/app/(frontend)/recipes/loading.tsx`（新規・Next.js loading convention）
  - `src/features/recipes/components/RecipeConfirmModal.tsx`（instructions セクション追加）
- 実装順:
  1. `loading.tsx` を作成（レシピカード3枚分のスケルトン）
  2. `RecipeConfirmModal` に instructions セクションを追加
- 備考:
  - instructions は `"1. 手順1\n2. 手順2"` 形式で既にステップ番号入り → `split('\n')` で各行をレンダーするだけでよい
  - `RecipeWithIngredients` は `RecipeRow & { ingredients }` で `instructions: string | null` を既に持つ
