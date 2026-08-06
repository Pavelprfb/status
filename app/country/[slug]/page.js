import CountryBox from "@/components/CountryBox";
import { COUNTRIES } from "@/data/countries";
import { statuses } from "@/data/statuses";
import { LANGUAGES } from "@/lib/languages";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) return { title: "Country Not Found" };

  const lang = LANGUAGES.find((l) => l.code === country.lang);
  const langName = lang ? lang.name : "English";
  const name = country.name;

  const title = `${name} Statuses`;
  const description = `${statuses.length}+ original Facebook, WhatsApp and social media statuses for ${name}, all translated into ${langName}. Browse, copy and share with one tap.`;

  return {
    title,
    description,
    keywords: [
      `${name} status`,
      `${name} status bangla`,
      `status in ${langName.toLowerCase()}`,
      "social status",
      "facebook status",
      "whatsapp status",
    ],
    alternates: {
      canonical: `${SITE_URL}/country/${slug}`,
    },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/country/${slug}`,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();

  const lang = LANGUAGES.find((l) => l.code === country.lang);
  const langName = lang ? lang.name : "English";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${country.name} Statuses`,
    description: `${statuses.length}+ original Facebook, WhatsApp and social media statuses for ${country.name}, all translated into ${langName}.`,
    url: `${SITE_URL}/country/${country.slug}`,
    inLanguage: country.lang,
    about: {
      "@type": "Country",
      name: country.name,
    },
    numberOfItems: statuses.length,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: OG_IMAGE,
    },
  };

  return (
    <>
      <CountryBox country={country} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
