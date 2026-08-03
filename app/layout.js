import "./globals.css";
import { PreferencesProvider } from "@/hooks/usePreferences";

export const metadata = {
  title: {
    default: "StatusBox — Beautiful Statuses in 72 Languages",
    template: "%s | StatusBox",
  },
  description:
    "2550+ original Facebook, WhatsApp and social media statuses auto-translated into 72 languages. Browse 17 categories, search, copy with one tap and save your favorites.",
  keywords: [
    "statusbox",
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
  openGraph: {
    title: "StatusBox — Beautiful Statuses in 72 Languages",
    description:
      "2550+ original statuses for every platform, auto-translated into 72 languages. Copy and share with one tap.",
    type: "website",
    locale: "en_US",
    alternateLocale: "bn_BD",
  },
  robots: {
    index: true,
    follow: true,
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
    var theme = localStorage.getItem("sb-theme") || "light";
    if (theme === "dark") document.documentElement.classList.add("dark");
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "StatusBox",
  description:
    "2550+ original statuses auto-translated into 72 languages for every social media platform.",
  inLanguage: ["en", "bn", "hi", "ur", "ar", "es", "fr", "pt", "de", "ru", "zh", "ja"],
  author: {
    "@type": "Person",
    name: "Pabel Islam",
    email: "mailto:pabelprfb@gmail.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}