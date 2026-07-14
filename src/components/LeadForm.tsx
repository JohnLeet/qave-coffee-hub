import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

export function LeadForm() {
  const { lang, t } = useI18n();
  const [loading, setLoading] = useState(false);

  return (
    <section id="form" className="container-x scroll-mt-24 py-20 sm:py-28">
      <div className="grid gap-12 rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-soft)] sm:p-12 lg:grid-cols-2">
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">{t("form_sub")}</div>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{t("form_title")}</h2>
          <p className="mt-4 max-w-md text-muted-foreground">{t("form_text")}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(lang === "ru"
              ? ["оптовый прайс", "кофейный кейтеринг", "кофемашины"]
              : ["ulgurji narx", "kofe kеyteringi", "kofemashinalar"]).map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">{tag}</Badge>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              toast.success(t("form_success"));
              (e.target as HTMLFormElement).reset();
            }, 700);
          }}
          className="flex flex-col gap-3"
        >
          <Input required placeholder={t("form_name")} className="h-12 rounded-xl bg-background" name="name" />
          <Input required type="tel" placeholder={t("form_phone")} className="h-12 rounded-xl bg-background" name="phone" />
          <Input placeholder={t("form_company")} className="h-12 rounded-xl bg-background" name="company" />
          <Button disabled={loading} className="mt-2 h-12 rounded-xl" type="submit">
            {t("form_submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
