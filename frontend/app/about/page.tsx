import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12 container mx-auto px-4">
         <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold mb-8">About QuickBuy</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
                QuickBuy is your premier destination for finding the best products at the best prices. 
                Founded in 2024, we've made it our mission to simplify the online shopping experience 
                by providing a curated selection of high-quality items across various categories.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're looking for the latest electronics, trendy fashion, or essential home goods, 
                QuickBuy has you covered. We pride ourselves on fast shipping, excellent customer support, 
                and a hassle-free return policy.
            </p>
            <div className="h-64 bg-zinc-100 rounded-lg mt-8"></div>
         </div>
      </main>
      <Footer />
    </div>
  );
}
