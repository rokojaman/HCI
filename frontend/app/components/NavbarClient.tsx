"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
  categories: string[];
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl min-w-fit">
          <span className="text-primary">Quick</span>Buy
        </Link>

        {/* Desktop Navigation (Centered) */}
        <nav className="hidden md:flex items-center justify-center flex-1 gap-8 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-primary" : "text-foreground/60"
            )}
          >
            Home
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "transition-colors hover:text-foreground/80 outline-none flex items-center gap-1",
              pathname.startsWith("/shop") ? "text-primary" : "text-foreground/60"
            )}>
              Shop
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-96 overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link href="/shop" className="w-full cursor-pointer font-semibold">All Products</Link>
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem key={category} asChild>
                  <Link href={`/shop?category=${category}`} className="w-full cursor-pointer capitalize">
                    {category.replace("-", " ")}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4 min-w-fit justify-end">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">
              Sign Up
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>
                <span className="text-primary font-bold">Quick</span>Buy Menu
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-6">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === "/" && "text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                   <Link
                    href="/shop"
                    className={cn("text-lg font-medium transition-colors hover:text-primary", pathname.startsWith("/shop") && "text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    Shop (All)
                  </Link>
                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn("text-lg font-medium transition-colors hover:text-primary", pathname === link.href && "text-primary")}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-2 mt-4">
                   <Button variant="outline" asChild className="w-full">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
