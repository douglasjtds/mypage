import type { Screenshot } from "@/content/projects";

// Rolagem do preview do portfólio (DESIGN-GUIDELINES 5): ~1s a cada 700px rolados, entre 3s e 9s.
const PX_PER_SECOND = 700;
const MIN_MS = 3_000;
const MAX_MS = 9_000;

/** Largura aproximada do card principal no desktop; base para converter a altura do screenshot em pixels rolados. */
const NOMINAL_PREVIEW_WIDTH = 700;

/**
 * Duração da rolagem até o rodapé do site, em ms. A distância é a altura do screenshot
 * escalada para a largura do preview, menos a parte já visível (janela 16:10).
 */
export function scrollDurationMs({ width, height }: Pick<Screenshot, "width" | "height">, previewWidth = NOMINAL_PREVIEW_WIDTH) {
  const renderedHeight = (height / width) * previewWidth;
  const visibleHeight = (previewWidth * 10) / 16;
  const distance = Math.max(0, renderedHeight - visibleHeight);
  const ms = (distance / PX_PER_SECOND) * 1_000;
  return Math.round(Math.min(MAX_MS, Math.max(MIN_MS, ms)));
}
