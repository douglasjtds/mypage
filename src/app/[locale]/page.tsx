import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

// Provisório (Etapa 05): seções vazias só com id e título, para testar a navegação.
// Cada uma é substituída pela seção real nas Etapas 09 a 12.
const placeholderSections = [
  { id: "pacotes", title: "pricing.title" },
  { id: "sobre", title: "about.title" },
  { id: "outros-projetos", title: "projects.title" },
  { id: "duvidas", title: "faq.title" },
] as const;

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale: param } = await params;
  const locale = param as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-2 left-2 z-50 -translate-y-[200%] rounded-sm bg-ink px-4 py-2 text-small font-medium text-paper focus-visible:translate-y-0"
      >
        {t("a11y.skipToContent")}
      </a>
      <SiteHeader locale={locale} />
      <main id="conteudo" tabIndex={-1}>
        <Hero locale={locale} />
        <Portfolio locale={locale} />
        <Process locale={locale} />
        {placeholderSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            tabIndex={-1}
            aria-labelledby={`${section.id}-title`}
            className="mx-auto min-h-svh max-w-content px-4 py-24 md:px-6 lg:px-8"
          >
            <h2 id={`${section.id}-title`} className="font-display text-display-l">
              {t(section.title)}
            </h2>
          </section>
        ))}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
