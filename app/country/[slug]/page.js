import CountryBox from "@/components/CountryBox";
import { COUNTRIES } from "@/data/countries";
import { statuses } from "@/data/statuses";
import { LANGUAGES } from "@/lib/languages";
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

  return {
    title: `${name} Statuses`,
    description: `${statuses.length}+ original Facebook, WhatsApp and social media statuses for ${name}, all translated into ${langName}. Browse, copy and share with one tap.`,
    keywords: [
      `${name} status`,
      `${name} status bangla`,
      `status in ${langName.toLowerCase()}`,
      "statusbox",
      "facebook status",
      "whatsapp status",
    ],
    openGraph: {
      title: `${name} Statuses — StatusBox`,
      description: `${statuses.length}+ original statuses in ${langName} for ${name}. Copy and share with one tap.`,
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const country = COUNTRIES.find((c) => c.slug === slug);
  if (!country) notFound();
  return <CountryBox country={country} />;
}
