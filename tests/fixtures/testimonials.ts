import type { TestimonialItem } from "../../src/components/sections/testimonials-view";

// Fixture só de teste, para validar o layout ligado. Dados claramente fictícios; nunca importar em src/.
export const testimonialsFixture: TestimonialItem[] = [
  {
    quote:
      "Fixture de teste: uma citação longa o bastante para ocupar duas ou três linhas na display e mostrar como a hierarquia se comporta com texto real.",
    name: "Cliente Fixture Um",
    business: "negócio de teste",
    url: "https://example.com/um",
  },
  {
    quote: "Fixture de teste: citação menor, com uma frase de tamanho médio.",
    name: "Cliente Fixture Dois",
    business: "outro negócio de teste",
    url: "https://example.com/dois",
  },
  {
    quote: "Fixture de teste: segunda citação menor, sem link para site.",
    name: "Cliente Fixture Três",
    business: "terceiro negócio de teste",
  },
  {
    quote: "Fixture de teste: quarta citação, que não deve aparecer (máximo de três).",
    name: "Cliente Fixture Quatro",
    business: "quarto negócio de teste",
  },
];
