## Phase 8-2: レシピ instructions 追加・レシピ拡充

- ブランチ: `data/recipes`
- PR: このグループ完了後に1PR

### 完了条件

- 既存 35件のレシピすべてに `instructions` テキストが入っている
- 食品マスタ拡充で追加された食材を使うレシピが追加されている（目安: 合計 50件前後）
- `pnpm vitest run` がパスする

### タスク

- [x] 既存 35件に `instructions` を追加（手順を 3〜5ステップで記述）
- [x] 魚介類を使った新規レシピを追加（さばの味噌煮・えびチリ・あさりの酒蒸し など）
- [x] 加工食品を使った新規レシピを追加（ベーコンと野菜のスープ・ソーセージ炒め など）
- [x] きのこ類を使った新規レシピを追加（えのきのバター炒め・きのこパスタ など）

### plan

- 影響ファイル:
  - `supabase/seed.sql`（recipes INSERT に `instructions` 列追加、新規レシピ r36〜r50 追加）
  - テストファイル 3件（`overrides` 引数のデフォルト値 `= {}` 追加 by quality-checker）
- 実装順:
  1. DECLARE ブロックに r36〜r50 の UUID 変数を追加
  2. INSERT INTO recipes の列リストに `instructions` を追加し、全 35 件に手順テキストを追記
  3. 新規 15 件（魚介 5・加工食品 4・きのこ 4・野菜 2）を追加 → 合計 50 件
  4. recipe_ingredients に新規 15 件分を追加
- 結果: 50件達成・テスト 72件全パス
