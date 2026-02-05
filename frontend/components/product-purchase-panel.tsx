"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "@/components/add-to-cart-button";

type ProductPurchasePanelProps = {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: string;
};

const sizeOptions = ["S", "M", "L", "XL"];
const geometryMap: Record<string, Record<string, string>> = {
  S: { reach: "435mm", stack: "605mm", headAngle: "64.5°", seatAngle: "77°", chainstay: "435mm" },
  M: { reach: "460mm", stack: "615mm", headAngle: "64.5°", seatAngle: "77°", chainstay: "437mm" },
  L: { reach: "485mm", stack: "625mm", headAngle: "64.5°", seatAngle: "77°", chainstay: "440mm" },
  XL: { reach: "510mm", stack: "640mm", headAngle: "64.5°", seatAngle: "77°", chainstay: "443mm" }
};

export default function ProductPurchasePanel({ id, sku, name, price, category }: ProductPurchasePanelProps) {
  const isBike = ["enduro", "downhill", "trail", "xc", "downcountry", "super-enduro", "ebike"].includes(
    category
  );
  const [size, setSize] = useState(isBike ? "M" : "One size");
  const geometry = useMemo(() => geometryMap[size] ?? geometryMap.M, [size]);

  return (
    <div className="card-surface p-6">
      <div className="flex items-center justify-between text-sm text-white/60">
        <span>Tier</span>
        <span>Signature build</span>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-white/60">
        <span>SKU</span>
        <span>{sku}</span>
      </div>
      {isBike ? (
        <div className="mt-4">
          <label className="text-sm text-white/60">
            Frame size
            <select
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            >
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/70">
            {Object.entries(geometry).map(([label, value]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="uppercase tracking-[0.2em] text-white/50">{label}</p>
                <p className="mt-1 text-sm text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/70">
          One size fits most.
        </div>
      )}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-semibold">${price.toLocaleString()}</span>
        <AddToCartButton id={id} sku={sku} name={name} price={price} size={size} />
      </div>
    </div>
  );
}
