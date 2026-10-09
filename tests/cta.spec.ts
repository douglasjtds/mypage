import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { LINKEDIN_URL } from "../src/content/links";

type Context = keyof typeof pt.whatsapp.messages;

const expectNewTab = async (link: { getAttribute: (name: string) => Promise<string | null> }) => {
  expect(await link.getAttribute("target")).toBe("_blank");
  const rel = (await link.getAttribute("rel"))?.split(/\s+/) ?? [];
  expect(rel).toEqual(expect.arrayContaining(["noopener", "noreferrer"]));
};

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  test.describe(`CTAs ${path}`, () => {
    test("todo link de WhatsApp aponta para o número certo, com a mensagem do idioma e do contexto", async ({
      page,
    }) => {
      await page.goto(path);
      const links = await page.locator("a[href*='wa.me']").all();
      expect(links.length).toBeGreaterThanOrEqual(6);

      for (const link of links) {
        const url = new URL((await link.getAttribute("href"))!);
        expect(url.origin + url.pathname).toBe("https://wa.me/5531991848090");

        const position = await link.getAttribute("data-cta-position");
        const context: Context = position?.startsWith("pricing-") ? (position as Context) : "default";
        expect(url.searchParams.get("text")).toBe(messages.whatsapp.messages[context]);
        await expectNewTab(link);
      }
    });

    test("um CTA por posição: header, hero, pacotes e CTA final", async ({ page }) => {
      await page.goto(path);
      for (const position of ["header", "hero", "pricing-essencial", "pricing-profissional", "final"]) {
        await expect(page.locator(`a[data-cta-position='${position}']`)).toHaveCount(1);
      }
    });

    test("LinkedIn aponta para o perfil do Douglas", async ({ page }) => {
      await page.goto(path);
      const links = await page.locator("a[href*='linkedin.com']").all();
      expect(links.length).toBeGreaterThan(0);
      for (const link of links) {
        expect(await link.getAttribute("href")).toBe(LINKEDIN_URL);
        await expectNewTab(link);
      }
    });

    test("todo link externo abre em nova aba com rel noopener noreferrer", async ({ page, baseURL }) => {
      await page.goto(path);
      const origin = new URL(baseURL!).origin;
      for (const link of await page.locator("a[href^='http']").all()) {
        const href = (await link.getAttribute("href"))!;
        if (new URL(href).origin === origin) continue;
        await expectNewTab(link);
      }
    });
  });
}
