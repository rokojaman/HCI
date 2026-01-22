"use server";

import { searchProducts, getCategories } from "@/lib/api";

export async function searchProductsAction(query: string) {
  if (!query) return { products: [], categories: [] };
  
  const [productsData, categoriesList] = await Promise.all([
    searchProducts(query),
    getCategories()
  ]);

  const matchedCategories = categoriesList.filter(cat => 
    cat.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit categories

  return {
    products: productsData.products,
    categories: matchedCategories
  };
}