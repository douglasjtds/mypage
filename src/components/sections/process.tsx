import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

const steps = ["s1", "s2", "s3", "s4"] as const;

export async function Process({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "process" });

  return (
    <section
      id="como-funciona"
      tabIndex={-1}
      aria-labelledby="como-funciona-title"
      className="py-24 md:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-content px-4 md:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-label text-ink-muted">{t("label")}</p>
          <h2 id="como-funciona-title" className="mt-6 font-display text-display-l text-balance">
            {t("title")}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-16 lg:mt-20 lg:grid-cols-12">
          {/* Índice de revista: número em mono à esquerda, texto à direita, fios entre as linhas. */}
          <ol className="border-t border-line lg:col-span-7">
            {steps.map((key, index) => (
              <li
                key={key}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-8 md:grid-cols-[6rem_1fr] md:gap-x-6 md:py-10"
              >
                {/* O <ol> já numera para leitores de tela; o número visível é só tipografia. */}
                <span
                  aria-hidden="true"
                  className="font-mono text-display-m font-normal tracking-normal text-ink-muted tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-1 md:pt-1.5">
                  <h3 className="text-body-l font-semibold text-ink">{t(`steps.${key}.title`)}</h3>
                  <p className="mt-2 max-w-[52ch] text-body text-ink-muted">{t(`steps.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ol>

          {/*
            Coluna lateral: div, não aside (landmark complementar aninhado na seção é sinalizado pelo axe).
            Entre md e lg os dois blocos ficam lado a lado; no desktop empilham e acompanham a lista (sticky).
          */}
          <div className="grid grid-cols-1 gap-10 self-start md:grid-cols-2 md:gap-6 lg:sticky lg:block lg:top-[calc(var(--header-height)+2rem)] lg:col-span-4 lg:col-start-9">
            <div className="rounded-sm bg-accent-soft p-6 text-ink md:p-8">
              <h3 className="font-display text-display-m text-balance">{t("brandFirst.title")}</h3>
              <p className="mt-4 text-body-l">{t("brandFirst.body")}</p>
            </div>

            <div className="border-t border-line pt-6 lg:mt-10">
              <h3 className="text-body font-semibold text-ink">{t("ai.title")}</h3>
              <p className="mt-2 text-body text-ink-muted">{t("ai.body")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
