import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coffee as CoffeeIcon, Cog, Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Coffee, Machine } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { QtyControl } from "./CoffeeCard";

export function MachineDetail({
  machine,
  onClose,
}: {
  machine: Machine | null;
  onClose: () => void;
}) {
  const { lang, t, fmt } = useI18n();
  const { addMachine, hasMachine, isMachineFree, machineInCart } = useCart();
  const isThisFree = !!machine && isMachineFree && machineInCart?.id === machine.id;
  const inCart = machine ? hasMachine(machine.id) : false;

  return (
    <Dialog open={!!machine} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0">
        {machine && (
          <>
            <div
              className="relative flex aspect-[16/9] w-full items-center justify-center"
              style={{ background: machine.gradient }}
            >
              <Cog className="h-24 w-24 text-white/25" />
              {isThisFree && (
                <span className="absolute left-4 top-4 rounded-full bg-[var(--success)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--success-foreground)]">
                  {t("cart_free_badge")}
                </span>
              )}
            </div>
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {machine.tagline[lang]}
                </div>
                <DialogTitle className="font-display text-2xl">{machine.name[lang]}</DialogTitle>
              </DialogHeader>
              <p className="mt-3 text-sm text-muted-foreground">{machine.description[lang]}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {machine.specs.map((s) => (
                  <div key={s.label.ru} className="rounded-2xl bg-secondary/60 p-3">
                    <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {s.label[lang]}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold">{s.value[lang]}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t("mc_rent")}
                  </div>
                  <div className="text-xl font-semibold">
                    {isThisFree ? (
                      <span className="text-[var(--success)]">{fmt(0, 0, "month")}</span>
                    ) : (
                      fmt(machine.rent.rub, machine.rent.uzs, "month")
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t("mc_free_from")}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <CoffeeIcon className="h-3.5 w-3.5" />
                    {machine.freeThresholdKg} {t("cart_kg_month")}
                  </div>
                </div>
                <Button
                  onClick={() => addMachine(machine.id)}
                  disabled={inCart}
                  className="ml-auto rounded-full"
                >
                  {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {t("mc_add")}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function CoffeeDetail({ coffee, onClose }: { coffee: Coffee | null; onClose: () => void }) {
  const { lang, t, fmt } = useI18n();
  const { addCoffee, setCoffeeKg, getCoffeeKg } = useCart();
  const kg = coffee ? getCoffeeKg(coffee.id) : 0;

  return (
    <Dialog open={!!coffee} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        {coffee && (
          <>
            <div
              className="relative flex aspect-[16/9] w-full items-end p-6 text-white"
              style={{ background: coffee.gradient }}
            >
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/70">
                  {coffee.roast[lang]}
                </div>
                <div className="font-display text-3xl font-semibold">{coffee.name[lang]}</div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <DialogTitle className="text-base font-medium text-muted-foreground">
                  {coffee.tagline[lang]}
                </DialogTitle>
              </DialogHeader>
              <p className="mt-3 text-sm text-muted-foreground">{coffee.description[lang]}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {coffee.notes.map((n) => (
                  <Badge key={n.ru} variant="secondary" className="rounded-full">
                    {n[lang]}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t("cart_per_kg")}
                  </div>
                  <div className="text-xl font-semibold">
                    {fmt(coffee.pricePerKg.rub, coffee.pricePerKg.uzs, "kg")}
                  </div>
                </div>
                {kg === 0 ? (
                  <Button onClick={() => addCoffee(coffee.id, 1)} className="rounded-full">
                    <Plus className="h-4 w-4" /> {t("coffee_add")}
                  </Button>
                ) : (
                  <QtyControl kg={kg} onChange={(v) => setCoffeeKg(coffee.id, v)} />
                )}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
