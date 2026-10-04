import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Button } from "@/components/ui/button";
import { richTags } from "@/components/ui/emphasis";
import { WhatsAppIcon } from "@/components/ui/icons";
import { landingProjects } from "@/content/projects";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const facts = ["one", "two", "three"] as const;

// Passo da entrada escalonada (utilitário enter-up em globals.css): 60ms por passo.
const step = (n: number) => ({ "--enter-step": n }) as CSSProperties;

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });
  const project = landingProjects.find((p) => p.heroCrop);

  return (
    // overflow-x-clip: a janela sangra para a direita sem criar rolagem horizontal.
    <section aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="mx-auto grid max-w-content grid-cols-4 gap-x-6 px-4 pt-12 md:px-6 md:pt-16 lg:grid-cols-12 lg:px-8 lg:pt-14">
        <div className="col-span-full lg:col-span-8">
          <p className="enter-up font-mono text-label text-ink-muted" style={step(0)}>
            {t("label")}
          </p>
          <h1 id="hero-title" className="enter-up mt-6 font-display text-display-xl text-balance" style={step(1)}>
            {t.rich("headline", richTags)}
          </h1>
          <p className="enter-up mt-8 max-w-[60ch] text-body-l text-ink-muted" style={step(2)}>
            {t("subheadline")}
          </p>
          <div className="enter-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={step(3)}>
            <Button asChild>
              <a
                href={buildWhatsAppUrl({ locale })}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-position="hero"
              >
                <WhatsAppIcon className="size-[18px]" />
                {t("ctaPrimary")}
                <span className="sr-only">{tA11y("newTab")}</span>
              </a>
            </Button>
            <a
              href="#portfolio"
              className="rounded-xs font-medium text-ink underline decoration-line decoration-1 underline-offset-[6px] transition-colors duration-150 hover:text-accent hover:decoration-accent"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </div>

        {project?.heroCrop && (
          <div
            className="enter-up col-span-full mt-14 md:ml-auto md:w-3/5 lg:col-span-4 lg:mt-10 lg:-mr-12 lg:w-auto"
            style={step(3)}
          >
            <BrowserFrame domain={project.domain}>
              <Image
                src={project.heroCrop.src}
                width={project.heroCrop.width}
                height={project.heroCrop.height}
                alt={t("visualAlt")}
                // LCP: <link rel=preload> no <head> e prioridade alta na própria <img>.
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 60vw, 100vw"
                // Mobile e tablet: janela mais baixa (4:3), mostrando o topo. Desktop: o recorte inteiro (4:5).
                className="aspect-4/3 w-full object-cover object-top lg:aspect-4/5"
              />
            </BrowserFrame>
          </div>
        )}

        <ul
          className="enter-up col-span-full mt-14 flex flex-col border-t border-line font-mono text-label text-ink-muted sm:flex-row sm:gap-6 sm:py-5 lg:mt-12"
          style={step(4)}
        >
          {facts.map((fact) => (
            <li
              key={fact}
              className="border-b border-line py-3 sm:border-b-0 sm:py-0 sm:not-first:border-l sm:not-first:pl-6"
            >
              {t(`facts.${fact}`)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
