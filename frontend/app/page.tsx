import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { SearchSection } from "@/app/components/SearchSection";
import { ProductCarouselSection } from "@/app/components/ProductCarouselSection";
import { Footer } from "@/app/components/Footer";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function CarouselSkeleton() {
    return (
        <div className="container px-4 md:px-6 py-12 space-y-4">
             <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-24" />
             </div>
             <div className="flex gap-4 overflow-hidden">
                {Array.from({length: 4}).map((_, i) => (
                    <Skeleton key={i} className="h-[300px] w-full md:w-1/4 flex-shrink-0" />
                ))}
             </div>
        </div>
    )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div className="container mx-auto px-4 md:px-6 py-8 -mt-8 relative z-30">
             <SearchSection />
        </div>

        <Suspense fallback={<CarouselSkeleton />}>
          <ProductCarouselSection type="rating" title="Highest Rated" />
        </Suspense>

        <Suspense fallback={<CarouselSkeleton />}>
          <ProductCarouselSection type="sale" title="Top Deals" />
        </Suspense>

        <Suspense fallback={<CarouselSkeleton />}>
          <ProductCarouselSection type="newest" title="New Arrivals" />
        </Suspense>
        
        {/* Example Category Carousel */}
        <Suspense fallback={<CarouselSkeleton />}>
          <ProductCarouselSection type="category" category="smartphones" title="Smartphones" />
        </Suspense>

      </main>
      <Footer />
    </div>
  );
}
