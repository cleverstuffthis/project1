import Image from "next/image";
import Link from "next/link";
import { getCategoryProducts } from "@/lib/api";

const categoryMeta: Record<string, string> = {
  enduro: "Peak-speed machines tuned for all-mountain domination.",
  downhill: "Gravity-first builds for bike-park laps and race-day confidence.",
  trail: "All-day trail bikes with precise handling and balanced travel.",
  xc: "Featherweight race rigs engineered for podium efficiency.",
  downcountry: "Short-travel speed with rowdy geometry.",
  "super-enduro": "Ultra-travel platforms for big mountain lines.",
  ebike: "Assist-enabled power for all-day elevation gain.",
  components: "Suspension, drivetrains, and cockpit essentials.",
  gear: "Protection, packs, and ride-ready apparel."
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const products = await getCategoryProducts(params.slug);
  const description = categoryMeta[params.slug] ?? "Curated equipment built for modern enduro riders.";

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Category</p>
        <h1 className="mt-2 text-3xl font-semibold capitalize">{params.slug.replace("-", " ")}</h1>
        <p className="mt-3 text-white/70">{description}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="card-surface group overflow-hidden">
            <div className="relative h-40 w-full">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover transition group-hover:scale-105" />
            </div>
            <div className="flex flex-col gap-2 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-white/50">{product.tier}</div>
              <h3 className="text-lg font-semibold text-white">{product.name}</h3>
              <p className="text-sm text-white/70">{product.summary}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-white/60">{product.ebike ? "e-MTB" : "Analog"}</span>
                <span className="font-semibold">${product.price.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
