import { expect, test } from "@playwright/test";
import { formatPrice } from "../src/lib/format";

// Intl usa espaço não separável entre símbolo e valor; normaliza para comparar.
const normalize = (s: string) => s.replace(/\s/g, " ");

test.describe("formatPrice", () => {
  test("BRL em PT", () => {
    expect(normalize(formatPrice(400, "pt"))).toBe("R$ 400");
    expect(normalize(formatPrice(1550, "pt"))).toBe("R$ 1.550");
  });

  test("BRL em EN", () => {
    expect(normalize(formatPrice(550, "en"))).toBe("R$550");
    expect(normalize(formatPrice(1550, "en"))).toBe("R$1,550");
  });
});
