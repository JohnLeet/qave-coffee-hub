import { config } from "./config";
import type { Coffee, Machine } from "./data";
import coffeeSignature from "@/assets/coffee-signature.jpg";
import machinePrimo from "@/assets/machine-primo.jpg";
import accGrinder from "@/assets/acc-grinder.jpg";

export type PublicProduct = {
  id: string;
  slug: string;
  kind: "coffee" | "machine" | "accessory";
  name: string;
  price: number;
  currency: string;
  inStock: boolean;
  origin?: string;
  roast?: "light" | "medium" | "dark";
  weightG?: number;
  notes?: string;
  description?: string;
  imageUrl?: string;
  brand?: string;
  category?: string;
  rentPrice?: number;
};

type PublicProductList = {
  data: PublicProduct[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
};

const roasts: Record<string, { ru: string; uz: string }> = {
  light: { ru: "светлая", uz: "yorug‘" },
  medium: { ru: "средняя", uz: "o‘rta" },
  dark: { ru: "тёмная", uz: "quyuq" },
};

const pair = (value: string) => ({ ru: value, uz: value });
const prices = (usd: number) => ({ rub: Math.round(usd * 100), uzs: Math.round(usd * 13000) });

export function mapCoffee(product: PublicProduct): Coffee {
  const notes = product.notes?.split(",").map((note) => pair(note.trim())) ?? [];
  return {
    id: product.id,
    slug: product.slug,
    name: pair(product.name),
    tagline: pair(product.origin ? `${product.origin} · ${product.weightG ?? 250} г` : product.name),
    description: pair(product.description ?? product.notes ?? product.name),
    pricePerKg: prices(product.price),
    notes: notes.length ? notes : [pair("specialty")],
    roast: roasts[product.roast ?? "medium"],
    gradient: "linear-gradient(135deg,#6b3a2a 0%, #a0522d 100%)",
    image: product.imageUrl || coffeeSignature,
  };
}

export function mapMachine(product: PublicProduct): Machine {
  return {
    id: product.id,
    slug: product.slug,
    kind: product.kind === "accessory" ? "accessory" : "machine",
    name: pair(product.name),
    tagline: pair(product.brand ?? product.category ?? ""),
    description: pair(product.description ?? product.name),
    rent: prices(product.rentPrice ?? product.price),
    freeThresholdKg: product.kind === "accessory" ? 3 : 8,
    specs: [
      { label: pair("Бренд"), value: pair(product.brand ?? "QAVE") },
      { label: pair("Наличие"), value: pair(product.inStock ? "в наличии" : "под заказ") },
    ],
    gradient:
      product.kind === "accessory"
        ? "linear-gradient(135deg,#ede8df 0%, #c4b8a8 100%)"
        : "linear-gradient(135deg,#6b3a2a 0%, #2c1a0e 100%)",
    image: product.imageUrl || (product.kind === "accessory" ? accGrinder : machinePrimo),
  };
}

export async function fetchPublicProducts(): Promise<PublicProductList> {
  const response = await fetch(`${config.coffeePublicUrl}/public/products?pageSize=100`);
  if (!response.ok) throw new Error("Failed to load catalog");
  return response.json() as Promise<PublicProductList>;
}

export async function fetchPublicProduct(slugOrId: string): Promise<PublicProduct> {
  const response = await fetch(`${config.coffeePublicUrl}/public/products/${slugOrId}`);
  if (!response.ok) throw new Error("Product not found");
  return response.json() as Promise<PublicProduct>;
}
