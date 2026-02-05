export default function CheckoutPage() {
  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
      <div className="flex flex-col gap-6">
        <div className="card-surface p-8">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="mt-2 text-white/70">Secure checkout with OAuth identity and embedded payments.</p>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              "First name",
              "Last name",
              "Email",
              "Phone",
              "Address",
              "City",
              "State",
              "Postal code",
              "Country"
            ].map((label) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/60">
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-white/60">Tokenized card vault with fraud scoring.</p>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
            Card input placeholder
          </div>
        </div>
      </div>
      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold">Order total</h2>
        <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>$8,310</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>$65</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Promo</span>
            <span>-$420</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-white">
            <span>Total</span>
            <span>$7,955</span>
          </div>
        </div>
        <button className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow">
          Place order
        </button>
      </div>
    </div>
  );
}
