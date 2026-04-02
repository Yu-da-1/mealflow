---
paths:
  - "src/**/__tests__/**/*.ts"
  - "src/**/*.test.ts"
---

# テスト規約

## 対象と方針

- **ユニットテスト対象**: `src/domain/` の純粋関数
- **モック方針**: ドメイン関数は純粋関数のため、モック不要。input/output のみで検証する

---

## ファイル配置

テストファイルは対象関数と同じ機能ディレクトリの `__tests__/` に置く。

```
src/domain/
├── recipe/
│   ├── scoreRecipe.ts
│   └── __tests__/
│       └── scoreRecipe.test.ts
├── inventory/
│   ├── consumeLogic.ts
│   └── __tests__/
│       └── consumeLogic.test.ts
```

---

## テストの書き方

`describe` で関数名、`it` で `should ~` 形式のケースを記述する。
各テストは **Arrange → Act → Assert** の順で書く（コメントは不要）。

```typescript
import { describe, expect, it } from "vitest";
import { scoreRecipe } from "../scoreRecipe";

describe("scoreRecipe", () => {
  it("should add 20 points per expiring ingredient", () => {
    const availableKeys = new Set(["egg", "milk"]);
    const expiringKeys = new Set(["egg"]);
    const recipe = { ingredients: [{ recipe_match_key: "egg" }, { recipe_match_key: "milk" }] };

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(40);
  });

  it("should return 0 when no ingredients match", () => {
    const availableKeys = new Set<string>();
    const expiringKeys = new Set<string>();
    const recipe = { ingredients: [{ recipe_match_key: "egg" }] };

    const score = scoreRecipe(recipe, availableKeys, expiringKeys);

    expect(score).toBe(0);
  });
});
```

---

## テストデータ

テストデータはテスト内にインラインで定義する。複数テストで共通して使う場合のみ、同じファイル内の上部に `const` で定義する。

DB の型（`XxxRow`）を使う場合、`as` キャストや型アサーションで誤魔化さず、**型を満たすオブジェクトを正直に書く**。

---

## テストの実行

```bash
pnpm vitest run                      # 全テスト実行
pnpm vitest run --reporter=verbose   # 詳細出力
```
