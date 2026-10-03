import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ensina o tailwind-merge a escala tipográfica do projeto, para que
// `text-display-xl` (tamanho) não seja descartado ao lado de `text-ink` (cor).
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xl", "display-l", "display-m", "body-l", "body", "small", "label"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
