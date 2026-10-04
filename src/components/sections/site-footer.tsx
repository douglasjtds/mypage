import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import { LINKEDIN_URL } from "@/content/links";
import { footerAnchors } from "@/content/navigation";
import { getLocaleSwitcherProps } from "@/lib/locale-options";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { LocaleSwitcher } from "./locale-switcher";

const linkClass =
  "-mx-1 inline-flex items-center gap-2 rounded-xs px-1 py-1 text-ink-muted transition-colors duration-150 hover:text-ink";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const localeSwitcher = await getLocaleSwitcherProps(locale);
  // Página estática: o ano é o do build.
  const year = new Date().getFullYear();

  const external = [
    { href: buildWhatsAppUrl({ locale }), label: t("footer.whatsapp"), Icon: WhatsAppIcon },
    { href: LINKEDIN_URL, label: t("footer.linkedin"), Icon: LinkedInIcon },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-4 pt-12 pb-10 md:px-6 lg:px-8">
        <nav aria-label={t("footer.navLabel")}>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-small sm:flex sm:flex-wrap sm:gap-x-8">
            {footerAnchors.map((anchor) => (
              <li key={anchor.id}>
                <a href={`#${anchor.id}`} className={cn(linkClass, "items-baseline")}>
                  <span className="font-mono text-label tabular-nums">{anchor.number}</span>
                  <span>{t(`nav.${anchor.key}`)}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 border-t border-line pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-small font-medium text-ink">{t("footer.copyright", { year })}</p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-small">
              {external.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Icon className="size-4" />
                  {label}
                  <span className="sr-only">{t("a11y.newTab")}</span>
                </a>
              ))}
              <LocaleSwitcher {...localeSwitcher} className="sm:ml-2" />
            </div>
          </div>

          <p className="font-mono text-label text-ink-muted">{t("footer.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
