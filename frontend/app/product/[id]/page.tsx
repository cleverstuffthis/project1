import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card-surface relative min-h-[360px] overflow-hidden">
        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mt-4 text-white/70">{product.summary}</p>
        </div>
        <div className="card-surface p-6">
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Tier</span>
            <span>{product.tier}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-white/60">
            <span>Drive</span>
            <span>{product.ebike ? "e-MTB" : "Mechanical"}</span>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-2xl font-semibold">${product.price.toLocaleString()}</span>
            <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
              Add to cart
            </button>
          </div>
        </div>
        <div className="card-surface p-6 text-sm text-white/70">
          <p>Includes shock tuning, suspension setup, and 30-day ride lab follow-up.</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
            <span>Free setup</span>
            <span>Lifetime warranty</span>
            <span>Priority support</span>
          </div>
        </div>
        <Link href="/checkout" className="text-sm text-white/60 transition hover:text-white">
          Proceed to checkout →
        </Link>
      </div>
    </div>
  );
}
