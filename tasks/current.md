## Phase 9-1: CI ワークフロー

- ブランチ: `chore/ci`
- PR: このグループ完了後に1PR

### 完了条件

- PR 作成・更新時に CI が自動で走る
- tsc・lint・test のいずれかが失敗したら CI が red になる

### タスク

- [x] `.github/workflows/ci.yml` を作成
- [x] `pnpm tsc --noEmit`（型チェック）をジョブに追加
- [x] `pnpm eslint . --max-warnings 0`（lint）をジョブに追加
- [x] `pnpm vitest run`（テスト）をジョブに追加
- [x] トリガー: `pull_request`（main ブランチ向け）および `push`（main ブランチ）

### plan

- 影響ファイル:
  - `.github/workflows/ci.yml`（新規作成）
- 実装方針:
  - Node.js 22、pnpm でセットアップ
  - ジョブは1つにまとめて順番に tsc → lint → test を実行
  - `pnpm tsc --noEmit` 前に `rm -rf .next`（CLAUDE.md の注意事項に従う）
  - pnpm は `corepack enable` で有効化
