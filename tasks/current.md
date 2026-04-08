## Phase 12-1: バーコード照合 API

- ブランチ: `feature/barcode-api`
- PR: このグループ完了後に1PR

### 完了条件

- `/api/barcode/[code]` に JAN コードを渡すと food_masters から一致する食品を返す
- ヒットしない場合は `404` を返す
- Open Food Facts API へのフォールバックを実装する（マスタに未登録の商品でも食品名を取得できる）
- API の型定義・repository が揃っている

### タスク

- [x] `food_master_jan_codes` テーブルのマイグレーションを追加
- [x] `FoodMasterJanCodeRow` 型を `src/lib/types/database.ts` に追加
- [x] `BarcodeResponse` 型を `src/lib/types/ui.ts` に追加
- [x] `janCodeRepository.ts` を新規作成（`findFoodMasterByJanCode`）
- [x] Open Food Facts API クライアントを `src/server/openFoodFacts.ts` に実装
- [x] `/api/barcode/[code]` ルートを実装
- [x] ユニットテストを追加（マスタヒット・OFFヒット・完全ミスの3ケース）

### plan

- 影響ファイル:
  - `supabase/migrations/20260409000000_add_food_master_jan_codes.sql`（新規）
  - `src/lib/types/database.ts`（FoodMasterJanCodeRow 追加）
  - `src/lib/types/ui.ts`（BarcodeResponse 追加）
  - `src/server/repositories/janCodeRepository.ts`（新規）
  - `src/server/openFoodFacts.ts`（新規: OFFクライアント）
  - `src/domain/barcode/resolveBarcodeResult.ts`（新規: 純粋関数）
  - `src/app/api/barcode/[code]/route.ts`（新規）
  - `src/domain/barcode/__tests__/resolveBarcodeResult.test.ts`（新規）
- 実装順:
  1. マイグレーション
  2. 型定義（database.ts → ui.ts）
  3. janCodeRepository
  4. openFoodFacts クライアント
  5. domain 関数（resolveBarcodeResult）
  6. API ルート
  7. テスト
- 備考: テスト対象はロジックを持つ domain 関数（resolveBarcodeResult）に集約。APIルートは repository・domain を呼ぶだけ
- quality-checker 修正: Domain層が @/server から型をインポートしていたアーキテクチャ違反を修正。OffProductResult を @/lib/types/ui.ts に移動
