import { config } from "./config";
import type { Coffee, Machine } from "./data";

export type PublicOrderItem = {
  name: string;
  qty: number;
  price: number;
  kind: "coffee" | "machine" | "custom";
  productId?: string;
};

export type PublicOrderPayload = {
  customer: string;
  phone: string;
  email?: string;
  comment?: string;
  items: PublicOrderItem[];
};

export type PublicOrderCreated = {
  id: string;
  status: "new";
  total: number;
  createdAt: string;
};

export function buildOrderItems(
  machineInCart: Machine | null,
  coffeeItems: { coffee: Coffee; kg: number }[],
  isMachineFree: boolean,
  lang: "ru" | "uz",
): PublicOrderItem[] {
  const items: PublicOrderItem[] = [];

  if (machineInCart) {
    items.push({
      name: machineInCart.name[lang],
      qty: 1,
      price: isMachineFree ? 0 : machineInCart.rentPriceUsd,
      kind: machineInCart.kind === "accessory" ? "custom" : "machine",
      productId: machineInCart.id,
    });
  }

  for (const { coffee, kg } of coffeeItems) {
    items.push({
      name: coffee.name[lang],
      qty: kg,
      price: coffee.priceUsd,
      kind: "coffee",
      productId: coffee.id,
    });
  }

  return items;
}

export function orderTotalUsd(items: PublicOrderItem[]): number {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

export async function createPublicOrder(payload: PublicOrderPayload): Promise<PublicOrderCreated> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (config.ordersApiKey) {
    headers["X-Orders-Api-Key"] = config.ordersApiKey;
  }

  const response = await fetch(`${config.coffeePublicUrl}/public/orders`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as
    | PublicOrderCreated
    | { error?: { message?: string } }
    | null;

  if (!response.ok) {
    const message =
      body && typeof body === "object" && "error" in body && body.error?.message
        ? body.error.message
        : "Failed to submit order";
    throw new Error(message);
  }

  return body as PublicOrderCreated;
}
