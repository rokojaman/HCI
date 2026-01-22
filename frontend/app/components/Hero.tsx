import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 max-w-3xl">
          Discover the Best Deals on Top Quality Products
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl">
          Shop the latest trends in electronics, fashion, home goods, and more.
          Fast shipping and satisfaction guaranteed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
      {/* Decorative gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
}
