import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Check,
  Coffee as CoffeeIcon,
  Cog,
  Cpu,
  Handshake,
  Hotel,
  LineChart,
  Package,
  ShoppingBag,
  Sparkles,
  Store,
  UtensilsCrossed,
  Wrench,
  Users,
  GraduationCap,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadForm } from "@/components/LeadForm";
import { CartDrawer } from "@/components/CartDrawer";
import { MachineCard } from "@/components/MachineCard";
import { CoffeeCard } from "@/components/CoffeeCard";
import { CoffeeDetail, MachineDetail } from "@/components/DetailDialogs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { coffees, machines, type Coffee, type Machine } from "@/lib/data";
import heroCoffee from "@/assets/hero-coffee.jpg";
import roastery from "@/assets/roastery.jpg";
import baristaImg from "@/assets/barista.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QAVE Coffee — кофе и кофемашины для бизнеса" },
      {
        name: "description",
        content:
          "Собственная обжарка кофе, продажа и аренда профессиональных кофемашин для кофеен, ресторанов, отелей и офисов.",
      },
      { property: "og:title", content: "QAVE Coffee — кофе и кофемашины для бизнеса" },
      {
        property: "og:description",
        content:
          "B2B партнёр для заведений: собственная обжарка кофе, оборудование, аренда, обучение баристы и сервис.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [machineDetail, setMachineDetail] = useState<Machine | null>(null);
  const [coffeeDetail, setCoffeeDetail] = useState<Coffee | null>(null);
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Roast />
        <Machines />
        <Rental />
        <Catering />
        <Training />
        <CoffeePreview onOpen={setCoffeeDetail} />
        <ForWho />
        <WhyUs />
        <LeadForm />
      </main>
      <Footer />
      <CartDrawer />
      <MachineDetail machine={machineDetail} onClose={() => setMachineDetail(null)} />
      <CoffeeDetail coffee={coffeeDetail} onClose={() => setCoffeeDetail(null)} />
      {/* Machines section modal handler bound in Machines section via context-less prop-drilling omitted; passing setter through: */}
      <MachineContextBridge onOpen={setMachineDetail} />
    </div>
  );
}

