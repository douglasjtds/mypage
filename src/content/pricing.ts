import type { WhatsAppContext } from "@/lib/whatsapp";

export type PackageId = "essencial" | "profissional";

export type PricingPackage = {
  id: PackageId;
  /** Valor "a partir de", em reais. */
  priceFrom: number;
  featured: boolean;
  whatsappContext: Extract<WhatsAppContext, `pricing-${PackageId}`>;
};

export const pricing: PricingPackage[] = [
  { id: "essencial", priceFrom: 400, featured: false, whatsappContext: "pricing-essencial" },
  { id: "profissional", priceFrom: 550, featured: true, whatsappContext: "pricing-profissional" },
];
