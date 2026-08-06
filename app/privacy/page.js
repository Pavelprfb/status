import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  OG_IMAGE,
  CONTACT_EMAIL,
  FOUNDER_NAME,
} from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Social Status privacy policy — how we handle no account data, browser storage, automatic language detection and third-party services on this site.",
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

const sections = [
  {
    title: "1. Overview",
    body: `Social Status operates at ${SITE_URL} and provides a free, browser-based status collection tool. This policy explains what data is processed when you use the site. The site does not require you to create an account, sign in or provide any personal information to browse, search, copy or favorite statuses.`,
  },
  {
    title: "2. Information We Do Not Collect",
    body: "We do not collect or store your name, email address, phone number, IP address or any other personally identifiable information. There is no user account and no tracking of your browsing history on our servers.",
  },
  {
    title: "3. Information Stored on Your Device",
    body: "To personalise your experience, we store small pieces of data in your browser's localStorage: your theme preference (light or dark), your selected language, and your list of favorite statuses. This data never leaves your device and can be cleared by clearing your browser data.",
  },
  {
    title: "4. Automatic Language & Country Detection",
    body: "When you visit the site, we attempt to detect the language of the statuses shown to you based on your browser's language setting (Accept-Language header) and, fallback, a one-time IP geolocation lookup via a third-party service (ipwho.is). IP geolocation is performed for the single request, is used only to pick a default language/country to cover and is not stored by us or your IP address.",
  },
  {
    title: "5. Third-Party Services",
    body: "The site loads country flag images from a third-party CDN (flagcdn.com) and uses standard browser features. The copy link returned by the copy button for certain statuses may point to an external sponsor link. Some external platforms you share statuses to may have their own privacy policies, which we do not control. We do not sell or rent any data.",
  },
  {
    title: "6. Cookies",
    body: "We do not use advertising or analytics cookies. The only browser storage used is the localStorage client described in section 3, which is used purely for your preferences.",
  },
  {
    title: "7. Data Security",
    body: "Because this service is a static-file platform that stores no personal data on our servers, the risk profile is minimal. Security measures are still maintained for the origin. Any data you create locally on your device is your responsibility to keep safe.",
  },
  {
    title: "8. Children's Privacy",
    body: "The Service is a general-purpose content site and does not collect personal data from any user, including children under the age of 13.",
  },
  {
    title: "9. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. The latest version will always be published on this page with an updated date. Material changes will be highlighted.",
  },
  {
    title: "10. Contact",
    body: `If you have any questions about this Privacy Policy, contact us at ${CONTACT_EMAIL}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Privacy Policy
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