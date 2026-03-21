## Phase 0: プロジェクト初期化

- ブランチ: `chore/phase0-init`
- PR: このPhase完了後に1PR

### 完了条件

- `pnpm dev` で Next.js が起動する
- ESLint / Prettier / Vitest が動作する
- Supabase に接続できる
- `docs/conventions.md` のディレクトリ構造が作成されている

### タスク

- [x] Next.js プロジェクト初期化（App Router / TypeScript）
- [x] ESLint / Prettier 設定
- [x] Vitest 設定
- [x] Supabase 初期設定（クライアント / 環境変数）
- [x] ディレクトリ構造の作成（src/features, src/domain, src/server/repositories, src/lib/types）
- [x] アーキテクチャ制約の ESLint ルール設定（domain層からのDB import禁止など）

### plan

- 実装順:
  1. Next.js プロジェクト初期化（pnpm create next-app、App Router / TypeScript）
  2. ESLint / Prettier 設定（Next.js デフォルト ESLint + prettier 追加）
  3. Vitest 設定（vitest + @testing-library/react）
  4. Supabase 初期設定（@supabase/supabase-js + クライアントユーティリティ + .env.local.example）
  5. ディレクトリ構造の作成（conventions.md 準拠）
  6. アーキテクチャ制約の ESLint ルール（eslint-plugin-import の no-restricted-paths で domain→server 禁止）
- 懸念点:
  - Next.js をルート直下に初期化する（既存 docs/ tasks/ は維持）
  - Supabase の実際の接続確認は環境変数が設定されるまで不可。クライアントのコードと .env.local.example を用意する
- 結果メモ:
  - Vitest 4.x/3.2.x は Vite 7+/rolldown が ESM 専用のため、Vitest 2.x を採用
  - アーキテクチャ制約は eslint-plugin-import ではなく ESLint 組み込みの no-restricted-imports で実装（追加パッケージ不要）
