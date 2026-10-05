import { expect, test } from "@playwright/test";
import { scrollDurationMs } from "../src/lib/portfolio";

test.describe("scrollDurationMs", () => {
  test("~1s a cada 700px rolados no preview de 700px", () => {
    // 1440x6000 vira 700x2917; visível 437.5px; rola ~2479px.
    expect(scrollDurationMs({ width: 1440, height: 6000 })).toBe(3542);
    expect(scrollDurationMs({ width: 1440, height: 8578 })).toBe(5332);
  });

  test("mínimo de 3s para páginas curtas", () => {
    expect(scrollDurationMs({ width: 1440, height: 900 })).toBe(3000);
    expect(scrollDurationMs({ width: 1440, height: 400 })).toBe(3000);
  });

  test("teto de 9s para páginas muito longas", () => {
    expect(scrollDurationMs({ width: 1440, height: 30000 })).toBe(9000);
  });

  test("páginas mais longas rolam por mais tempo", () => {
    expect(scrollDurationMs({ width: 1440, height: 10977 })).toBeGreaterThan(
      scrollDurationMs({ width: 1440, height: 8578 }),
    );
  });
});
