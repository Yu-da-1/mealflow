# /plan-next

`docs/roadmap.md` の内容をもとに、次に着手するPhaseを選び `tasks/backlog.md` に追加する。
**実装は行わない。** このコマンドは roadmap → backlog の移動のためだけに使う。

必ず 0 → 1 → 2 → 3 の順で進めること。

---

## 0. 現状把握

以下を読んで現状を整理する。

- `docs/roadmap.md`: やりたいことの一覧と優先度を確認する
- `tasks/backlog.md`: 現在のバックログ残量・最後のPhase番号を確認する

整理した内容をユーザーに見せる。

```
### 現状サマリー
- roadmapの候補: ○○, ××, △△
- backlog残: Phase N まで積まれている
```

---

## 1. 候補の提示

`docs/roadmap.md` のやりたいことから、次にbacklogに追加する候補を提案する。

提案の基準:

- 既存backlogへの技術的依存（前のPhaseが終わってから着手できるか）
- ユーザー価値の高さ
- 実装難易度

```
### 提案

次のbacklog追加候補:

**候補A: ○○**
理由: 〜〜〜

**候補B: ××**
理由: 〜〜〜

どれをbacklogに追加しますか？複数選択も可能です。
```

---

## 2. タスク分解・合意

選ばれた候補をPhase・タスクに分解してユーザーに確認する。

- Phase番号は既存backlogの続き番号を使う
- 完了条件・タスクが具体的になるまで対話する
- スコープが大きすぎる場合は分割を提案する

合意が取れたら次のステップへ進む。

---

## 3. backlog.md に追記・roadmap.md を更新

### tasks/backlog.md に追記

合意した内容を `tasks/backlog.md` に追記する。
フォーマットは既存のPhaseに合わせる。

```markdown
## Phase N: タイトル

（このPhaseの目的を1〜2文で）

---

### Phase N-1: サブタイトル

- ブランチ: `prefix/name`
- PR: このグループ完了後に1PR

#### 完了条件

- （何ができていれば完了か）

#### タスク

- [ ] タスク1
- [ ] タスク2
```

### docs/roadmap.md を更新

backlogに移した項目を `docs/roadmap.md` から削除する（またはコメントで「backlog移動済み」とマークする）。
