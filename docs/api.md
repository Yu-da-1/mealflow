# API仕様

## 食品マスタ

### GET /api/food-masters
クエリパラメータ: `query` (前方一致 + 部分一致で検索)

レスポンス:
```json
[
  {
    "id": "uuid",
    "display_name": "卵",
    "category": "その他",
    "default_expiry_type": "best_before",
    "default_expiry_days": 14
  }
]
```

### GET /api/food-masters/:id
単一食品マスタの取得。

---

## 在庫

### GET /api/inventory
food_master単位で集約した在庫一覧。

レスポンス:
```json
[
  {
    "food_master_id": "uuid",
    "display_name": "卵",
    "total_quantity": 16,
    "nearest_expiry_date": "2025-03-20"
  }
]
```

### GET /api/inventory/lots
ロット単位の一覧（アコーディオン展開用）。

### POST /api/inventory
食品追加。期限未入力時はfood_mastersのdefault_expiry_daysで自動設定する。

リクエスト:
```json
{
  "food_master_id": "uuid",
  "quantity": 10,
  "purchased_at": "2025-03-15",
  "expiry_date": null
}
```

### PATCH /api/inventory/:lotId
ロット更新。

### DELETE /api/inventory/:lotId
ロット削除。

### POST /api/inventory/consume-from-recipe
レシピ実行による在庫減算。古いロットから優先して減算する。

リクエスト:
```json
{
  "recipe_id": "uuid",
  "ingredient_keys": ["egg", "spinach"]
}
```

---

## レシピ

### GET /api/recipes/recommended
スコアリング上位3件を返す。直近3日の提案済みレシピは除外する。

レスポンス:
```json
[
  {
    "id": "uuid",
    "title": "卵とほうれん草の炒め物",
    "description": "...",
    "cooking_time_minutes": 15,
    "reason": "期限が近い卵を使えます"
  }
]
```

### GET /api/recipes/:id
レシピ詳細 + recipe_ingredientsを返す。