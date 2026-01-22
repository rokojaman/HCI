"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Tag, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchProductsAction } from "@/app/actions";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SearchSection() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 300);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setProducts([]);
        setCategories([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchProductsAction(debouncedQuery);
        setProducts(data.products.slice(0, 4)); // Limit to 4
        setCategories(data.categories.slice(0, 4)); // Limit to 4
        setShowResults(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectProduct = (productId: number) => {
    router.push(`/product/${productId}`);
    setShowResults(false);
    setQuery("");
  };

  const handleSelectCategory = (category: string) => {
    router.push(`/shop?category=${category}`);
    setShowResults(false);
    setQuery("");
  };
  
  const handleViewAll = () => {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      setShowResults(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto relative z-40 mt-6" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for products or categories..."
          className="w-full pl-10 h-12 text-lg shadow-sm bg-background"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim()) setShowResults(true);
          }}
          onFocus={() => {
            if (query.trim()) setShowResults(true);
          }}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
        )}
      </div>

      {showResults && (products.length > 0 || categories.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground rounded-md shadow-lg border overflow-hidden">
          {categories.length > 0 && (
            <div className="p-2 border-b">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Categories</h3>
                <ul>
                    {categories.map((cat) => (
                        <li 
                            key={cat} 
                            className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer rounded-sm transition-colors"
                            onClick={() => handleSelectCategory(cat)}
                        >
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="capitalize">{cat.replace("-", " ")}</span>
                        </li>
                    ))}
                </ul>
            </div>
          )}
          
          {products.length > 0 && (
              <div className="p-2">
                 <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Products</h3>
                 <ul>
                    {products.map((product) => (
                    <li
                        key={product.id}
                        className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer rounded-sm transition-colors"
                        onClick={() => handleSelectProduct(product.id)}
                    >
                        <div className="relative h-10 w-10 flex-shrink-0 bg-muted rounded overflow-hidden">
                        <Image 
                            src={product.thumbnail} 
                            alt={product.title} 
                            fill 
                            className="object-cover"
                            sizes="40px"
                        />
                        </div>
                        <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                        </div>
                        <div className="text-sm font-semibold">${product.price}</div>
                    </li>
                    ))}
                </ul>
              </div>
          )}
          
          <div className="p-2 border-t bg-muted/30">
              <Button variant="ghost" className="w-full justify-between h-9 text-xs" onClick={handleViewAll}>
                  View all results for "{query}"
                  <ArrowRight className="h-3 w-3" />
              </Button>
          </div>
        </div>
      )}
      
      {showResults && !isLoading && debouncedQuery && products.length === 0 && categories.length === 0 && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground rounded-md shadow-lg border p-4 text-center text-muted-foreground text-sm">
            No matches found.
         </div>
      )}
    </div>
  );
}
