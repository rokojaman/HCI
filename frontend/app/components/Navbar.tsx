import { getCategories } from "@/lib/api";
import { NavbarClient } from "@/app/components/NavbarClient";

export async function Navbar() {
  const categories = await getCategories();
  return <NavbarClient categories={categories} />;
}