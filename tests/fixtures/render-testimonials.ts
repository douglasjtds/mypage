// Renderiza o componente real de depoimentos com a fixture e imprime o HTML.
// Roda em processo separado (tsx) porque o Playwright reescreve o JSX dos módulos importados nos testes.
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import pt from "../../messages/pt.json";
import { TestimonialsView } from "../../src/components/sections/testimonials-view";
import { testimonialsFixture } from "./testimonials";

process.stdout.write(
  renderToStaticMarkup(
    createElement(TestimonialsView, {
      items: testimonialsFixture,
      copy: { label: pt.testimonials.label, title: pt.testimonials.title, newTab: pt.a11y.newTab },
    }),
  ),
);
