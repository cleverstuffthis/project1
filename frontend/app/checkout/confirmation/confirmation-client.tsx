"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ConfirmationClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order") ?? "SR-000000";

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Order confirmed</p>
        <h1 className="mt-2 text-3xl font-semibold">Thank you for your order.</h1>
        <p className="mt-3 text-white/70">Your confirmation number is {orderId}.</p>
      </div>
      <div className="card-surface p-6 text-sm text-white/70">
        <p>We are building your order now. You will receive shipment updates by email.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/account"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
          >
            View order history
          </Link>
          <Link
            href="/category"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
