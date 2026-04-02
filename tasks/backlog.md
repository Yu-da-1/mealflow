# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---


## Phase 7: ドメイン層ユニットテスト

`src/domain/` の純粋関数に対するユニットテストを整備する。
ロジックの正確性を担保し、リグレッションを防ぐ。

---

### Phase 7-1: レシピ関連ロジックのテスト

- ブランチ: `test/domain-recipe`
- PR: このグループ完了後に1PR

#### 完了条件

- `scoreRecipe` / `matchRecipe` / `buildInventoryKeySet` / `buildRecommendReason` の全ケースがテストされている
- `pnpm vitest run` がパスする

#### タスク

- [ ] `scoreRecipe`: 期限切れ食材あり・なし・複数一致のスコア計算
- [ ] `matchRecipe`: 必須食材がすべて揃う・一部欠ける・任意食材のみのケース
- [ ] `buildInventoryKeySet`: `parent_recipe_match_key` の展開・期限当日/翌日の expiringKeys 判定・期限なしロット
- [ ] `buildRecommendReason`: 期限切れ食材あり（表示名あり/なし）・期限切れなし

---

### Phase 7-2: 在庫ロジックのテスト

- ブランチ: `test/domain-inventory`
- PR: このグループ完了後に1PR

#### 完了条件

- `computeConsumption` / `applyExpiryRule` / `buildInventorySummary` の全ケースがテストされている
- `pnpm vitest run` がパスする

#### タスク

- [ ] `computeConsumption`: 単一ロット消費・複数ロットの expiry_date 近い順優先・purchased_at 古い順優先・expiry_date null のロットが末尾・quantity=0 で consumed に遷移・`parent_recipe_match_key` 経由の一致
- [ ] `applyExpiryRule`: expiry_date 指定あり（manual）・なし（estimated・日数計算の正確性）
- [ ] `buildInventorySummary`: 複数ロットの合計数量・最近期限の選択・期限なしロットのみ

---

### Phase 7-3: バリデーションのテスト

- ブランチ: `test/domain-validation`
- PR: このグループ完了後に1PR

#### 完了条件

- 3つのバリデーション関数の正常系・各フィールドの異常系がテストされている
- `pnpm vitest run` がパスする

#### タスク

- [ ] `validateCreateInventoryLotInput`: 正常系・food_master_id 欠損・quantity が 0/小数/文字列・purchased_at の日付フォーマット不正・expiry_date の日付フォーマット不正
- [ ] `validateUpdateInventoryLotInput`: 正常系（各フィールド個別更新）・quantity が数値以外・expiry_type/expiry_source/status が不正値
- [ ] `validateConsumeFromRecipeInput`: 正常系・recipe_id 欠損・ingredient_keys が空配列・文字列以外の要素を含む
