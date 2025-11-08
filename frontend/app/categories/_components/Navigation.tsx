"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}/${string}`;
};

const pages: Page[] = [
  { title: "Category 1", path: "/categories/category1" },
  { title: "Category 2", path: "/categories/category2" },
];

function processPage(page: Page, currentPath?: string) {
  return (
    <li key={page.path}>
      <Link
        href={page.path}
        className={`p-2 rounded hover:bg-gray-200 ${
          currentPath === page.path ? "font-bold border-b-3" : ""
        }`}
      >
        {page.title}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const currentPath = usePathname();
  return (
    <nav className="text-xl font-medium py-2 mt-5">
      <ul className="flex gap-5 justify-center">
        {pages.map((page) => processPage(page, currentPath))}
      </ul>
    </nav>
  );
}
