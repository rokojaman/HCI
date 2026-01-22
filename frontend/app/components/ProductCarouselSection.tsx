import { getProductsSorted, getProductsByCategory } from "@/lib/api";
import { ProductCarousel } from "./ProductCarousel";

interface ProductCarouselSectionProps {
  type: "featured" | "newest" | "rating" | "sale" | "category";
  category?: string;
  title?: string;
}

export async function ProductCarouselSection({ type, category, title }: ProductCarouselSectionProps) {
  let products = [];
  let viewAllLink = "/shop";
  const FETCH_LIMIT = 12; // Fetch enough for the carousel

  try {
    if (type === "category" && category) {
      const data = await getProductsByCategory(category, FETCH_LIMIT);
      products = data.products;
      viewAllLink = `/shop?category=${category}`;
      if (!title) title = category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
    } else if (type === "rating") {
      const data = await getProductsSorted("rating", "desc", FETCH_LIMIT);
      products = data.products;
      viewAllLink = "/shop?sort=rating";
      if (!title) title = "Highest Rated";
    } else if (type === "newest") {
      const data = await getProductsSorted("id" as any, "desc", FETCH_LIMIT);
      products = data.products;
      viewAllLink = "/shop?sort=newest";
      if (!title) title = "New Arrivals";
    } else if (type === "sale") {
       const data = await getProductsSorted("discountPercentage" as any, "desc", FETCH_LIMIT);
       products = data.products;
       viewAllLink = "/shop?sort=sale";
       if (!title) title = "Top Deals";
    } else {
       const data = await getProductsSorted("title", "asc", FETCH_LIMIT);
       products = data.products;
       if (!title) title = "Featured Products";
    }
  } catch (error) {
    console.error("Error fetching products for carousel:", error);
    return null; 
  }

  return <ProductCarousel title={title!} products={products} viewAllLink={viewAllLink} />;
}