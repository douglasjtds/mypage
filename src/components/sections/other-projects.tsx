import { ArrowUpRightIcon } from "lucide-react";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { otherProjects } from "@/content/projects";

export async function OtherProjects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <section
      id="outros-projetos"
      tabIndex={-1}
      aria-labelledby="outros-projetos-title"
      className="py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-content px-4 md:px-6 lg:px-8">
        <p className="font-mono text-label text-ink-muted">{t("label")}</p>
        {/* Um degrau abaixo das seções principais: prova extra, subordinada ao portfólio. */}
        <h2 id="outros-projetos-title" className="mt-6 font-display text-display-m text-balance">
          {t("title")}
        </h2>

        {/* Tabela editorial: nome · tipo · descrição · ↗, uma linha por projeto, sem screenshots. */}
        <ul className="mt-12 border-t border-line md:mt-14">
          {otherProjects.map((project) => (
            <li key={project.slug} className="border-b border-line">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-xs py-5 lg:grid-cols-12 lg:items-baseline lg:gap-x-6 lg:py-6"
              >
                <span className="col-start-1 row-start-1 text-body-l font-semibold text-ink underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-150 group-hover:decoration-accent group-focus-visible:decoration-accent lg:col-span-3">
                  {project.name}
                </span>
                <span className="col-start-1 row-start-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-label text-ink-muted lg:col-span-3 lg:col-start-4 lg:row-start-1">
                  {t(`items.${project.messageKey}.type`)}
                  {project.buildToLearn && (
                    <span className="rounded-xs border border-line px-1.5 py-px">{t("buildToLearn")}</span>
                  )}
                </span>
                <span className="col-start-1 row-start-3 mt-2 max-w-[60ch] text-body text-ink-muted lg:col-span-5 lg:col-start-7 lg:row-start-1 lg:mt-0">
                  {t(`items.${project.messageKey}.description`)}
                </span>
                {/* Hover: a seta desloca na diagonal e acende. Deslocamento só com mouse (pointer: fine, como o portfólio);
                    toque, foco e movimento reduzido ficam só com a cor. */}
                <span
                  data-row-arrow
                  aria-hidden="true"
                  className="col-start-2 row-start-1 self-center text-ink-muted transition-[color,translate] duration-150 ease-out group-hover:text-accent group-focus-visible:text-accent [@media(pointer:fine)]:motion-safe:group-hover:translate-x-0.5 [@media(pointer:fine)]:motion-safe:group-hover:-translate-y-0.5 lg:col-start-12 lg:justify-self-end"
                >
                  <ArrowUpRightIcon strokeWidth={1.5} className="size-5" />
                </span>
                <span className="sr-only">{tA11y("newTab")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
