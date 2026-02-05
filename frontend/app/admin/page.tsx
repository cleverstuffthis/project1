"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/auth-context";
import { Category, getAllProducts, getCategories, Product } from "@/lib/api";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

type EditableProduct = Product & {
  stock?: number;
  details?: string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "" });
  const [newProduct, setNewProduct] = useState({
    category: "",
    name: "",
    sku: "",
    tier: "",
    price: "",
    imageUrl: "",
    summary: "",
    ebike: false,
    featured: false
  });

  useEffect(() => {
    Promise.all([getCategories(), getAllProducts()]).then(([categoryData, productData]) => {
      setCategories(categoryData);
      setProducts(productData);
    });
  }, []);

  const productsByCategory = useMemo(() => {
    return categories.reduce<Record<string, EditableProduct[]>>((acc, category) => {
      acc[category.slug] = products.filter((product) => product.category === category.slug);
      return acc;
    }, {});
  }, [categories, products]);

  const refreshData = async () => {
    const [categoryData, productData] = await Promise.all([getCategories(), getAllProducts()]);
    setCategories(categoryData);
    setProducts(productData);
  };

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
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm text-white/60">
            Category name
            <input
              value={newCategory.name}
              onChange={(event) => setNewCategory({ ...newCategory, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Slug
            <input
              value={newCategory.slug}
              onChange={(event) => setNewCategory({ ...newCategory, slug: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Description
            <input
              value={newCategory.description}
              onChange={(event) => setNewCategory({ ...newCategory, description: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
        </div>
        <button
          onClick={async () => {
            if (!newCategory.name || !newCategory.slug || !newCategory.description) {
              return;
            }
            await fetch(`${apiBase}/api/categories`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newCategory)
            });
            setNewCategory({ name: "", slug: "", description: "" });
            await refreshData();
          }}
          className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950"
        >
          Add category
        </button>
      </div>

      <div className="card-surface p-6">
        <h2 className="text-lg font-semibold">Add new product</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <label className="text-sm text-white/60">
            Category
            <select
              value={newProduct.category}
              onChange={(event) => setNewProduct({ ...newProduct, category: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/60">
            Name
            <input
              value={newProduct.name}
              onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            SKU
            <input
              value={newProduct.sku}
              onChange={(event) => setNewProduct({ ...newProduct, sku: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Tier
            <input
              value={newProduct.tier}
              onChange={(event) => setNewProduct({ ...newProduct, tier: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Price
            <input
              value={newProduct.price}
              onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Image URL
            <input
              value={newProduct.imageUrl}
              onChange={(event) => setNewProduct({ ...newProduct, imageUrl: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60 md:col-span-3">
            Summary
            <input
              value={newProduct.summary}
              onChange={(event) => setNewProduct({ ...newProduct, summary: event.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            e-MTB
            <input
              type="checkbox"
              checked={newProduct.ebike}
              onChange={(event) => setNewProduct({ ...newProduct, ebike: event.target.checked })}
              className="ml-3"
            />
          </label>
          <label className="text-sm text-white/60">
            Featured
            <input
              type="checkbox"
              checked={newProduct.featured}
              onChange={(event) => setNewProduct({ ...newProduct, featured: event.target.checked })}
              className="ml-3"
            />
          </label>
        </div>
        <button
          onClick={async () => {
            if (
              !newProduct.category ||
              !newProduct.name ||
              !newProduct.sku ||
              !newProduct.tier ||
              !newProduct.imageUrl ||
              !newProduct.summary
            ) {
              return;
            }
            await fetch(`${apiBase}/api/products`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...newProduct,
                price: Number(newProduct.price) || 0,
                imageUrl: newProduct.imageUrl || "",
                summary: newProduct.summary || "",
                ebike: newProduct.ebike,
                featured: newProduct.featured
              })
            });
            setNewProduct({
              category: "",
              name: "",
              sku: "",
              tier: "",
              price: "",
              imageUrl: "",
              summary: "",
              ebike: false,
              featured: false
            });
            await refreshData();
          }}
          className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950"
        >
          Add product
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {categories.map((category) => (
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
                        <label className="text-sm text-white/60">
                          Name
                          <input
                            value={product.name}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, name: event.target.value } : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          SKU
                          <input
                            value={product.sku}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, sku: event.target.value } : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          Tier
                          <input
                            value={product.tier}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, tier: event.target.value } : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          Price
                          <input
                            value={product.price}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id
                                    ? { ...entry, price: Number(event.target.value) }
                                    : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          Image URL
                          <input
                            value={product.imageUrl}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, imageUrl: event.target.value } : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          Summary
                          <input
                            value={product.summary}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, summary: event.target.value } : entry
                                )
                              )
                            }
                            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          e-MTB
                          <input
                            type="checkbox"
                            checked={product.ebike}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, ebike: event.target.checked } : entry
                                )
                              )
                            }
                            className="ml-3"
                          />
                        </label>
                        <label className="text-sm text-white/60">
                          Featured
                          <input
                            type="checkbox"
                            checked={product.featured}
                            onChange={(event) =>
                              setProducts((prev) =>
                                prev.map((entry) =>
                                  entry.id === product.id ? { ...entry, featured: event.target.checked } : entry
                                )
                              )
                            }
                            className="ml-3"
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        await fetch(`${apiBase}/api/products/${product.id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            sku: product.sku,
                            name: product.name,
                            category: product.category,
                            tier: product.tier,
                            price: product.price,
                            imageUrl: product.imageUrl,
                            summary: product.summary,
                            ebike: product.ebike,
                            featured: product.featured
                          })
                        });
                        await refreshData();
                      }}
                      className="mt-4 rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-950"
                    >
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
