export default function AdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Admin Console</h1>
        <p className="mt-2 text-white/70">Secure OAuth admin workspace for product, pricing, and promotion control.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Products", description: "Create and manage bikes, components, and gear." },
          { title: "Pricing", description: "Override MSRP, apply tiered discounts, and launch drops." },
          { title: "Inventory", description: "Track stock, warehouses, and demand forecast." },
          { title: "Promotions", description: "Build category-wide offers and member exclusives." },
          { title: "Orders", description: "Manage fulfillment workflows and service tickets." },
          { title: "Users", description: "Assign roles, manage access, and audit activity." }
        ].map((card) => (
          <div key={card.title} className="card-surface p-6">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-white/60">{card.description}</p>
            <button className="mt-4 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white/60 hover:text-white">
              Open
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
