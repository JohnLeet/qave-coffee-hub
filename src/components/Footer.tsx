import { Coffee, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Coffee className="h-4 w-4" />
            </span>
            <span className="text-lg font-semibold">QAVE Coffee</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            B2B кофе, кофемашины и сервис — от обжарки до запуска бара.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("footer_nav")}</div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { k: "nav_coffee", id: "coffee" },
              { k: "nav_machines", id: "machines" },
              { k: "nav_training", id: "training" },
              { k: "nav_contacts", id: "form" },
            ].map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-foreground/80 transition-colors hover:text-foreground">
                  {t(l.k as never)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{t("footer_contacts")}</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +998 99 000 00 00</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@qave.coffee</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Tashkent · Moscow</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <div className="container-x text-xs text-muted-foreground">{t("footer_rights")}</div>
      </div>
    </footer>
  );
}
