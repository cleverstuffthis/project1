export type Product = {
  id: number;
  sku: string;
  name: string;
  category: string;
  tier: string;
  price: number;
  imageUrl: string;
  summary: string;
  ebike: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

const fallbackCategories: Category[] = [
  {
    id: 1,
    name: "Enduro",
    slug: "enduro",
    description: "Long-travel enduro rigs tuned for alpine stages."
  },
  {
    id: 2,
    name: "Downhill",
    slug: "downhill",
    description: "Gravity-first platforms for park and race days."
  },
  {
    id: 3,
    name: "Trail",
    slug: "trail",
    description: "Balanced trail bikes for everyday elevation missions."
  },
  {
    id: 4,
    name: "XC",
    slug: "xc",
    description: "Race-ready XC setups and ultralight builds."
  },
  {
    id: 5,
    name: "Downcountry",
    slug: "downcountry",
    description: "Short-travel speed with confident geometry."
  },
  {
    id: 6,
    name: "Super Enduro",
    slug: "super-enduro",
    description: "Ultra-capable travel for big mountain lines."
  }
];

const fallbackProducts: Product[] = [
  {
    id: 1,
    sku: "END-X1",
    name: "Apex Enduro X1",
    category: "enduro",
    tier: "Tier 1 Premium",
    price: 8990,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    summary: "Carbon enduro chassis with factory suspension tuning.",
    ebike: false
  },
  {
    id: 2,
    sku: "END-X1E",
    name: "Apex Enduro X1e",
    category: "enduro",
    tier: "Tier 1 Premium e-MTB",
    price: 10990,
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    summary: "Full-power enduro e-MTB with smart torque mapping.",
    ebike: true
  },
  {
    id: 3,
    sku: "DH-R1",
    name: "Summit DH R1",
    category: "downhill",
    tier: "Tier 1 Premium",
    price: 8290,
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    summary: "World-cup downhill frame with coil shock setup.",
    ebike: false
  },
  {
    id: 4,
    sku: "TRL-T1",
    name: "Cascade Trail T1",
    category: "trail",
    tier: "Tier 1 Premium",
    price: 7690,
    imageUrl: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?auto=format&fit=crop&w=1200&q=80",
    summary: "All-day trail bike with climb switch suspension.",
    ebike: false
  }
];

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, { next: { revalidate: 30 } });
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export function getCategories() {
  return fetchJson<Category[]>("/api/categories", fallbackCategories);
}

export function getFeaturedProducts() {
  return fetchJson<Product[]>("/api/products?featured=true", fallbackProducts);
}

export function getCategoryProducts(slug: string) {
  return fetchJson<Product[]>(
    `/api/products?category=${slug}`,
    fallbackProducts.filter((product) => product.category === slug)
  );
}

export function getProduct(id: string) {
  const fallback = fallbackProducts.find((product) => product.id === Number(id)) ?? fallbackProducts[0];
  return fetchJson<Product>(`/api/products/${id}`, fallback);
}
