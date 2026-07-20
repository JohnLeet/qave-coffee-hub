import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCatalogProduct } from "@/hooks/use-catalog";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/catalog/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { lang, t, fmt } = useI18n();
  const { data, isLoading, isError } = useCatalogProduct(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container-x py-20 text-muted-foreground">Загрузка…</main>
        <Footer />
      </div>
    );
  }

  if (isError || !data) throw notFound();

  const { item, kind } = data;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-x py-14">
        <Link
          to="/catalog"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("cat_back")}
        </Link>

        <div className="grid gap-10 lg:grid-cols-2">
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border"
            style={{ background: item.gradient }}
          >
            <img src={item.image} alt={item.name[lang]} className="h-full w-full object-cover" />
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{kind === "coffee" ? t("cat_coffee") : t("cat_machines")}</Badge>
              {kind === "coffee" && <Badge variant="outline">{item.roast[lang]}</Badge>}
            </div>
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{item.name[lang]}</h1>
            <p className="text-lg text-muted-foreground">{item.tagline[lang]}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{item.description[lang]}</p>
            <div className="text-2xl font-semibold">
              {kind === "coffee"
                ? fmt(item.pricePerKg.rub, item.pricePerKg.uzs, "kg")
                : fmt(item.rent.rub, item.rent.uzs, "month")}
            </div>
            <Button
              className="rounded-full"
              onClick={() => document.getElementById("form")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("cta_request")}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
