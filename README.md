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

| 分類 | 技術 |
|------|------|
| フレームワーク | Next.js 16 (App Router) + TypeScript |
| スタイリング | Tailwind CSS v4 |
| バックエンド | Supabase (PostgreSQL) |
| テスト | Vitest |

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

- `CLAUDE.md` — アーキテクチャルールと作業開始時の手順
- `.claude/commands/implement.md` — 実装フロー（Explore → Plan → Implement → Verify → Record）
- `.claude/agents/quality-checker.md` — lint・型チェック・テストを自動で通すサブエージェント
- `.claude/agents/code-reviewer.md` — アーキテクチャ・仕様照合レビューサブエージェント
