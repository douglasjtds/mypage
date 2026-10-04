import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { headerAnchors } from "@/content/navigation";
import { OWNER_NAME } from "@/content/site";
import { getPathname } from "@/i18n/navigation";
import { getLocaleSwitcherProps } from "@/lib/locale-options";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { HeaderScrollState } from "./header-scroll-state";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

// Wordmark tipográfico. Abaixo de `sm` quebra em duas linhas para caber com toggle, menu e WhatsApp em 375px.
function Wordmark({ locale }: { locale: Locale }) {
  return (
    <a
      href={getPathname({ href: "/", locale })}
      className="-mx-1 rounded-xs px-1 font-display text-body leading-none font-bold tracking-[-0.02em] text-ink sm:text-body-l"
    >
      {OWNER_NAME.first}
      <br className="sm:hidden" /> {OWNER_NAME.last}
    </a>
  );
}

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const localeSwitcher = await getLocaleSwitcherProps(locale);
  const links = headerAnchors.map((anchor) => ({ ...anchor, label: t(`nav.${anchor.key}`) }));

  return (
    <header
      data-site-header
      // Transparente no topo; ao rolar ganha fundo papel e fio. Só cor transiciona.
      className="sticky top-0 z-40 border-b border-transparent transition-[background-color,border-color] duration-200 ease-out data-scrolled:border-line data-scrolled:bg-paper"
    >
      <HeaderScrollState />
      <div className="mx-auto flex h-(--header-height) max-w-content items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Wordmark locale={locale} />

        <div className="flex items-center gap-4 sm:gap-6">
          <nav aria-label={t("nav.label")} className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="-mx-1 rounded-xs px-1 py-2 text-small font-medium text-ink-muted transition-colors duration-150 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <LocaleSwitcher {...localeSwitcher} />

          <div className="lg:hidden">
            <MobileNav
              links={links}
              wordmark={<Wordmark locale={locale} />}
              localeSwitcher={localeSwitcher}
              labels={{
                menu: t("nav.menu"),
                openMenu: t("nav.openMenu"),
                close: t("nav.close"),
                closeMenu: t("nav.closeMenu"),
                nav: t("nav.label"),
              }}
            />
          </div>

          <Button asChild size="sm">
            <a
              href={buildWhatsAppUrl({ locale })}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-position="header"
            >
              <WhatsAppIcon className="size-4" />
              <span className="sm:hidden">{t("header.whatsappCtaShort")}</span>
              <span className="hidden sm:inline">{t("header.whatsappCta")}</span>
              <span className="sr-only">{t("a11y.newTab")}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
