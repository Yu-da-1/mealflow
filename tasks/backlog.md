# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 10: デプロイ基盤整備

Vercel + Supabase による本番環境を構築し、「実際に触れるアプリ」にする。

---

### Phase 10-1: Vercel デプロイ設定

- ブランチ: `chore/vercel-deploy`
- PR: このグループ完了後に1PR

#### 完了条件

- main push → Vercel production へ自動デプロイされる
- PR 作成 → Vercel Preview デプロイが生成される

#### タスク

- [ ] Vercel プロジェクトを作成し GitHub リポジトリと連携
- [ ] `vercel.json` を作成（必要な場合）
- [ ] Vercel ダッシュボードで production ブランチを `main` に設定
- [ ] デプロイが正常に完了することを確認

---

### Phase 10-2: Supabase production 環境構築 & マイグレーション自動化

- ブランチ: `chore/supabase-production`
- PR: このグループ完了後に1PR

#### 完了条件

- `supabase/migrations/` でスキーマがバージョン管理されている
- `main` マージ時に GitHub Actions が自動で `supabase db push` を実行する
- production 用 Supabase プロジェクトにスキーマが適用されている
- Vercel の環境変数に本番用の値が登録されており、デプロイ済みアプリが動作する
- `docs/env.md` に環境変数の一覧と local/production の対応が記載されている

#### タスク

- [ ] `supabase/migrations/20260405000000_init.sql` を作成
- [ ] `.github/workflows/ci.yml` に migrate ジョブを追加
- [ ] `docs/env.md` を作成
- [ ] Supabase で production プロジェクトを作成（手動）
- [ ] GitHub Secrets に `SUPABASE_ACCESS_TOKEN` と `SUPABASE_PROJECT_REF` を登録（手動）
- [ ] Vercel に環境変数を登録（手動）
- [ ] 本番デプロイ後、主要機能の動作確認
