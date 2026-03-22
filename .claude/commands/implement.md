# /implement

tasks/current.md のタスクを実行する。
必ず 準備 → Explore → Plan → Implement → Verify → Record → PR の順で進めること。

---

## 0. 準備｜タスクとブランチを用意する

### tasks/current.md が空の場合
`tasks/backlog.md` の先頭の未完了グループを `tasks/current.md` に移す。

### 指示が一言で来た場合（例:「Phase1-1やって」）
`tasks/backlog.md` から該当グループを読み、`tasks/current.md` に書き起こす。

### すでにcurrent.mdにタスクが書いてある場合
そのまま Explore に進む。

### ブランチを切る
`tasks/current.md` に記載のブランチ名で作業ブランチを切る。
ブランチ名は `docs/conventions.md` のブランチ命名規則に従うこと。

```bash
git fetch origin
git checkout main
git pull origin main
git checkout -b [ブランチ名]
```

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

---

## Record｜記録する

**tasks/current.md を更新する**
- 完了タスクの `- [ ]` を `- [x]` に変える
- planに結果メモを追記する（想定外のことがあれば）

**tasks/backlog.md を更新する**
- 完了したグループのタスクをすべて `[x]` にする

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