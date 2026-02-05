"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { getOrdersForUser } from "@/lib/orders";

export default function AccountClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, register, login } = useAuth();
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  const initialRole = (searchParams.get("role") ?? "user") as "user" | "admin";
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [role, setRole] = useState<"user" | "admin">(initialRole);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const orders = useMemo(() => (user ? getOrdersForUser(user.username) : []), [user]);

  if (!user) {
    return (
      <div className="flex flex-col gap-8">
        <div className="card-surface p-8">
          <h1 className="text-3xl font-semibold">{mode === "register" ? "Create account" : "Login"}</h1>
          <p className="mt-2 text-white/70">
            {mode === "register"
              ? "Create a rider account to track orders and service history."
              : "Sign in to manage orders, service appointments, and membership."}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="card-surface p-6">
            <div className="grid gap-4">
              <label className="text-sm text-white/60">
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                />
              </label>
              <label className="text-sm text-white/60">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                />
              </label>
              {mode === "login" && (
                <label className="text-sm text-white/60">
                  Role
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value as "user" | "admin")}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              )}
            </div>
            <button
              onClick={() => {
                if (!username || !password) {
                  return;
                }
                if (mode === "register") {
                  register(username, password);
                } else {
                  const success = login(username, password, role);
                  if (success && role === "admin") {
                    router.push("/admin");
                  }
                }
              }}
              className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
            >
              {mode === "register" ? "Create account" : "Login"}
            </button>
          </div>
          <div className="card-surface p-6 text-sm text-white/70">
            <p className="text-base font-semibold text-white">New to Summit Ride?</p>
            <p className="mt-2">Register to sync your builds, service appointments, and order history.</p>
            <button
              onClick={() => setMode(mode === "register" ? "login" : "register")}
              className="mt-6 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/60 hover:text-white"
            >
              {mode === "register" ? "I already have an account" : "Create an account"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Account</h1>
        <p className="mt-2 text-white/70">Signed in as {user.username}. Manage orders and membership.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card-surface p-6">
          <h2 className="text-lg font-semibold">Order history</h2>
          {orders.length === 0 ? (
            <p className="mt-4 text-sm text-white/60">No orders yet. Your completed purchases will appear here.</p>
          ) : (
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-white/10 p-4">
                  <p className="font-semibold text-white">Order {order.id}</p>
                  <p className="text-xs text-white/60">{new Date(order.createdAt).toLocaleString()}</p>
                  <p className="mt-2 text-sm text-white/70">${order.total.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
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
