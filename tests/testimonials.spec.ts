import { execFileSync } from "node:child_process";
import { expect, test } from "@playwright/test";
import pt from "../messages/pt.json";
import { testimonials } from "../src/content/testimonials";
import { testimonialsFixture } from "./fixtures/testimonials";

test.describe("depoimentos desligados", () => {
  test.skip(testimonials.length > 0, "só vale enquanto não houver depoimentos reais");

  for (const path of ["/", "/en"]) {
    test(`sem depoimentos, a seção não existe em ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("#depoimentos")).toHaveCount(0);
      await expect(page.locator('a[href$="#depoimentos"]')).toHaveCount(0);
    });
  }
});

test.describe("depoimentos ligados (fixture, só no teste)", () => {
  // O HTML vem do componente real; o CSS é o do site, que já inclui as classes do componente.
  let markup = "";
  test.beforeAll(() => {
    markup = execFileSync(
      "node_modules/.bin/tsx",
      ["--tsconfig", "tests/fixtures/tsconfig.json", "tests/fixtures/render-testimonials.ts"],
      { encoding: "utf8" },
    );
  });

  test("uma citação grande e no máximo duas menores", async ({ page }, testInfo) => {
    await page.goto("/");
    await page.locator("#outros-projetos").evaluate((el, html) => el.insertAdjacentHTML("afterend", html), markup);

    const root = page.locator("#depoimentos");
    await expect(root.getByRole("heading", { level: 2 })).toHaveText(pt.testimonials.title);
    await expect(root.locator('[data-testimonial="main"]')).toHaveCount(1);
    await expect(root.locator('[data-testimonial="secondary"]')).toHaveCount(2);
    await expect(root.locator("figure blockquote")).toHaveCount(3);
    await expect(root.locator("figure figcaption")).toHaveCount(3);
    await expect(root).not.toContainText(testimonialsFixture[3].name);

    const size = (selector: string) =>
      root.locator(`${selector} blockquote`).first().evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(await size('[data-testimonial="main"]')).toBeGreaterThan(await size('[data-testimonial="secondary"]'));

    // Só os itens com url viram link (o terceiro não tem).
    await expect(root.getByRole("link")).toHaveCount(2);
    const link = root.locator(`a[href="${testimonialsFixture[0].url}"]`);
    await expect(link).toContainText(testimonialsFixture[0].business);
    await expect(link).toContainText(pt.a11y.newTab);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveAttribute("rel", /noreferrer/);

    await root.screenshot({ path: testInfo.outputPath("depoimentos-fixture.png"), animations: "disabled" });
  });
});
