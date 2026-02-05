"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth-context";

const adminSections = [
  { title: "Products", description: "Create and manage bikes, components, and gear.", href: "/admin/products" },
  { title: "Pricing", description: "Override MSRP, apply tiered discounts, and launch drops.", href: "/admin/pricing" },
  { title: "Inventory", description: "Track stock, warehouses, and demand forecast.", href: "/admin/inventory" },
  { title: "Promotions", description: "Build category-wide offers and member exclusives.", href: "/admin/promotions" },
  { title: "Orders", description: "Manage fulfillment workflows and service tickets.", href: "/admin/orders" },
  { title: "Users", description: "Assign roles, manage access, and audit activity.", href: "/admin/users" }
];

export default function AdminPage() {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col gap-8">
        <div className="card-surface p-8">
          <h1 className="text-3xl font-semibold">Admin Console</h1>
          <p className="mt-2 text-white/70">Admin access required. Login with admin/admin to continue.</p>
        </div>
        <Link
          href="/account?role=admin"
          className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
        >
          Login as admin
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Admin Console</h1>
        <p className="mt-2 text-white/70">Secure OAuth admin workspace for product, pricing, and promotion control.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {adminSections.map((card) => (
          <div key={card.title} className="card-surface flex flex-col gap-4 p-6">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-white/60">{card.description}</p>
            <Link
              href={card.href}
              className="mt-auto inline-flex rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 hover:text-white"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
