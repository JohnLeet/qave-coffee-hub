import { motion } from "framer-motion";
import { ArrowRight, Check, CoffeeIcon, Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import type { Machine } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MachineCard({
  machine,
  onOpen,
  compact = false,
}: {
  machine: Machine;
  onOpen?: (m: Machine) => void;
  compact?: boolean;
}) {
  const { lang, t, fmt } = useI18n();
  const { addMachine, hasMachine, machineInCart, isMachineFree } = useCart();
  const inCart = hasMachine(machine.id);
  const isThisFree = isMachineFree && machineInCart?.id === machine.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
    >
      <button
        type="button"
        onClick={() => onOpen?.(machine)}
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden text-left"
        style={{ background: machine.gradient }}
      >
        <img
          src={machine.image}
          alt={machine.name[lang]}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)" }}
        />
        <div className="absolute inset-x-4 top-4 flex justify-between">
          <Badge
            variant="secondary"
            className="rounded-full border border-white/20 bg-white/15 text-white backdrop-blur"
          >
            {machine.kind === "machine" ? t("cat_machines") : t("cat_accessories")}
          </Badge>
          {isThisFree && (
            <span className="rounded-full bg-[var(--success)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--success-foreground)]">
              {t("cart_free_badge")}
            </span>
          )}
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {machine.tagline[lang]}
          </div>
          <h3 className="mt-1 text-lg font-semibold">{machine.name[lang]}</h3>
        </div>

        <div className={cn("grid gap-3 text-sm", compact ? "grid-cols-1" : "grid-cols-2")}>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("mc_rent")}
            </div>
            <div className="mt-0.5 font-semibold">
              {isThisFree ? (
                <span className="text-[var(--success)]">{fmt(0, 0, "month")}</span>
              ) : (
                fmt(machine.rent.rub, machine.rent.uzs, "month")
              )}
            </div>
          </div>
          <div className="rounded-2xl bg-secondary/60 p-3">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t("mc_free_from")}
            </div>
            <div className="mt-0.5 font-semibold flex items-center gap-1">
              <CoffeeIcon className="h-3.5 w-3.5" />
              {machine.freeThresholdKg} {t("cart_kg_month")}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Button
            onClick={() => addMachine(machine.id)}
            disabled={inCart}
            className="flex-1 rounded-full"
          >
            {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {t("mc_add")}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpen?.(machine)}
            className="rounded-full"
          >
            {t("mc_details")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
