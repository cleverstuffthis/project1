import Link from "next/link";

const sectionDescriptions: Record<string, string> = {
  products: "Create, import, and curate the Summit Ride catalog.",
  pricing: "Manage pricing overrides, discounts, and tiered offers.",
  inventory: "Monitor warehouse stock levels and inbound shipments.",
  promotions: "Schedule campaigns and category-wide promotions.",
  orders: "Review orders, fulfillments, and service tickets.",
  users: "Manage user access, roles, and audit logs."
};

export default function AdminSectionPage({ params }: { params: { section: string } }) {
  const title = params.section.replace(/-/g, " ");
  const description = sectionDescriptions[params.section] ?? "Configure operational settings for this domain.";

  return (
    <div className="flex flex-col gap-6">
      <div className="card-surface p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">Admin module</p>
        <h1 className="mt-2 text-3xl font-semibold capitalize">{title}</h1>
        <p className="mt-3 text-white/70">{description}</p>
      </div>
      <div className="card-surface p-6 text-sm text-white/70">
        <p>Connect this module to your internal tooling, workflows, or admin API endpoints.</p>
        <Link href="/admin" className="mt-4 inline-flex text-sm text-white/60 transition hover:text-white">
          ← Back to admin console
        </Link>
      </div>
    </div>
  );
}
