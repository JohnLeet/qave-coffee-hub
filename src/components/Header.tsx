import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Coffee, Menu, Phone, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LangSwitcher } from "./LangSwitcher";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

import { dict } from "@/lib/i18n";
type NavItem = { key: keyof typeof dict; id: string; route?: boolean };
const anchors: NavItem[] = [
  { key: "nav_coffee", id: "coffee" },
  { key: "nav_machines", id: "machines" },
  { key: "nav_training", id: "training" },
  { key: "nav_catalog", id: "catalog", route: true },
  { key: "nav_contacts", id: "form" },
];

export function Header() {
  const { t } = useI18n();
  const { itemsCount, setOpen } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = async (a: (typeof anchors)[number]) => {
    if (a.route) {
      navigate({ to: "/catalog" });
      return;
    }
    if (!isHome) {
      await navigate({ to: "/", hash: a.id });
      return;
    }
    document.getElementById(a.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">QAVE Coffee</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {anchors.map((a) => (
            <button
              key={a.id}
              onClick={() => go(a)}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t(a.key)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher className="hidden sm:inline-flex" />
          <a
            href="tel:+998990000000"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> +998 99 000 00 00
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary",
            )}
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {itemsCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                {itemsCount}
              </span>
            )}
          </button>
          <Button
            onClick={() => go({ key: "cta_request", id: "form" })}
            className="hidden rounded-full sm:inline-flex"
          >
            {t("cta_request")}
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="mt-8 flex flex-col gap-2">
                {anchors.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setMobileOpen(false);
                      setTimeout(() => go(a), 50);
                    }}
                    className="rounded-lg px-3 py-2.5 text-left text-base hover:bg-secondary"
                  >
                    {t(a.key)}
                  </button>
                ))}
                <div className="mt-4">
                  <LangSwitcher />
                </div>
                <Button
                  className="mt-4 rounded-full"
                  onClick={() => {
                    setMobileOpen(false);
                    setTimeout(() => go({ key: "cta_request", id: "form" }), 50);
                  }}
                >
                  {t("cta_request")}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
