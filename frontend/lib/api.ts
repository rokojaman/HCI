import { Product, ProductResponse } from "@/lib/types";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(limit = 12, skip = 0): Promise<ProductResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function searchProducts(query: string): Promise<ProductResponse> {
  const res = await fetch(`${BASE_URL}/products/search?q=${query}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`, {
    next: { revalidate: 86400 }, // Cache for 24h
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getProductsByCategory(category: string, limit = 12): Promise<ProductResponse> {
  const res = await fetch(`${BASE_URL}/products/category/${category}?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function getProductsSorted(sortBy: 'title' | 'price' | 'rating', order: 'asc' | 'desc' = 'asc', limit = 12): Promise<ProductResponse> {
    const res = await fetch(`${BASE_URL}/products?limit=${limit}&sortBy=${sortBy}&order=${order}`, {
        next: { revalidate: 3600 }
    });
    if(!res.ok) throw new Error("Failed to fetch sorted products");
    return res.json();
}
