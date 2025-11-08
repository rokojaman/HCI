"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Home", path: "/" },
  { title: "Categories", path: "/categories" },
  { title: "Search", path: "/search" },
  { title: "Cart", path: "/cart" },
  { title: "Account", path: "/account" },
  { title: "About", path: "/about" },
];

function processPage(page: Page, currentPath?: string) {
  const isActive =
    page.path === "/"
      ? currentPath === page.path
      : currentPath?.startsWith(page.path);
  return (
    <li key={page.path}>
      <Link href={page.path} className={`p-2 rounded hover:bg-gray-200 ${isActive ? "border-b-4" : ""}`}>
        {page.title}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const currentPath = usePathname();
  return (
    <nav className="text-xl font-medium py-2 border-b">
      <ul className="flex gap-5 justify-center">
        {pages.map((page) => processPage(page, currentPath))}
      </ul>
    </nav>
  );
}
