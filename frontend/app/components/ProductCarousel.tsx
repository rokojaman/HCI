"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "@/app/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink: string;
}

export function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
    
    api.on("reInit", () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  if (products.length === 0) return null;

  return (
    <section className="py-12 w-full">
      {/* Large horizontal padding to accommodate buttons on sides without overlapping content */}
      <div className="w-full px-12 md:px-16 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          <Button variant="ghost" asChild>
            <Link href={viewAllLink} className="flex items-center gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            slidesToScroll: 1, // Scroll one by one as requested
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem 
                key={product.id} 
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* 
            Buttons positioned outside the content area (using negative translate or absolute offsets)
            Visible only when scrolling is possible. 
            On 2xl, if 6 items fit perfectly, they will automatically hide.
          */}
          <CarouselPrevious 
            className={cn(
              "absolute -left-12 md:-left-14 lg:-left-16 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 xl:hidden",
              !canScrollPrev ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 translate-x-0"
            )} 
          />
          <CarouselNext 
            className={cn(
              "absolute -right-12 md:-right-14 lg:-right-16 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 xl:hidden",
              !canScrollNext ? "opacity-0 pointer-events-none -translate-x-4" : "opacity-100 translate-x-0"
            )} 
          />
        </Carousel>
      </div>
    </section>
  );
}
