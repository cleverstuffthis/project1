"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart();
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="mt-2 text-white/70">Review your build, accessories, and service add-ons.</p>
      </div>
      {items.length === 0 ? (
        <div className="card-surface p-10 text-center">
          <p className="text-lg font-semibold">Your cart is empty.</p>
          <p className="mt-2 text-sm text-white/60">Start with an enduro build or gear pack.</p>
          <Link
            href="/category"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
          >
            Browse all bikes
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="card-surface p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/60">
              <span>{items.length} items</span>
              <span>Delivery in 48 hours</span>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.sku} className="flex flex-col gap-3 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-xs text-white/60">SKU {item.sku}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">${item.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                        className="rounded-full border border-white/15 px-3 py-1 text-white/70 hover:border-white/40 hover:text-white"
                      >
                        -
                      </button>
                      <span className="text-sm text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                        className="rounded-full border border-white/15 px-3 py-1 text-white/70 hover:border-white/40 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.sku)}
                      className="rounded-full border border-white/10 px-3 py-1 text-white/70 hover:border-white/40 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-lg font-semibold">Order summary</h2>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Member savings</span>
                <span>-$0</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-white">
                <span>Total</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
            >
              Continue to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
