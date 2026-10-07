export type TestimonialItem = {
  quote: string;
  name: string;
  business: string;
  url?: string;
};

type Copy = { label: string; title: string; newTab: string };

/** Máximo exibido: a citação principal e até duas menores (LANDING-PAGE-SPEC 07). */
const MAX_ITEMS = 3;

function Caption({ item, newTab }: { item: TestimonialItem; newTab: string }) {
  return (
    <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-semibold text-ink">{item.name}</span>
      {item.url ? (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xs font-mono text-label text-ink-muted underline decoration-line decoration-1 underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
        >
          {item.business}
          <span className="sr-only"> {newTab}</span>
        </a>
      ) : (
        <span className="font-mono text-label text-ink-muted">{item.business}</span>
      )}
    </figcaption>
  );
}

/**
 * Apresentação pura (sem next-intl), para o teste renderizar o layout ligado com uma fixture.
 * Sem itens, não renderiza nada.
 */
export function TestimonialsView({ items, copy }: { items: TestimonialItem[]; copy: Copy }) {
  if (items.length === 0) return null;
  const [main, ...rest] = items.slice(0, MAX_ITEMS);

  return (
    <section id="depoimentos" tabIndex={-1} aria-labelledby="depoimentos-title" className="py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-content px-4 md:px-6 lg:px-8">
        <p className="font-mono text-label text-ink-muted">{copy.label}</p>
        <h2 id="depoimentos-title" className="mt-6 text-body-l font-semibold text-ink">
          {copy.title}
        </h2>

        <figure data-testimonial="main" className="mt-10 max-w-4xl md:mt-12">
          <blockquote className="font-display text-display-m font-medium text-pretty text-ink">
            <p>{main.quote}</p>
          </blockquote>
          <Caption item={main} newTab={copy.newTab} />
        </figure>

        {rest.length > 0 && (
          <div className="mt-16 grid grid-cols-1 border-t border-line md:grid-cols-2 md:gap-x-6 lg:mt-20">
            {rest.map((item) => (
              <figure
                key={item.name}
                data-testimonial="secondary"
                className="border-b border-line py-8 md:border-b-0 md:py-10"
              >
                <blockquote className="max-w-[60ch] text-body-l text-ink">
                  <p>{item.quote}</p>
                </blockquote>
                <Caption item={item} newTab={copy.newTab} />
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
