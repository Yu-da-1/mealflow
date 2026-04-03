# バックログ

タスクは上から順に着手する。
着手するタスクは tasks/current.md に移してから始める。

---

## Phase 8: seed データ充実

アプリを実際に使える状態にするための食品マスタ・レシピデータを整備する。

---

### Phase 8-1: 食品マスタ拡充

- ブランチ: `data/food-masters`
- PR: このグループ完了後に1PR

#### 完了条件

- 食品マスタが 100件以上になっている
- 肉類・魚介類に `parent_recipe_match_key` が設定されている
- `pnpm vitest run` がパスする

#### タスク

- [ ] 野菜類の追加（小松菜・白菜・ごぼう・さつまいも・かぼちゃ・アスパラ・豆苗・水菜・チンゲン菜 など）
- [ ] きのこ類の追加（えのき・エリンギ・まいたけ・なめこ など）
- [ ] 魚介類の追加（あじ・さば・いわし・えび・ほたて・あさり・たら・ぶり など）
- [ ] 乳製品・卵加工の追加（バター・チーズ・ヨーグルト・生クリーム など）
- [ ] 加工食品の追加（ちくわ・さつま揚げ・ハム・ベーコン・ソーセージ・豆乳 など）
- [ ] 肉類の `parent_recipe_match_key` 設定（例: `chicken_thigh` / `chicken_breast` → `chicken`、`pork_belly` / `pork_loin` / `pork_bits` / `ground_pork` → `pork`、`ground_beef` → `beef`）

---

## Phase 9: CI 整備

PR マージ前に型・lint・テストを自動チェックする GitHub Actions ワークフローを整備する。

---

### Phase 9-1: CI ワークフロー

- ブランチ: `chore/ci`
- PR: このグループ完了後に1PR

#### 完了条件

- PR 作成・更新時に CI が自動で走る
- tsc・lint・test のいずれかが失敗したら CI が red になる

#### タスク

- [ ] `.github/workflows/ci.yml` を作成
- [ ] `pnpm tsc --noEmit`（型チェック）をジョブに追加
- [ ] `pnpm eslint . --max-warnings 0`（lint）をジョブに追加
- [ ] `pnpm vitest run`（テスト）をジョブに追加
- [ ] トリガー: `pull_request`（main ブランチ向け）および `push`（main ブランチ）
