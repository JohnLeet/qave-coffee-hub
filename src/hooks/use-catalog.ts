import { useQuery } from "@tanstack/react-query";
import { coffees as staticCoffees, machines as staticMachines } from "@/lib/data";
import { fetchPublicProduct, fetchPublicProducts, mapCoffee, mapMachine } from "@/lib/catalog-api";

export function useCatalogProducts() {
  return useQuery({
    queryKey: ["public-catalog"],
    queryFn: async () => {
      try {
        const response = await fetchPublicProducts();
        return {
          coffees: response.data.filter((product) => product.kind === "coffee").map(mapCoffee),
          machines: response.data
            .filter((product) => product.kind === "machine" || product.kind === "accessory")
            .map(mapMachine),
          fromApi: true,
        };
      } catch {
        return { coffees: staticCoffees, machines: staticMachines, fromApi: false };
      }
    },
    staleTime: 60_000,
  });
}

export function useCatalogProduct(slug: string) {
  return useQuery({
    queryKey: ["public-product", slug],
    queryFn: async () => {
      const product = await fetchPublicProduct(slug);
      return product.kind === "coffee"
        ? { kind: "coffee" as const, item: mapCoffee(product) }
        : { kind: "machine" as const, item: mapMachine(product) };
    },
    enabled: !!slug,
    retry: false,
  });
}
