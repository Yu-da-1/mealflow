# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 0: プロジェクト初期化

- ブランチ: `chore/project-init`
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

---

## Phase 1: 食品マスタ・在庫CRUD（バックエンド）

### Phase 1-1: 型定義・Repository

- ブランチ: `feature/inventory-types-repository`
- PR: このグループ完了後に1PR

#### 完了条件

- 型定義が揃っている
- RepositoryからSupabaseのデータが取得できる

#### タスク

- [x] 型定義（FoodMasterRow / InventoryLotRow / InventorySummaryItem）
- [x] foodMasterRepository（検索）
- [x] inventoryRepository（CRUD）

---

### Phase 1-2: APIルート

- ブランチ: `feature/inventory-api-routes`
- PR: このグループ完了後に1PR

#### 完了条件

- 全APIエンドポイントがレスポンスを返す

#### タスク

- [x] GET /api/food-masters
- [x] GET /api/inventory（集約）
- [x] POST /api/inventory
- [x] PATCH /api/inventory/:lotId
- [x] DELETE /api/inventory/:lotId

---

## Phase 2: 期限自動設定（バックエンド）

### Phase 2-1: ドメインロジック・API更新

- ブランチ: `feature/expiry-auto-setting`
- PR: このグループ完了後に1PR

#### 完了条件

- 食品登録時に期限が自動設定される

#### タスク

- [x] expiryRules.ts（期限自動設定ロジック）
- [x] POST /api/inventory に期限自動設定を組み込む

---

## Phase 3: レシピ提案（バックエンド）

### Phase 3-1: ドメインロジック・Repository

- ブランチ: `feature/recipe-domain-logic`
- PR: このグループ完了後に1PR

#### 完了条件

- レシピの一致判定・スコアリングのロジックが動く

#### タスク

- [x] matchRecipe.ts（一致判定）
- [x] scoreRecipe.ts（スコアリング）
- [x] recipeRepository

---

### Phase 3-2: APIルート・seedデータ

- ブランチ: `feature/recipe-api-seed`
- PR: このグループ完了後に1PR

#### 完了条件

- おすすめレシピAPIが3件返す
- 直近3日の提案済みレシピが除外される

#### タスク

- [x] GET /api/recipes/recommended
- [x] GET /api/recipes/:id
- [x] レシピseedデータ（30〜50件）

---

## Phase 4: 在庫減算（バックエンド）

### Phase 4-1: ドメインロジック・API

- ブランチ: `feature/inventory-consume`
- PR: このグループ完了後に1PR

#### 完了条件

- レシピ確定後に在庫が減算される
- 提案履歴が記録される

#### タスク

- [x] consumeLogic.ts（在庫減算ロジック）
- [x] POST /api/inventory/consume-from-recipe
- [x] recipe_recommendation_logs 記録処理

---

## Phase 5: UI実装

Pencilデザイン（design.pen）の5画面を1画面ずつ実装する。
共通レイアウトを先に作り、その後各画面を順に実装する。

- オレンジ系プライマリカラー（#F97316 相当）
- 左サイドバー固定（240px）＋右コンテンツエリア（残り幅）
- 画面ごとに1ブランチ・1PR

---

### Phase 5-0: 共通レイアウト（サイドバー）

- ブランチ: `feature/ui-layout`
- PR: このグループ完了後に1PR

#### 完了条件

- サイドバー（ロゴ・メニュー・ユーザー情報）が表示される
- 各ページへのナビゲーションが機能する
- アクティブページがサイドバーでハイライトされる

#### タスク

- [x] `src/features/layout/` にサイドバーコンポーネント作成
- [x] `src/app/(frontend)/layout.tsx` にサイドバー組み込み
- [x] Tailwind でオレンジ系カラーをカスタム設定（tailwind.config.ts）

---

### Phase 5-1: ホーム画面

- ブランチ: `feature/ui-home`
- PR: このグループ完了後に1PR

#### 完了条件

- 期限が近い食品リストが表示される（期限順）
- おすすめレシピが3件表示される
- 各レシピカードから「詳細を見る」でレシピ詳細画面へ遷移できる

#### タスク

- [x] `src/features/home/` にホームページコンポーネント作成
- [x] `src/app/(frontend)/page.tsx` にホームページ組み込み
- [x] GET /api/inventory から期限近い食品を取得して表示
- [x] GET /api/recipes/recommended からレシピを取得して表示

---

### Phase 5-2: 食品一覧画面

- ブランチ: `feature/ui-food-list`
- PR: このグループ完了後に1PR

#### 完了条件

- 登録済み食品がカード形式で表示される
- 各カードに食品名・数量・期限が表示される
- 「詳細を見る」でロット詳細モーダルが開く
- モーダル内でロットの追加・編集・削除ができる

#### タスク

- [x] `src/features/inventory/` に食品一覧ページコンポーネント作成
- [x] `src/app/(frontend)/inventory/page.tsx` 作成
- [x] GET /api/inventory からデータ取得・表示
- [x] 食品詳細モーダルコンポーネント作成（ロット一覧・追加・削除）
- [x] ロット編集フォーム（PATCH /api/inventory/:lotId）※Pencilデザインに編集ボタンを追加

---

### Phase 5-3: 食品登録画面

- ブランチ: `feature/ui-food-register`
- PR: このグループ完了後に1PR

#### 完了条件

- 食品名（マスタ検索）・数量・購入日・期限種別を入力できる
- 「自動設定」選択時は期限日が自動入力される
- 登録後に食品一覧へリダイレクトされる

#### タスク

- [x] `src/features/inventory/` に食品登録フォームコンポーネント作成
- [x] `src/app/(frontend)/inventory/new/page.tsx` 作成
- [x] GET /api/food-masters で食品名インクリメンタル検索
- [x] POST /api/inventory で登録処理

---

### Phase 5-4: おすすめレシピ画面

- ブランチ: `feature/ui-recipes`
- PR: このグループ完了後に1PR

#### 完了条件

- おすすめレシピ3件がカード表示される
- 「詳細を見る」で使用食材の確認モーダルが開く
- 「確定する」で在庫減算APIが呼ばれ食品一覧へ遷移する

#### タスク

- [ ] `src/features/recipes/` にレシピ一覧ページコンポーネント作成
- [ ] `src/app/(frontend)/recipes/page.tsx` 作成
- [ ] GET /api/recipes/recommended からレシピ取得・表示
- [ ] 食材確認モーダルコンポーネント作成
- [ ] POST /api/inventory/consume-from-recipe で在庫減算
