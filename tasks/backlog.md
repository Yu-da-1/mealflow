# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 6: Claude API によるレシピ生成

在庫食材を Claude API に渡し、手順付きレシピをリアルタイム生成する。
設計の詳細は `docs/decisions/002-recipe-generation-with-claude-api.md` を参照。

---

### Phase 6-1: Claude API 統合・プロンプト設計・APIルート更新

- ブランチ: `feature/claude-recipe-generation`
- PR: このグループ完了後に1PR

#### 完了条件

- `ANTHROPIC_API_KEY` を環境変数で管理できる
- 在庫食材を渡すと Claude API からレシピ3件（タイトル・説明・手順・調理時間）が返る
- `GET /api/recipes/recommended` が Claude 生成レシピを返す

#### タスク

- [ ] `@anthropic-ai/sdk` をインストール
- [ ] `ANTHROPIC_API_KEY` を `.env.local` と `.env.example` に追加
- [ ] `src/server/repositories/claudeRecipeRepository.ts` を作成（Claude API 呼び出し）
- [ ] プロンプト設計（在庫食材 → 日本語レシピ3件・JSON形式で返す）
- [ ] `src/domain/recipe/generateRecipePrompt.ts` を作成（プロンプト組み立て純粋関数）
- [ ] `GET /api/recipes/recommended` を Claude 生成に切り替え

---

### Phase 6-2: キャッシュ戦略

- ブランチ: `feature/recipe-cache`
- PR: このグループ完了後に1PR

#### 完了条件

- 在庫に変化がない場合は前回の生成結果を返す（API を呼ばない）
- 在庫が変化したタイミングでキャッシュが無効化される

#### タスク

- [ ] キャッシュの設計（在庫の変化検知方法を決める）
- [ ] キャッシュ実装（Next.js の `unstable_cache` またはDBへの保存）
- [ ] 在庫更新・追加・削除時にキャッシュを無効化する処理を追加

---

### Phase 6-3: フォールバック・エラーハンドリング

- ブランチ: `feature/recipe-fallback`
- PR: このグループ完了後に1PR

#### 完了条件

- Claude API がエラーを返した場合でもアプリが壊れない
- フォールバック時はユーザーに適切なメッセージを表示する

#### タスク

- [ ] Claude API タイムアウト・エラー時のフォールバック処理実装
- [ ] API レスポンスのバリデーション（Zod で JSON 構造を検証）
- [ ] エラー時の UI 表示（「レシピを取得できませんでした」+ 再試行ボタン）

---

### Phase 6-4: UI 更新

- ブランチ: `feature/recipe-ui-update`
- PR: このグループ完了後に1PR

#### 完了条件

- レシピ生成中はローディング表示される
- 生成されたレシピの手順（instructions）がモーダル内に表示される

#### タスク

- [ ] レシピ生成中のローディング UI（スケルトンまたはスピナー）
- [ ] レシピ詳細モーダルに手順（instructions）表示を追加
- [ ] 手順のステップ番号付き表示（1. 〜 2. 〜 の形式）
