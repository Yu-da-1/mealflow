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

- [ ] 型定義（FoodMasterRow / InventoryLotRow / InventorySummaryItem）
- [ ] foodMasterRepository（検索）
- [ ] inventoryRepository（CRUD）

---

### Phase 1-2: APIルート

- ブランチ: `feature/inventory-api-routes`
- PR: このグループ完了後に1PR

#### 完了条件

- 全APIエンドポイントがレスポンスを返す

#### タスク

- [ ] GET /api/food-masters
- [ ] GET /api/inventory（集約）
- [ ] POST /api/inventory
- [ ] PATCH /api/inventory/:lotId
- [ ] DELETE /api/inventory/:lotId

---

## Phase 2: 期限自動設定（バックエンド）

### Phase 2-1: ドメインロジック・API更新

- ブランチ: `feature/expiry-auto-setting`
- PR: このグループ完了後に1PR

#### 完了条件

- 食品登録時に期限が自動設定される

#### タスク

- [ ] expiryRules.ts（期限自動設定ロジック）
- [ ] POST /api/inventory に期限自動設定を組み込む

---

## Phase 3: レシピ提案（バックエンド）

### Phase 3-1: ドメインロジック・Repository

- ブランチ: `feature/recipe-domain-logic`
- PR: このグループ完了後に1PR

#### 完了条件

- レシピの一致判定・スコアリングのロジックが動く

#### タスク

- [ ] matchRecipe.ts（一致判定）
- [ ] scoreRecipe.ts（スコアリング）
- [ ] recipeRepository

---

### Phase 3-2: APIルート・seedデータ

- ブランチ: `feature/recipe-api-seed`
- PR: このグループ完了後に1PR

#### 完了条件

- おすすめレシピAPIが3件返す
- 直近3日の提案済みレシピが除外される

#### タスク

- [ ] GET /api/recipes/recommended
- [ ] GET /api/recipes/:id
- [ ] レシピseedデータ（30〜50件）

---

## Phase 4: 在庫減算（バックエンド）

### Phase 4-1: ドメインロジック・API

- ブランチ: `feature/inventory-consume`
- PR: このグループ完了後に1PR

#### 完了条件

- レシピ確定後に在庫が減算される
- 提案履歴が記録される

#### タスク

- [ ] consumeLogic.ts（在庫減算ロジック）
- [ ] POST /api/inventory/consume-from-recipe
- [ ] recipe_recommendation_logs 記録処理

---

## Phase 5: UI実装（画面設計完了後に追加）

※ 画面設計が完了してから各Phaseのタスクを追記する
