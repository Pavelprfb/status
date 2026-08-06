import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions of Social Status — free status collection website. Covers acceptable use, content rights and your responsibilities.",
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
    logo: { "@type": "ImageObject", url: OG_IMAGE },
  },
  isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body:
      "By accessing or using Social Status (the \u201CService\u201D), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use the Service. Continued use after changes are posted constitutes acceptance of the updated terms.",
  },
  {
    title: "2. Description of Service",
    body:
      "Social Status provides a free, searchable collection of original social media statuses across 17 categories, automatically translated into 72 languages for 195 countries. Statuses may be copied and shared on third-party platforms at your own discretion.",
  },
  {
    title: "3. User Responsibilities",
    body:
      "You are solely responsible for the content you copy, share or otherwise publish using the Service. You agree not to use the Service for illegal, harmful or misleading activity, and to comply with the terms of any third-party platform where you post statuses.",
  },
  {
    title: "4. Intellectual Property",
    body:
      "The statuses, translations, branding and interface of Social Status belong to their respective owners. You may use the Service for personal, non-commercial purposes. Redistribution or commercial republishing of the content is not permitted without prior written permission.",
  },
  {
    title: "5. Disclaimer of Warranties",
    body:
      "The Service is provided \u201Cas is\u201D and \u201Cas available\u201D without warranties of any kind, express or implied, including accuracy, completeness or availability. Auto-generated translations may contain errors; use them at your own discretion.",
  },
  {
    title: "6. Limitation of Liability",
    body:
      "In no event will the owner of Social Status be liable for any indirect, incidental, special or consequential damages arising from your use of, or inability to use, the Service.",
  },
  {
    title: "7. Changes to These Terms",
    body:
      "We may update these Terms & Conditions from time to time. The latest version will always be available on this page. Continued use of the Service after changes means you accept the revised terms.",
  },
  {
    title: "8. Contact",
    body: `If you have any questions about these terms, contact us at ${CONTACT_EMAIL}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Terms & Conditions
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <div className="mt-8 space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Owned and maintained by {FOUNDER_NAME}. Questions? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}