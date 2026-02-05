export default function AccountPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="mt-2 text-white/70">Manage orders, service appointments, and membership.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Order history</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            {[
              "Enduro X1 build · March 12",
              "Trail C2 service plan · Feb 04",
              "Protection kit · Jan 18"
            ].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Membership</h2>
          <p className="mt-2 text-sm text-white/60">Summit+ gives you concierge support, early drops, and service credits.</p>
          <button className="mt-6 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white">
            Manage membership
          </button>
        </div>
      </div>
    </div>
  );
}
