# コーディング規約

## ファイル・ディレクトリの命名

| 対象           | 規則                   | 例                       |
| -------------- | ---------------------- | ------------------------ |
| コンポーネント | PascalCase             | `InventoryList.tsx`      |
| hooks          | camelCase（use始まり） | `useInventory.ts`        |
| ドメイン関数   | camelCase              | `scoreRecipe.ts`         |
| repository     | camelCase              | `inventoryRepository.ts` |
| 型定義ファイル | camelCase              | `database.ts` / `ui.ts`  |
| ディレクトリ   | kebab-case             | `food-masters/`          |

---

## 関数の書き方

**コンポーネントは `function` 宣言**

```typescript
// ✅
export function InventoryList({ items }: Props) {
  return <ul>...</ul>
}

// ❌
export const InventoryList = ({ items }: Props) => {
  return <ul>...</ul>
}
```

**それ以外は arrow function**

```typescript
// ✅ hooks
export const useInventory = () => {
  ...
}

// ✅ ドメイン関数
export const scoreRecipe = (recipe: Recipe, inventory: InventoryLot[]): number => {
  ...
}

// ✅ repository
export const getActiveInventory = async (): Promise<InventoryLotRow[]> => {
  ...
}
```

---

## ファイル配置

```
src/features/[機能名]/
├── components/         コンポーネント（PascalCase.tsx）
├── hooks/              カスタムhooks（useXxx.ts）
└── types.ts            この機能のUI用型定義

src/domain/[機能名]/    ドメイン関数（camelCase.ts）
src/server/repositories/ repository（camelCase.ts）
src/lib/types/
├── database.ts         DB由来の型（XxxRow）
└── ui.ts               UI用の共通型
```

---

## 型定義の命名

| 種類               | 規則           | 例                          |
| ------------------ | -------------- | --------------------------- |
| DB由来の型         | `XxxRow`       | `InventoryLotRow`           |
| 集約・加工済みUI型 | 意味のある名前 | `InventorySummaryItem`      |
| APIレスポンス型    | `XxxResponse`  | `RecommendedRecipeResponse` |
| フォーム入力型     | `XxxInput`     | `InventoryFormInput`        |
| Propsの型          | `XxxProps`     | `RecipeCardProps`           |

---

## import順

以下の順番で記載し、グループ間は1行空ける。

```typescript
// 1. Reactおよび外部ライブラリ
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. 内部モジュール（@/始まり）
import { scoreRecipe } from "@/domain/recipes/scoreRecipe";
import type { InventoryLotRow } from "@/lib/types/database";

// 3. 同階層・相対パス
import { RecipeCard } from "./RecipeCard";
```

---

## その他

- `export default` は使わない。すべて named export にする
- 型のみのimportは `import type` を使う
- `any` は使わない。どうしても必要な場合はコメントで理由を書く

---

## ブランチ命名規則

### prefix

| prefix      | 用途             | 例                                   |
| ----------- | ---------------- | ------------------------------------ |
| `feature/`  | 新機能の実装     | `feature/inventory-types-repository` |
| `fix/`      | バグ修正         | `fix/expiry-date-calculation`        |
| `chore/`    | 設定・環境整備   | `chore/project-init`                 |
| `refactor/` | リファクタリング | `refactor/recipe-scoring-logic`      |

### 命名ルール

- prefix の後は kebab-case で機能名を書く
- Phase番号は含めない（機能名だけで意味が通るようにする）
- 短く具体的に（3〜5単語が目安）

```
✅ feature/inventory-types-repository
✅ fix/expiry-date-calculation
❌ feature/phase1-1-types-repository  （Phase番号は不要）
❌ feature/implement-inventory-types-and-repository-for-food-management  （長すぎ）
```
