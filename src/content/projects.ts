import type { Messages } from "next-intl";

export type ProjectCategory = "landing" | "saas" | "ferramenta";

export type Screenshot = {
  /** Caminho em `public/`, gerado por `pnpm capture`. */
  src: string;
  width: number;
  height: number;
};

type LandingKey = keyof Messages["portfolio"]["projects"];
type OtherKey = keyof Messages["projects"]["items"];

type BaseProject = {
  slug: string;
  /** Nome próprio do cliente ou produto; igual nos dois idiomas. */
  name: string;
  url: string;
  domain: string;
  published: boolean;
};

export type LandingProject = BaseProject & {
  category: "landing";
  /** Chave em `portfolio.projects` (segmento, tipo, alt). */
  messageKey: LandingKey;
  screenshot: Screenshot;
  /** URL aberta pelo `pnpm capture` quando não deve ser a de produção (não poluir o analytics do cliente). */
  captureUrl?: string;
  /** Recorte do topo do screenshot, usado no hero. Gerado pelo `pnpm capture` (ou `--crops-only`). */
  heroCrop?: Screenshot;
};

export type OtherProject = BaseProject & {
  category: Exclude<ProjectCategory, "landing">;
  /** Chave em `projects.items` (tipo, descrição). */
  messageKey: OtherKey;
  buildToLearn?: boolean;
};

export type Project = LandingProject | OtherProject;

export const projects: Project[] = [
  {
    slug: "bruna-magalhaes",
    name: "Bruna Magalhães",
    url: "https://bruna-magalhaes.vercel.app/",
    domain: "bruna-magalhaes.vercel.app",
    category: "landing",
    messageKey: "brunaMagalhaes",
    published: true,
    screenshot: { src: "/portfolio/bruna-magalhaes.webp", width: 1440, height: 8578 },
    heroCrop: { src: "/portfolio/bruna-magalhaes-hero.webp", width: 1440, height: 1800 },
  },
  {
    slug: "alando-digital",
    name: "Alando Digital",
    url: "https://alandodigital.com.br/",
    domain: "alandodigital.com.br",
    captureUrl: "https://alando-digital.vercel.app/",
    category: "landing",
    messageKey: "alandoDigital",
    published: true,
    screenshot: { src: "/portfolio/alando-digital.webp", width: 1440, height: 10977 },
  },
  {
    slug: "gasolinha",
    name: "Gasolinha",
    url: "https://gasolinha.com.br/",
    domain: "gasolinha.com.br",
    category: "saas",
    messageKey: "gasolinha",
    published: true,
    buildToLearn: true,
  },
  {
    slug: "link-to-whatsapp",
    name: "Link para WhatsApp",
    url: "https://link-to-whatsapp.vercel.app/",
    domain: "link-to-whatsapp.vercel.app",
    category: "ferramenta",
    messageKey: "linkToWhatsapp",
    published: true,
  },
  {
    slug: "santo-rosario",
    name: "Santo Rosário",
    url: "https://santo-rosario-dojotes.vercel.app/",
    domain: "santo-rosario-dojotes.vercel.app",
    category: "ferramenta",
    messageKey: "santoRosario",
    published: true,
  },
  {
    slug: "qr-code-generator",
    name: "Gerador de QR Code",
    url: "https://douglasjtds.github.io/qr-code-generator/",
    domain: "douglasjtds.github.io/qr-code-generator",
    category: "ferramenta",
    messageKey: "qrCodeGenerator",
    published: true,
  },
  {
    slug: "poupensa",
    name: "Poupensa",
    // URL a definir; entra no site quando for publicado.
    url: "",
    domain: "",
    category: "saas",
    messageKey: "poupensa",
    published: false,
  },
];

export const landingProjects = projects.filter(
  (p): p is LandingProject => p.category === "landing" && p.published,
);

export const otherProjects = projects.filter(
  (p): p is OtherProject => p.category !== "landing" && p.published,
);
