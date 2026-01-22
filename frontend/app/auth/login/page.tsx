import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-muted/30">
        <div className="w-full max-w-md p-8 bg-background border rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-6">Login to QuickBuy</h1>
            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Login</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Don't have an account? <Link href="/auth/signup" className="text-primary hover:underline">Sign up</Link>
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
