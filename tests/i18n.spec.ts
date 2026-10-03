import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";

function keyPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return [prefix];
  return Object.entries(value).flatMap(([key, child]) => keyPaths(child, prefix ? `${prefix}.${key}` : key));
}

test.describe("mensagens", () => {
  test("pt.json e en.json têm exatamente as mesmas chaves", () => {
    const ptKeys = new Set(keyPaths(pt));
    const enKeys = new Set(keyPaths(en));
    const missingInEn = [...ptKeys].filter((k) => !enKeys.has(k));
    const missingInPt = [...enKeys].filter((k) => !ptKeys.has(k));

    expect({ missingInEn, missingInPt }).toEqual({ missingInEn: [], missingInPt: [] });
  });
});

test.describe("rotas por idioma", () => {
  test("/ renderiza em PT", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
  });

  test("/en renderiza em EN", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("sem detecção automática: / continua PT com navegador e cookie em EN", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: "en-US", extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" } });
    await context.addCookies([{ name: "NEXT_LOCALE", value: "en", url: baseURL! }]);
    const page = await context.newPage();

    const response = await page.goto("/");
    expect(new URL(page.url()).pathname).toBe("/");
    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt");
    await context.close();
  });

  test("/pt não existe como prefixo (PT fica na raiz)", async ({ page }) => {
    await page.goto("/pt");
    expect(new URL(page.url()).pathname).toBe("/");
  });

  test("a página tem header, main e footer", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("body > header")).toHaveCount(1);
    await expect(page.locator("body > main")).toHaveCount(1);
    await expect(page.locator("body > footer")).toHaveCount(1);
  });
});