// Minimal event bus to open machine detail from nested MachineCard usages inside sections.
// Uses window custom event to avoid heavier context wiring in a landing page context.
function MachineContextBridge({ onOpen }: { onOpen: (m: Machine) => void }) {
  if (typeof window !== "undefined") {
    (window as unknown as { __openMachine?: (m: Machine) => void }).__openMachine = onOpen;
  }
  return null;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ---------------- HERO ---------------- */
function Hero() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const items = [
    { key: "hero_c1", icon: CoffeeIcon, action: () => scrollTo("coffee") },
    {
      key: "hero_c2",
      icon: Cog,
      action: () => navigate({ to: "/catalog", search: { filter: "machines" } }),
    },
    { key: "hero_c3", icon: Sparkles, action: () => scrollTo("catering") },
    { key: "hero_c4", icon: ShoppingBag, action: () => navigate({ to: "/catalog" }) },
  ] as const;

  return (
    <section className="relative overflow-hidden">
      {/* Decorative bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[520px] opacity-60"
        style={{
          background:
            "radial-gradient(600px 340px at 20% 30%, rgba(160,82,45,0.18), transparent 60%), radial-gradient(500px 300px at 80% 20%, rgba(107,58,42,0.18), transparent 60%)",
        }}
      />
      <div className="container-x relative grid gap-12 pt-16 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col"
        >
          <Badge className="w-fit rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-[var(--shadow-soft)]">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {t("hero_badge")}
          </Badge>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero_title")}
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("hero_sub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => scrollTo("form")} className="rounded-full">
              {t("hero_cta1")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate({ to: "/catalog", search: { filter: "machines" } })}
              className="rounded-full"
            >
              {t("hero_cta2")}
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-accent" /> Championship roast</div>
            <div className="flex items-center gap-2"><Wrench className="h-4 w-4 text-accent" /> Service SLA</div>
            <div className="hidden items-center gap-2 sm:flex"><Handshake className="h-4 w-4 text-accent" /> B2B partnership</div>
          </div>
        </motion.div>

        {/* Right accent card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
                style={{ backgroundImage: `url(${heroCoffee})`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">QAVE</div>
                <div className="font-display text-lg font-semibold">{t("hero_right_title")}</div>
              </div>
            </div>
            <div className="space-y-2">
              {items.map(({ key, icon: Icon, action }) => (
                <button
                  key={key}
                  onClick={action}
                  className="group flex w-full items-center gap-4 rounded-2xl border border-transparent bg-background/60 px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-[var(--shadow-soft)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium">{t(`${key}_t` as never)}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {t(`${key}_s` as never)}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </button>
              ))}
            </div>
          </div>
          <div
            aria-hidden
            className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(160,82,45,0.35), transparent)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- What We Do ---------------- */
function SectionHead({
  sub,
  title,
  text,
  align = "left",
}: {
  sub?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {sub && (
        <div className="text-xs uppercase tracking-widest text-accent">{sub}</div>
      )}
      <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}

function WhatWeDo() {
  const { t } = useI18n();
  const cards = [
    { icon: CoffeeIcon, t: "s2_c1_t", x: "s2_c1_x" },
    { icon: Cpu, t: "s2_c2_t", x: "s2_c2_x" },
    { icon: Handshake, t: "s2_c3_t", x: "s2_c3_x" },
  ] as const;
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHead title={t("s2_title")} text={t("s2_desc")} />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {cards.map(({ icon: Icon, t: tk, x: xk }, i) => (
          <motion.div
            key={tk}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="card-lift rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{t(tk as never)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(xk as never)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Roast ---------------- */
function Roast() {
  const { lang, t } = useI18n();
  const tags = lang === "ru"
    ? ["эспрессо", "капучино", "фильтр", "офис", "HoReCa"]
    : ["espresso", "kapuchino", "filtr", "ofis", "HoReCa"];
  return (
    <section className="container-x py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
          <img src={roastery} alt="Roastery" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
            <span className="text-sm font-medium">{t("s3_caption")}</span>
            <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] uppercase tracking-widest backdrop-blur">
              QAVE Lab
            </span>
          </div>
        </div>
        <div>
          <SectionHead sub={t("s3_sub")} title={t("s3_title")} text={t("s3_text")} />
          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">{tag}</Badge>
            ))}
          </div>
          <ul className="mt-8 space-y-3">
            {["s3_pro1", "s3_pro2", "s3_pro3"].map((k) => (
              <li key={k} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {t(k as never)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Machines ---------------- */
function Machines() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const cards = [
    {
      k: "s4_c1",
      icon: Cog,
      filter: "machines" as const,
      gradient: "linear-gradient(135deg,#6b3a2a,#2c1a0e)",
    },
    {
      k: "s4_c2",
      icon: Package,
      filter: "accessories" as const,
      gradient: "linear-gradient(135deg,#a0522d,#6b3a2a)",
    },
  ];
  return (
    <section id="machines" className="container-x scroll-mt-24 py-20 sm:py-24">
      <SectionHead sub={t("s4_sub")} title={t("s4_title")} text={t("s4_text")} />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {cards.map(({ k, icon: Icon, filter, gradient }) => (
          <motion.button
            key={k}
            onClick={() => navigate({ to: "/catalog", search: { filter } })}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="card-lift group relative overflow-hidden rounded-[2rem] border border-border p-8 text-left text-white shadow-[var(--shadow-soft)]"
            style={{ background: gradient }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold">{t(k as never)}</h3>
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/80 transition-transform group-hover:translate-x-1">
              {t("s4_btn2")} <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => scrollTo("form")} className="rounded-full">{t("s4_btn1")}</Button>
        <Button variant="outline" onClick={() => navigate({ to: "/catalog" })} className="rounded-full">
          {t("s4_btn2")}
        </Button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {machines.filter((m) => m.kind === "machine").slice(0, 3).map((m) => (
          <MachineCard
            key={m.id}
            machine={m}
            onOpen={(mm) =>
              (window as unknown as { __openMachine?: (m: Machine) => void }).__openMachine?.(mm)
            }
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Rental ---------------- */
function Rental() {
  const { t } = useI18n();
  const steps = [
    { t: "s5_step1_t", x: "s5_step1_x" },
    { t: "s5_step2_t", x: "s5_step2_x" },
    { t: "s5_step3_t", x: "s5_step3_x" },
    { t: "s5_step4_t", x: "s5_step4_x" },
  ];
  return (
    <section className="bg-secondary/50 py-20 sm:py-24">
      <div className="container-x">
        <SectionHead sub={t("s5_sub")} title={t("s5_title")} text={t("s5_text")} />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-lift relative rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold">{t(s.t as never)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(s.x as never)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Catering ---------------- */
function Catering() {
  const { t } = useI18n();
  const cards = [
    { icon: Users, t: "s6_c1_t", x: "s6_c1_x" },
    { icon: Cpu, t: "s6_c2_t", x: "s6_c2_x" },
    { icon: Sparkles, t: "s6_c3_t", x: "s6_c3_x" },
  ] as const;
  return (
    <section id="catering" className="container-x scroll-mt-24 py-20 sm:py-24">
      <SectionHead title={t("s6_title")} text={t("s6_text")} />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {cards.map(({ icon: Icon, t: tk, x: xk }) => (
          <div key={tk} className="card-lift rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{t(tk as never)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(xk as never)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => scrollTo("form")} className="rounded-full">{t("s6_btn1")}</Button>
        <Button variant="outline" onClick={() => scrollTo("coffee")} className="rounded-full">
          {t("s6_btn2")}
        </Button>
      </div>
    </section>
  );
}

/* ---------------- Training ---------------- */
function Training() {
  const { t } = useI18n();
  return (
    <section id="training" className="container-x scroll-mt-24 py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead sub={t("s7_sub")} title={t("s7_title")} text={t("s7_text")} />
          <ul className="mt-6 space-y-3">
            {["s7_pro1", "s7_pro2", "s7_pro3"].map((k) => (
              <li key={k} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <GraduationCap className="h-3 w-3" />
                </span>
                {t(k as never)}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button onClick={() => scrollTo("form")} className="rounded-full">{t("cta_request")}</Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
          <img src={baristaImg} alt="Barista training" className="aspect-[4/5] w-full object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Coffee catalog preview ---------------- */
function CoffeePreview({ onOpen }: { onOpen: (c: Coffee) => void }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <section id="coffee" className="container-x scroll-mt-24 py-20 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead sub={t("s8_sub")} title={t("s8_title")} text={t("s8_text")} />
        <Button variant="outline" onClick={() => navigate({ to: "/catalog", search: { filter: "coffee" } })} className="rounded-full">
          {t("s8_view_all")} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {coffees.map((c) => (
          <CoffeeCard key={c.id} coffee={c} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- For Who ---------------- */
function ForWho() {
  const { t } = useI18n();
  const items = [
    { k: "s9_1", icon: Store },
    { k: "s9_2", icon: UtensilsCrossed },
    { k: "s9_3", icon: Hotel },
    { k: "s9_4", icon: Building2 },
    { k: "s9_5", icon: ShoppingBag },
  ] as const;
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHead sub={t("s9_sub")} title={t("s9_title")} />
      <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map(({ k, icon: Icon }) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35 }}
            className="card-lift flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div className="font-medium">{t(k as never)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Why ---------------- */
function WhyUs() {
  const { t } = useI18n();
  const cards = [
    { k: "s10_1", icon: Award },
    { k: "s10_2", icon: Handshake },
    { k: "s10_3", icon: LineChart },
    { k: "s10_4", icon: Wrench },
    { k: "s10_5", icon: Users },
    { k: "s10_6", icon: Sparkles },
  ] as const;
  return (
    <section className="container-x py-20 sm:py-24">
      <SectionHead sub={t("s10_sub")} title={t("s10_title")} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ k, icon: Icon }, i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card-lift rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{t(`${k}_t` as never)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`${k}_x` as never)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
