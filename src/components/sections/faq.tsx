import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export async function Faq({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "faq" });

  return (
    <section id="duvidas" tabIndex={-1} aria-labelledby="duvidas-title" className="py-24 md:py-28 lg:py-36">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-x-6 px-4 md:px-6 lg:grid-cols-12 lg:px-8">
        {/* No desktop o título acompanha a lista enquanto a seção rola. */}
        <div className="max-w-2xl self-start lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:col-span-4">
          <p className="font-mono text-label text-ink-muted">{t("label")}</p>
          <h2 id="duvidas-title" className="mt-6 font-display text-display-l text-balance">
            {t("title")}
          </h2>
        </div>

        {/* Várias abertas ao mesmo tempo: abrir uma resposta não fecha a outra nem move o que está acima. */}
        <Accordion type="multiple" className="mt-14 md:mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          {questions.map((key) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{t(`items.${key}.question`)}</AccordionTrigger>
              <AccordionContent>{t(`items.${key}.answer`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
