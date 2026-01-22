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

  try {
    if (type === "category" && category) {
      const data = await getProductsByCategory(category, 8);
      products = data.products;
      viewAllLink = `/shop?category=${category}`;
      if (!title) title = category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase());
    } else if (type === "rating") {
      const data = await getProductsSorted("rating", "desc", 8);
      products = data.products;
      viewAllLink = "/shop?sort=rating";
      if (!title) title = "Highest Rated";
    } else if (type === "newest") {
      // DummyJSON doesn't have "created_at", but we can sort by id desc as proxy or just regular fetch
      const data = await getProductsSorted("id" as any, "desc", 8); // Casting id as any just in case, but dummyjson supports many fields
      products = data.products;
      viewAllLink = "/shop?sort=newest";
      if (!title) title = "New Arrivals";
    } else if (type === "sale") {
       // DummyJSON doesn't sort by calculated price, but has discountPercentage. 
       // We can't sort by discountPercentage via API easily if not supported, but let's try or fetch generic.
       // Looking at docs, sortBy is supported.
       const data = await getProductsSorted("discountPercentage" as any, "desc", 8);
       products = data.products;
       viewAllLink = "/shop?sort=sale";
       if (!title) title = "Top Deals";
    } else {
      // Featured/Default
       const data = await getProductsSorted("title", "asc", 8); // Just random sort
       products = data.products;
       if (!title) title = "Featured Products";
    }
  } catch (error) {
    console.error("Error fetching products for carousel:", error);
    return null; 
  }

  return <ProductCarousel title={title!} products={products} viewAllLink={viewAllLink} />;
}
