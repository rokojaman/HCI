import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 bg-muted/30">
        <div className="w-full max-w-md p-8 bg-background border rounded-lg shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="John" />
                    </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Sign Up</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
