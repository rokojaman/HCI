import Link from "next/link";

function fetchProducts(slug: string): number[] {
  return slug === "category1" ? [1, 2] : [3, 4];
}

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product: number[] = fetchProducts(slug);
  return (
    <div className="text-center mt-5">
      <ul className="flex flex-col gap-5">
        <li>
          <Link href={`/product/${product[0]}`}>{`Product ${product[0]}`}</Link>
        </li>
        <li>
          <Link href={`/product/${product[1]}`}>{`Product ${product[1]}`}</Link>
        </li>
      </ul>
    </div>
  );
}
