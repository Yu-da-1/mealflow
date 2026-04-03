# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 9: CI 整備

PR マージ前に型・lint・テストを自動チェックする GitHub Actions ワークフローを整備する。

---

### Phase 9-1: CI ワークフロー

- ブランチ: `chore/ci`
- PR: このグループ完了後に1PR

#### 完了条件

- PR 作成・更新時に CI が自動で走る
- tsc・lint・test のいずれかが失敗したら CI が red になる

#### タスク

- [ ] `.github/workflows/ci.yml` を作成
- [ ] `pnpm tsc --noEmit`（型チェック）をジョブに追加
- [ ] `pnpm eslint . --max-warnings 0`（lint）をジョブに追加
- [ ] `pnpm vitest run`（テスト）をジョブに追加
- [ ] トリガー: `pull_request`（main ブランチ向け）および `push`（main ブランチ）
