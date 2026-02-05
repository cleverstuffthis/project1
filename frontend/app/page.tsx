import Image from "next/image";
import Link from "next/link";
import { getCategories, getFeaturedProducts } from "@/lib/api";

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts()
  ]);

  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <p className="text-sm uppercase tracking-[0.5em] text-white/60">Enduro champions 2026</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Hyper-modern bikes, gear, and service for the riders who chase the last light.
          </h1>
          <p className="text-lg text-white/70">
            Summit Ride Supply delivers an integrated enduro retail experience: intelligent inventory, live pricing,
            and precision-fit collections curated for alpine environments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/category/enduro"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
            >
              Shop Enduro Bikes
            </Link>
          </div>
        </div>
        <div className="card-surface relative min-h-[320px] overflow-hidden p-6">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
            alt="Enduro rider at sunset"
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70">
              New Season
            </div>
            <div>
              <p className="text-sm text-white/70">Signature launch</p>
              <h2 className="text-2xl font-semibold">Apex S-Works Enduro</h2>
              <p className="text-sm text-white/70">Tier 1 | Carbon endurance package</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Shop by category</h2>
          <Link href="/category" className="text-sm text-white/60 transition hover:text-white">
            View all categories
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`} className="card-surface p-6 transition hover:border-white/30">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">{category.name}</p>
              <p className="mt-2 text-sm text-white/70">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured builds</h2>
          <Link href="/category/enduro" className="text-sm text-white/60 transition hover:text-white">
            Full range
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="card-surface group overflow-hidden">
              <div className="relative h-44 w-full">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition group-hover:scale-105" />
              </div>
              <div className="flex flex-col gap-2 p-5">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</div>
                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                <p className="text-sm text-white/70">{product.summary}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-white/60">{product.tier}</span>
                  <span className="font-semibold">${product.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
