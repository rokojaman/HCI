export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="text-center mt-5">
      <p>{`Product ${slug}`}</p>
    </div>
  );
}
