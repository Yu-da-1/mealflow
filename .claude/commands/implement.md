# /implement

tasks/current.md のタスクを実行する。
必ず 準備 → Explore → Plan → Implement → Verify → Record → PR の順で進めること。

---

## 0. 準備｜タスクとブランチを用意する

### すでにcurrent.mdにタスクが書いてある場合

そのまま Explore に進む。

### tasks/current.md が空の場合（または一言指示の場合）

以下の順で行う。**`current.md` を書く前にブランチを切ること（順序が逆だと checkout 時に競合が起きる）。**

1. `tasks/backlog.md` から対象グループのブランチ名を確認する
2. ブランチを切る

```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b [ブランチ名]
```

3. 新しいブランチ上で `tasks/current.md` にタスク内容を書き起こす

---

## Explore｜まず読む

実装前に以下を確認する。

- `tasks/current.md` でタスクの内容と完了条件を把握する
- `docs/design.md` の該当セクションで仕様を確認する
- 影響しそうな既存ファイルを読み、現状のコードを把握する

コードを書き始めるのはこのステップが終わってから。
不明点があれば実装を始めずに確認する。

---

## Plan｜作業を分解する

実装前に `tasks/current.md` の該当タスクの下にplanを追記する。

```markdown
### plan

- 影響ファイル:
  - src/lib/types/database.ts（型追加）
  - src/server/repositories/inventoryRepository.ts（新規）
- 実装順:
  1. 型定義を追加する
  2. repositoryを実装する
- 懸念点: （不明点や確認が必要なことがあれば書く）
```

planを書かずに実装を始めない。

---

## Implement｜実装する

planの順番通りに実装する。`CLAUDE.md` と `docs/conventions.md` のルールに従うこと。
**tasks/current.md に記載のないタスクは実装しない。**

実装の順番:

1. 型定義
2. domain層（純粋関数）
3. repository層
4. APIルート
5. UIコンポーネント

---

## Verify｜検証する

`quality-checker` サブエージェントを呼び出して検証する。

> quality-checker を使って実装したコードを検証してください

quality-checker が完了報告を返したら次のステップへ進む。
**ループ検出が発生した場合は Record ステップで harness-improver を呼び出す。**

---

## Record｜記録する

**tasks/current.md を更新する**

- 完了タスクの `- [ ]` を `- [x]` に変える
- planに結果メモを追記する（想定外のことがあれば）

**tasks/backlog.md は基本的に触らない**

- backlog.md の削除は、フェーズ全体の計画を新たに立てるタイミング（新フェーズ追加・backlog 再計画時）に行う
- 個々のグループ完了時には削除しない

**以下のいずれかに該当する場合は harness-improver を呼び出す**

- quality-checker でループ検出が発生した
- git 操作（checkout・pull・push など）で想定外のエラーや stash / conflict が発生した
- ワークフローの手順通りに進めたのに回避策（stash・cherry-pick など）が必要になった
- PR 作成後に取り残されたコミットが発生した
- 想定外のエラーや手順の抜けがあった
- 同じ問題に2回以上ハマった

> harness-improver を使って [問題の内容] を改善してください

**重要な判断をした場合は docs/decisions/ に記録する**

```markdown
# [連番] タイトル

## 決定内容

何を決めたか

## 理由

なぜそうしたか

## 却下した選択肢

他に何を検討したか
```

---

## PR｜プルリクエストを作成する

グループの全タスクが `[x]` になったら以下を順番に実行する。

### 1. code-reviewer を呼び出す

> code-reviewer を使って実装したコードをレビューしてください

レビューで問題があれば修正してから次へ進む。

**code-reviewer が1件でもコードを修正した場合は、必ず quality-checker を再実行する。**
reviewer の修正が lint・型・テストを壊していないことを確認してから次へ進む。

> quality-checker を使って実装したコードを検証してください

quality-checker が全グリーンを報告してから次のステップへ進む。

### 2. PR本文を生成して /tmp/pr_body.md に書き出す

以下の手順でPR本文を組み立てる。

1. `.github/pull_request_template.md` を読む
2. `tasks/current.md` から以下を抽出する
   - グループ名（例: `Phase 1-2: APIルート`）→ PRタイトルと概要に使う
   - 完了タスク（`[x]` のもの）→ `## 実装内容` に箇条書きで列挙
   - 完了条件 → `## 完了条件の確認` に `- [x]` 形式で列挙
   - planで参照したdocs/のセクション → `## 関連ドキュメント` に記載
3. 組み立てた内容を `/tmp/pr_body.md` に書き出す

```bash
cat > /tmp/pr_body.md << 'PREOF'
## 概要
（グループ名と完了条件をもとに1〜2文で説明）

## 実装内容
（完了タスク [x] を箇条書きで列挙）

## 完了条件の確認
（完了条件を - [x] 形式で列挙）

## 動作確認
- [x] ローカルで動作確認済み
- [x] テスト全件グリーン（quality-checkerで確認済み）

## 関連ドキュメント
（planで参照したdocs/のセクションを記載）
PREOF
```

### 3. pushしてPRを作成する

```bash
git push origin [ブランチ名]
gh pr create \
  --title "[グループ名]: [完了条件を一言で表したサマリ]" \
  --body-file /tmp/pr_body.md \
  --base main \
  --no-maintainer-edit
```

### 4. 後処理

PR作成後に `tasks/current.md` を空にする。
