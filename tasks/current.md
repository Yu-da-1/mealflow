## Phase 10-1: Vercel デプロイ設定

- ブランチ: `chore/vercel-deploy`
- PR: このグループ完了後に1PR

### 完了条件

- main push → Vercel production へ自動デプロイされる
- PR 作成 → Vercel Preview デプロイが生成される

### タスク

- [x] Vercel プロジェクトを作成し GitHub リポジトリと連携
- [x] `vercel.json` を作成（必要な場合）
- [x] Vercel ダッシュボードで production ブランチを `main` に設定
- [x] デプロイが正常に完了することを確認

#### 追加タスク（ビルドエラー修正）

- [x] `src/server/supabase.ts` を lazy getter `getSupabase()` に変更（モジュール評価時のthrowをリクエスト時に遅延）
- [x] 4つの repository の import・呼び出しを `getSupabase()` に更新

---

## Phase 10-2: Supabase production 環境構築 & マイグレーション自動化

- ブランチ: `chore/supabase-production`
- PR: このグループ完了後に1PR

### 完了条件

- `supabase/migrations/` で スキーマがバージョン管理されている
- `main` マージ時に GitHub Actions が自動で `supabase db push` を実行する
- production 用 Supabase プロジェクトにスキーマが適用されている
- Vercel の環境変数に本番用の値が登録されており、デプロイ済みアプリが動作する
- `docs/env.md` に環境変数の一覧と local/production の対応が記載されている

### タスク

#### コード（私が実施）
- [x] `supabase/migrations/20260405000000_init.sql` を作成（`docs/schema.md` のスキーマを移植）
- [x] `.github/workflows/ci.yml` に `migrate` ジョブを追加（main マージ時に `supabase db push`）
- [x] `docs/env.md` を作成

#### 手動作業（ユーザーが実施）
- [x] Supabase で production プロジェクトを作成
- [x] SQL Editor で初回マイグレーションを適用（または `supabase db push` を手動実行）
- [x] `supabase/seed.sql` を SQL Editor で実行（初期データ投入）
- [x] GitHub Secrets に `SUPABASE_ACCESS_TOKEN` と `SUPABASE_PROJECT_REF` を登録
- [x] Vercel に環境変数を登録（`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`）
- [ ] 本番デプロイ後、主要機能（在庫一覧・レシピ提案）の動作確認

### plan

- 影響ファイル:
  - `supabase/migrations/20260405000000_init.sql`（新規）
  - `.github/workflows/ci.yml`（migrate ジョブ追加）
  - `docs/env.md`（新規）
- 実装方針:
  - migration ファイルは `docs/schema.md` の SQL をそのまま移植
  - CI の migrate ジョブは `needs: ci` で CI 通過後のみ・`main` ブランチのみ実行
  - `SUPABASE_ACCESS_TOKEN` と `SUPABASE_PROJECT_REF` は GitHub Secrets で管理

---

### plan (10-1)

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
