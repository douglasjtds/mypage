/**
 * Captura página inteira de cada landing page do portfólio (1440px), converte
 * para .webp e grava as dimensões reais em src/content/projects.ts.
 *
 * Também recorta o topo dos projetos com `heroCrop` (imagem do hero).
 *
 * Uso: pnpm capture
 *      pnpm capture --crops-only   (só refaz os recortes a partir dos .webp existentes, sem abrir os sites)
 *      pnpm capture --only=<slug>  (captura só esse projeto, sem regerar os outros)
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";
import { landingProjects, type LandingProject } from "../src/content/projects";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS_FILE = path.join(ROOT, "src/content/projects.ts");
const VIEWPORT = { width: 1440, height: 900 };
const MAX_BYTES = 400 * 1024;
const QUALITIES = [80, 75, 70, 65];
// Recorte do hero: topo do site em 4:5 (1440x1800). Arquivo pequeno, porque é o LCP.
const HERO_CROP_HEIGHT = 1800;
const HERO_CROP_QUALITY = 80;
const CROPS_ONLY = process.argv.includes("--crops-only");
const ONLY = process.argv.find((arg) => arg.startsWith("--only="))?.slice("--only=".length);

// Captura não deve contar como visita no analytics de ninguém.
const ANALYTICS =
  /google-analytics\.com|googletagmanager\.com|\/_vercel\/(insights|speed-insights)|umami|plausible\.io|connect\.facebook\.net|facebook\.com\/tr|clarity\.ms|hotjar\.com/;

const DISMISS_LABELS = [
  /^aceitar/i,
  /^accept/i,
  /^ok$/i,
  /^entendi/i,
  /^fechar$/i,
  /^close$/i,
  /^×$/,
];

async function dismissPopups(page: Page) {
  for (const name of DISMISS_LABELS) {
    const button = page.getByRole("button", { name }).first();
    try {
      if (await button.isVisible({ timeout: 300 })) {
        await button.click({ timeout: 1000 });
      }
    } catch {
      // Sem popup com esse rótulo: segue.
    }
  }
  await page.keyboard.press("Escape");
}

/** Rola até o fim em passos para disparar lazy images e reveals, depois volta ao topo. */
async function primeLazyContent(page: Page) {
  await page.evaluate(async () => {
    // "instant": sites com `scroll-behavior: smooth` ainda estariam rolando na hora da captura.
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
        ),
    );
  });
  await page.waitForTimeout(500);
}

async function encode(png: Buffer) {
  let out: Buffer = Buffer.alloc(0);
  let quality = QUALITIES[0];
  for (quality of QUALITIES) {
    out = await sharp(png).webp({ quality }).toBuffer();
    if (out.byteLength <= MAX_BYTES) break;
  }
  return { out, quality };
}

function updateDimensions(source: string, src: string, width: number, height: number) {
  const escaped = src.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const pattern = new RegExp(`(src: "${escaped}", width: )\\d+(, height: )\\d+`);
  if (!pattern.test(source)) throw new Error(`screenshot de ${src} não encontrado em projects.ts`);
  return source.replace(pattern, `$1${width}$2${height}`);
}

/** Recorta o topo da captura para o hero e devolve o projects.ts com as dimensões atualizadas. */
async function writeHeroCrop(project: LandingProject, source: Buffer, projectsSource: string) {
  if (!project.heroCrop) return projectsSource;

  const { width, height } = await sharp(source).metadata();
  const cropHeight = Math.min(HERO_CROP_HEIGHT, height!);
  const out = await sharp(source)
    .extract({ left: 0, top: 0, width: width!, height: cropHeight })
    .webp({ quality: HERO_CROP_QUALITY })
    .toBuffer();
  await writeFile(path.join(ROOT, "public", project.heroCrop.src), out);

  const kb = Math.round(out.byteLength / 1024);
  console.log(`  ${project.heroCrop.src}: ${width}x${cropHeight}, ${kb}KB, qualidade ${HERO_CROP_QUALITY}`);
  return updateDimensions(projectsSource, project.heroCrop.src, width!, cropHeight);
}

async function cropsOnly() {
  let projectsSource = await readFile(PROJECTS_FILE, "utf8");
  for (const project of landingProjects.filter((p) => p.heroCrop)) {
    console.log(`\n${project.name}: recorte a partir de ${project.screenshot.src}`);
    const source = await readFile(path.join(ROOT, "public", project.screenshot.src));
    projectsSource = await writeHeroCrop(project, source, projectsSource);
  }
  await writeFile(PROJECTS_FILE, projectsSource);
  console.log("\nprojects.ts atualizado.");
}

async function main() {
  if (CROPS_ONLY) return cropsOnly();

  await mkdir(path.join(ROOT, "public/portfolio"), { recursive: true });
  let projectsSource = await readFile(PROJECTS_FILE, "utf8");

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await context.route(ANALYTICS, (route) => route.abort());

  try {
    const targets = ONLY ? landingProjects.filter((p) => p.slug === ONLY) : landingProjects;
    if (targets.length === 0) throw new Error(`nenhum projeto de landing com slug "${ONLY}"`);

    for (const project of targets) {
      const target = project.captureUrl ?? project.url;
      console.log(`\n${project.name}: ${target}`);

      const page = await context.newPage();
      await page.goto(target, { waitUntil: "networkidle", timeout: 60_000 });
      await dismissPopups(page);
      await primeLazyContent(page);
      await dismissPopups(page);

      const png = await page.screenshot({ fullPage: true, type: "png" });
      await page.close();

      const { out, quality } = await encode(png);
      const { width, height } = await sharp(out).metadata();
      const file = path.join(ROOT, "public", project.screenshot.src);
      await writeFile(file, out);

      const kb = Math.round(out.byteLength / 1024);
      console.log(`  ${project.screenshot.src}: ${width}x${height}, ${kb}KB, qualidade ${quality}`);
      if (out.byteLength > MAX_BYTES) {
        console.warn(
          `  ⚠ acima de 400KB mesmo com qualidade ${quality}. Considere limitar a altura (crop) ou baixar a qualidade.`,
        );
      }

      projectsSource = updateDimensions(projectsSource, project.screenshot.src, width!, height!);
      // Recorta do PNG original, sem perder qualidade numa segunda compressão.
      projectsSource = await writeHeroCrop(project, png, projectsSource);
    }
  } finally {
    await browser.close();
  }

  await writeFile(PROJECTS_FILE, projectsSource);
  console.log("\nprojects.ts atualizado.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
