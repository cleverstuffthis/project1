"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { useCart } from "@/components/cart-context";
import { saveOrder } from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, register } = useAuth();
  const { items, clear } = useCart();
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const [account, setAccount] = useState({ username: "", password: "" });
  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });
  const [payment, setPayment] = useState({ cardType: "", cardNumber: "", expiry: "", cvv: "" });

  return (
    <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
      <div className="flex flex-col gap-6">
        <div className="card-surface p-8">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <p className="mt-2 text-white/70">Secure checkout with account creation for order tracking.</p>
        </div>
        {!user && (
          <div className="card-surface p-6">
            <h2 className="text-lg font-semibold">Create your account</h2>
            <p className="mt-2 text-sm text-white/60">Create an account to finalize checkout and track orders.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/60">
                Username
                <input
                  value={account.username}
                  onChange={(event) => setAccount({ ...account, username: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                />
              </label>
              <label className="text-sm text-white/60">
                Password
                <input
                  type="password"
                  value={account.password}
                  onChange={(event) => setAccount({ ...account, password: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                />
              </label>
            </div>
          </div>
        )}
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Delivery details</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              { key: "firstName", label: "First name" },
              { key: "lastName", label: "Last name" },
              { key: "email", label: "Email" },
              { key: "phone", label: "Phone" },
              { key: "address", label: "Address" },
              { key: "city", label: "City" },
              { key: "state", label: "State" },
              { key: "postalCode", label: "Postal code" },
              { key: "country", label: "Country" }
            ].map((field) => (
              <label key={field.key} className="text-sm text-white/60">
                {field.label}
                <input
                  value={delivery[field.key as keyof typeof delivery]}
                  onChange={(event) =>
                    setDelivery({ ...delivery, [field.key]: event.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Payment</h2>
          <p className="mt-2 text-sm text-white/60">Tokenized card vault with fraud scoring.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-white/60">
              Card type
              <input
                value={payment.cardType}
                onChange={(event) => setPayment({ ...payment, cardType: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
              />
            </label>
            <label className="text-sm text-white/60">
              Card number
              <input
                value={payment.cardNumber}
                onChange={(event) => setPayment({ ...payment, cardNumber: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
              />
            </label>
            <label className="text-sm text-white/60">
              Expiry
              <input
                value={payment.expiry}
                onChange={(event) => setPayment({ ...payment, expiry: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
              />
            </label>
            <label className="text-sm text-white/60">
              CVV
              <input
                value={payment.cvv}
                onChange={(event) => setPayment({ ...payment, cvv: event.target.value })}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold">Order total</h2>
        <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>$65</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Promo</span>
            <span>-$0</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-white">
            <span>Total</span>
            <span>${(subtotal + 65).toLocaleString()}</span>
          </div>
        </div>
        <button
          onClick={() => {
            if (!user) {
              if (!account.username || !account.password) {
                return;
              }
              register(account.username, account.password);
            }
            if (items.length === 0) {
              return;
            }
            const orderId = `SR-${Date.now().toString().slice(-6)}`;
            saveOrder({
              id: orderId,
              username: user?.username ?? account.username,
              total: subtotal + 65,
              createdAt: new Date().toISOString(),
              items: items.map((item) => ({
                sku: item.sku,
                name: item.name,
                quantity: item.quantity,
                price: item.price
              }))
            });
            clear();
            router.push(`/checkout/confirmation?order=${orderId}`);
          }}
          className="mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
        >
          Place order
        </button>
      </div>
    </div>
  );
}
