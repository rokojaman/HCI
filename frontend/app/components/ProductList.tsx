import { Product, ProductResponse } from "@/lib/types";
import { ProductCard } from "@/app/components/ProductCard";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=12&select=id,title,price,description,discountPercentage,rating,thumbnail,category", {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: ProductResponse = await res.json();
    return data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function ProductList() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-500">No products found. Please try again later.</p>
      </div>
    );
  }

  return (
    <section id="products" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl">
                Check out our most popular items, selected just for you.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
