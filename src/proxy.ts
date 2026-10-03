import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Tudo, exceto internos do Next, API e arquivos com extensão (imagens, robots, sitemap).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
