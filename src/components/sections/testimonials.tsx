import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { testimonials } from "@/content/testimonials";
import { TestimonialsView } from "./testimonials-view";

/** Só existe no DOM quando há depoimentos reais em `src/content/testimonials.ts`. */
export async function Testimonials({ locale }: { locale: Locale }) {
  if (testimonials.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "testimonials" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <TestimonialsView
      items={testimonials.map((item) => ({
        quote: item.quote[locale],
        name: item.name,
        business: item.business[locale],
        url: item.url,
      }))}
      copy={{ label: t("label"), title: t("title"), newTab: tA11y("newTab") }}
    />
  );
}
