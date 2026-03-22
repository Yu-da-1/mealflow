# 001 Vitest 2.x を採用

## 決定内容

Vitest 2.x（2.1.9）を採用する。

## 理由

Vitest 4.x は rolldown（ESM 専用）、Vitest 3.2.x は Vite 7（ESM 専用）に依存しており、プロジェクトが CJS モードの場合にネイティブバインディングエラーや ERR_REQUIRE_ESM が発生する。Vitest 2.x は Vite 5 系を使い、CJS/ESM 両対応で安定して動作する。

## 却下した選択肢

- Vitest 4.x: rolldown の darwin-arm64 バインディングが解決できず断念
- Vitest 3.2.x: vite 7 が ESM 専用で CJS プロジェクトと互換性なし
- package.json に `"type": "module"` を追加: Next.js の設定ファイル群との互換性リスクを避けた
