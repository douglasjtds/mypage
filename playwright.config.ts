import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const baseURL = `http://localhost:${PORT}`;

const viewport = (width: number) => ({
  ...devices["Desktop Chrome"],
  viewport: { width, height: width < 768 ? 812 : 900 },
});

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL, trace: "on-first-retry" },
  projects: [
    // Testes sem página (funções puras), rodam uma vez só.
    { name: "unit", testMatch: /.*\.unit\.spec\.ts/ },
    { name: "chromium-375", testIgnore: /.*\.unit\.spec\.ts/, use: viewport(375) },
    { name: "chromium-768", testIgnore: /.*\.unit\.spec\.ts/, use: viewport(768) },
    { name: "chromium-1440", testIgnore: /.*\.unit\.spec\.ts/, use: viewport(1440) },
  ],
  webServer: {
    command: `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
