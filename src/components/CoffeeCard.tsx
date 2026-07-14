import { motion } from "framer-motion";
import { CoffeeIcon, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import type { Coffee } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

export function CoffeeCard({ coffee, onOpen }: { coffee: Coffee; onOpen?: (c: Coffee) => void }) {
  const { lang, t, fmt } = useI18n();
  const { addCoffee, setCoffeeKg, getCoffeeKg } = useCart();
  const kg = getCoffeeKg(coffee.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
    >
      <button
        type="button"
        onClick={() => onOpen?.(coffee)}
        className="relative flex aspect-[4/5] w-full items-end overflow-hidden p-5 text-left text-white"
        style={{ background: coffee.gradient }}
      >
        <CoffeeIcon className="absolute right-5 top-5 h-6 w-6 text-white/70" />
        <div className="relative z-10">
          <div className="text-[11px] uppercase tracking-widest text-white/70">
            {coffee.roast[lang]}
          </div>
          <div className="mt-1 font-display text-2xl font-semibold leading-tight">
            {coffee.name[lang]}
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)" }}
        />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-muted-foreground">{coffee.tagline[lang]}</p>
        <div className="flex flex-wrap gap-1.5">
          {coffee.notes.slice(0, 3).map((n) => (
            <Badge key={n.ru} variant="secondary" className="rounded-full text-[11px] font-normal">
              {n[lang]}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("cart_per_kg")}
            </div>
            <div className="font-semibold">{fmt(coffee.pricePerKg.rub, coffee.pricePerKg.uzs, "kg")}</div>
          </div>
          {kg === 0 ? (
            <Button
              onClick={() => addCoffee(coffee.id, 1)}
              className="rounded-full"
              size="sm"
            >
              <Plus className="h-4 w-4" /> {t("coffee_add")}
            </Button>
          ) : (
            <QtyControl
              kg={kg}
              onChange={(v) => setCoffeeKg(coffee.id, v)}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function QtyControl({ kg, onChange }: { kg: number; onChange: (v: number) => void }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card p-1">
      <button
        type="button"
        onClick={() => onChange(kg - 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-8 text-center text-sm font-semibold tabular-nums">{kg}</span>
      <button
        type="button"
        onClick={() => onChange(kg + 1)}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
