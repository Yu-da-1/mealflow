# fridge-app

冷蔵庫管理・献立提案アプリ。

## 作業開始時に必ず読む

- 今のタスク → `tasks/current.md`
- `tasks/current.md` が空の場合のみ → `tasks/backlog.md` を読み、先頭の未完了グループを `current.md` に移してから作業を開始する
- 全体仕様 → `docs/design.md`

## レイヤー構成と依存ルール

```
UI層     src/features/
API層    src/app/api/
Domain層 src/domain/             ← 純粋関数のみ。外部依存禁止
Infra層  src/server/repositories/
```

依存方向: `UI → API → Domain ← Repository`

## 絶対に守ること

- `supabase` は `src/server/repositories/` からのみ呼ぶ
- `src/domain/` にDB・HTTPの処理を書かない
- APIルートにロジックを書かない（domainを呼ぶだけ）
- 実装前に型定義を先に書く
- MVP範囲外の機能を実装しない（`docs/design.md` セクション2参照）
- **`main` に直接コミット・プッシュしない。必ずブランチを切ってPRを作成する（docs変更・修正含む全ての作業）**

## コードの書き方

- 同じ処理が2箇所以上に現れたら共通化する（DRY）
- 1つの関数は1つのことだけをする
- 関数が長くなってきたら（目安: 30〜40行）、責務ごとに分割できないか考える
- ただし、過度に分割して読みにくくなるくらいなら無理に分けない

## コマンド

```bash
pnpm prettier --write .        # フォーマット
pnpm eslint . --fix            # lint自動修正
pnpm tsc --noEmit              # 型チェック
pnpm eslint . --max-warnings 0 # lint厳密チェック
pnpm vitest run                # テスト実行
```

`src/app/` 配下のファイルを移動・削除した後は `.next` キャッシュが古い参照を持つ。
`tsc` を実行する前に必ず `rm -rf .next` を行うこと。

## ワークフロー

実装時は `.claude/commands/implement.md` の Explore → Plan → Implement → Verify → Record に従う。

## 迷ったとき

1. `docs/design.md` の該当セクションを確認する
2. それでも判断できなければ、より疎結合になる方を選ぶ
3. 重要な判断をしたら `docs/decisions/` に記録する

## decisions/ に記録する基準

以下のいずれかに当てはまる判断は `docs/decisions/` に記録する。
テンプレートは `docs/decisions/TEMPLATE.md`、ファイル名は `NNN-kebab-case.md`。

**記録する**

- 複数の選択肢を比較検討した末の決定
- 外部制約（コスト・ライセンス・利用規約）が理由になった選択
- 「なぜこれにしたの？」と後から聞かれそうなトレードオフ
- 却下した選択肢が魅力的に見えるケース（将来また同じ議論をしないために）

**記録しない**

- コードを読めば明らかな実装詳細
- lint・フォーマット・パッチバージョンの更新
- 「普通にやった」こと（慣習通りの選択）
