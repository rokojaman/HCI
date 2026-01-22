import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

export default function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>
        <p className="text-muted-foreground">Browse our complete collection of products.</p>
        {/* Placeholder for full shop listing with filters */}
        <div className="h-96 flex items-center justify-center bg-muted rounded-lg mt-8 border border-dashed">
            <span className="text-muted-foreground">Product Grid Placeholder (Filtered by params)</span>
        </div>
      </main>
      <Footer />
    </div>
  );
}
