import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { otherProjects, projects } from "../src/content/projects";

const section = (page: Page) => page.locator("#outros-projetos");
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  const copy = messages.projects;

  test.describe(`outros projetos ${path}`, () => {
    test("rótulo, título e uma linha por projeto publicado", async ({ page }) => {
      await page.goto(path);
      await expect(section(page)).toContainText(copy.label);
      await expect(section(page).getByRole("heading", { level: 2 })).toHaveText(copy.title);

      const rows = section(page).locator("ul > li");
      await expect(rows).toHaveCount(otherProjects.length);
      for (const [index, project] of otherProjects.entries()) {
        const row = rows.nth(index);
        await expect(row).toContainText(project.name);
        await expect(row).toContainText(copy.items[project.messageKey].type);
        await expect(row).toContainText(copy.items[project.messageKey].description);
      }
    });

    test("não publicados ficam fora; Gasolinha com build-to-learn", async ({ page }) => {
      await page.goto(path);
      for (const project of projects.filter((p) => !p.published)) {
        await expect(section(page)).not.toContainText(project.name);
      }
      const rows = section(page).locator("ul > li");
      for (const [index, project] of otherProjects.entries()) {
        const label = rows.nth(index).getByText(copy.buildToLearn, { exact: true });
        await expect(label).toHaveCount(project.buildToLearn ? 1 : 0);
      }
    });

    test("linha inteira é um link externo em nova aba", async ({ page }) => {
      await page.goto(path);
      const rows = section(page).locator("ul > li");
      for (const [index, project] of otherProjects.entries()) {
        const links = rows.nth(index).getByRole("link");
        await expect(links).toHaveCount(1);
        await expect(links).toHaveAttribute("href", project.url);
        await expect(links).toHaveAttribute("target", "_blank");
        await expect(links).toHaveAttribute("rel", /noopener/);
        await expect(links).toHaveAttribute("rel", /noreferrer/);
        await expect(links).toContainText(messages.a11y.newTab);
      }
    });
  });
}

test.describe("hover da linha", () => {
  const arrowTranslate = (page: Page) =>
    section(page).locator("[data-row-arrow]").first().evaluate((el) => getComputedStyle(el).translate);

  test("a seta desloca no hover", async ({ page }) => {
    test.skip(!isDesktop(page), "hover medido no desktop");
    await page.goto("/");
    await section(page).locator("ul > li a").first().hover();
    await expect.poll(() => arrowTranslate(page)).not.toBe("none");
  });

  test("com movimento reduzido, nenhum deslocamento no hover", async ({ page }) => {
    test.skip(!isDesktop(page), "hover medido no desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await section(page).locator("ul > li a").first().hover();
    await page.waitForTimeout(300);
    expect(await arrowTranslate(page)).toBe("none");
  });
});
