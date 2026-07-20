import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Coffee, Machine } from "./data";
import { dict, useI18n } from "./i18n";
import { useCatalogProducts } from "@/hooks/use-catalog";

export type CartMachine = { type: "machine"; machineId: string };
export type CartCoffee = { type: "coffee"; coffeeId: string; kg: number };
export type CartItem = CartMachine | CartCoffee;

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  items: CartItem[];
  catalogCoffees: Coffee[];
  catalogMachines: Machine[];
  catalogLoading: boolean;
  totalCoffeeKg: number;
  addMachine: (id: string) => void;
  removeMachine: (id: string) => void;
  addCoffee: (id: string, kg?: number) => void;
  setCoffeeKg: (id: string, kg: number) => void;
  removeCoffee: (id: string) => void;
  hasMachine: (id: string) => boolean;
  getCoffeeKg: (id: string) => number;
  itemsCount: number;
  machineInCart: Machine | null;
  coffeeItems: { coffee: Coffee; kg: number }[];
  isMachineFree: boolean;
  clearCart: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const { lang } = useI18n();
  const { data: catalog, isLoading: catalogLoading } = useCatalogProducts();

  const catalogCoffees = catalog?.coffees ?? [];
  const catalogMachines = catalog?.machines ?? [];

  const machineInCart = useMemo(() => {
    const m = items.find((i): i is CartMachine => i.type === "machine");
    return m ? catalogMachines.find((x) => x.id === m.machineId) ?? null : null;
  }, [items, catalogMachines]);

  const coffeeItems = useMemo(
    () =>
      items
        .filter((i): i is CartCoffee => i.type === "coffee")
        .map((i) => ({ coffee: catalogCoffees.find((c) => c.id === i.coffeeId)!, kg: i.kg }))
        .filter((x) => x.coffee),
    [items, catalogCoffees],
  );

  const totalCoffeeKg = coffeeItems.reduce((s, i) => s + i.kg, 0);
  const isMachineFree = !!machineInCart && totalCoffeeKg >= (machineInCart.freeThresholdKg ?? Infinity);

  const addMachine = (id: string) => {
    setItems((cur) => {
      const existing = cur.find((i) => i.type === "machine") as CartMachine | undefined;
      if (existing) {
        toast(dict.machine_limit_toast[lang]);
        return cur;
      }
      setOpen(true);
      return [{ type: "machine", machineId: id }, ...cur];
    });
  };
  const removeMachine = (id: string) =>
    setItems((cur) => cur.filter((i) => !(i.type === "machine" && i.machineId === id)));

  const addCoffee = (id: string, kg = 1) =>
    setItems((cur) => {
      const idx = cur.findIndex((i) => i.type === "coffee" && i.coffeeId === id);
      if (idx >= 0) {
        const copy = [...cur];
        (copy[idx] as CartCoffee).kg += kg;
        return copy;
      }
      return [...cur, { type: "coffee", coffeeId: id, kg }];
    });

  const setCoffeeKg = (id: string, kg: number) =>
    setItems((cur) => {
      if (kg <= 0) return cur.filter((i) => !(i.type === "coffee" && i.coffeeId === id));
      const idx = cur.findIndex((i) => i.type === "coffee" && i.coffeeId === id);
      if (idx < 0) return [...cur, { type: "coffee", coffeeId: id, kg }];
      const copy = [...cur];
      (copy[idx] as CartCoffee).kg = kg;
      return copy;
    });

  const removeCoffee = (id: string) => setCoffeeKg(id, 0);

  const clearCart = () => setItems([]);

  const hasMachine = (id: string) =>
    items.some((i) => i.type === "machine" && i.machineId === id);
  const getCoffeeKg = (id: string) => {
    const it = items.find((i) => i.type === "coffee" && i.coffeeId === id) as CartCoffee | undefined;
    return it?.kg ?? 0;
  };

  return (
    <CartContext.Provider
      value={{
        open, setOpen, items, catalogCoffees, catalogMachines, catalogLoading,
        totalCoffeeKg,
        addMachine, removeMachine, addCoffee, setCoffeeKg, removeCoffee,
        hasMachine, getCoffeeKg,
        itemsCount: items.length,
        machineInCart, coffeeItems, isMachineFree, clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
