# mealflow

冷蔵庫の中身を管理して、毎日の献立を提案するアプリ。

---

## このアプリについて

### 解決したい問題

- 冷蔵庫に何が入っているか把握できていない
- 賞味期限・消費期限切れに気づかず捨ててしまう
- 毎日「今日何作ろう」と考えるのがしんどい

### できること（MVP）

- 食品の登録・更新・削除（CRUD）
- 期限の自動設定（food_mastersのdefault_expiry_daysから計算）
- 期限が近い食品のアプリ内表示
- 在庫をもとにレシピを3件提案
- 同じレシピが連続で提案されないよう制御
- 食品単位の集約表示 + ロット単位の詳細表示（アコーディオン）

### 技術スタック

- **フロントエンド**: Next.js (App Router) + TypeScript
- **DB**: Supabase (PostgreSQL)
- **状態管理**: TanStack Query
- **フォーム**: React Hook Form + Zod

---

## プロジェクト構成

```
fridge-app/
├── CLAUDE.md                        # Claude Codeへの「憲法」
├── .claude/
│   ├── settings.json                # 権限設定
│   ├── agents/
│   │   ├── quality-checker.md       # lint/型/テストを回すサブエージェント
│   │   └── code-reviewer.md         # レビューするサブエージェント
│   └── commands/
│       ├── implement.md             # /implement コマンド定義
│       ├── review.md                # /review コマンド定義
│       └── migrate.md               # /migrate コマンド定義
├── docs/
│   ├── design.md                    # 全体仕様（MVPスコープ・画面・ドメインロジック）
│   ├── schema.md                    # DBスキーマ（SQL）
│   ├── api.md                       # APIエンドポイント仕様
│   ├── conventions.md               # コーディング規約
│   └── decisions/                   # 設計判断の記録（ADR）
├── tasks/
│   ├── current.md                   # 今やること
│   └── backlog.md                   # 積みタスク
└── src/
    ├── features/                    # UI層
    ├── domain/                      # ドメイン層（純粋関数）
    ├── server/repositories/         # インフラ層（DB）
    └── app/api/                     # API層
```

---

## CLAUDE.md — Claude Codeへの「憲法」

Claude Codeがセッション開始時に**必ず読む**ファイル。アーキテクチャのルールと「迷ったときの判断基準」をここに集約している。

詳細な仕様はすべて `docs/` に分離し、CLAUDE.md自体は短く保つ設計。Claude Codeはコンテキストウィンドウに限りがあるため、CLAUDE.mdが長大になると毎回のコストが上がる。

**改善余地**

- `docs/` へのポインタと絶対ルールだけに絞るとさらに良い
- 将来的なMobile（Expo）対応の方針もここに残しておく

---

## .claude/settings.json — 権限設定

Claude Codeが実行できるコマンドをホワイトリスト/ブラックリストで管理している。

**許可している主なもの**

- `pnpm *` — パッケージ管理・スクリプト実行
- `git` 系（fetch / diff / add / commit / checkout / pull / push） — 通常のGit操作
- `gh pr create` — PRの自動作成
- `npx supabase *` — マイグレーション操作

**明示的に禁止しているもの**

| コマンド                  | 理由                         |
| ------------------------- | ---------------------------- |
| `rm -rf *`                | 取り返しのつかない削除を防ぐ |
| `git push --force *`      | 強制pushによる履歴破壊を防ぐ |
| `git reset --hard *`      | 作業内容の消失を防ぐ         |
| `npx supabase db reset *` | 本番DBのリセットを防ぐ       |

---

## .claude/agents/ — サブエージェント

### なぜサブエージェントを使うか

Claude Codeは1つのセッションが長くなるとコンテキストが圧縮（auto-compact）され、精度が落ちる。サブエージェントに委譲すると**独立したコンテキスト**で動くため、メインセッションの汚染を防げる。

また、品質チェックやレビューは「実装」とは別の関心事であり、責務を分離することで各エージェントの指示を短く保てる。

### quality-checker.md

lint・型チェック・テストをすべてグリーンにする担当。`implement.md` のVerifyステップで呼び出される。エラーが出たら修正して再実行、を繰り返す。

「逃げ技（`@ts-ignore` や `eslint-disable`）は禁止」という制約を明文化しているのがポイント。同じエラーが3回続いたら停止して報告させることで無限ループを防いでいる。

### code-reviewer.md

