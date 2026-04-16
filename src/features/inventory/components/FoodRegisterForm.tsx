"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { FoodMasterRow } from "@/lib/types/database";

import { BarcodeScanner } from "./BarcodeScanner";
import { useBarcodeScanner } from "../hooks/useBarcodeScanner";
import type { BarcodeMasterHit } from "../hooks/useBarcodeScanner";

const todayStr = () => new Date().toISOString().slice(0, 10);

const calcAutoExpiry = (purchasedAt: string, defaultDays: number): string => {
  const d = new Date(purchasedAt);
  d.setDate(d.getDate() + defaultDays);
  return d.toISOString().slice(0, 10);
};

/**
 * 食品登録フォーム
 *
 * @returns バーコードスキャン・食品名インクリメンタル検索・数量・購入日・期限日を入力できるフォーム
 */
export function FoodRegisterForm() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<FoodMasterRow[]>([]);
  // バーコードスキャン（BarcodeMasterHit）と手動検索（FoodMasterRow）の両方を受け入れる
  const [selectedMaster, setSelectedMaster] = useState<BarcodeMasterHit | FoodMasterRow | null>(
    null,
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [quantity, setQuantity] = useState("1");
  const [purchasedAt, setPurchasedAt] = useState(todayStr());
  const [expiryDate, setExpiryDate] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scanState, startScan, stopScan, handleCodeDetected, reset } = useBarcodeScanner();

  // トーストを表示して 3 秒後に自動消去
  const showToast = (message: string) => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  // バーコードスキャン結果の処理
  // scanState はステータス変化のたびに新しいオブジェクトになるため scanState 全体を依存配列に入れる
  useEffect(() => {
    if (scanState.status === "found_master") {
      selectMaster(scanState.master);
      reset();
    } else if (scanState.status === "found_off") {
      // OFFヒット: 食品名を自動入力するが、マスタ未登録なのでユーザーが手動選択
      clearMaster();
      setQuery(scanState.displayName);
      showToast("この食品はマスタにありません。手動で選択してください");
      reset();
    } else if (scanState.status === "not_found") {
      showToast("この食品はマスタにありません。手動で入力してください");
      reset();
    }
    // selectMaster / clearMaster / showToast / reset はコンポーネントスコープの関数だが
    // いずれも setState のみを呼ぶため、useCallback なしでも依存配列に含めなくて安全
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanState]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  // 食品名インクリメンタル検索
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim() || selectedMaster) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/food-masters?query=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data: FoodMasterRow[] = await res.json();
          setSuggestions(data);
          setShowSuggestions(true);
        }
      } catch {
        // サジェスト失敗は無視
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedMaster]);

  // マスタ選択 or 購入日変更 → 期限を自動計算
  useEffect(() => {
    if (selectedMaster && purchasedAt) {
      setExpiryDate(calcAutoExpiry(purchasedAt, selectedMaster.default_expiry_days));
    }
  }, [selectedMaster, purchasedAt]);

  const selectMaster = (master: BarcodeMasterHit | FoodMasterRow) => {
    setSelectedMaster(master);
    setQuery(master.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const clearMaster = () => {
    setSelectedMaster(null);
    setQuery("");
    setExpiryDate("");
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaster) {
      setError("食品名を選択してください");
      return;
    }
    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setError("数量は1以上の整数を入力してください");
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          food_master_id: selectedMaster.id,
          quantity: parsedQuantity,
          purchased_at: purchasedAt,
          expiry_date: expiryDate || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "登録に失敗しました");
        return;
      }

      router.push("/inventory");
    } catch {
      setError("登録に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* トースト通知 */}
      {toast && (
        <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2.5 text-sm text-amber-800">
          {toast}
        </div>
      )}

      {/* バーコードスキャナー */}
      {scanState.status === "scanning" && (
        <BarcodeScanner onDetected={handleCodeDetected} onClose={stopScan} />
      )}

      {/* スキャン中ローディング */}
      {scanState.status === "loading" && (
        <div className="rounded-lg bg-card border border-border px-3 py-3 text-sm text-muted-foreground text-center">
          照合中...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* バーコード読み取りボタン */}
        <button
          type="button"
          onClick={startScan}
          disabled={scanState.status === "scanning" || scanState.status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-sidebar transition-colors disabled:opacity-50"
        >
          <span>📷</span>
          バーコードを読み取る
        </button>

        {/* 食品名 */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-1.5">
            食品名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (selectedMaster) clearMaster();
            }}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder="例: 卵、鶏肉..."
            required
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {selectedMaster && (
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedMaster.category}　デフォルト期限: {selectedMaster.default_expiry_days}日
            </p>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-lg border border-border bg-card shadow-lg overflow-hidden">
              {suggestions.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onMouseDown={() => selectMaster(m)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm hover:bg-sidebar transition-colors"
                  >
                    <span className="font-medium text-foreground">{m.display_name}</span>
                    <span className="text-xs text-muted-foreground">{m.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 数量 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            数量 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* 購入日 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            購入日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={purchasedAt}
            onChange={(e) => setPurchasedAt(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* 期限日 */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">
            期限日
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              （空欄で自動設定）
            </span>
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {selectedMaster && expiryDate && (
            <p className="mt-1 text-xs text-muted-foreground">
              {expiryDate === calcAutoExpiry(purchasedAt, selectedMaster.default_expiry_days)
                ? "自動設定"
                : "手動設定"}
            </p>
          )}
        </div>

        {/* エラー */}
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

        {/* 送信ボタン */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.push("/inventory")}
            className="flex-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-sidebar transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={submitting || !selectedMaster}
            className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "登録中..." : "登録する"}
          </button>
        </div>
      </form>
    </div>
  );
}
