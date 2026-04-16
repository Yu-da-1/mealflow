# 環境変数一覧

## 変数一覧

| 変数名                          | 説明                      | ローカル     | Production      |
| ------------------------------- | ------------------------- | ------------ | --------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase プロジェクト URL | `.env.local` | Vercel 環境変数 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon キー        | `.env.local` | Vercel 環境変数 |
| `ANTHROPIC_API_KEY`             | Claude API キー           | `.env.local` | Vercel 環境変数 |

## ローカル開発

`.env.local` を作成し以下を設定する（`.gitignore` 対象のため commit しない）。

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
ANTHROPIC_API_KEY=sk-ant-...
```

取得場所:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase ダッシュボード → Project Settings → API
- `ANTHROPIC_API_KEY`: console.anthropic.com → API Keys

## Production（Vercel）

Vercel ダッシュボード → Project → Settings → Environment Variables に登録する。

## CI/CD（GitHub Actions）

マイグレーション自動適用のために以下を GitHub Secrets に登録する。

| Secret 名               | 取得場所                                                            |
| ----------------------- | ------------------------------------------------------------------- |
| `SUPABASE_ACCESS_TOKEN` | supabase.com → Account Settings → Access Tokens                     |
| `SUPABASE_PROJECT_REF`  | Supabase ダッシュボード → Project Settings → General → Reference ID |

`main` ブランチへの push 時に CI 通過後、自動で `supabase db push` が実行される。
