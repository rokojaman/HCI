import Navigation from "./_components/Navigation";

export default function AccountLayout({
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
