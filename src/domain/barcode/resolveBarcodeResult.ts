import type { FoodMasterRow } from "@/lib/types/database";
import type { BarcodeResponse, OffProductResult } from "@/lib/types/ui";

/**
 * マスタ照合結果と Open Food Facts 結果から BarcodeResponse を組み立てる
 *
 * マスタヒットを優先し、ミスの場合のみ OFF の結果を使う。
 * どちらもヒットしない場合は null を返す（呼び出し元で 404 にする）。
 *
 * @param master - food_master_jan_codes の照合結果。未登録なら null
 * @param off - Open Food Facts の照合結果。マスタヒット時は省略可
 * @returns BarcodeResponse、またはどちらもミスの場合は null
 */
export const resolveBarcodeResult = (
  master: FoodMasterRow | null,
  off: OffProductResult = { found: false },
): BarcodeResponse | null => {
  if (master) {
    return {
      source: "master",
      food_master_id: master.id,
      display_name: master.display_name,
      default_expiry_days: master.default_expiry_days,
      default_expiry_type: master.default_expiry_type,
    };
  }

  if (off.found) {
    return {
      source: "open_food_facts",
      food_master_id: null,
      display_name: off.displayName,
      default_expiry_days: null,
      default_expiry_type: null,
    };
  }

  return null;
};
