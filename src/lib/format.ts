import type { Locale } from "next-intl";

const intlLocale: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };

/** Preço sempre em BRL, nos dois idiomas, sem centavos. */
export function formatPrice(value: number, locale: Locale): string {
  return new Intl.NumberFormat(intlLocale[locale], {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
