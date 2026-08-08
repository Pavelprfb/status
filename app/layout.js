import "./globals.css";
import { headers } from "next/headers";
import Script from "next/script";
import { PreferencesProvider } from "@/hooks/usePreferences";
import { languageFromAcceptLanguage } from "@/lib/locale";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Social Status",
    template: "%s | Social Status",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "social status",
    "facebook status",
    "whatsapp status",
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
  authors: [{ name: "Pabel Islam" }],
  creator: "Pabel Islam",
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
  verification: {
    yandex: "2a319fe27e925876",
  },
  icons: {
    icon: [
      { url: "/icon/android/mipmap-mdpi/ic_launcher.png", sizes: "48x48", type: "image/png" },
      { url: "/icon/android/mipmap-hdpi/ic_launcher.png", sizes: "72x72", type: "image/png" },
      { url: "/icon/android/mipmap-xhdpi/ic_launcher.png", sizes: "96x96", type: "image/png" },
      { url: "/icon/android/mipmap-xxhdpi/ic_launcher.png", sizes: "144x144", type: "image/png" },
      { url: "/icon/android/mipmap-xxxhdpi/ic_launcher.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/icon/android/mipmap-xxxhdpi/ic_launcher.png", sizes: "192x192", type: "image/png" },
    shortcut: "/icon/android/mipmap-mdpi/ic_launcher.png",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const preloadScript = `(function () {
  try {
    var saved = localStorage.getItem("sb-theme");
    var dark = saved === "dark" || (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
  try {
    var loc = (navigator.language || "en").toLowerCase();
    var special = { fil: "tl", nb: "no", nn: "no", cnr: "sr" };
    var two = special[loc] || loc.slice(0, 2);
    var codes = { bn:1,hi:1,ur:1,fa:1,ar:1,he:1,tr:1,az:1,ka:1,hy:1,ru:1,be:1,uk:1,ro:1,bg:1,sr:1,bs:1,hr:1,sl:1,mk:1,sq:1,el:1,it:1,fr:1,es:1,pt:1,de:1,nl:1,da:1,no:1,sv:1,fi:1,is:1,et:1,lv:1,lt:1,pl:1,cs:1,sk:1,hu:1,ca:1,mt:1,ga:1,la:1,sw:1,ha:1,am:1,so:1,rw:1,st:1,ht:1,si:1,ne:1,km:1,lo:1,my:1,th:1,vi:1,id:1,ms:1,tl:1,zh:1,ja:1,ko:1,mn:1,kk:1,ky:1,tg:1,tk:1,uz:1,sm:1,en:1 };
    var lang = codes[two] ? two : "en";
    document.documentElement.lang = lang;
  } catch (e) {}
})();`;

const yandexMetrikaScript = `(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=111421060', 'ym');

ym(111421060, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: ["en", "bn", "hi", "ur", "ar", "es", "fr", "pt", "de", "ru", "zh", "ja"],
  author: {
    "@type": "Person",
    name: "Pabel Islam",
    email: "mailto:pabelprfb@gmail.com",
  },
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const initialLang = languageFromAcceptLanguage(
    headerList.get("accept-language") || ""
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
                <Script
          id="yandex-metrika"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: yandexMetrikaScript }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/111421060"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <PreferencesProvider initialLang={initialLang}>{children}</PreferencesProvider>
      </body>
    </html>
  );
}