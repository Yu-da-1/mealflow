import type { OffProductResult } from "@/lib/types/ui";

const OFF_BASE_URL = "https://world.openfoodfacts.org/api/v0/product";

/**
 * Open Food Facts API から JAN コードに対応する商品名を取得する
 *
 * @param janCode - 検索する JAN コード
 * @returns 商品が見つかった場合は食品名、見つからない場合は found: false
 */
export const fetchFromOpenFoodFacts = async (janCode: string): Promise<OffProductResult> => {
  const res = await fetch(`${OFF_BASE_URL}/${janCode}.json`);

  if (!res.ok) return { found: false };

  const json = (await res.json()) as {
    status: number;
    product?: { product_name_ja?: string; product_name?: string };
  };

  if (json.status !== 1 || !json.product) return { found: false };

  const name = json.product.product_name_ja ?? json.product.product_name ?? "";
  if (!name) return { found: false };

  return { found: true, displayName: name };
};
