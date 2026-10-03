import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="mx-auto flex min-h-svh max-w-content flex-col justify-center gap-6 px-4 md:px-6 lg:px-8">
      <h1 className="font-display text-display-l">{t("title")}</h1>
      <Link href="/" className="text-accent underline underline-offset-4">
        {t("backHome")}
      </Link>
    </main>
  );
}
