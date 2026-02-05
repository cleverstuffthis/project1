"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-context";
import { useCart } from "@/components/cart-context";

const navLinks = [
  { href: "/category/enduro", label: "Enduro" },
  { href: "/category/downhill", label: "Downhill" },
  { href: "/category/trail", label: "Trail" },
  { href: "/category/ebike", label: "e-MTB" },
  { href: "/category/components", label: "Components" },
  { href: "/category/gear", label: "Gear" }
];

export default function SiteHeader() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em]">
          <span className="gradient-text">SUMMIT RIDE</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <div className="group relative">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white"
                aria-label="Account menu"
              >
                <span className="text-base">👤</span>
              </button>
              <div className="invisible absolute right-0 mt-3 w-40 translate-y-2 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-xs text-white/70 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link href="/account" className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white">
                  Account
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin" className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white">
                    Admin Console
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full rounded-xl px-3 py-2 text-left hover:bg-white/10 hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="group relative">
              <button className="rounded-full border border-white/10 px-4 py-2 text-white/80 transition hover:border-white/30 hover:text-white">
                Login
              </button>
              <div className="invisible absolute right-0 mt-3 w-48 translate-y-2 rounded-2xl border border-white/10 bg-slate-950/95 p-2 text-xs text-white/70 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  href="/account?role=user"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white"
                >
                  Login as user
                </Link>
                <Link
                  href="/account?role=admin"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white"
                >
                  Login as admin
                </Link>
                <Link
                  href="/account?mode=register"
                  className="block rounded-xl px-3 py-2 hover:bg-white/10 hover:text-white"
                >
                  Create account
                </Link>
              </div>
            </div>
          )}
          <Link
            href="/cart"
            className="rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition hover:shadow-glow"
          >
            Cart ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
}
