import Image from "next/image";
import Link from "next/link";
import ProductPurchasePanel from "@/components/product-purchase-panel";
import { getProduct } from "@/lib/api";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="flex flex-col gap-12">
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
          <ProductPurchasePanel
            id={product.id}
            sku={product.sku}
            name={product.name}
            price={product.price}
            category={product.category}
          />
          <div className="card-surface p-6 text-sm text-white/70">
            <p>Includes shock tuning, suspension setup, and 30-day ride lab follow-up.</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
              <span>Free setup</span>
              <span>Lifetime warranty</span>
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Ride character",
            details: [
              "Long-travel frame optimized for enduro stage pacing.",
              "Progressive leverage curve for mid-stroke support.",
              "Mixed-wheel configuration with tuned traction."
            ]
          },
          {
            title: "Key components",
            details: [
              "170mm fork with high/low-speed compression.",
              "12-speed drivetrain with wide-range cassette.",
              "4-piston brakes and 203mm rotors."
            ]
          },
          {
            title: "Signature features",
            details: [
              "Lifetime frame warranty for original owners.",
              "Integrated tool storage and trail essentials.",
              "RideLab fit consultation included."
            ]
          }
        ].map((section) => (
          <div key={section.title} className="card-surface p-6">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              {section.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
