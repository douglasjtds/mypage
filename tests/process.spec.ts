import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";

const section = (page: Page) => page.locator("#como-funciona");
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  const copy = messages.process;

  test.describe(`como funciona ${path}`, () => {
    test("quatro passos em ordem, com título e descrição", async ({ page }) => {
      await page.goto(path);
      await expect(section(page).getByRole("heading", { level: 2 })).toHaveText(copy.title);

      const items = section(page).locator("ol > li");
      await expect(items).toHaveCount(4);
      for (const [index, step] of Object.values(copy.steps).entries()) {
        const item = items.nth(index);
        await expect(item.getByRole("heading", { level: 3 })).toHaveText(step.title);
        await expect(item).toContainText(step.description);
        await expect(item.locator("[aria-hidden='true']")).toHaveText(String(index + 1).padStart(2, "0"));
      }
    });

    test("blocos brand-first e IA presentes; lado a lado com a lista no desktop", async ({ page }) => {
      await page.goto(path);
      const brandFirst = section(page).getByRole("heading", { name: copy.brandFirst.title });
      const ai = section(page).getByRole("heading", { name: copy.ai.title });
      await expect(brandFirst).toBeVisible();
      await expect(ai).toBeVisible();
      await expect(section(page)).toContainText(copy.brandFirst.body);
      await expect(section(page)).toContainText(copy.ai.body);

      const list = await section(page).locator("ol").boundingBox();
      const block = await brandFirst.boundingBox();
      if (isDesktop(page)) {
        expect(block!.x).toBeGreaterThan(list!.x + list!.width);
      } else {
        expect(block!.y).toBeGreaterThan(list!.y + list!.height);
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
