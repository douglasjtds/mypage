import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { landingProjects } from "../src/content/projects";

const section = (page: Page) => page.locator("#portfolio");
const card = (page: Page, name: string) =>
  section(page).locator("article").filter({ has: page.getByRole("heading", { name, level: 3 }) });

/** Transform calculado do screenshot dentro da janela. */
const imageTransform = (page: Page, name: string) =>
  card(page, name)
    .locator(".preview-img")
    .evaluate((el) => getComputedStyle(el).transform);

/** Deslocamento vertical atual do screenshot, em px. */
const imageOffsetY = (page: Page, name: string) =>
  card(page, name)
    .locator(".preview-img")
    .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);

const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  test.describe(`portfólio ${path}`, () => {
    test("um card por projeto, com screenshot carregado e alt traduzido", async ({ page }) => {
      await page.goto(path);
      await expect(section(page).locator("article")).toHaveCount(landingProjects.length);

      for (const project of landingProjects) {
        const img = card(page, project.name).locator("img");
        await img.scrollIntoViewIfNeeded();
        await expect(img).toHaveAttribute("alt", messages.portfolio.projects[project.messageKey].alt);
        await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
    });

    test("links abrem o site do cliente em nova aba", async ({ page }) => {
      await page.goto(path);

      for (const project of landingProjects) {
        const links = card(page, project.name).locator("a");
        await expect(links).toHaveCount(2);
        for (const link of await links.all()) {
          await expect(link).toHaveAttribute("href", project.url);
          await expect(link).toHaveAttribute("target", "_blank");
          await expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }

        // Só o "ver site" entra no Tab; a janela é alvo de mouse e toque.
        const visible = card(page, project.name).getByRole("link");
        await expect(visible).toHaveCount(1);
        await expect(visible).toContainText(messages.portfolio.viewSite);
      }
    });
  });
}

test.describe("rolagem no hover", () => {
  const [project] = landingProjects;

  test("com mouse, o screenshot desce depois do atraso", async ({ page }) => {
    test.skip(!isDesktop(page), "hover medido no desktop");
    await page.goto("/");
    const window = card(page, project.name).locator(".preview");
    await window.scrollIntoViewIfNeeded();
    await window.hover();

    await expect.poll(() => imageOffsetY(page, project.name), { timeout: 3_000 }).toBeLessThan(-100);
  });

  test("com movimento reduzido, nenhum transform no hover", async ({ page }) => {
    test.skip(!isDesktop(page), "hover medido no desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const window = card(page, project.name).locator(".preview");
    await window.scrollIntoViewIfNeeded();
    await window.hover();
    await page.waitForTimeout(800);

    expect(await imageTransform(page, project.name)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });

  test("foco por teclado não rola o screenshot", async ({ page }) => {
    await page.goto("/");
    await card(page, project.name).getByRole("link").focus();
    await page.waitForTimeout(800);

    expect(await imageTransform(page, project.name)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  });
});
