# 003: レシピキャッシュ戦略

## 決定内容

Next.js の `unstable_cache` + `revalidateTag` を使ってレシピ生成結果をキャッシュする。
在庫変更 API（追加・更新・削除・消費）で `revalidateTag("recommended-recipes", {})` を呼び、キャッシュを無効化する。

## 理由

- `unstable_cache` はコードの変更が最小限で済む（ページのデータ取得ロジックをそのままラップするだけ）
- 在庫変更は既存の API ルート 4 箇所で行われており、そこに `revalidateTag` を追加するだけで無効化できる
- DB にキャッシュ用テーブルを追加するより実装量が少なく、スキーマ変更も不要

## 却下した選択肢

**DB 保存方式**（在庫のハッシュ + 生成済みレシピを DB に保持）
- 在庫状態のハッシュ計算ロジックが必要
- キャッシュ用テーブルのスキーマ追加が必要
- `unstable_cache` より実装量が多い
- MVP のスコープを超えると判断し却下

## 補足

この Next.js バージョンでは `revalidateTag` のシグネチャが `(tag: string, profile: string | CacheLifeConfig)` と変更されており、第2引数が必須。単純な無効化目的のため `{}` を渡している。
