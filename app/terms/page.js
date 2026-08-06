import TermsPage from "@/components/TermsPage";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
  CONTACT_EMAIL,
} from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions of Social Status — a free status collection for 17 categories translated into 72 languages.",
  keywords: ["terms of service", "status app terms", "social status terms"],
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | Social Status",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | Social Status",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms & Conditions",
  description: "Legal terms governing the use of Social Status.",
  url: `${SITE_URL}/terms`,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: OG_IMAGE },
    email: `mailto:${CONTACT_EMAIL}`,
  },
};

export default function Page() {
  return (
    <>
      <TermsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}