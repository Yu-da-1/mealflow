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

### Phase 10-2: Supabase production 環境構築 & 環境変数管理

- ブランチ: `chore/supabase-production`
- PR: このグループ完了後に1PR

#### 完了条件

- production 用 Supabase プロジェクトにスキーマが適用されている
- Vercel の環境変数に本番用の値が登録されており、デプロイ済みアプリが動作する
- `.env.local`（開発）と Vercel 環境変数（本番）の対応がドキュメント化されている

#### タスク

- [ ] Supabase で production 用プロジェクトを作成
- [ ] マイグレーション（スキーマ）を production に適用
- [ ] Vercel に環境変数を登録（`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY` 等）
- [ ] `docs/env.md` を作成し、環境変数の一覧と local/production の対応を記載
- [ ] 本番デプロイ後、アプリの主要機能（在庫一覧・レシピ提案）が動作することを確認
