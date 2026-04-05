import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

/**
 * Supabase クライアントを返す。初回呼び出し時に初期化する。
 *
 * モジュール評価時ではなくリクエスト処理時に初期化することで、
 * ビルド時に環境変数が不要になる。
 *
 * @returns 初期化済みの SupabaseClient
 */
export const getSupabase = (): SupabaseClient => {
  if (_client) return _client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set in environment variables");
  }

  _client = createClient(url, key);
  return _client;
};
