"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LogIn, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
  categories: string[];
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl min-w-fit">
          <span className="text-primary">Quick</span>Buy
        </Link>

        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex justify-center flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/" && "underline decoration-2 underline-offset-4 text-primary")}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/shop" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/shop" && "underline decoration-2 underline-offset-4 text-primary")}>
                    Shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(pathname.startsWith("/shop") && pathname.includes("category") && "underline decoration-2 underline-offset-4 text-primary")}>
                    Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
                    {categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/shop?category=${category}`}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground capitalize"
                          >
                            {category.replace("-", " ")}
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/deals" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/deals" && "underline decoration-2 underline-offset-4 text-primary")}>
                    Deals
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), pathname === "/about" && "underline decoration-2 underline-offset-4 text-primary")}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

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
            <SheetContent side="right" className="flex flex-col h-full p-6">
              <SheetTitle className="sr-only">
                Mobile Menu
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-6 flex-1 overflow-y-auto">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className={cn("text-lg font-medium transition-colors hover:text-primary p-2", pathname === "/" && "underline decoration-2 underline-offset-4 text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                   <Link
                    href="/shop"
                    className={cn("text-lg font-medium transition-colors hover:text-primary p-2", pathname === "/shop" && "underline decoration-2 underline-offset-4 text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    Shop
                  </Link>
                  
                  <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen} className="w-full">
                    <CollapsibleTrigger asChild>
                      <button className="flex items-center justify-between w-full text-lg font-medium hover:text-primary p-2">
                        Categories
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isCategoriesOpen && "rotate-180")} />
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-2 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                      <div className="flex flex-col gap-2 pl-4 border-l ml-2">
                          {categories.map((category) => (
                              <Link
                                  key={category}
                                  href={`/shop?category=${category}`}
                                  className="text-base text-muted-foreground capitalize hover:text-primary py-1"
                                  onClick={() => setIsOpen(false)}
                              >
                                  {category.replace("-", " ")}
                              </Link>
                          ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Link
                    href="/deals"
                    className={cn("text-lg font-medium transition-colors hover:text-primary p-2", pathname === "/deals" && "underline decoration-2 underline-offset-4 text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    Deals
                  </Link>
                  <Link
                    href="/about"
                    className={cn("text-lg font-medium transition-colors hover:text-primary p-2", pathname === "/about" && "underline decoration-2 underline-offset-4 text-primary")}
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </nav>
                <div className="flex flex-col gap-2 mt-auto mb-6 p-2">
                   <Button variant="outline" asChild className="w-full mb-2">
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
