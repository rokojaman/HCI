import Navigation from "./_components/Navigation";

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navigation />
      {children}
    </section>
  );
}
