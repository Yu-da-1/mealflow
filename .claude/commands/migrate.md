# /migrate

docs/schema.md のSQLを使ってSupabaseにマイグレーションを実行する。

## 手順

1. `docs/schema.md` を読んでスキーマを確認する
2. `supabase/migrations/` に新しいマイグレーションファイルを作成する
   - ファイル名: `YYYYMMDDHHMMSS_[説明].sql`
3. SQLを記述する
4. `supabase db push` を実行する

## 注意

- 既存テーブルへの変更はデータ損失に注意する
- カラム削除・型変更は必ず確認を取ってから実行する
