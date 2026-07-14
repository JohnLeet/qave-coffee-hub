import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coffee as CoffeeIcon, Cog, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { coffees } from "@/lib/data";
import { QtyControl } from "./CoffeeCard";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { lang, t, fmt } = useI18n();
  const {
    open, setOpen,
    machineInCart, coffeeItems, totalCoffeeKg, isMachineFree,
    removeMachine, addCoffee, setCoffeeKg,
  } = useCart();

  const threshold = machineInCart?.freeThresholdKg ?? 0;
  const remaining = machineInCart ? Math.max(0, threshold - totalCoffeeKg) : 0;
  const progress = machineInCart ? Math.min(100, (totalCoffeeKg / Math.max(1, threshold)) * 100) : 0;

  const machineRentRub = machineInCart ? (isMachineFree ? 0 : machineInCart.rent.rub) : 0;
  const machineRentUzs = machineInCart ? (isMachineFree ? 0 : machineInCart.rent.uzs) : 0;
  const coffeeTotalRub = coffeeItems.reduce((s, i) => s + i.coffee.pricePerKg.rub * i.kg, 0);
  const coffeeTotalUzs = coffeeItems.reduce((s, i) => s + i.coffee.pricePerKg.uzs * i.kg, 0);
  const totalRub = machineRentRub + coffeeTotalRub;
  const totalUzs = machineRentUzs + coffeeTotalUzs;

  const upsellTemplate = lang === "ru"
    ? "Хотите эту кофемашину бесплатно? Добавьте ещё {x} кг кофе в месяц"
    : "Ushbu kofemashinani bepul olishni xohlaysizmi? Oyiga yana {x} kg kofe qo‘shing";
  const upsellText = upsellTemplate.replace("{x}", String(remaining));

  const isEmpty = !machineInCart && coffeeItems.length === 0;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-display text-xl">
            <ShoppingBag className="h-5 w-5" /> {t("cart_title")}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{t("cart_empty_t")}</h3>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("cart_empty_x")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {machineInCart && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div
                      className="flex h-24 w-full items-center justify-center"
                      style={{ background: machineInCart.gradient }}
                    >
                      <Cog className="h-8 w-8 text-white/50" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {machineInCart.tagline[lang]}
                          </div>
                          <div className="font-semibold">{machineInCart.name[lang]}</div>
                        </div>
                        <button
                          onClick={() => removeMachine(machineInCart.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                        <span className="text-muted-foreground">{t("mc_rent")}</span>
                        <span className="font-semibold">
                          {isMachineFree ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="text-muted-foreground line-through">
                                {fmt(machineInCart.rent.rub, machineInCart.rent.uzs, "month")}
                              </span>
                              <span className="rounded-full bg-[var(--success)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--success-foreground)]">
                                {t("cart_free_badge")}
                              </span>
                            </span>
                          ) : (
                            fmt(machineInCart.rent.rub, machineInCart.rent.uzs, "month")
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Upsell */}
                  <motion.div
                    layout
                    className="rounded-2xl border border-accent/30 bg-gradient-to-br from-secondary to-card p-4"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="text-sm">
                        {isMachineFree ? (
                          <span className="font-medium text-[var(--success)]">
                            {t("upsell_done")}
                          </span>
                        ) : (
                          upsellText
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <Progress value={progress} className="h-2 flex-1" />
                      <span className="text-xs font-medium tabular-nums text-muted-foreground">
                        {totalCoffeeKg}/{threshold} {t("cart_per_kg")}
                      </span>
                    </div>
                  </motion.div>

                  {/* Inline coffee selector */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex w-full items-center justify-between rounded-2xl border border-dashed border-border bg-card/50 px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary">
                        <span className="flex items-center gap-2">
                          <CoffeeIcon className="h-4 w-4" /> {t("cart_add_coffee")}
                        </span>
                        <Plus className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[340px] p-2">
                      {coffees.map((c) => {
                        const kg = coffeeItems.find((i) => i.coffee.id === c.id)?.kg ?? 0;
                        return (
                          <div
                            key={c.id}
                            className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-secondary"
                          >
                            <div
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                              style={{ background: c.gradient }}
                            >
                              <CoffeeIcon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium">{c.name[lang]}</div>
                              <div className="truncate text-xs text-muted-foreground">
                                {fmt(c.pricePerKg.rub, c.pricePerKg.uzs, "kg")}
                              </div>
                            </div>
                            {kg === 0 ? (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addCoffee(c.id, 1);
                                }}
                                className="rounded-full"
                              >
                                <Plus className="h-3.5 w-3.5" /> {t("cart_add")}
                              </Button>
                            ) : (
                              <div onClick={(e) => e.stopPropagation()}>
                                <QtyControl kg={kg} onChange={(v) => setCoffeeKg(c.id, v)} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              <AnimatePresence initial={false}>
                {coffeeItems.map(({ coffee, kg }) => (
                  <motion.div
                    key={coffee.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
                      style={{ background: coffee.gradient }}
                    >
                      <CoffeeIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{coffee.name[lang]}</div>
                      <div className="text-xs text-muted-foreground">
                        {fmt(coffee.pricePerKg.rub * kg, coffee.pricePerKg.uzs * kg, "month")}
                      </div>
                    </div>
                    <QtyControl kg={kg} onChange={(v) => setCoffeeKg(coffee.id, v)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="border-t border-border bg-card/50 px-6 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t("cart_total")}</span>
              <span className="font-display text-lg font-semibold">
                {fmt(totalRub, totalUzs, "month")}
              </span>
            </div>
            <Button
              className="mt-3 w-full rounded-full"
              onClick={() => {
                setOpen(false);
                setTimeout(() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" }), 200);
              }}
            >
              {t("cart_checkout")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
