import { expect, test } from "@playwright/test";
import en from "../messages/en.json";
import pt from "../messages/pt.json";
import { buildWhatsAppUrl } from "../src/lib/whatsapp";

const PT_DEFAULT = "Olá, vi seu site e gostaria de falar sobre a construção de uma Landing Page pra minha marca";

function parse(href: string) {
  const url = new URL(href);
  return { origin: url.origin, path: url.pathname, text: url.searchParams.get("text") };
}

test.describe("buildWhatsAppUrl", () => {
  test("aponta para wa.me com o número do Douglas", () => {
    const { origin, path } = parse(buildWhatsAppUrl({ locale: "pt" }));
    expect(origin).toBe("https://wa.me");
    expect(path).toBe("/5531991848090");
  });

  test("mensagem PT padrão é a definida no CLAUDE.md", () => {
    expect(parse(buildWhatsAppUrl({ locale: "pt" })).text).toBe(PT_DEFAULT);
    expect(parse(buildWhatsAppUrl({ locale: "pt", context: "default" })).text).toBe(PT_DEFAULT);
  });

  test("usa a mensagem do idioma e do contexto pedidos", () => {
    for (const context of ["default", "pricing-essencial", "pricing-profissional"] as const) {
      expect(parse(buildWhatsAppUrl({ locale: "pt", context })).text).toBe(pt.whatsapp.messages[context]);
      expect(parse(buildWhatsAppUrl({ locale: "en", context })).text).toBe(en.whatsapp.messages[context]);
    }
  });

  test("codifica a mensagem na URL", () => {
    const href = buildWhatsAppUrl({ locale: "pt" });
    expect(href).not.toContain(" ");
    expect(href).toContain(encodeURIComponent("Olá,"));
  });
});
