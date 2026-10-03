import type { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  // As seções entram a partir da Etapa 05.
  return (
    <>
      <header />
      <main />
      <footer />
    </>
  );
}
