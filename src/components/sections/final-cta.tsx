import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import { LINKEDIN_URL } from "@/content/links";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export async function FinalCta({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "finalCta" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    // Bloco escuro de largura total; o anel de foco troca para --on-inverse via data-surface.
    <section
      aria-labelledby="contato-title"
      data-surface="inverse"
      className="bg-inverse py-24 text-on-inverse md:py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-x-6 gap-y-12 px-4 md:px-6 lg:grid-cols-12 lg:items-end lg:px-8">
        <h2 id="contato-title" className="font-display text-display-xl text-balance lg:col-span-7">
          {t("headline")}
        </h2>

        <div className="flex flex-col items-start lg:col-span-4 lg:col-start-9">
          <Button asChild className="w-full md:w-auto">
            <a
              href={buildWhatsAppUrl({ locale })}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="final"
            >
              <WhatsAppIcon className="size-[18px]" />
              {t("whatsapp")}
              <span className="sr-only">{tA11y("newTab")}</span>
            </a>
          </Button>
          <p className="mt-4 text-small text-on-inverse-muted">{t("note")}</p>

          {/* Transição só no sublinhado: transition-colors animaria também o anel de foco, que nasceria laranja. */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-xs font-medium text-accent-on-inverse underline decoration-accent-on-inverse/40 decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-150 hover:decoration-accent-on-inverse"
          >
            <LinkedInIcon className="size-[18px]" />
            {t("linkedin")}
            <span className="sr-only">{tA11y("newTab")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
