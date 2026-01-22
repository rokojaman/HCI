"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchProductsAction } from "@/app/actions";
import { Product } from "@/lib/types";
import Image from "next/image";

// Implementing simple debounce logic inside component for now to avoid extra file
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
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchProductsAction(debouncedQuery);
        setResults(data.products.slice(0, 5)); // Limit to 5 results
        setShowResults(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Handle click outside to close dropdown
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

  return (
    <div className="w-full max-w-2xl mx-auto relative z-40" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for products..."
          className="w-full pl-10 h-12 text-lg shadow-sm"
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

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground rounded-md shadow-lg border overflow-hidden">
          <ul>
            {results.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer transition-colors"
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
      
      {showResults && !isLoading && debouncedQuery && results.length === 0 && (
         <div className="absolute top-full left-0 right-0 mt-2 bg-popover text-popover-foreground rounded-md shadow-lg border p-4 text-center text-muted-foreground text-sm">
            No products found.
         </div>
      )}
    </div>
  );
}
