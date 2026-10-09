import { expect, test, type Page } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";

const section = (page: Page) => page.locator("#duvidas");
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

for (const [path, messages] of [
  ["/", pt],
  ["/en", en],
] as const) {
  const copy = messages.faq;
  const items = Object.values(copy.items);

  test.describe(`FAQ ${path}`, () => {
    test("seis perguntas, todas fechadas, com h3 abaixo do h2", async ({ page }) => {
      await page.goto(path);
      await expect(section(page).getByRole("heading", { level: 2 })).toHaveText(copy.title);
      await expect(section(page)).toContainText(copy.label);

      const triggers = section(page).locator("[data-slot='accordion-trigger']");
      await expect(triggers).toHaveCount(items.length);
      await expect(section(page).getByRole("heading", { level: 3 })).toHaveText(items.map((i) => i.question));
      for (const trigger of await triggers.all()) {
        await expect(trigger).toHaveAttribute("aria-expanded", "false");
      }
    });

    test("teclado: Tab chega na pergunta, Enter e Espaço abrem e fecham", async ({ page }) => {
      await page.goto(path);
      const triggers = section(page).locator("[data-slot='accordion-trigger']");
      const first = triggers.first();

      // Foca o título da seção (tabIndex -1) e segue com Tab, como faria quem vem da âncora do footer.
      await section(page).focus();
      await page.keyboard.press("Tab");
      await expect(first).toBeFocused();

      await page.keyboard.press("Enter");
      await expect(first).toHaveAttribute("aria-expanded", "true");
      await expect(section(page).getByText(items[0].answer)).toBeVisible();

      await page.keyboard.press("Tab");
      await expect(triggers.nth(1)).toBeFocused();
      await page.keyboard.press("Space");
      await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true");

      // Várias abertas ao mesmo tempo: abrir a segunda não fechou a primeira.
      await expect(first).toHaveAttribute("aria-expanded", "true");

      await page.keyboard.press("Space");
      await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "false");
      await expect(section(page).getByText(items[1].answer)).toBeHidden();
    });

    test("título sticky no desktop; acima das perguntas abaixo de 1024px", async ({ page }) => {
      await page.goto(path);
      const title = section(page).getByRole("heading", { level: 2 });
      const list = section(page).locator("[data-slot='accordion']");

      if (!isDesktop(page)) {
        const t = (await title.boundingBox())!;
        const l = (await list.boundingBox())!;
        expect(l.y).toBeGreaterThan(t.y + t.height);
        return;
      }

      // Abre todas para a lista ficar mais alta que o título e haver o que rolar.
      for (const trigger of await section(page).locator("[data-slot='accordion-trigger']").all()) {
        await trigger.click();
      }
      // Rola até o meio da seção, em dois pontos: o título fica parado no mesmo lugar.
      const scrollInto = (offset: number) =>
        section(page).evaluate((el, offset) => {
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "instant" });
        }, offset);
      const headerBottom = await page.locator("[data-site-header]").evaluate((el) => el.getBoundingClientRect().bottom);

      // O bloco que gruda é o rótulo + título (pai do h2), 2rem abaixo do header.
      const sticky = title.locator("..");
      await scrollInto(300);
      const first = (await sticky.boundingBox())!.y;
      await scrollInto(500);
      const second = (await sticky.boundingBox())!.y;
      expect(Math.abs(second - first)).toBeLessThan(1);
      // Tolerância de 1px: o fio inferior do header fica fora do --header-height usado no top do sticky.
      expect(Math.abs(first - (headerBottom + 32))).toBeLessThanOrEqual(1);
    });
  });

  test.describe(`CTA final ${path}`, () => {
    const cta = messages.finalCta;
    const block = (page: Page) => page.locator("section[aria-labelledby='contato-title']");

    test("bloco inverse com headline, WhatsApp, nota e LinkedIn", async ({ page }) => {
      await page.goto(path);
      await expect(block(page)).toHaveAttribute("data-surface", "inverse");
      await expect(block(page).getByRole("heading", { level: 2 })).toHaveText(cta.headline);
      await expect(block(page).locator("a[data-cta-position='final']")).toContainText(cta.whatsapp);
      await expect(block(page)).toContainText(cta.note);
      await expect(block(page).locator("a[href*='linkedin.com']")).toContainText(cta.linkedin);
    });

    test("é a última seção do conteúdo, logo antes do footer", async ({ page }) => {
      await page.goto(path);
      const last = page.locator("main > section").last();
      await expect(last).toHaveAttribute("aria-labelledby", "contato-title");
    });

    test("foco do botão e do LinkedIn usa --on-inverse", async ({ page }) => {
      await page.goto(path);
      for (const link of [
        block(page).locator("a[data-cta-position='final']"),
        block(page).locator("a[href*='linkedin.com']"),
      ]) {
        await link.focus();
        // Lido logo depois do foco, sem esperar: o anel já tem que nascer na cor final (sem transição).
        const [outline, onInverse] = await link.evaluate((el) => {
          const probe = document.createElement("span");
          probe.style.color = "var(--on-inverse)";
          document.body.append(probe);
          const expected = getComputedStyle(probe).color;
          probe.remove();
          return [getComputedStyle(el).outlineColor, expected];
        });
        expect(outline).toBe(onInverse);
      }
    });
  });
}
