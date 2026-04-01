## Phase 6-1: Claude API 統合・プロンプト設計・APIルート更新

- ブランチ: `feature/claude-recipe-generation`
- PR: このグループ完了後に1PR

### 完了条件

- `ANTHROPIC_API_KEY` を環境変数で管理できる
- 在庫食材を渡すと Claude API からレシピ3件（タイトル・説明・手順・調理時間）が返る
- `GET /api/recipes/recommended` が Claude 生成レシピを返す

### タスク

- [ ] `@anthropic-ai/sdk` をインストール
- [ ] `ANTHROPIC_API_KEY` を `.env.local` と `.env.example` に追加
- [ ] `src/server/repositories/claudeRecipeRepository.ts` を作成（Claude API 呼び出し）
- [ ] プロンプト設計（在庫食材 → 日本語レシピ3件・JSON形式で返す）
- [ ] `src/domain/recipe/generateRecipePrompt.ts` を作成（プロンプト組み立て純粋関数）
- [ ] `GET /api/recipes/recommended` を Claude 生成に切り替え
