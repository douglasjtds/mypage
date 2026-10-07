import type { Locale } from "next-intl";

export type Testimonial = {
  /** Texto por idioma: o original e a versão do outro idioma, revisada pelo Douglas. */
  quote: Record<Locale, string>;
  name: string;
  business: Record<Locale, string>;
  url?: string;
};

// Só depoimentos reais. Vazio, a seção não renderiza.
// O primeiro vira a citação grande: trecho curto (até ~3 linhas na display), sem travessão.
export const testimonials: Testimonial[] = [];
