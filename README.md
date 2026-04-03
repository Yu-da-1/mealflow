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
- 期限の自動設定（食品マスタの `default_expiry_days` から計算）
- 期限が近い食品（当日・翌日）のアプリ内表示
- 在庫をもとにレシピを3件提案
- 同じレシピが3日間連続で提案されないよう制御
- 食品単位の集約表示 + ロット単位の詳細表示

### 技術スタック

| 分類           | 技術                                 |
| -------------- | ------------------------------------ |
| フレームワーク | Next.js 16 (App Router) + TypeScript |
| スタイリング   | Tailwind CSS v4                      |
| バックエンド   | Supabase (PostgreSQL)                |
| テスト         | Vitest                               |

---

## ローカルセットアップ

### 前提条件

- Node.js 20+
- pnpm
- Supabase アカウント

### 手順

```bash
# 1. リポジトリをクローン
git clone https://github.com/Yu-da-1/mealflow.git
cd mealflow

# 2. 依存パッケージをインストール
pnpm install

# 3. 環境変数を設定
cp .env.local.example .env.local
# .env.local に Supabase の URL と anon key を記入

# 4. Supabase にスキーマとシードデータを投入
# Supabase Dashboard > SQL Editor で以下を実行:
# - docs/schema.md のSQL（テーブル作成）
# - supabase/seed.sql（食品マスタ・レシピデータ）

# 5. 開発サーバー起動
pnpm dev
```

### 環境変数

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## プロジェクト構成

```
mealflow/
├── CLAUDE.md                        # Claude Code への指示（アーキテクチャルール等）
├── docs/
│   ├── design.md                    # 全体仕様（MVPスコープ・画面・ドメインロジック）
│   ├── schema.md                    # DBスキーマ（SQL）
│   ├── api.md                       # APIエンドポイント仕様
│   ├── conventions.md               # コーディング規約
│   └── decisions/                   # 設計判断の記録（ADR）
├── supabase/
│   └── seed.sql                     # 食品マスタ・レシピのシードデータ
├── tasks/
│   ├── current.md                   # 進行中のタスク
│   └── backlog.md                   # 未着手タスク
└── src/
    ├── features/                    # UI層（画面・コンポーネント）
    ├── domain/                      # ドメイン層（純粋関数のみ）
    ├── server/repositories/         # インフラ層（Supabase アクセス）
    └── app/
        ├── api/                     # API層（Route Handlers）
        └── (frontend)/              # ページ（App Router）
```

---

## アーキテクチャ

```
UI層     src/features/
API層    src/app/api/
Domain層 src/domain/             ← 純粋関数のみ。外部依存禁止
Infra層  src/server/repositories/

依存方向: UI → API → Domain ← Repository
```

`supabase` の呼び出しを `repositories/` に閉じることで、DB変更時の影響範囲を最小化している。Domain層を純粋関数に保つことでテストが書きやすく、将来的な Mobile（React Native）対応でも共通化できる。

---

## 開発コマンド

```bash
pnpm dev                         # 開発サーバー起動
pnpm prettier --write .          # フォーマット
pnpm eslint . --fix              # lint 自動修正
pnpm tsc --noEmit                # 型チェック（実行前に rm -rf .next が必要）
pnpm vitest run                  # テスト実行
```

---

## Claude Code との開発

このプロジェクトは Claude Code を活用して開発しています。

### CLAUDE.md

Claude Code がセッション開始時に**必ず読む**ファイル。以下を集約しています。

- レイヤー構成と依存ルール（どの層が何をして良いか）
- 絶対に守るルール（`main` 直接プッシュ禁止・`supabase` の呼び出し場所など）
- 実装時に参照すべきドキュメントへのポインタ
- 迷ったときの判断基準

詳細な仕様はすべて `docs/` に分離し、CLAUDE.md 自体は短く保つ設計にしています。Claude Code はコンテキストウィンドウに限りがあるため、CLAUDE.md が長大になると毎回のコストが上がるためです。

---

### tasks/ — タスク管理

Claude Code に「今何をやるか」を明確に伝えるためのファイル群です。

```
tasks/
├── current.md   # 現在進行中のフェーズのタスク一覧（実装中はここだけ見る）
└── backlog.md   # 全フェーズの未着手タスクをPhaseごとに積み上げたもの
```

**運用ルール**

1. `current.md` が空のとき → `backlog.md` の先頭の未完了グループを `current.md` に移して作業開始
2. 作業中は `current.md` のみ参照（`backlog.md` は読まない）
3. タスク完了時に `- [ ]` → `- [x]` に更新
4. グループ全タスクが `[x]` になったら `current.md` を空にして次のグループへ

**なぜ GitHub Issues ではなくファイルで管理するか**

Claude Code がローカルファイルとして直接読み書きできるため、外部 API を挟まずシンプルに動きます。完了マーク（`[x]`）の更新も Edit ツールで完結します。

---

### .claude/commands/ — カスタムコマンド

`/コマンド名` で呼び出せる定型ワークフローです。

#### `/implement`

実装作業の標準フローを定義したコマンド。以下のステップを順番に強制します。

```
0. 準備       ブランチを main から切る
↓
Explore     実装前に仕様・既存コードを読む（ここで理解してから書く）
↓
Plan        tasks/current.md にplanを追記する（影響ファイル・実装順・懸念点）
↓
Implement   planの順番通りに実装する
↓
Verify      quality-checker サブエージェントに委譲（lint・型・テスト）
↓
Record      current.md / backlog.md の [x] を更新する
↓
PR          code-reviewer サブエージェント → gh pr create
```

Plan を書かずに実装を始めないことが重要で、`tasks/current.md` に plan を書かせることで人間がレビューできる中間成果物が生まれます。

#### `/review`

アーキテクチャ・コード品質・仕様との照合を手動で実行するコマンド。`/implement` の PR ステップでも自動的に呼ばれます。**報告だけで終わらず修正まで行う**設計です。

#### `/migrate`

`docs/schema.md` の SQL を読んで Supabase にマイグレーションを実行する手順を定義したコマンド。ファイル名の命名規則（`YYYYMMDDHHMMSS_説明.sql`）を明示することで、Claude Code が自己判断で変な名前をつけるのを防いでいます。

---

### .claude/agents/ — サブエージェント

Claude Code は1つのセッションが長くなるとコンテキストが圧縮（auto-compact）され精度が落ちます。サブエージェントに委譲すると**独立したコンテキスト**で動くため、メインセッションへの影響を防げます。

#### quality-checker

lint・型チェック・テストをすべてグリーンにする担当。`/implement` の Verify ステップで呼び出されます。

- `pnpm prettier` → `eslint --fix` → `tsc --noEmit` → `eslint --max-warnings 0` → `vitest run` の順で実行
- エラーが出たら修正して再実行を繰り返す
- `@ts-ignore` / `eslint-disable` / テスト削除は禁止
- 同じエラーが3回続いたら停止して報告（無限ループ防止）

#### code-reviewer

アーキテクチャ・コード品質・仕様との照合を確認し、問題があれば修正まで行う担当。PR 作成前に呼び出されます。チェック観点は `/review` コマンドと同一です。
