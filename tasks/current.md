## Phase 6-2: キャッシュ戦略

- ブランチ: `feature/recipe-cache`
- PR: このグループ完了後に1PR

### 完了条件

- 在庫に変化がない場合は前回の生成結果を返す（API を呼ばない）
- 在庫が変化したタイミングでキャッシュが無効化される

### タスク

- [x] キャッシュの設計（在庫の変化検知方法を決める）
- [x] キャッシュ実装（Next.js の `unstable_cache` またはDBへの保存）
- [x] 在庫更新・追加・削除時にキャッシュを無効化する処理を追加

### plan

- 方針: `unstable_cache` + `revalidateTag('recommended-recipes')` を採用（DB 保存より実装がシンプル、在庫変更 API に revalidateTag を追加するだけで無効化できる）
- 影響ファイル:
  - `src/app/(frontend)/recipes/page.tsx`（生成ロジックを `unstable_cache` でラップ）
  - `src/app/api/inventory/route.ts`（POST 成功後に revalidateTag）
  - `src/app/api/inventory/[lotId]/route.ts`（PATCH・DELETE 成功後に revalidateTag）
  - `src/app/api/inventory/consume-from-recipe/route.ts`（POST 成功後に revalidateTag）
- 実装順:
  1. `recipes/page.tsx` のレシピ生成ロジックを `unstable_cache` でラップ（キャッシュタグ: `recommended-recipes`）
  2. 在庫変更 API 4 箇所に `revalidateTag('recommended-recipes')` を追加
- 備考:
  - `unstable_cache` に引数なしで呼ぶことでキャッシュキーを固定し、revalidateTag で一括無効化する設計
  - キャッシュ内で `createRecommendationLog` も呼ぶため、キャッシュヒット時は重複ログが記録されない
