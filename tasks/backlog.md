# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 11: 食品マスタ拡充

オートコンプリートのヒット率を上げ、バーコードスキャン導入前の準備として食品マスタを100件→300件程度に増やす。
category / recipe_match_key / default_expiry_days の精度も合わせて整備する。

---

### Phase 11-1: 食品マスタデータ追加（野菜・肉・魚介・乳製品） ✅ 完了

---

## Phase 12: バーコードスキャン + モバイル UI

カメラで JAN コードを読み取り食品マスタと照合して在庫登録できるようにする。
あわせてモバイル向けのナビゲーション・各画面の UI をデザイン（`docs/ui-design.md`）に合わせて整備する。

---

### Phase 12-1: バーコード照合 API

- ブランチ: `feature/barcode-api`
- PR: このグループ完了後に1PR

#### 完了条件

- `/api/barcode/[code]` に JAN コードを渡すと food_masters から一致する食品を返す
- ヒットしない場合は `404` を返す
- Open Food Facts API へのフォールバックを実装する（マスタに未登録の商品でも食品名を取得できる）
- API の型定義・repository が揃っている

#### タスク

- [ ] `BarcodeResponse` 型を `src/lib/types/ui.ts` に追加
- [ ] `foodMasterRepository` に `findByJanCode` 関数を追加（`jan_code` カラムがなければ Open Food Facts のみ対応）
- [ ] Open Food Facts API クライアントを `src/server/` に実装（`GET https://world.openfoodfacts.org/api/v0/product/[barcode].json`）
- [ ] `/api/barcode/[code]` ルートを実装（マスタ照合 → ヒットなら food_master 情報を返す、ミスなら Open Food Facts で食品名だけ返す）
- [ ] ユニットテストを追加（ヒット・ミス・OFFフォールバックの3ケース）

---

### Phase 12-2: スキャン UI + 登録フロー連携

- ブランチ: `feature/barcode-ui`
- PR: このグループ完了後に1PR

#### 完了条件

- 食品登録画面に「バーコードを読み取る」ボタンが追加されている
- カメラで JAN コードをスキャンすると食品名・期限が自動入力された登録フォームに遷移する
- マスタ未登録コードの場合は「この食品はマスタにありません」と表示し手動入力フォームへ移行する
- `docs/design.md` セクション 6.3 の仕様を満たしている

#### タスク

- [ ] `@zxing/browser` をインストールし、`BarcodeScanner` コンポーネントを実装（リアルタイムスキャン）
- [ ] 食品登録画面（`FoodForm`）に「バーコードを読み取る」ボタンを追加
- [ ] スキャン結果を `/api/barcode/[code]` に投げて食品名・期限を `FoodForm` に反映する `useBarcodeScanner` hookを実装
- [ ] ミス時のフォールバック UI を実装（トースト通知 + 手動入力モードへ切り替え）
- [ ] モバイル実機でスキャン動作を確認

---

## Phase 13: ユーザー認証

Supabase Auth を使ってメール/パスワード・ソーシャルログインを実装し、各ユーザーのデータを分離する。
家族共有（Phase 14 以降）の前提となる。

---

### Phase 13-1: Supabase Auth 導入（ログイン・サインアップ UI）

- ブランチ: `feature/auth-ui`
- PR: このグループ完了後に1PR

#### 完了条件

- メール/パスワードでサインアップ・ログイン・ログアウトができる
- Google ソーシャルログインができる
- 未ログイン状態でアプリにアクセスするとログイン画面にリダイレクトされる
- ログイン状態は Supabase Auth セッションで管理されている

#### タスク

- [ ] Supabase Auth の Email/Password プロバイダを有効化（Supabase ダッシュボード）
- [ ] Google OAuth プロバイダを設定（Google Cloud Console + Supabase ダッシュボード）
- [ ] `src/features/auth/` ディレクトリを作成し、ログイン・サインアップコンポーネントを実装
- [ ] `src/app/(auth)/login/page.tsx` を実装
- [ ] Next.js Middleware でセッションチェック → 未ログイン時は `/login` にリダイレクト
- [ ] ヘッダーにユーザー情報・ログアウトボタンを追加

