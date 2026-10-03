import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Impede o `next dev` de anexar regras de agente ao CLAUDE.md do projeto.
  agentRules: false,
};

export default nextConfig;
