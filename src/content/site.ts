/** Nome da marca pessoal (wordmark). Nome próprio: igual nos dois idiomas. */
export const OWNER_NAME = { first: "Douglas", last: "Tertuliano" } as const;

/**
 * Foto do "sobre mim", já recortada em 4:5. Com `src` null, a seção mostra um slot neutro na mesma proporção.
 * Para trocar: salvar o .webp em public/about/ e atualizar `src`, `width` e `height`.
 */
export const ABOUT_PHOTO: { src: string | null; width: number; height: number } = {
  src: "/about/douglas-tertuliano.webp",
  width: 800,
  height: 1000,
};
