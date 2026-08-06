import CategoryPage from "@/components/CategoryPage";
import { categories } from "@/data/categories";
import { statuses } from "@/data/statuses";
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = categories[slug];
  if (!cat) return { title: "Category Not Found" };

  const count = statuses.filter((s) => s.category === slug).length;
  const title = `${cat.en} Statuses — English & Bangla`;
  const description = `${count} original ${cat.en.toLowerCase()} statuses in English and Bangla with emojis. Copy your favorite ${cat.en.toLowerCase()} status and share it on any platform.`;

  return {
    title,
    description,
    keywords: [
      `${cat.en.toLowerCase()} status`,
      `${cat.bn} স্ট্যাটাস`,
      "social status",
      "status bangla",
      "english status",
    ],
    alternates: {
      canonical: `${SITE_URL}/categories/${slug}`,
    },
    openGraph: {
      title: `${cat.en} Statuses — ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/categories/${slug}`,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.en} Statuses — ${SITE_NAME}`,
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
  const cat = categories[slug];
  const count = statuses.filter((s) => s.category === slug).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.en} Statuses`,
    description: `${count} original ${cat.en.toLowerCase()} statuses in English and Bangla with emojis.`,
    url: `${SITE_URL}/categories/${slug}`,
    inLanguage: ["en", "bn"].join(","),
    numberOfItems: count,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: OG_IMAGE,
    },
  };

  return (
    <>
      <CategoryPage slug={slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
