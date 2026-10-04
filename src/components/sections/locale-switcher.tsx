"use client";

import type { Locale } from "next-intl";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Option = { locale: Locale; href: string; short: string; name: string };

// Dois links reais (rastreáveis, funcionam sem JS). O JS só acrescenta a âncora atual,
// para que /#pacotes vire /en#pacotes. O cookie NEXT_LOCALE fica com o middleware do next-intl.
function keepHash(event: MouseEvent<HTMLAnchorElement>) {
  const { hash } = window.location;
  if (!hash) return;
  const url = new URL(event.currentTarget.href);
  url.hash = hash;
  event.currentTarget.href = url.toString();
}

export function LocaleSwitcher({
  current,
  label,
  options,
  className,
}: {
  current: Locale;
  label: string;
  options: Option[];
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center gap-1.5 font-mono text-label text-ink-muted", className)}
    >
      {options.map((option, index) => {
        const active = option.locale === current;
        return (
          <span key={option.locale} className="contents">
            {index > 0 && <span aria-hidden="true">/</span>}
            <a
              href={option.href}
              hrefLang={option.locale}
              lang={option.locale}
              // Nome visível primeiro (WCAG 2.5.3), nome completo para leitor de tela.
              aria-label={`${option.short}, ${option.name}`}
              aria-current={active ? "true" : undefined}
              onClick={keepHash}
              className={cn(
                // Área de toque maior que o texto, sem mexer no alinhamento.
                "-mx-1 -my-2 rounded-xs px-1 py-2 underline-offset-4 transition-colors duration-150",
                active ? "text-ink underline decoration-1" : "hover:text-ink",
              )}
            >
              {option.short}
            </a>
          </span>
        );
      })}
    </div>
  );
}
