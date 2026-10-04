import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Props do LocaleSwitcher, montadas no servidor para não enviar mensagens ao cliente. */
export async function getLocaleSwitcherProps(current: Locale) {
  const t = await getTranslations({ locale: current, namespace: "localeSwitcher" });

  return {
    current,
    label: t("label"),
    options: routing.locales.map((locale) => ({
      locale,
      href: getPathname({ href: "/", locale }),
      short: t(locale),
      name: t(`${locale}Name`),
    })),
  };
}
