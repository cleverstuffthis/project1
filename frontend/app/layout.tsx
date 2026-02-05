import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { AuthProvider } from "@/components/auth-context";
import { CartProvider } from "@/components/cart-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Summit Ride Supply",
  description: "Hyper-modern enduro mountain bike storefront with a microservice backbone."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_rgba(15,23,42,0))]">
          <AuthProvider>
            <CartProvider>
              <SiteHeader />
              <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 pb-16 pt-10">
                {children}
              </main>
            </CartProvider>
          </AuthProvider>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
