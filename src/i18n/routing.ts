import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // PT em `/`, EN em `/en`.
  localePrefix: "as-needed",
  // Sem detecção: `/` sempre abre em PT, mesmo com Accept-Language ou cookie em EN.
  localeDetection: false,
  // A escolha fica registrada no cookie NEXT_LOCALE, sem redirecionar.
  localeCookie: { maxAge: 60 * 60 * 24 * 365 },
});
