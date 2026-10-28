import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { LINKEDIN_URL } from "../src/content/links";

const section = (page: Page) => page.locator("#sobre");
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  const copy = messages.about;

  test.describe(`sobre ${path}`, () => {
    test("título, texto, credenciais e linha sobre IA", async ({ page }) => {
      await page.goto(path);
      await expect(section(page).getByRole("heading", { level: 2 })).toHaveText(copy.title);
      await expect(section(page)).toContainText(copy.body);
      await expect(section(page)).toContainText(copy.aiLine);

      const items = section(page).locator("ul > li");
      await expect(items).toHaveCount(3);
      for (const [index, credential] of Object.values(copy.credentials).entries()) {
        await expect(items.nth(index)).toHaveText(credential);
      }
    });

    test("LinkedIn em nova aba", async ({ page }) => {
      await page.goto(path);
      const link = section(page).getByRole("link", { name: copy.linkedin });
      await expect(link).toHaveAttribute("href", LINKEDIN_URL);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    });

    test("foto (ou slot) em retrato, à esquerda no desktop e acima no mobile", async ({ page }) => {
      await page.goto(path);
      const photo = section(page).locator("img, [data-photo-slot]").first();
      const box = (await photo.boundingBox())!;
      expect(box.height).toBeGreaterThan(box.width);

      const title = (await section(page).getByRole("heading", { level: 2 }).boundingBox())!;
      if (isDesktop(page)) {
        expect(title.x).toBeGreaterThan(box.x + box.width);
      } else {
        expect(title.y).toBeGreaterThan(box.y + box.height);
      }
    });

    test("fundo surface e nenhuma animação", async ({ page }) => {
      await page.goto(path);
      const [background, surface] = await section(page).evaluate((root) => {
        const probe = document.createElement("div");
        probe.style.backgroundColor = "var(--surface)";
        document.body.append(probe);
        const expected = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return [getComputedStyle(root).backgroundColor, expected];
      });
      expect(background).toBe(surface);

      const animated = await section(page).evaluate((root) =>
        [root, ...root.querySelectorAll("*")].filter((el) => {
          const style = getComputedStyle(el);
          return style.animationName !== "none" || style.transform !== "none";
        }).length,
      );
      expect(animated).toBe(0);
    });

    test("hover na foto: zoom leve com mouse, nada com movimento reduzido", async ({ page }) => {
      test.skip(!isDesktop(page), "hover só no desktop");
      const scaleOnHover = async () => {
        await page.goto(path);
        const photo = section(page).locator("img");
        await photo.scrollIntoViewIfNeeded();
        await photo.hover();
        await page.waitForTimeout(400);
        return photo.evaluate((img) => getComputedStyle(img).scale);
      };

      expect(await scaleOnHover()).toBe("1.03");
      await page.emulateMedia({ reducedMotion: "reduce" });
      expect(await scaleOnHover()).toBe("none");
    });
  });
}
