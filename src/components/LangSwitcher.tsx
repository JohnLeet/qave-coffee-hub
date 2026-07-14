import { useI18n, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const options: Lang[] = ["ru", "uz"];
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-medium",
        className,
      )}
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => setLang(o)}
          className={cn(
            "rounded-full px-3 py-1.5 uppercase tracking-wider transition-colors",
            lang === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
