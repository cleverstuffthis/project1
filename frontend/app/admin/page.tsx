"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/auth-context";
import { getAllProducts, Product } from "@/lib/api";

const ADMIN_DATA_KEY = "summit-ride-admin-data";

type AdminProduct = Product & {
  stock: number;
  details: string;
  category: string;
};

type AdminCategory = {
  id: string;
  name: string;
  slug: string;
};

type AdminData = {
  categories: AdminCategory[];
  products: Record<string, AdminProduct>;
};

const emptyData: AdminData = { categories: [], products: {} };

export default function AdminPage() {
  const { user } = useAuth();
  const [data, setData] = useState<AdminData>(emptyData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    sku: "",
    price: "",
    stock: "",
    imageUrl: "",
    summary: "",
    details: ""
  });

  useEffect(() => {
    const stored = window.localStorage.getItem(ADMIN_DATA_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored) as AdminData);
        return;
      } catch {
        setData(emptyData);
      }
    }

    getAllProducts().then((products) => {
      const defaultCategories: AdminCategory[] = Array.from(
        new Set(products.map((product) => product.category))
      ).map((category) => ({ id: category, name: category, slug: category }));

      const productMap = products.reduce<Record<string, AdminProduct>>((acc, product) => {
        acc[product.sku] = {
          ...product,
          stock: 12,
          details: "Premium frame, tuned suspension, and ride-ready component package.",
          category: product.category
        };
        return acc;
      }, {});

      setData({ categories: defaultCategories, products: productMap });
    });
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  }, [data]);

  const productsByCategory = useMemo(() => {
    return data.categories.reduce<Record<string, AdminProduct[]>>((acc, category) => {
      acc[category.slug] = Object.values(data.products).filter(
        (product) => product.category === category.slug
      );
      return acc;
    }, {});
  }, [data]);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col gap-8">
        <div className="card-surface p-8">
          <h1 className="text-3xl font-semibold">Admin Console</h1>
          <p className="mt-2 text-white/70">Admin access required. Login with admin/admin to continue.</p>
        </div>
        <a
          href="/account?role=admin"
          className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:shadow-glow"
        >
          Login as admin
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="card-surface p-8">
        <h1 className="text-3xl font-semibold">Admin Console</h1>
        <p className="mt-2 text-white/70">Manage categories, products, imagery, and stock.</p>
      </div>

      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold">Add new category</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            value={newCategory.name}
            onChange={(event) => setNewCategory({ ...newCategory, name: event.target.value })}
            placeholder="Category name"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newCategory.slug}
            onChange={(event) => setNewCategory({ ...newCategory, slug: event.target.value })}
            placeholder="slug"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
        </div>
        <button
          onClick={() => {
            if (!newCategory.name || !newCategory.slug) {
              return;
            }
            setData((prev) => ({
              ...prev,
              categories: [
                ...prev.categories,
                { id: newCategory.slug, name: newCategory.name, slug: newCategory.slug }
              ]
            }));
            setNewCategory({ name: "", slug: "" });
          }}
          className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950"
        >
          Add category
        </button>
      </div>

      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold">Add new product</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select
            value={newProduct.category}
            onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          >
            <option value="">Select category</option>
            {data.categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            value={newProduct.name}
            onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
            placeholder="Product name"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newProduct.sku}
            onChange={(event) => setNewProduct({ ...newProduct, sku: event.target.value })}
            placeholder="SKU"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newProduct.price}
            onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })}
            placeholder="Price"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newProduct.stock}
            onChange={(event) => setNewProduct({ ...newProduct, stock: event.target.value })}
            placeholder="Stock"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newProduct.imageUrl}
            onChange={(event) => setNewProduct({ ...newProduct, imageUrl: event.target.value })}
            placeholder="Image URL"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <input
            value={newProduct.summary}
            onChange={(event) => setNewProduct({ ...newProduct, summary: event.target.value })}
            placeholder="Summary"
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
          <textarea
            value={newProduct.details}
            onChange={(event) => setNewProduct({ ...newProduct, details: event.target.value })}
            placeholder="Details"
            className="md:col-span-2 h-24 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
          />
        </div>
        <button
          onClick={() => {
            if (!newProduct.category || !newProduct.name || !newProduct.sku) {
              return;
            }
            const price = Number(newProduct.price) || 0;
            const stock = Number(newProduct.stock) || 0;
            setData((prev) => ({
              ...prev,
              products: {
                ...prev.products,
                [newProduct.sku]: {
                  id: Object.keys(prev.products).length + 100,
                  sku: newProduct.sku,
                  name: newProduct.name,
                  category: newProduct.category,
                  tier: "Custom",
                  price,
                  imageUrl: newProduct.imageUrl,
                  summary: newProduct.summary,
                  ebike: false,
                  stock,
                  details: newProduct.details
                }
              }
            }));
            setNewProduct({
              category: "",
              name: "",
              sku: "",
              price: "",
              stock: "",
              imageUrl: "",
              summary: "",
              details: ""
            });
          }}
          className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950"
        >
          Add product
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {data.categories.map((category) => (
          <div key={category.slug} className="card-surface p-6">
            <button
              onClick={() => setExpanded((prev) => ({ ...prev, [category.slug]: !prev[category.slug] }))}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Category</p>
                <h2 className="text-xl font-semibold capitalize">{category.name}</h2>
              </div>
              <span className="text-sm text-white/60">{expanded[category.slug] ? "−" : "+"}</span>
            </button>
            {expanded[category.slug] && (
              <div className="mt-6 grid gap-6">
                {(productsByCategory[category.slug] ?? []).map((product) => (
                  <div key={product.sku} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                      <div className="relative h-32 w-full overflow-hidden rounded-xl">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <input
                          value={product.name}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, name: event.target.value }
                              }
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <input
                          value={product.sku}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, sku: event.target.value }
                              }
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <input
                          value={product.price}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, price: Number(event.target.value) }
                              }
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <input
                          value={product.stock}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, stock: Number(event.target.value) }
                              }
                            }))
                          }
                          className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <input
                          value={product.imageUrl}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, imageUrl: event.target.value }
                              }
                            }))
                          }
                          className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <input
                          value={product.summary}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, summary: event.target.value }
                              }
                            }))
                          }
                          className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                        <textarea
                          value={product.details}
                          onChange={(event) =>
                            setData((prev) => ({
                              ...prev,
                              products: {
                                ...prev.products,
                                [product.sku]: { ...product, details: event.target.value }
                              }
                            }))
                          }
                          className="md:col-span-2 h-24 rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                        />
                      </div>
                    </div>
                    <button className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950">
                      Save
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
