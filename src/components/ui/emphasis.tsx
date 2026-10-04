import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Ênfase de headline: sublinhado grosso em --accent (utilitário .emphasis), nunca itálico nem cor.
function Emphasis({ className, children }: { className?: string; children: ReactNode }) {
  return <em className={cn("emphasis", className)}>{children}</em>;
}

// Para t.rich do next-intl: a tag <em> das mensagens vira <Emphasis>.
// Uso: t.rich("headline", richTags)
const richTags = {
  em: (chunks: ReactNode) => <Emphasis>{chunks}</Emphasis>,
};

export { Emphasis, richTags };
