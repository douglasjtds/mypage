import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { pricing } from "../src/content/pricing";
import { formatPrice } from "../src/lib/format";

const section = (page: Page) => page.locator("#pacotes");
const isStacked = (page: Page) => (page.viewportSize()?.width ?? 0) < 768;

for (const [path, locale, messages] of [
  ["/", "pt", pt],
  ["/en", "en", en],
] as const) {
  const copy = messages.pricing;

  test.describe(`pacotes ${path}`, () => {
    test("dois pacotes em ordem, com nome, preço a partir de e itens", async ({ page }) => {
      await page.goto(path);
      await expect(section(page).getByRole("heading", { level: 2 })).toHaveText(copy.title);

      const blocks = section(page).locator("[data-package]");
      await expect(blocks).toHaveCount(pricing.length);
      for (const [index, pkg] of pricing.entries()) {
        const block = blocks.nth(index);
        const pkgCopy = copy.packages[pkg.id];
        await expect(block).toHaveAttribute("data-package", pkg.id);
        await expect(block.getByRole("heading", { level: 3 })).toHaveText(pkgCopy.name);
        await expect(block).toContainText(copy.from);
        await expect(block).toContainText(formatPrice(pkg.priceFrom, locale));
        const items = block.locator("ul > li");
        await expect(items).toHaveText(Object.values(pkgCopy.items));
      }
    });

    test("Profissional em bloco inverse; lado a lado a partir de 768px", async ({ page }) => {
      await page.goto(path);
      const essencial = section(page).locator("[data-package='essencial']");
      const profissional = section(page).locator("[data-package='profissional']");
      await expect(profissional).toHaveAttribute("data-surface", "inverse");
      await expect(essencial).not.toHaveAttribute("data-surface", /.*/);

      const a = (await essencial.boundingBox())!;
      const b = (await profissional.boundingBox())!;
      if (isStacked(page)) {
        expect(b.y).toBeGreaterThanOrEqual(a.y + a.height);
      } else {
        expect(b.x).toBeGreaterThanOrEqual(a.x + a.width);
        expect(Math.abs(b.y - a.y)).toBeLessThan(1);
        expect(Math.abs(b.height - a.height)).toBeLessThan(1);
      }
    });

    test("foco do CTA dentro do bloco inverse usa --on-inverse", async ({ page }) => {
      await page.goto(path);
      const cta = section(page).locator("a[data-cta-position='pricing-profissional']");
      await cta.focus();
      const [outline, onInverse] = await cta.evaluate((el) => {
        const probe = document.createElement("span");
        probe.style.color = "var(--on-inverse)";
        document.body.append(probe);
        const expected = getComputedStyle(probe).color;
        probe.remove();
        return [getComputedStyle(el).outlineColor, expected];
      });
      expect(outline).toBe(onInverse);
    });

    test("notas de complexidade, domínio e adicionais", async ({ page }) => {
      await page.goto(path);
      for (const note of Object.values(copy.notes)) {
        await expect(section(page)).toContainText(note);
      }
    });

    test("seção sem animação nem transform", async ({ page }) => {
      await page.goto(path);
      const animated = await section(page).evaluate((root) =>
        [root, ...root.querySelectorAll("*")].filter((el) => {
          const style = getComputedStyle(el);
          return style.animationName !== "none" || style.transform !== "none";
        }).length,
      );
      expect(animated).toBe(0);
    });
  });
}
