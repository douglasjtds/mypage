import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LinkedInIcon } from "@/components/ui/icons";
import { LINKEDIN_URL } from "@/content/links";
import { ABOUT_PHOTO } from "@/content/site";

const credentials = ["experience", "stack", "companies"] as const;

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <section id="sobre" tabIndex={-1} aria-labelledby="sobre-title" className="bg-surface py-24 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-x-6 gap-y-14 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
        {/* Proporção no contêiner (mesma solução do hero contra CLS); sem raio de avatar. */}
        <div className="relative aspect-4/5 w-full max-w-60 overflow-hidden rounded-xs md:max-w-xs lg:col-span-4 lg:max-w-none">
          {ABOUT_PHOTO.src ? (
            <Image
              src={ABOUT_PHOTO.src}
              width={ABOUT_PHOTO.width}
              height={ABOUT_PHOTO.height}
              alt={t("photoAlt")}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 20rem, 15rem"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            // Slot neutro até existir a foto real (nunca foto de banco ou gerada por IA).
            <div data-photo-slot aria-hidden="true" className="absolute inset-0 border border-line bg-raised" />
          )}
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="font-mono text-label text-ink-muted">{t("label")}</p>
          <h2 id="sobre-title" className="mt-6 font-display text-display-l text-balance">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-[60ch] text-body-l text-ink">{t("body")}</p>

          {/* Ficha técnica: credenciais em mono, uma por linha, separadas por fios. */}
          <ul className="mt-12 border-t border-line font-mono text-small text-ink">
            {credentials.map((key) => (
              <li key={key} className="border-b border-line py-3">
                {t(`credentials.${key}`)}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[60ch] text-body text-ink-muted">{t("aiLine")}</p>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-xs font-medium text-ink underline decoration-line decoration-1 underline-offset-[6px] transition-colors duration-150 hover:text-accent hover:decoration-accent"
          >
            <LinkedInIcon className="size-[18px]" />
            {t("linkedin")}
            <span className="sr-only">{tA11y("newTab")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
