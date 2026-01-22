"use server";

import { searchProducts } from "@/lib/api";

export async function searchProductsAction(query: string) {
  if (!query) return { products: [] };
  return searchProducts(query);
}
