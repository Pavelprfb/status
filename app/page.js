import StatusBox from "@/components/StatusBox";
import { statuses } from "@/data/statuses";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

export const metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "social status",
    "facebook status",
    "status bangla",
    "english status",
    "love status",
    "sad status",
    "motivation status",
    "islamic status",
    "funny status",
    "life status",
    "attitude status",
    "breakup status",
    "birthday status",
    "status in hindi",
    "status in urdu",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
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
  sameAs: ["https://github.com/Pavelprfb"],
};

export default function Home() {
  return (
    <>
      <StatusBox initialStatuses={statuses.slice(0, 24)} totalCount={statuses.length} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
