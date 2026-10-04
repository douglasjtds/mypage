"use client";

import { useRef, useState, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LocaleSwitcher } from "./locale-switcher";

type Link = { id: string; number: string; label: string };

const triggerClass =
  "-my-2 cursor-pointer rounded-xs px-1 py-2 font-mono text-label text-ink transition-colors duration-150 hover:text-accent";

// Menu das âncoras abaixo de `lg`. Gatilho em texto mono, sem ícone de hambúrguer.
// O Sheet desce pelo topo e repete a linha do header, então lê como continuação dele.
export function MobileNav({
  links,
  wordmark,
  labels,
  localeSwitcher,
}: {
  links: Link[];
  wordmark: ReactNode;
  labels: { menu: string; openMenu: string; close: string; closeMenu: string; nav: string };
  localeSwitcher: ComponentProps<typeof LocaleSwitcher>;
}) {
  const [open, setOpen] = useState(false);
  // O Sheet trava a rolagem enquanto está aberto; a âncora só é seguida depois que ele fecha.
  const pendingHash = useRef<string | null>(null);

  function goTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    pendingHash.current = id;
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label={labels.openMenu} className={triggerClass}>
        {labels.menu}
      </SheetTrigger>
      <SheetContent
        side="top"
        aria-describedby={undefined}
        className="gap-0 px-4 pb-8 md:px-6"
        onCloseAutoFocus={(event) => {
          const id = pendingHash.current;
          if (!id) return;
          pendingHash.current = null;
          event.preventDefault();
          const target = document.getElementById(id);
          if (!target) return;
          window.history.pushState(null, "", `#${id}`);
          // Rolagem segue o scroll-behavior do CSS (suave só sem movimento reduzido) e o scroll-margin.
          target.scrollIntoView({ block: "start" });
          // Leva o foco para a seção, para o teclado continuar dali.
          target.focus({ preventScroll: true });
        }}
      >
        <SheetTitle className="sr-only">{labels.nav}</SheetTitle>
        <div className="flex h-(--header-height) items-center justify-between gap-4">
          {wordmark}
          <div className="flex items-center gap-5">
            <LocaleSwitcher {...localeSwitcher} />
            <SheetClose aria-label={labels.closeMenu} className={triggerClass}>
              {labels.close}
            </SheetClose>
          </div>
        </div>
        <nav aria-label={labels.nav} className="mt-4">
          <ul className="border-t border-line">
            {links.map((link) => (
              <li key={link.id} className="border-b border-line">
                <a
                  href={`#${link.id}`}
                  onClick={(event) => goTo(event, link.id)}
                  className="group flex items-baseline gap-4 py-4 text-ink"
                >
                  <span className="font-mono text-label text-ink-muted tabular-nums">{link.number}</span>
                  <span className="font-display text-display-m transition-colors duration-150 group-hover:text-accent">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
