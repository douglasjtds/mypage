import { expect, test, type Page } from "@playwright/test";
import { footerAnchors, headerAnchors } from "../src/content/navigation";

// Abaixo de `lg` (1024px) as âncoras ficam no menu (Sheet).
const usesMenu = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024;

const header = (page: Page) => page.locator("[data-site-header]");

/** Espera a rolagem (suave) assentar e confere que o título não fica coberto pelo header. */
async function expectTitleBelowHeader(page: Page, id: string) {
  const section = page.locator(`#${id}`);
  const title = section.locator("h2");
  const viewportHeight = page.viewportSize()!.height;

  await expect
    .poll(
      async () => {
        const [headerBox, sectionBox, titleBox] = await Promise.all([
          header(page).boundingBox(),
          section.boundingBox(),
          title.boundingBox(),
        ]);
        if (!headerBox || !sectionBox || !titleBox) return false;
        const headerBottom = headerBox.y + headerBox.height;
        // A seção para logo abaixo do header (scroll-margin) e o título fica inteiro na tela, sem ser coberto.
        const sectionLanded = sectionBox.y >= headerBottom && sectionBox.y <= headerBottom + 48;
        return sectionLanded && titleBox.y >= headerBottom && titleBox.y + titleBox.height <= viewportHeight;
      },
      { timeout: 5_000 },
    )
    .toBe(true);
}

test.describe("âncoras do header", () => {
  for (const anchor of headerAnchors) {
    test(`leva a #${anchor.id} sem cobrir o título`, async ({ page }) => {
      await page.goto("/");

      if (usesMenu(page)) {
        await page.getByRole("button", { name: "Abrir menu" }).click();
        const menu = page.getByRole("dialog");
        await menu.locator(`a[href="#${anchor.id}"]`).click();
        await expect(menu).toBeHidden();
      } else {
        await header(page).getByRole("navigation").locator(`a[href="#${anchor.id}"]`).click();
      }

      await expect(page).toHaveURL(new RegExp(`#${anchor.id}$`));
      await expectTitleBelowHeader(page, anchor.id);
    });
  }

  test("as âncoras inline só aparecem a partir de lg; abaixo disso, o menu", async ({ page }) => {
    await page.goto("/");
    const inlineNav = header(page).getByRole("navigation", { name: "Navegação principal" });
    const menuButton = page.getByRole("button", { name: "Abrir menu" });

    if (usesMenu(page)) {
      await expect(inlineNav).toBeHidden();
      await expect(menuButton).toBeVisible();
    } else {
      await expect(inlineNav).toBeVisible();
      await expect(menuButton).toBeHidden();
    }
  });
});

test.describe("âncoras do footer", () => {
  for (const anchor of footerAnchors) {
    test(`leva a #${anchor.id} sem cobrir o título`, async ({ page }) => {
      await page.goto("/");
      await page.locator("footer").locator(`a[href="#${anchor.id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${anchor.id}$`));
      await expectTitleBelowHeader(page, anchor.id);
    });
  }
});

test("entrada direta em /en#pacotes mostra o título sem cobrir", async ({ page }) => {
  await page.goto("/en#pacotes");
  await expectTitleBelowHeader(page, "pacotes");
});

test.describe("header", () => {
  test("transparente no topo; fundo e fio depois de rolar", async ({ page }) => {
    await page.goto("/");
    await expect(header(page)).not.toHaveAttribute("data-scrolled");

    await page.mouse.wheel(0, 600);
    await expect(header(page)).toHaveAttribute("data-scrolled");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header(page)).not.toHaveAttribute("data-scrolled");
  });

  test("fica preso no topo ao rolar", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await expect.poll(async () => (await header(page).boundingBox())?.y).toBe(0);
  });

  test("menu abre e fecha com Esc, devolvendo o foco ao gatilho", async ({ page }) => {
    test.skip(!usesMenu(page), "menu só existe abaixo de lg");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Abrir menu" });

    await trigger.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe("teclado", () => {
  test("skip link é o primeiro foco e leva ao conteúdo", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#conteudo$/);
  });

  test("ordem do header: wordmark, navegação, idioma, WhatsApp", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link

    const order: (string | null)[] = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const name = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el?.closest("[data-site-header]")) return null;
        return el.getAttribute("aria-label") ?? el.textContent?.trim() ?? "";
      });
      if (name === null) break;
      order.push(name);
    }

    const locale = ["PT, Português", "EN, English"];
    // Abaixo de lg o gatilho do menu fica à direita do toggle.
    const expected = usesMenu(page)
      ? ["Douglas Tertuliano", ...locale, "Abrir menu"]
      : ["Douglas Tertuliano", "Portfólio", "Como funciona", "Pacotes", "Sobre", ...locale];

    expect(order.slice(0, expected.length)).toEqual(expected);
    expect(order[expected.length]).toMatch(/WhatsApp/);
  });
});
