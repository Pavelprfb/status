import ContactPage from "@/components/ContactPage";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} developer ${FOUNDER_NAME} at ${CONTACT_EMAIL}. Send feedback, questions or status suggestions.`,
  keywords: [
    "contact status app",
    "status feedback",
    "status suggestion",
    "status support",
    "status developer contact",
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description: "Send us a message — feedback, questions and status suggestions are welcome.",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary",
    title: `Contact ${SITE_NAME}`,
    description: "Send us a message — feedback, questions and status suggestions are welcome.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  inLanguage: "en",
  about: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: `mailto:${CONTACT_EMAIL}`,
      availableLanguage: ["English", "Bengali"],
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
      <ContactPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
