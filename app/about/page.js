import AboutPage from "@/components/AboutPage";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

export const metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — a free collection of 2550+ original statuses auto-translated into 72 languages, built by developer ${FOUNDER_NAME}.`,
  keywords: [
    "about social status",
    "status app",
    "status developer",
    "status collection",
    "pabel islam developer",
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: `2550+ original statuses auto-translated into 72 languages for every platform. Built by ${FOUNDER_NAME}.`,
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary",
    title: `About ${SITE_NAME}`,
    description: `2550+ original statuses auto-translated into 72 languages for every platform.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${SITE_NAME}`,
  url: `${SITE_URL}/about`,
  inLanguage: "en",
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE,
    email: `mailto:${CONTACT_EMAIL}`,
    founder: {
      "@type": "Person",
      name: FOUNDER_NAME,
      email: `mailto:${CONTACT_EMAIL}`,
    },
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

export default function Page() {
  return (
    <>
      <AboutPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
