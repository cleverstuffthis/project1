"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts, Product } from "@/lib/api";

const PRODUCT_OVERRIDES_KEY = "summit-ride-product-overrides";

type ProductOverride = {
  imageUrl?: string;
  stock?: number;
};

type OverrideMap = Record<string, ProductOverride>;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [overrides, setOverrides] = useState<OverrideMap>({});

  useEffect(() => {
    const stored = window.localStorage.getItem(PRODUCT_OVERRIDES_KEY);
    if (stored) {
      try {
        setOverrides(JSON.parse(stored) as OverrideMap);
      } catch {
        setOverrides({});
      }
    }

    getAllProducts().then(setProducts);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(PRODUCT_OVERRIDES_KEY, JSON.stringify(overrides));
  }, [overrides]);

  const handleOverrideChange = (sku: string, update: ProductOverride) => {
    setOverrides((prev) => ({
      ...prev,
      [sku]: {
        ...prev[sku],
        ...update
      }
    }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="mt-2 text-white/70">Update imagery, stock, and merchandising details.</p>
      </div>
      <div className="grid gap-6">
        {products.map((product) => {
          const override = overrides[product.sku] ?? {};
          const imageUrl = override.imageUrl ?? product.imageUrl;
          const stockValue = override.stock ?? 12;

          return (
            <div key={product.sku} className="card-surface grid gap-6 p-6 md:grid-cols-[160px_1fr]">
              <div className="relative h-32 w-full overflow-hidden rounded-xl">
                <Image src={imageUrl} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{product.category}</p>
                  <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                  <p className="text-sm text-white/60">SKU {product.sku}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="text-sm text-white/60">
                    Image URL
                    <input
                      value={override.imageUrl ?? ""}
                      onChange={(event) => handleOverrideChange(product.sku, { imageUrl: event.target.value })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                      placeholder="https://..."
                    />
                  </label>
                  <label className="text-sm text-white/60">
                    Stock level
                    <input
                      type="number"
                      min={0}
                      value={stockValue}
                      onChange={(event) => handleOverrideChange(product.sku, { stock: Number(event.target.value) })}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
