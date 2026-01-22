import { getProductById } from "@/lib/api";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  let product;
  try {
    product = await getProductById(id);
  } catch (error) {
    notFound();
  }

  if (!product) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden border">
                <Image
                  src={product.images[0] || product.thumbnail} // Use first image or thumbnail
                  alt={product.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square bg-zinc-50 rounded border cursor-pointer overflow-hidden hover:ring-2 ring-primary">
                     <Image src={img} alt={`${product.title} ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <p className="text-sm text-muted-foreground capitalize mb-2">{product.category.replace("-", " ")}</p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{product.title}</h1>
                <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground text-sm">{product.stock} in stock</span>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                 <span className="text-4xl font-bold">${product.price.toFixed(2)}</span>
                 {product.discountPercentage > 0 && (
                    <div className="flex items-center gap-2">
                         <span className="text-xl text-muted-foreground line-through">
                             ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                         </span>
                         <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded">
                             -{Math.round(product.discountPercentage)}%
                         </span>
                    </div>
                 )}
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                 <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                 </Button>
                 <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg">
                    Buy Now
                 </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      <span>Free Shipping</span>
                  </div>
                   <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5" />
                      <span>2 Year Warranty</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
