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
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink: string;
}

export function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
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
          opts={{
            align: "start",
          }}
          className="w-full relative group"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="flex -left-4 md:-left-12 z-10" />
          <CarouselNext className="flex -right-4 md:-right-12 z-10" />
        </Carousel>
      </div>
    </section>
  );
}