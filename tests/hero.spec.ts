import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";

const hero = (page: Page) => page.locator("section[aria-labelledby='hero-title']");

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  test.describe(`hero ${path}`, () => {
    test("um único h1, com uma palavra em ênfase", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(hero(page).locator("h1 em.emphasis")).toHaveCount(1);
    });

    test("CTA de WhatsApp com a mensagem do idioma, em nova aba", async ({ page }) => {
      await page.goto(path);
      const cta = hero(page).locator("a[data-cta-position='hero']");
      const url = new URL((await cta.getAttribute("href"))!);

      expect(url.origin + url.pathname).toBe("https://wa.me/5531991848090");
      expect(url.searchParams.get("text")).toBe(messages.whatsapp.messages.default);
      await expect(cta).toHaveAttribute("target", "_blank");
      await expect(cta).toHaveAttribute("rel", "noopener noreferrer");
      await expect(cta).toContainText(messages.hero.ctaPrimary);
    });

    test("link secundário leva ao portfólio", async ({ page }) => {
      await page.goto(path);
      await expect(hero(page).getByRole("link", { name: messages.hero.ctaSecondary })).toHaveAttribute(
        "href",
        "#portfolio",
      );
    });
  });
}

test("imagem do hero carrega com prioridade (LCP) e alt traduzido", async ({ page }) => {
  await page.goto("/en");
  const img = hero(page).getByRole("img", { name: en.hero.visualAlt });

  await expect(img).toHaveAttribute("fetchpriority", "high");
  await expect(img).not.toHaveAttribute("loading", "lazy");
  await expect(page.locator("head link[rel='preload'][as='image'][imagesrcset*='bruna-magalhaes-hero']")).toHaveCount(1);
  await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
});

test("CLS 0 no carregamento", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(600); // entrada termina em ~600ms

  const cls = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
            if (!entry.hadRecentInput) total += entry.value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(total), 100);
      }),
  );
  expect(cls).toBe(0);
});

test("sem rolagem horizontal (a janela sangra, mas é recortada)", async ({ page }) => {
  await page.goto("/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("abaixo de lg, o visual vem depois dos CTAs", async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) >= 1024, "lado a lado no desktop");
  await page.goto("/");
  const cta = await hero(page).locator("a[data-cta-position='hero']").boundingBox();
  const frame = await hero(page).locator("[data-slot='browser-frame']").boundingBox();
  expect(frame!.y).toBeGreaterThan(cta!.y + cta!.height);
});

test.describe("movimento reduzido", () => {
  test.use({ reducedMotion: "reduce" });

  test("entrada desligada: nada se move, tudo visível de imediato", async ({ page }) => {
    await page.goto("/");
    for (const target of [hero(page).locator("h1"), hero(page).locator("[data-slot='browser-frame']").locator("..")]) {
      const style = await target.evaluate((el) => {
        const s = getComputedStyle(el);
        return { opacity: s.opacity, transform: s.transform };
      });
      expect(style).toEqual({ opacity: "1", transform: "none" });
    }
  });
});
