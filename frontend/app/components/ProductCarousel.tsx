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
  }, [api]);

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
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
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 768px)': { slidesToScroll: 2 },
              '(min-width: 1024px)': { slidesToScroll: 3 },
              '(min-width: 1280px)': { slidesToScroll: 4 }
            }
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Arrows positioned for visibility on mobile */}
          <CarouselPrevious 
            className={cn("flex left-1 md:-left-12 z-10 transition-opacity", !canScrollPrev && "opacity-0 pointer-events-none")} 
          />
          <CarouselNext 
            className={cn("flex right-1 md:-right-12 z-10 transition-opacity", !canScrollNext && "opacity-0 pointer-events-none")} 
          />
        </Carousel>
      </div>
    </section>
  );
}