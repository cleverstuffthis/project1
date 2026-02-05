export default function CartPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Cart</h1>
        <p className="mt-2 text-white/70">Review your build, accessories, and service add-ons.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="card-surface p-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm text-white/60">
            <span>2 items</span>
            <span>Delivery in 48 hours</span>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            {[
              { name: "Apex Enduro X1", price: "$7,990" },
              { name: "Gravity Pro Protection Kit", price: "$320" }
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-white/10 p-4">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/60">Size L · Carbon Enduro · Matte graphite</p>
                </div>
                <span className="text-sm font-semibold text-white">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$8,310</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Member savings</span>
              <span>-$420</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-white">
              <span>Total</span>
              <span>$7,890</span>
            </div>
          </div>
          <button className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
            Continue to checkout
          </button>
        </div>
      </div>
    </div>
  );
}
