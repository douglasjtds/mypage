import type { Locale } from "next-intl";
import { WHATSAPP_NUMBER } from "@/content/links";
import en from "../../messages/en.json";
import pt from "../../messages/pt.json";

export type WhatsAppContext = keyof typeof pt.whatsapp.messages;

const messages: Record<Locale, typeof pt> = { pt, en };

export function buildWhatsAppUrl({
  locale,
  context = "default",
}: {
  locale: Locale;
  context?: WhatsAppContext;
}): string {
  const text = messages[locale].whatsapp.messages[context];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
