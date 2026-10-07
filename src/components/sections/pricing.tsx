import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { pricing } from "@/content/pricing";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const items = ["i1", "i2", "i3"] as const;
const notes = ["complexity", "domain", "extras"] as const;

export async function Pricing({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pricing" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <section id="pacotes" tabIndex={-1} aria-labelledby="pacotes-title" className="py-24 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-x-6 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
        <div className="max-w-2xl lg:col-span-4">
          <p className="font-mono text-label text-ink-muted">{t("label")}</p>
          <h2 id="pacotes-title" className="mt-6 font-display text-display-l text-balance">
            {t("title")}
          </h2>
        </div>

        <div className="mt-14 md:mt-16 lg:col-span-8 lg:mt-0">
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {pricing.map((pkg) => {
              // Profissional: bloco escuro; o anel de foco troca para --on-inverse via data-surface.
              const inverse = pkg.featured;
              const rule = inverse ? "border-on-inverse-muted/30" : "border-line";
              return (
                <li
                  key={pkg.id}
                  data-package={pkg.id}
                  data-surface={inverse ? "inverse" : undefined}
                  className={cn(
                    "flex flex-col rounded-sm border p-6 md:p-8",
                    inverse ? "border-inverse bg-inverse text-on-inverse" : "border-line bg-paper text-ink",
                  )}
                >
                  <h3 className="text-body-l font-semibold">{t(`packages.${pkg.id}.name`)}</h3>

                  <p className="mt-10">
                    <span className={cn("block text-small", inverse ? "text-on-inverse-muted" : "text-ink-muted")}>
                      {t("from")}
                    </span>
                    <span className="mt-1 block font-display text-display-l tabular-nums">
                      {formatPrice(pkg.priceFrom, locale)}
                    </span>
                  </p>

                  <ul className={cn("mt-10 border-t", rule)}>
                    {items.map((item) => (
                      <li key={item} className={cn("border-b py-3 text-body", rule)}>
                        {t(`packages.${pkg.id}.items.${item}`)}
                      </li>
                    ))}
                  </ul>

                  {/* Um só botão em --accent na seção (o do Profissional); o Essencial fica em contorno. */}
                  <div className="mt-auto pt-10">
                    <Button asChild variant={inverse ? "primary" : "secondary"} className="w-full">
                      <a
                        href={buildWhatsAppUrl({ locale, context: pkg.whatsappContext })}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-position={pkg.whatsappContext}
                      >
                        <WhatsAppIcon className="size-[18px]" />
                        {t(`packages.${pkg.id}.cta`)}
                        <span className="sr-only">{tA11y("newTab")}</span>
                      </a>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 text-small text-ink-muted md:grid-cols-3">
            {notes.map((note) => (
              <li key={note} className="border-t border-line pt-4">
                {t(`notes.${note}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
