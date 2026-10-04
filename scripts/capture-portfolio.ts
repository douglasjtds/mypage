/**
 * Captura página inteira de cada landing page do portfólio (1440px), converte
 * para .webp e grava as dimensões reais em src/content/projects.ts.
 *
 * Uso: pnpm capture
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Page } from "@playwright/test";
import sharp from "sharp";
import { landingProjects } from "../src/content/projects";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS_FILE = path.join(ROOT, "src/content/projects.ts");
const VIEWPORT = { width: 1440, height: 900 };
const MAX_BYTES = 400 * 1024;
const QUALITIES = [80, 75, 70, 65];

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
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((r) => setTimeout(r, 400));
    window.scrollTo(0, 0);
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

async function main() {
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
    for (const project of landingProjects) {
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
