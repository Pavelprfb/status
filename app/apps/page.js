import MoreApps from "@/components/MoreApps";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
} from "@/lib/site";

export const metadata = {
  title: `More Apps — ${SITE_NAME}`,
  description: `Explore more useful apps and tools from the ${SITE_NAME} family — QR code scanner, image compressor and more.`,
  keywords: [
    "more apps",
    "qr code scanner",
    "image compressor",
    `${SITE_NAME} apps`,
    "free online tools",
  ],
  alternates: {
    canonical: `${SITE_URL}/apps`,
  },
  openGraph: {
    title: `More Apps — ${SITE_NAME}`,
    description: `Explore more useful apps and tools from the ${SITE_NAME} family.`,
    url: `${SITE_URL}/apps`,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: `${SITE_NAME} logo` }],
  },
  twitter: {
    card: "summary",
    title: `More Apps — ${SITE_NAME}`,
    description: `Explore more useful apps and tools from the ${SITE_NAME} family.`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <MoreApps />;
}