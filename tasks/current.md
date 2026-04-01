## Phase 6-3: フォールバック・エラーハンドリング

- ブランチ: `feature/recipe-fallback`
- PR: このグループ完了後に1PR

### 完了条件

- Claude API がエラーを返した場合でもアプリが壊れない
- フォールバック時はユーザーに適切なメッセージを表示する

### タスク

- [x] Claude API タイムアウト・エラー時のフォールバック処理実装
- [x] API レスポンスのバリデーション（Zod で JSON 構造を検証）
- [x] エラー時の UI 表示（「レシピを取得できませんでした」+ 再試行ボタン）

### plan

- 影響ファイル:
  - `src/app/(frontend)/recipes/page.tsx`（try/catch 追加）
  - `src/features/recipes/components/RecipeError.tsx`（新規・エラー UI）
- 実装順:
  1. `RecipeError` コンポーネントを作成（Client Component・再試行ボタン付き）
  2. `recipes/page.tsx` に try/catch を追加し、エラー時に `RecipeError` をレンダー
- 備考:
  - Zod バリデーション（`ClaudeRecipesResponseSchema`）は `generateRecipePrompt.ts` で実装済み。parseClaudeResponse が ZodError を throw → page.tsx の catch で捕捉される形になる
  - `/api/recipes/recommended` ルートは既に try/catch 済みのため変更不要
  - try/catch 内に JSX return を書くと react-hooks/error-boundaries 違反になるため、`let recommended: RecommendedRecipeResponse[] | null = null` で保持し JSX は外に出す形に修正
