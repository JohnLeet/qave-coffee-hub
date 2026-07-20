export const config = {
  coffeePublicUrl: import.meta.env.VITE_COFFEE_PUBLIC_URL ?? "http://localhost:4001",
  /** Must match PUBLIC_ORDERS_API_KEY on coffee-service when set. */
  ordersApiKey: import.meta.env.VITE_ORDERS_API_KEY ?? "",
};
