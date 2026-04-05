## Phase 10-1: Vercel デプロイ設定

- ブランチ: `chore/vercel-deploy`
- PR: このグループ完了後に1PR

### 完了条件

- main push → Vercel production へ自動デプロイされる
- PR 作成 → Vercel Preview デプロイが生成される

### タスク

- [ ] Vercel プロジェクトを作成し GitHub リポジトリと連携
- [ ] `vercel.json` を作成（必要な場合）
- [ ] Vercel ダッシュボードで production ブランチを `main` に設定
- [ ] デプロイが正常に完了することを確認

#### 追加タスク（ビルドエラー修正）

- [x] `src/server/supabase.ts` を lazy getter `getSupabase()` に変更（モジュール評価時のthrowをリクエスト時に遅延）
- [x] 4つの repository の import・呼び出しを `getSupabase()` に更新

### plan

- 影響ファイル:
  - `vercel.json`（不要と判断 — Vercel は pnpm-lock.yaml から pnpm を自動検出し、Next.js 設定も自動認識される）
- 実装方針:
  1. Vercel ダッシュボードで GitHub リポジトリをインポート
  2. Framework Preset: Next.js, Build Command: `pnpm build`, Install Command: `pnpm install` が自動設定されることを確認
  3. Production Branch を `main` に設定（デフォルトのはずだが確認）
  4. 環境変数は Phase 10-2 で設定するため今回は未設定でデプロイ
     - サーバーサイド変数（SUPABASE_URL 等）はビルド時に参照されないため、ビルドは成功するはず
  5. デプロイが green になることを確認（DB接続エラーはこの段階では許容）
- 懸念点:
  - もしビルド時に env var が参照されている箇所があればビルド失敗する → その場合はダミー値をセットして対処
