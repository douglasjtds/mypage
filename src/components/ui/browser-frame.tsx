import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Janela de navegador mínima para mostrar os sites do portfólio (hero e Etapa 07).
// Raio 8px e a única sombra do sistema (--shadow-window). Círculos só em contorno, sem cor.
function BrowserFrame({
  domain,
  children,
  className,
}: {
  domain: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-slot="browser-frame"
      className={cn("overflow-hidden rounded-md border border-line bg-raised shadow-window", className)}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line px-3">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="size-2 rounded-full border border-line" />
          <span className="size-2 rounded-full border border-line" />
          <span className="size-2 rounded-full border border-line" />
        </span>
        <span className="min-w-0 truncate font-mono text-label text-ink-muted">{domain}</span>
      </div>
      {children}
    </div>
  );
}

export { BrowserFrame };
