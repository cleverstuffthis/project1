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
  featured: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
const ADMIN_DATA_KEY = "summit-ride-admin-data";

function buildProductImage(product: Product) {
  const hue = Math.abs(
    Array.from(product.sku).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360
  );
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue}, 70%, 35%)"/>
      <stop offset="100%" stop-color="hsl(${(hue + 40) % 360}, 80%, 55%)"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)"/>
  <g fill="rgba(255,255,255,0.12)">
    <circle cx="120" cy="120" r="80"/>
    <circle cx="680" cy="140" r="90"/>
    <circle cx="650" cy="470" r="110"/>
  </g>
  <g transform="translate(80 260)" stroke="rgba(255,255,255,0.85)" stroke-width="12" fill="none">
    <circle cx="80" cy="120" r="60"/>
    <circle cx="380" cy="120" r="60"/>
    <path d="M80 120 L170 60 L260 60 L380 120"/>
    <path d="M170 60 L130 140 L260 60 L230 140"/>
    <path d="M260 60 L320 20"/>
    <path d="M130 140 L210 140"/>
  </g>
  <text x="60" y="520" font-family="Arial, sans-serif" font-size="20" fill="white" opacity="0.85">
    ${product.name} • ${product.tier}
  </text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function buildRiderImage() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="55%" stop-color="#fb7185"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <rect width="900" height="600" fill="url(#sky)"/>
  <g fill="#0b1120" opacity="0.85">
    <path d="M0 520 L160 420 L320 480 L480 360 L640 430 L900 300 L900 600 L0 600 Z"/>
  </g>
  <g stroke="white" stroke-width="10" fill="none" opacity="0.9" transform="translate(200 210) scale(1.1)">
    <circle cx="90" cy="190" r="60"/>
    <circle cx="350" cy="190" r="60"/>
    <path d="M90 190 L190 120 L300 120 L350 190"/>
    <path d="M190 120 L150 210 L300 120 L270 210"/>
    <path d="M190 120 L240 60"/>
    <path d="M150 210 L260 210"/>
    <path d="M240 60 L260 20"/>
    <circle cx="260" cy="10" r="10" fill="white"/>
  </g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function withLocalImage(products: Product[]) {
  return products.map((product) => ({
    ...product,
    imageUrl: product.imageUrl?.trim() ? product.imageUrl : buildProductImage(product)
  }));
}

function applyAdminOverrides(products: Product[]) {
  if (typeof window === "undefined") {
    return products;
  }
  const stored = window.localStorage.getItem(ADMIN_DATA_KEY);
  if (!stored) {
    return products;
  }
  try {
    const adminData = JSON.parse(stored) as { products?: Record<string, Partial<Product>> };
    const overrides = adminData.products ?? {};
    return products.map((product) => ({
      ...product,
      ...overrides[product.sku]
    }));
  } catch {
    return products;
  }
}

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
    ebike: false,
    featured: true
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
    ebike: true,
    featured: true
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
    ebike: false,
    featured: false
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
    ebike: false,
    featured: false
  }
];

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, { cache: "no-store" });
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
  return fetchJson<Product[]>("/api/products?featured=true", fallbackProducts)
    .then(applyAdminOverrides)
    .then(withLocalImage);
}

export function getAllProducts() {
  return fetchJson<Product[]>("/api/products", fallbackProducts)
    .then(applyAdminOverrides)
    .then(withLocalImage);
}

export function getCategoryProducts(slug: string) {
  return fetchJson<Product[]>(
    `/api/products?category=${slug}`,
    fallbackProducts.filter((product) => product.category === slug)
  )
    .then(applyAdminOverrides)
    .then(withLocalImage);
}

export function getProduct(id: string) {
  const fallback = fallbackProducts.find((product) => product.id === Number(id)) ?? fallbackProducts[0];
  return fetchJson<Product>(`/api/products/${id}`, fallback).then((product) => {
    const [override] = applyAdminOverrides([product]);
    return {
      ...override,
      imageUrl: override.imageUrl?.trim() ? override.imageUrl : buildProductImage(override)
    };
  });
}

export function getHeroImage() {
  return buildRiderImage();
}
