import PrivacyPage from "@/components/PrivacyPage";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
  CONTACT_EMAIL,
} from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Social Status privacy policy — no account data, minimal browser storage, automatic language detection and third-party services explained.",
  keywords: ["privacy policy", "status app privacy", "social status privacy"],
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Social Status",
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Social Status",
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
  name: "Privacy Policy",
  description: SITE_DESCRIPTION,
  url: `${SITE_URL}/privacy`,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    email: `mailto:${CONTACT_EMAIL}`,
  },
};

export default function Page() {
  return (
    <>
      <PrivacyPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}