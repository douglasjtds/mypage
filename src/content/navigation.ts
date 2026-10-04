import type { Messages } from "next-intl";

type NavKey = Exclude<keyof Messages["nav"], "label" | "openMenu" | "closeMenu" | "menu" | "close">;

export type SectionAnchor = {
  /** Id da seção; em PT e igual nos dois idiomas, para o toggle manter a âncora. */
  id: string;
  /** Rótulo em `nav.*`. */
  key: NavKey;
  /** Mesmo número do rótulo da seção (`02 / portfólio`). */
  number: string;
};

const portfolio: SectionAnchor = { id: "portfolio", key: "portfolio", number: "02" };
const howItWorks: SectionAnchor = { id: "como-funciona", key: "process", number: "03" };
const pricing: SectionAnchor = { id: "pacotes", key: "pricing", number: "04" };
const about: SectionAnchor = { id: "sobre", key: "about", number: "05" };
const projects: SectionAnchor = { id: "outros-projetos", key: "projects", number: "06" };
// 07 enquanto depoimentos estiverem desligados (ver faq.label).
const faq: SectionAnchor = { id: "duvidas", key: "faq", number: "07" };

/** Âncoras do header (máx. 4, LANDING-PAGE-SPEC 00). */
export const headerAnchors = [portfolio, howItWorks, pricing, about];

/** Âncoras do footer: as do header mais as seções só acessíveis por rolagem. */
export const footerAnchors = [portfolio, howItWorks, pricing, about, projects, faq];
