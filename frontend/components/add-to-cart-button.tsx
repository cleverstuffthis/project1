"use client";

import { useCart } from "@/components/cart-context";

type AddToCartButtonProps = {
  id: number;
  sku: string;
  name: string;
  price: number;
  size: string;
};

export default function AddToCartButton({ id, sku, name, price, size }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, sku, name, price, size })}
      className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
    >
      Add to cart
    </button>
  );
}
