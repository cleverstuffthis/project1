import Link from "next/link";

const navLinks = [
  { href: "/category/enduro", label: "Enduro" },
  { href: "/category/downhill", label: "Downhill" },
  { href: "/category/trail", label: "Trail" },
  { href: "/category/ebike", label: "e-MTB" },
  { href: "/category/components", label: "Components" },
  { href: "/category/gear", label: "Gear" }
];

export default function SiteHeader() {
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
          <Link
            href="/account"
            className="rounded-full border border-white/10 px-4 py-2 text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="rounded-full bg-white px-4 py-2 font-semibold text-slate-950 transition hover:shadow-glow"
          >
            Cart (2)
          </Link>
        </div>
      </div>
    </header>
  );
}
