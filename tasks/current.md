## Phase 6-1: Claude API 統合・プロンプト設計・APIルート更新

- ブランチ: `feature/claude-recipe-generation`
- PR: このグループ完了後に1PR

### 完了条件

- `ANTHROPIC_API_KEY` を環境変数で管理できる
- 在庫食材を渡すと Claude API からレシピ3件（タイトル・説明・手順・調理時間）が返る
- `GET /api/recipes/recommended` が Claude 生成レシピを返す

### タスク

- [x] `@anthropic-ai/sdk` をインストール
- [x] `ANTHROPIC_API_KEY` を `.env.local.example` に追加（実際の値は `.env.local` に手動で追加が必要）
- [x] `src/server/repositories/claudeRecipeRepository.ts` を作成（Claude API 呼び出し）
- [x] プロンプト設計（在庫食材 → 日本語レシピ3件・JSON形式で返す）
- [x] `src/domain/recipe/generateRecipePrompt.ts` を作成（プロンプト組み立て純粋関数）
- [x] `GET /api/recipes/recommended` を Claude 生成に切り替え
