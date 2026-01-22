import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold">QuickBuy</h3>
            <p className="text-zinc-400 text-sm max-w-xs">
              Your one-stop shop for everything you need. Quality products, fast
              shipping, and excellent customer service.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=rating" className="hover:text-white transition-colors">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/shop?sort=newest" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-500">
          <p>&copy; {new Date().getFullYear()} QuickBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}