## Phase 12-2: スキャン UI + 登録フロー連携

- ブランチ: `feature/barcode-ui`
- PR: このグループ完了後に1PR

### 完了条件

- 食品登録画面に「バーコードを読み取る」ボタンが追加されている
- カメラで JAN コードをスキャンすると食品名・期限が自動入力された登録フォームに遷移する
- マスタ未登録コードの場合は「この食品はマスタにありません」と表示し手動入力フォームへ移行する
- `docs/design.md` セクション 6.3 の仕様を満たしている

### タスク

- [x] `@zxing/browser` をインストールし、`BarcodeScanner` コンポーネントを実装（リアルタイムスキャン）
- [x] 食品登録画面（`FoodForm`）に「バーコードを読み取る」ボタンを追加
- [x] スキャン結果を `/api/barcode/[code]` に投げて食品名・期限を `FoodForm` に反映する `useBarcodeScanner` hookを実装
- [x] ミス時のフォールバック UI を実装（トースト通知 + 手動入力モードへ切り替え）
- [ ] モバイル実機でスキャン動作を確認（手動確認）

### plan

- 影響ファイル:
  - `src/features/inventory/hooks/useBarcodeScanner.ts`（新規: スキャン状態管理 + API呼び出し）
  - `src/features/inventory/components/BarcodeScanner.tsx`（新規: カメラ UI + @zxing/browser リアルタイムスキャン）
  - `src/features/inventory/components/FoodRegisterForm.tsx`（バーコードボタン + scanner 統合）
- 実装順:
  1. `@zxing/browser` インストール
  2. `useBarcodeScanner` hook（ScanState union型 + API呼び出し）
  3. `BarcodeScanner` コンポーネント
  4. `FoodRegisterForm` に統合
- 設計メモ:
  - ScanState: idle | scanning | loading | found_master | found_off | not_found
  - master ヒット時 → `/api/food-masters?query=name` で FoodMasterRow を取得して selectMaster に渡す
  - OFFヒット時 → display_name をクエリにセット（手動で選択が必要）
  - not_found → インライントースト通知（外部ライブラリ不使用）
  - トーストは useTimeout で 3 秒後に自動消去
