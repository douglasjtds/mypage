export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  url?: string;
};

// Só depoimentos reais. Vazio, a seção não renderiza.
export const testimonials: Testimonial[] = [];
