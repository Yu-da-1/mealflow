"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { X, Trash2, Pencil, Check, Plus } from "lucide-react";

import type { InventoryLotRow } from "@/lib/types/database";
import type { InventorySummaryItem } from "@/lib/types/ui";

type InventoryDetailModalProps = {
  item: InventorySummaryItem;
  onClose: () => void;
};

type EditingLot = {
  quantity: string;
  expiry_date: string;
  expiry_type: "best_before" | "use_by";
};

const EXPIRY_TYPE_LABEL: Record<"best_before" | "use_by", string> = {
  best_before: "賞味期限",
  use_by: "消費期限",
};

const EXPIRY_SOURCE_LABEL: Record<"estimated" | "manual", string> = {
  estimated: "自動",
  manual: "手動",
};

const today = () => new Date().toISOString().slice(0, 10);

/**
 * 食品詳細モーダル
 *
 * @param item - 対象食品のサマリ（ロット一覧含む）
 * @param onClose - モーダルを閉じるコールバック
 * @returns ロット一覧・追加・編集・削除が可能なモーダル
 */
export function InventoryDetailModal({ item, onClose }: InventoryDetailModalProps) {
  const router = useRouter();
  const backdropRef = useRef<HTMLDivElement>(null);

  const [editingLotId, setEditingLotId] = useState<string | null>(null);
  const [editingValues, setEditingValues] = useState<EditingLot | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addValues, setAddValues] = useState({ quantity: "1", purchased_at: today() });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backdrop クリックで閉じる
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  // ESC キーで閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const refreshAndClose = () => {
    router.refresh();
    onClose();
  };

  const startEdit = (lot: InventoryLotRow) => {
    setEditingLotId(lot.id);
    setEditingValues({
      quantity: String(lot.quantity),
      expiry_date: lot.expiry_date ?? "",
      expiry_type: lot.expiry_type,
    });
    setError(null);
  };

  const cancelEdit = () => {
    setEditingLotId(null);
    setEditingValues(null);
    setError(null);
  };

  const submitEdit = async (lotId: string) => {
    if (!editingValues) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/inventory/${lotId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: Number(editingValues.quantity),
          expiry_date: editingValues.expiry_date || null,
          expiry_type: editingValues.expiry_type,
          expiry_source: "manual",
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "更新に失敗しました");
        return;
      }
      refreshAndClose();
    } catch {
      setError("更新に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteLot = async (lotId: string) => {
    if (!confirm("このロットを削除しますか？")) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/inventory/${lotId}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        setError("削除に失敗しました");
        return;
      }
      refreshAndClose();
    } catch {
      setError("削除に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  const submitAdd = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          food_master_id: item.food_master_id,
          quantity: Number(addValues.quantity),
          purchased_at: addValues.purchased_at,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "登録に失敗しました");
        return;
      }
      refreshAndClose();
    } catch {
      setError("登録に失敗しました");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl bg-card shadow-xl mx-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground">{item.display_name}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar transition-colors"
            aria-label="閉じる"
          >
            <X size={16} />
          </button>
        </div>

        {/* ロット一覧 */}
        <div className="p-5 space-y-3">
          {error && <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          {item.lots.length === 0 ? (
            <p className="text-sm text-muted-foreground">ロットがありません</p>
          ) : (
            item.lots.map((lot) =>
              editingLotId === lot.id ? (
                // 編集フォーム
                <div
                  key={lot.id}
                  className="rounded-lg border border-primary/50 bg-card p-3 space-y-2"
                >
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">数量</label>
                      <input
                        type="number"
                        min="1"
                        value={editingValues?.quantity ?? ""}
                        onChange={(e) =>
                          setEditingValues((v) => v && { ...v, quantity: e.target.value })
                        }
                        className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">期限日</label>
                      <input
                        type="date"
                        value={editingValues?.expiry_date ?? ""}
                        onChange={(e) =>
                          setEditingValues((v) => v && { ...v, expiry_date: e.target.value })
                        }
                        className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">期限種別</label>
                    <select
                      value={editingValues?.expiry_type ?? "best_before"}
                      onChange={(e) =>
                        setEditingValues(
                          (v) =>
                            v && {
                              ...v,
                              expiry_type: e.target.value as "best_before" | "use_by",
                            },
                        )
                      }
                      className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="best_before">賞味期限</option>
                      <option value="use_by">消費期限</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      onClick={cancelEdit}
                      className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-sidebar"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={() => submitEdit(lot.id)}
                      disabled={submitting}
                      className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                      <Check size={12} />
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                // 通常表示
                <div
                  key={lot.id}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">{lot.quantity}個</p>
                    <p className="text-xs text-muted-foreground">
                      購入日: {lot.purchased_at}
                      {lot.expiry_date && (
                        <>
                          　期限: {lot.expiry_date}（{EXPIRY_TYPE_LABEL[lot.expiry_type]}・
                          {EXPIRY_SOURCE_LABEL[lot.expiry_source]}）
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(lot)}
                      disabled={submitting}
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-sidebar transition-colors"
                      aria-label="編集"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteLot(lot.id)}
                      disabled={submitting}
                      className="rounded-md p-1.5 text-red-400 hover:bg-red-50 transition-colors"
                      aria-label="削除"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ),
            )
          )}

          {/* ロット追加 */}
          {isAdding ? (
            <div className="rounded-lg border border-primary/50 bg-card p-3 space-y-2">
              <p className="text-xs font-medium text-foreground">ロットを追加</p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">数量</label>
                  <input
                    type="number"
                    min="1"
                    value={addValues.quantity}
                    onChange={(e) => setAddValues((v) => ({ ...v, quantity: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">購入日</label>
                  <input
                    type="date"
                    value={addValues.purchased_at}
                    onChange={(e) => setAddValues((v) => ({ ...v, purchased_at: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-border px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setIsAdding(false)}
                  className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-sidebar"
                >
                  キャンセル
                </button>
                <button
                  onClick={submitAdd}
                  disabled={submitting}
                  className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                >
                  <Check size={12} />
                  追加
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsAdding(true);
                setAddValues({ quantity: "1", purchased_at: today() });
                setError(null);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Plus size={14} />
              ロットを追加
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
