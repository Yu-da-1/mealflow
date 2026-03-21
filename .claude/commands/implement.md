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

```bash
git checkout main
git pull
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

グループの全タスクが `[x]` になったら以下を実行する。

まず `code-reviewer` サブエージェントを呼び出してレビューを行う。

> code-reviewer を使って実装したコードをレビューしてください

レビューが完了したらPRを作成する。

```bash
git push origin [ブランチ名]
gh pr create \
  --title "[グループ名] 実装内容の概要" \
  --body "$(cat << 'PREOF'
## 概要
このグループで実装した内容

## 実装内容
- 実装したもの1
- 実装したもの2

## 完了条件の確認
- [ ] 完了条件1
- [ ] 完了条件2

## 動作確認
- [ ] ローカルで動作確認済み
- [ ] テスト全件グリーン
PREOF
)"
```

PR作成後に `tasks/current.md` を空にする。