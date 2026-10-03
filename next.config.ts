import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Impede o `next dev` de anexar regras de agente ao CLAUDE.md do projeto.
  agentRules: false,
};

export default withNextIntl(nextConfig);
