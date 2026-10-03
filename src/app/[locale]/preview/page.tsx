// TEMPORÁRIO: revisão de tokens e primitivos no gate da Etapa 02. Apagar antes da Etapa 03.
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";

const swatches = [
  ["paper", "bg-paper"],
  ["surface", "bg-surface"],
  ["raised", "bg-raised"],
  ["ink", "bg-ink"],
  ["ink-muted", "bg-ink-muted"],
  ["line", "bg-line"],
  ["accent", "bg-accent"],
  ["accent-hover", "bg-accent-hover"],
  ["accent-soft", "bg-accent-soft"],
  ["on-accent", "bg-on-accent"],
  ["on-accent-muted", "bg-on-accent-muted"],
] as const;

const scale = [
  ["display-xl", "font-display text-display-xl"],
  ["display-l", "font-display text-display-l"],
  ["display-m", "font-display text-display-m"],
  ["body-l", "max-w-[65ch] text-body-l"],
  ["body", "max-w-[65ch] text-body"],
  ["small", "max-w-[65ch] text-small"],
  ["label", "font-mono text-label"],
] as const;

export default async function PreviewPage({ params }: PageProps<"/[locale]/preview">) {
  if (process.env.NODE_ENV === "production") notFound();

  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("preview");

  const headline = (
    <>
      {t("sampleHeadlineStart")} <em>{t("sampleHeadlineEmphasis")}</em> {t("sampleHeadlineEnd")}
    </>
  );

  return (
    <main className="mx-auto flex max-w-content flex-col gap-24 px-4 py-24 md:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-display-l">{t("title")}</h1>
        <p className="text-small text-ink-muted">{t("note")}</p>
      </div>

      <section aria-labelledby="preview-colors" className="flex flex-col gap-8">
        <h2 id="preview-colors" className="font-mono text-label text-ink-muted">
          {t("colors")}
        </h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map(([name, bg]) => (
            <li key={name} className="flex flex-col gap-2">
              <span className={`h-16 rounded-xs border border-line ${bg}`} />
              <span className="font-mono text-label">--{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="preview-type" className="flex flex-col gap-8">
        <h2 id="preview-type" className="font-mono text-label text-ink-muted">
          {t("type")}
        </h2>
        <div className="flex flex-col gap-10">
          {scale.map(([step, className]) => (
            <div key={step} className="grid gap-2 md:grid-cols-12 md:gap-6">
              <span className="font-mono text-label text-ink-muted md:col-span-2">{step}</span>
              <div className="md:col-span-10">
                <p className={className}>
                  {step.startsWith("display") ? headline : step === "label" ? t("sampleLabel") : t("sampleBody")}
                </p>
              </div>
            </div>
          ))}
          <div className="grid gap-2 md:grid-cols-12 md:gap-6">
            <span className="font-mono text-label text-ink-muted md:col-span-2">{t("price")}</span>
            <p className="font-display text-display-l tabular-nums md:col-span-10">
              {formatPrice(400, locale as Locale)} / {formatPrice(550, locale as Locale)}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="preview-buttons" className="flex flex-col gap-8">
        <h2 id="preview-buttons" className="font-mono text-label text-ink-muted">
          {t("buttons")}
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>{t("primary")}</Button>
          <Button variant="secondary">{t("secondary")}</Button>
          <Button variant="ghost">{t("ghost")}</Button>
          <Button size="sm">{t("primary")}</Button>
          <Button size="sm" variant="secondary">
            {t("secondary")}
          </Button>
        </div>
        <div data-surface="accent" className="flex flex-col gap-6 rounded-md bg-accent p-8 text-on-accent">
          <span className="font-mono text-label text-on-accent-muted">{t("onAccent")}</span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="on-accent">{t("onAccentButton")}</Button>
            <a href="#preview-buttons" className="text-on-accent underline underline-offset-4">
              {t("secondary")}
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="preview-primitives" className="flex flex-col gap-8">
        <h2 id="preview-primitives" className="font-mono text-label text-ink-muted">
          {t("primitives")}
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl">
          <AccordionItem value="a">
            <AccordionTrigger>{t("accordionQuestion")}</AccordionTrigger>
            <AccordionContent>{t("accordionAnswer")}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>{t("accordionQuestion2")}</AccordionTrigger>
            <AccordionContent>{t("accordionAnswer")}</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Separator />
      </section>
    </main>
  );
}
