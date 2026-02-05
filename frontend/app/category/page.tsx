import Image from "next/image";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/api";

export default async function AllCategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);

  return (
    <div className="flex flex-col gap-10">
      <div className="card-surface p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">All categories</p>
        <h1 className="mt-2 text-3xl font-semibold">Full bike lineup</h1>
        <p className="mt-3 text-white/70">
          Explore every platform in the Summit Ride fleet, from enduro race rigs to precision components.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`} className="card-surface p-6 transition hover:border-white/30">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">{category.name}</p>
            <p className="mt-2 text-sm text-white/70">{category.description}</p>
          </Link>
        ))}
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">All bikes & gear</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="card-surface group overflow-hidden">
              <div className="relative h-40 w-full">
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
