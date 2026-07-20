import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Coffee as CoffeeIcon, Plus, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { z } from "zod";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QtyControl } from "@/components/CoffeeCard";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { coffees } from "@/lib/data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Оформление заказа — QAVE Coffee" },
      { name: "description", content: "Оформите заявку на кофе и кофемашины QAVE — мы свяжемся для согласования условий." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "min").max(100),
  phone: z.string().trim().min(6, "min").max(30),
  email: z.string().trim().email("email").max(200).optional().or(z.literal("")),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
});

function CheckoutPage() {
  const { lang, t, fmt } = useI18n();
  const navigate = useNavigate();
  const {
    machineInCart, coffeeItems, totalCoffeeKg, isMachineFree,
    removeMachine, addCoffee, setCoffeeKg,
  } = useCart();

  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const threshold = machineInCart?.freeThresholdKg ?? 0;
  const remaining = machineInCart ? Math.max(0, threshold - totalCoffeeKg) : 0;
  const progress = machineInCart ? Math.min(100, (totalCoffeeKg / Math.max(1, threshold)) * 100) : 0;

  const machineRentRub = machineInCart ? (isMachineFree ? 0 : machineInCart.rent.rub) : 0;
  const machineRentUzs = machineInCart ? (isMachineFree ? 0 : machineInCart.rent.uzs) : 0;
  const coffeeTotalRub = coffeeItems.reduce((s, i) => s + i.coffee.pricePerKg.rub * i.kg, 0);
  const coffeeTotalUzs = coffeeItems.reduce((s, i) => s + i.coffee.pricePerKg.uzs * i.kg, 0);
  const totalRub = machineRentRub + coffeeTotalRub;
  const totalUzs = machineRentUzs + coffeeTotalUzs;

  const isEmpty = !machineInCart && coffeeItems.length === 0;

  const upsellText = useMemo(() => {
    const tpl = lang === "ru"
      ? "Хотите эту кофемашину бесплатно? Добавьте ещё {x} кг кофе в месяц"
      : "Ushbu kofemashinani bepul olishni xohlaysizmi? Oyiga yana {x} kg kofe qo‘shing";
    return tpl.replace("{x}", String(remaining));
  }, [lang, remaining]);

  const L = (ru: string, uz: string) => (lang === "ru" ? ru : uz);

  const validate = () => {
    const res = schema.safeParse(form);
    if (res.success) {
      setErrors({});
      return true;
    }
    const map: Record<string, string> = {};
    for (const issue of res.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (!map[key]) map[key] = issue.message;
    }
    setErrors(map);
    return false;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmpty) return;
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  const errText = (k: string) => {
    const code = errors[k];
    if (!code) return null;
    const msg =
      code === "email"
        ? L("Введите корректный email", "To‘g‘ri email kiriting")
        : L("Заполните поле", "Maydonni to‘ldiring");
    return <p className="mt-1 text-xs text-destructive">{msg}</p>;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="container-x flex-1 py-10 sm:py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {L("К каталогу", "Katalogga")}
            </Link>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">
              {L("Оформление заказа", "Buyurtmani rasmiylashtirish")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {L(
                "Заполните контакты — мы свяжемся, уточним детали и подтвердим заказ.",
                "Kontaktlarni to‘ldiring — biz bog‘lanamiz va buyurtmani tasdiqlaymiz.",
              )}
            </p>
          </div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{t("cart_empty_t")}</h3>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("cart_empty_x")}</p>
            <Button asChild className="mt-6 rounded-full">
              <Link to="/catalog">{L("Открыть каталог", "Katalogni ochish")}</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            {/* Left: form */}
            <form
              onSubmit={submit}
              className="order-2 h-fit space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:order-1 lg:sticky lg:top-24"
            >
              <div>
                <h2 className="font-display text-xl">{L("Контакты", "Kontaktlar")}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {L("* — обязательные поля", "* — majburiy maydonlar")}
                </p>
              </div>

              <div>
                <Label htmlFor="name">{t("form_name")} *</Label>
                <Input
                  id="name"
                  className="mt-1.5 h-11 rounded-xl bg-background"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
                {errText("name")}
              </div>

              <div>
                <Label htmlFor="phone">{t("form_phone")} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="mt-1.5 h-11 rounded-xl bg-background"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  autoComplete="tel"
                />
                {errText("phone")}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5 h-11 rounded-xl bg-background"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
                {errText("email")}
              </div>

              <div>
                <Label htmlFor="comment">{L("Комментарий", "Izoh")}</Label>
                <Textarea
                  id="comment"
                  rows={4}
                  className="mt-1.5 rounded-xl bg-background"
                  placeholder={L(
                    "Формат заведения, адрес, пожелания…",
                    "Muassasa formati, manzil, istaklar…",
                  )}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">{t("cart_total")}</span>
                <span className="font-display text-lg font-semibold">
                  {fmt(totalRub, totalUzs, "month")}
                </span>
              </div>

              <Button type="submit" disabled={submitting} className="h-12 w-full rounded-full">
                {submitting
                  ? L("Отправляем…", "Yuborilmoqda…")
                  : L("Оформить заказ", "Buyurtmani rasmiylashtirish")}
              </Button>
            </form>

            {/* Right: items + machine block */}
            <div className="order-1 space-y-4 lg:order-2">
              {machineInCart && (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]">
                    <div
                      className="relative h-40 w-full overflow-hidden"
                      style={{ background: machineInCart.gradient }}
                    >
                      <img
                        src={machineInCart.image}
                        alt={machineInCart.name[lang]}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                            {machineInCart.tagline[lang]}
                          </div>
                          <div className="font-display text-lg font-semibold">
                            {machineInCart.name[lang]}
                          </div>
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

                  <motion.div
                    layout
                    className="rounded-3xl border border-accent/30 bg-gradient-to-br from-secondary to-card p-5"
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
                              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl"
                              style={{ background: c.gradient }}
                            >
                              <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
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

              <div className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
                <h2 className="font-display text-lg">{L("Ваш заказ", "Buyurtmangiz")}</h2>
                <div className="mt-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {coffeeItems.map(({ coffee, kg }) => (
                      <motion.div
                        key={coffee.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-background p-3"
                      >
                        <div
                          className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                          style={{ background: coffee.gradient }}
                        >
                          <img src={coffee.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{coffee.name[lang]}</div>
                          <div className="text-xs text-muted-foreground">
                            {fmt(coffee.pricePerKg.rub, coffee.pricePerKg.uzs, "kg")} · {kg} {t("cart_per_kg")}
                          </div>
                        </div>
                        <div className="hidden text-right text-sm font-semibold sm:block">
                          {fmt(coffee.pricePerKg.rub * kg, coffee.pricePerKg.uzs * kg, "month")}
                        </div>
                        <QtyControl kg={kg} onChange={(v) => setCoffeeKg(coffee.id, v)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {coffeeItems.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      {L("Кофе в заказе пока нет.", "Buyurtmada hozircha kofe yo‘q.")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <Dialog
        open={success}
        onOpenChange={(v) => {
          setSuccess(v);
          if (!v) {
            // Clean up cart-affecting state on close
            if (machineInCart) removeMachine(machineInCart.id);
            for (const { coffee } of coffeeItems) setCoffeeKg(coffee.id, 0);
            navigate({ to: "/" });
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center py-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle className="mt-4 font-display text-2xl">
              {L("Спасибо!", "Rahmat!")}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base">
              {L("Мы с вами свяжемся.", "Tez orada siz bilan bog‘lanamiz.")}
            </DialogDescription>
            <Button
              className="mt-6 w-full rounded-full"
              onClick={() => {
                setSuccess(false);
                if (machineInCart) removeMachine(machineInCart.id);
                for (const { coffee } of coffeeItems) setCoffeeKg(coffee.id, 0);
                navigate({ to: "/" });
              }}
            >
              {L("На главную", "Bosh sahifaga")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
