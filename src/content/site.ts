/** Nome da marca pessoal (wordmark). Nome próprio: igual nos dois idiomas. */
export const OWNER_NAME = { first: "Douglas", last: "Tertuliano" } as const;

/**
 * Foto do "sobre mim". Enquanto `src` for null, a seção mostra um slot neutro na mesma proporção (4:5).
 * Quando a foto real chegar: salvar o .webp em public/about/ e preencher `src`, `width` e `height`.
 */
export const ABOUT_PHOTO: { src: string | null; width: number; height: number } = {
  src: null,
  width: 800,
  height: 1000,
};
