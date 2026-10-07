import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { landingProjects } from "@/content/projects";
import { scrollDurationMs } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

// Colunas no desktop (grid de 12). Dois projetos: 7/5, o segundo descido para quebrar o alinhamento.
// Três ou mais: o primeiro em largura total e o resto em pares; o que sobrar sozinho no fim também vai em largura total.
function layoutFor(index: number, count: number) {
  if (count === 1) return { className: "lg:col-span-8", sizes: "(min-width: 1280px) 800px, (min-width: 1024px) 63vw, 100vw" };
  if (count === 2) {
    return index === 0
      ? { className: "lg:col-span-7", sizes: "(min-width: 1280px) 700px, (min-width: 1024px) 55vw, 100vw" }
      : { className: "lg:col-span-5 lg:mt-32", sizes: "(min-width: 1280px) 500px, (min-width: 1024px) 40vw, 100vw" };
  }
  const trailingAlone = index === count - 1 && count % 2 === 0;
  return index === 0 || trailingAlone
    ? { className: "lg:col-span-12", sizes: "(min-width: 1280px) 1216px, 100vw" }
    : { className: "lg:col-span-6", sizes: "(min-width: 1280px) 600px, (min-width: 1024px) 48vw, 100vw" };
}

export async function Portfolio({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "portfolio" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <section
      id="portfolio"
      tabIndex={-1}
      aria-labelledby="portfolio-title"
      className="bg-surface py-24 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-content px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-label text-ink-muted">{t("label")}</p>
          <h2 id="portfolio-title" className="mt-6 font-display text-display-l text-balance">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[52ch] text-body-l text-ink-muted">{t("support")}</p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-16 lg:mt-20 lg:grid-cols-12">
          {landingProjects.map((project, index) => {
            const layout = layoutFor(index, landingProjects.length);
            const duration = { "--scroll-duration": `${scrollDurationMs(project.screenshot)}ms` } as CSSProperties;

            return (
              <li key={project.slug} className={layout.className}>
                <article aria-labelledby={`portfolio-${project.slug}`} className="group/card">
                  {/* Alvo do mouse e do toque. Fora do Tab: o link de teclado é o "ver site" abaixo. */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="preview-trigger block rounded-md"
                  >
                    <BrowserFrame
                      domain={project.domain}
                      className="transition-colors duration-200 group-hover/card:border-ink-muted group-has-[a:focus-visible]/card:border-ink-muted"
                    >
                      <div className="preview aspect-16/10 overflow-hidden">
                        <Image
                          src={project.screenshot.src}
                          width={project.screenshot.width}
                          height={project.screenshot.height}
                          alt={t(`projects.${project.messageKey}.alt`)}
                          sizes={layout.sizes}
                          className="preview-img block h-auto w-full"
                          style={duration}
                        />
                      </div>
                    </BrowserFrame>
                  </a>

                  <div className="mt-5 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                    <div className="min-w-0">
                      <h3 id={`portfolio-${project.slug}`} className="text-body-l font-semibold text-ink">
                        {project.name}
                      </h3>
                      {/* Empilhados no mobile; lado a lado com fio entre eles a partir de md (fio nunca sobra no fim da linha). */}
                      <p className="mt-1.5 flex flex-col gap-y-1 font-mono text-label text-ink-muted md:flex-row md:items-center">
                        <span>{t(`projects.${project.messageKey}.segment`)}</span>
                        <span className="md:ml-3 md:border-l md:border-line md:pl-3">
                          {t(`projects.${project.messageKey}.type`)}
                        </span>
                      </p>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-xs py-0.5 font-medium text-ink",
                        "underline decoration-line decoration-1 underline-offset-[6px]",
                        "transition-colors duration-150 hover:text-accent hover:decoration-accent",
                        "group-hover/card:decoration-ink-muted",
                      )}
                    >
                      {t("viewSite")}
                      <ArrowUpRightIcon aria-hidden="true" strokeWidth={1.5} className="size-4" />
                      <span className="sr-only">
                        {project.name} {tA11y("newTab")}
                      </span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