---

### Phase 13-2: スキーマ変更（user_id + RLS）

- ブランチ: `feature/auth-rls`
- PR: このグループ完了後に1PR

#### 完了条件

- `inventory_lots` / `recipe_recommendation_logs` に `user_id uuid references auth.users` カラムが追加されている
- 各テーブルに RLS ポリシーが設定されており、自分のデータのみ読み書きできる
- マイグレーションファイルが `supabase/migrations/` に追加されている
- 本番 DB にマイグレーションが適用されている

#### タスク

- [ ] `supabase/migrations/YYYYMMDD_add_user_id.sql` を作成（`inventory_lots`・`recipe_recommendation_logs` に `user_id` 追加）
- [ ] 各テーブルの RLS ポリシーを作成（`auth.uid() = user_id`）
- [ ] `food_masters` と `recipes` は全ユーザー共通のため RLS 対象外とする
- [ ] ローカルで `supabase db reset` を実行してマイグレーションを確認

---

### Phase 13-3: 既存機能の user_id 対応

- ブランチ: `feature/auth-integration`
- PR: このグループ完了後に1PR

#### 完了条件

- 全 repository・API ルートが `user_id` でフィルタされている
- ログインユーザーのデータのみが表示・操作できる
- 既存のテストが通る

#### タスク

- [ ] `src/server/repositories/inventoryRepository.ts` の全関数に `userId` 引数を追加
- [ ] `src/app/api/` 配下の全ルートで `supabase.auth.getUser()` を呼び出し `userId` を取得して repository に渡す
- [ ] `recipe_recommendation_logs` repository にも `userId` を追加
- [ ] 既存テストを更新（`userId` を渡すように修正）
- [ ] ログインユーザー切り替え時にデータが正しく分離されることを手動確認

---

### Phase 12-3: モバイルナビゲーション（底部タブバー）

- ブランチ: `feature/mobile-nav`
- PR: このグループ完了後に1PR

#### 完了条件

- モバイル（640px未満）で底部タブバーが表示される
- タブはホーム・食品・スキャン・レシピの4つ
- デスクトップでは底部タブバーが非表示のまま（サイドバーを使う）
- 現在のページに対応するタブがアクティブ表示される

#### タスク

- [ ] `BottomTabBar` コンポーネントを `src/features/layout/components/` に実装
- [ ] `src/app/(frontend)/layout.tsx` に `BottomTabBar` を追加（`sm:hidden` で制御）
- [ ] `Sidebar` を `hidden sm:flex` に変更してモバイルで非表示にする
- [ ] モバイル・デスクトップ両方で表示を手動確認

---

### Phase 12-4: ホーム画面 UI 刷新

- ブランチ: `feature/mobile-home-ui`
- PR: このグループ完了後に1PR

#### 完了条件

- ホームにオレンジのヒーローエリア（挨拶テキスト + 「今日の献立」 + 食品追加ボタン）が表示される
- 在庫サマリが「N 種類の食品」カード形式で表示される
- `docs/ui-design.md` のホーム画面レイアウトを満たしている

#### タスク

- [ ] `HomeHero` コンポーネントを実装（挨拶 + タイトル + +ボタン）
- [ ] `HomeInventoryCard` コンポーネントを実装（在庫件数カード）
- [ ] `src/app/(frontend)/page.tsx` のレイアウトを更新して両コンポーネントを組み込む
- [ ] モバイルで表示を手動確認

---

### Phase 12-5: レシピ画面 UI 刷新

- ブランチ: `feature/mobile-recipe-ui`
- PR: このグループ完了後に1PR

#### 完了条件

- 1件目のレシピが大きいヒーローカードで表示される
- ヒーローカードに「このレシピを使う」ボタンが直置きされている
- 2件目以降はコンパクトなサブカードで表示される
- `docs/ui-design.md` のレシピ画面レイアウトを満たしている

#### タスク

- [ ] `RecipeHeroCard` コンポーネントを実装（画像エリア・食材・バッジ・CTA ボタン）
- [ ] `RecipeList` を更新して1件目をヒーローカード、2件目以降をサブカードで表示
- [ ] モバイルで表示を手動確認
