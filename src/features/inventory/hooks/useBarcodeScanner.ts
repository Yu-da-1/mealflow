import { useState } from "react";

import type { BarcodeResponse } from "@/lib/types/ui";

/** バーコードスキャンでマスタヒットしたときに返す必要最小限の食品情報 */
export type BarcodeMasterHit = {
  id: string;
  display_name: string;
  category: string;
  default_expiry_days: number;
  default_expiry_type: "best_before" | "use_by";
};

type ScanState =
  | { status: "idle" }
  | { status: "scanning" }
  | { status: "loading" }
  | { status: "found_master"; master: BarcodeMasterHit }
  | { status: "found_off"; displayName: string }
  | { status: "not_found" };

/**
 * バーコードスキャン状態を管理するhook
 *
 * @returns スキャン状態・開始・停止・コード検出ハンドラ・リセット関数
 */
export const useBarcodeScanner = () => {
  const [scanState, setScanState] = useState<ScanState>({ status: "idle" });

  const startScan = () => setScanState({ status: "scanning" });
  const stopScan = () => setScanState({ status: "idle" });
  const reset = () => setScanState({ status: "idle" });

  const handleCodeDetected = async (code: string) => {
    setScanState({ status: "loading" });

    try {
      const res = await fetch(`/api/barcode/${encodeURIComponent(code)}`);

      if (res.status === 404) {
        setScanState({ status: "not_found" });
        return;
      }

      if (!res.ok) {
        setScanState({ status: "not_found" });
        return;
      }

      const data: BarcodeResponse = await res.json();

      if (
        data.source === "master" &&
        data.food_master_id &&
        data.category !== null &&
        data.default_expiry_days !== null &&
        data.default_expiry_type !== null
      ) {
        // マスタヒット: BarcodeResponse に全情報が含まれているため二重呼び出し不要
        setScanState({
          status: "found_master",
          master: {
            id: data.food_master_id,
            display_name: data.display_name,
            category: data.category,
            default_expiry_days: data.default_expiry_days,
            default_expiry_type: data.default_expiry_type,
          },
        });
      } else {
        // Open Food Facts のみのヒット、またはマスタ情報が不完全な場合
        setScanState({ status: "found_off", displayName: data.display_name });
      }
    } catch {
      setScanState({ status: "not_found" });
    }
  };

  return { scanState, startScan, stopScan, handleCodeDetected, reset };
};
