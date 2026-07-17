import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { MachineCard } from "@/components/MachineCard";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeDetail, MachineDetail } from "@/components/DetailDialogs";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { Coffee, Machine } from "@/lib/data";
import { useCatalogProducts } from "@/hooks/use-catalog";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  filter: z.enum(["all", "coffee", "machines", "accessories"]).optional(),
});

export const Route = createFileRoute("/catalog")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Каталог — QAVE Coffee" },
      { name: "description", content: "Каталог кофе, кофемашин и аксессуаров QAVE Coffee для бизнеса." },
    ],
  }),
  component: CatalogPage,
});

type Filter = "all" | "coffee" | "machines" | "accessories";

function CatalogPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const filter: Filter = search.filter ?? "all";
  const { data, isLoading } = useCatalogProducts();
  const coffees = data?.coffees ?? [];
  const machines = data?.machines ?? [];

  const [machineDetail, setMachineDetail] = useState<Machine | null>(null);
  const [coffeeDetail, setCoffeeDetail] = useState<Coffee | null>(null);

  const tabs: { k: Filter; label: string }[] = [
    { k: "all", label: t("cat_all") },
    { k: "coffee", label: t("cat_coffee") },
    { k: "machines", label: t("cat_machines") },
    { k: "accessories", label: t("cat_accessories") },
  ];

  const showCoffee = filter === "all" || filter === "coffee";
  const showMachines = filter === "all" || filter === "machines";
  const showAccessories = filter === "all" || filter === "accessories";

  const machineList = useMemo(
    () =>
      machines.filter((m) => {
        if (filter === "machines") return m.kind === "machine";
        if (filter === "accessories") return m.kind === "accessory";
        if (filter === "all") return true;
        return false;
      }),
    [filter],
  );

  const isEmpty = !showCoffee && machineList.length === 0;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-x py-14">
        <button
          onClick={() => navigate({ to: "/" })}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("cat_back")}
        </button>

        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{t("cat_title")}</h1>
        {isLoading && <p className="mt-2 text-sm text-muted-foreground">Загрузка каталога…</p>}

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.k}
              onClick={() => navigate({ to: "/catalog", search: { filter: tab.k } })}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all",
                filter === tab.k
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground/80 hover:bg-secondary",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showCoffee && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold">{t("cat_coffee")}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {coffees.map((c) => (
                <CoffeeCard
                  key={c.id}
                  coffee={c}
                  onOpen={(coffee) => navigate({ to: "/catalog/$slug", params: { slug: coffee.slug } })}
                />
              ))}
            </div>
          </section>
        )}

        {(showMachines || showAccessories) && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold">
              {filter === "accessories" ? t("cat_accessories") : t("cat_machines")}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {machineList.map((m) => (
                <MachineCard
                  key={m.id}
                  machine={m}
                  onOpen={(machine) => navigate({ to: "/catalog/$slug", params: { slug: machine.slug } })}
                />
              ))}
            </div>
          </section>
        )}

        {isEmpty && (
          <div className="mt-16 rounded-3xl border border-dashed border-border bg-card/50 py-24 text-center text-muted-foreground">
            {t("cat_empty")}
            <div className="mt-4">
              <Button variant="outline" onClick={() => navigate({ to: "/catalog", search: { filter: "all" } })} className="rounded-full">
                {t("cat_all")}
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer />
      <MachineDetail machine={machineDetail} onClose={() => setMachineDetail(null)} />
      <CoffeeDetail coffee={coffeeDetail} onClose={() => setCoffeeDetail(null)} />
    </div>
  );
}
