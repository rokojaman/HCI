import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden group">
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-zinc-100 overflow-hidden">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </Link>
      <CardContent className="flex-1 p-4">
        <Link 
            href={`/shop?category=${product.category}`} 
            className="text-sm text-zinc-500 mb-1 hover:text-primary hover:underline block w-fit"
        >
            {product.category}
        </Link>
        <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
            </h3>
        </Link>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-zinc-400 text-sm ml-1">
            ({Math.floor(Math.random() * 100) + 10})
          </span>
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
                <span className="text-sm text-zinc-400 line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
            )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
            <Link href={`/product/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