アーキテクチャ・コード品質・仕様との照合を確認し、問題があれば修正する担当。PR作成前に呼び出される。

「報告だけで終わらない、修正まで行う」設計にしている。レビューコメントを書くだけで終わるとメインエージェントへの追加指示が必要になるため、サブエージェント内で完結させる方針。

---

## .claude/commands/ — カスタムコマンド

### /implement

実装作業の標準フローを定義したコマンド。

```
0. 準備（ブランチ作成）
→ Explore（コードを読む）
→ Plan（作業を分解してcurrent.mdに書く）
→ Implement（planの順に実装）
→ Verify（quality-checkerサブエージェントに委譲）
→ Record（current.md / backlog.mdを更新）
→ PR（code-reviewerサブエージェント → PR作成）
```

**Plan → Implementの順序を強制している理由**
Planを書かずに実装を始めると、影響範囲の見落としや仕様との乖離が起きやすい。current.mdにplanを書かせることで、人間がレビューできる中間成果物が生まれる。

**PR本文の自動生成**
`/tmp/pr_body.md` に書き出してから `gh pr create --body-file` で渡す設計。ヒアドキュメントをそのまま渡すと特殊文字でエラーになるケースがあるため。

### /review

`implement.md` のPRステップで呼ばれる `code-reviewer` サブエージェントと同じチェックを、手動で単体実行できるコマンド。

### /migrate

`docs/schema.md` のSQLを読んでSupabaseにマイグレーションを実行する手順を定義。ファイル名の命名規則（`YYYYMMDDHHMMSS_説明.sql`）を明示しているのは、Claudeが自己判断で変な名前をつけるのを防ぐため。

---

## docs/ — ドキュメント群

### なぜdocs/を分割しているか

Claude Codeは必要なドキュメントを**必要なときだけ**読みに来る。すべてをCLAUDE.mdに書いてしまうと毎回のコンテキストコストが増える。関心ごとにファイルを分けることで、エージェントが本当に必要な情報だけを読める。

| ファイル         | 役割                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| `design.md`      | MVPスコープ・画面仕様・ドメインロジック・フェーズ計画。人間とClaude両方が読む「全体仕様書」           |
| `schema.md`      | DBスキーマのSQLをそのまま記載。`/migrate` コマンドと `repositories/` が参照する                       |
| `api.md`         | エンドポイント・リクエスト・レスポンスの仕様。UIのhooksとAPIルート実装の両側が参照する                |
| `conventions.md` | 命名規則・ファイル配置・import順など。コードレビューのチェック基準になる                              |
| `decisions/`     | 設計判断の記録（ADR）。「なぜこのライブラリを選んだか」「なぜこのアーキテクチャにしたか」を残しておく |

### decisions/ の使い方

迷ったり、将来また同じ議論が起きそうな判断をしたときに記録する。フォーマットは3点のみ。

```markdown
## 決定内容

何を決めたか

## 理由

なぜそうしたか

## 却下した選択肢

他に何を検討したか
```

既存の記録例: `001-vitest-version.md` — Vitest 2.xを採用した経緯（3.x・4.xで発生したESM互換性の問題）

---

## tasks/ — タスク管理

Claude Codeに「今何をやるか」を明確に伝えるためのファイル。

- **current.md**: 今やっているグループのタスク一覧。`implement.md` はここを起点にする。完了したら空にする
- **backlog.md**: 未着手のタスクをPhaseごとに積んでいる。current.mdが空のときに先頭の未完了グループを移す

### なぜGitHub Issuesではなくファイルで管理するか

Claude Codeがローカルファイルとして直接読み書きできるため。外部サービスへのAPI呼び出しを挟まず、シンプルに動く。完了マーク（`[x]`）の更新も `Edit` ツールで完結する。

---

## アーキテクチャのレイヤー設計

```
UI層     src/features/
API層    src/app/api/
Domain層 src/domain/             ← 純粋関数のみ。外部依存禁止
Infra層  src/server/repositories/

依存方向: UI → API → Domain ← Repository
```

### なぜこの構成か

将来的なExpo（React Native）対応を前提にした設計。WebとMobileでUIは異なるが、API・ドメインロジック・型・DBアクセスは共通化できる。

Domain層を純粋関数に保つことでテストが書きやすく、プラットフォームへの依存がゼロになる。`supabase` の呼び出しを `repositories/` に閉じることで、SupabaseをPrismaや別DBに変えても影響範囲がInfra層だけに収まる。
