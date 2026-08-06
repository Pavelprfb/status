import { COUNTRIES } from "../data/countries.js";

export const translations = {
  en: {
    appName: "StatusBox",
    tagline: "Beautiful statuses for every platform — copy, share, express yourself",
    tabAll: "All Statuses",
    tabFavorites: "Favorites",
    searchPlaceholder: "Search status or category...",
    categoriesLabel: "Categories",
    all: "All",
    copy: "Copy",
    copied: "Copied!",
    copiedHint: "Status copied to clipboard",
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    noResults: "No statuses found",
    noResultsHint: "Try a different search term or category.",
    noFavorites: "No favorites yet",
    noFavoritesHint: "Tap the heart icon on any status to save it here.",
    statusCount: "{count} statuses",
    favoritesCount: "{count} favorites",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
    searchLanguage: "Search language...",
    loadMore: "Load More",
    backToAll: "All Statuses",
    navHome: "Home",
    navCategories: "Categories",
    navCountries: "Countries",
    navAbout: "About",
    navContact: "Contact",
    navTerms: "Terms & Conditions",
    navPrivacy: "Privacy Policy",
    searchCountry: "Search country...",
    countryStatusesTitle: "{country} Statuses",
    countryStatusesDesc:
      "Browse and copy the best {country} statuses — all translated into {language}.",
    footerTagline: "Beautiful statuses for every platform — copy, share, express yourself.",
    footerQuickLinks: "Quick Links",
    footerCategories: "Categories",
    footerDeveloper: "Developed by",
    footerRights: "All rights reserved.",
    aboutTitle: "About StatusBox",
    aboutLead: "Beautiful statuses for every platform.",
    aboutParagraph:
      "StatusBox is a free collection of original statuses in English and Bangla — for Facebook, WhatsApp, Instagram, Telegram, and anywhere else you love to express yourself. Browse by category, search in both languages, copy with one tap, and keep your favorites saved on your device.",
    aboutFeaturesTitle: "What makes StatusBox special",
    aboutFeatures: [
      "2550+ original statuses in English & Bangla, auto-translated into 70 more languages",
      "17 categories: Love, Friendship, Sad, Motivation, Islamic, Funny, Life, Attitude, Success, Breakup, Happy, Alone, Nature, Birthday, Political, Foodie and Travel",
      "Auto language detection — defaults to your country's language (72 languages)",
      "One-tap copy with Clipboard API and instant feedback",
      "Favorites saved locally — no account needed",
      "Light & dark themes with language switching",
      "Country pages in 195 languages — every country gets its own dedicated page",
      "Fully responsive — works beautifully on mobile, tablet and desktop",
    ],
    aboutDeveloperTitle: "Developer",
    aboutDeveloperRole: "Full-stack Web Developer & Founder of StatusBox",
    aboutCta: "Have feedback or a request?",
    aboutCtaLink: "Get in touch",
    contactTitle: "Contact Us",
    contactLead: "We'd love to hear from you!",
    contactParagraph:
      "Questions, feedback or status suggestions — send us a message and we will get back to you as soon as possible.",
    contactEmailLabel: "Email us directly",
    contactFormTitle: "Send a message",
    contactName: "Your name",
    contactMessage: "Your message",
    contactSend: "Open Email App",
    contactNote: "This opens your email app with the message pre-filled.",
    contactResponseTitle: "Response time",
    contactResponseText: "We usually reply within 24–48 hours.",
    developerName: "Pabel Islam",
    catBrowse: "Browse and copy the best {category} statuses in your language.",
    cat_love: "Love",
    cat_friendship: "Friendship",
    cat_sad: "Sad",
    cat_motivation: "Motivation",
    cat_islamic: "Islamic",
    cat_funny: "Funny",
    cat_life: "Life",
    cat_attitude: "Attitude",
    cat_success: "Success & Hustle",
    cat_breakup: "Breakup",
    cat_happy: "Happy & Positive",
    cat_alone: "Alone & Lonely",
    cat_nature: "Nature & Aesthetic",
    cat_birthday: "Birthday & Special Day",
    cat_political: "Political & Social",
    cat_foodie: "Foodie",
    cat_travel: "Travel",
    termsTitle: "Terms & Conditions",
    termsUpdated: "Last updated: {date}",
    termsSections: [
      {
        title: "1. Acceptance of Terms",
        body: "By accessing Social Status, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use the Service. Continued use of the Service after a change is posted constitutes acceptance of the updated terms.",
      },
      {
        title: "2. Description of Service",
        body: "Social Status is a free, curated collection of original statuses across 17 categories, auto-translated into 72 languages for 195 countries. Statuses may be copied and shared on social platforms at your own discretion.",
      },
      {
        title: "3. User Responsibilities",
        body: "You are responsible for the content you obtain and republish from this Service. You agree not to use the Service for unlawful, harmful or abusive purposes, and to respect the policies of any third-party platform where you post.",
      },
      {
        title: "4. Intellectual Property",
        body: "The statuses, translations and branding presented by this Service are provided for personal, non-commercial use. Large-scale republishing or redistribution of the content is not permitted without prior written permission.",
      },
      {
        title: "5. Disclaimer of Warranties",
        body: "The Service is provided \u201Cas is\u201D without warranties of any kind. Auto-generated translations may not always be accurate, so use the content at your own discretion.",
      },
      {
        title: "6. Limitation of Liability",
        body: "To the fullest extent permitted by law, Social Status shall not be liable for any indirect, incidental or consequential damages arising from your use of, or inability to use, the Service.",
      },
      {
        title: "7. Changes to These Terms",
        body: "We may update these Terms & Conditions from time to time. The latest version will always be available on this page.",
      },
      {
        title: "8. Contact",
        body: "If you have any questions about these Terms, please contact us at {email}.",
      },
    ],
    privacyTitle: "Privacy Policy",
    privacyUpdated: "Last updated: {date}",
    privacySections: [
      {
        title: "1. Overview",
        body: "Social Status (https://status.p9x9.online) is a free, browser-based status collection tool. You can browse, search, copy and favorite statuses without creating an account, signing in or providing any personal information.",
      },
      {
        title: "2. Information We Do Not Collect",
        body: "We do not collect your name, email address, phone number or IP address. There is no user account and no server-side tracking of the pages you view.",
      },
      {
        title: "3. Information Stored on Your Device",
        body: "To personalise your experience, we store the smallest amount of data in your browser: your theme, your selected language and your favorite statuses. This data never leaves your device and can be cleared by clearing your browser data.",
      },
      {
        title: "4. Automatic Language & Country Detection",
        body: "On each visit we choose a language from your browser settings and, when needed, a one-time IP geolocation lookup via ipwho.is is used to set a default country/language. The IP address is used only for that single request and is never stored by us.",
      },
      {
        title: "5. Third-Party Services",
        body: "The site loads country flag images from a third-party CDN, and the share link returned by the copy button may open an external service. These external services have their own policies, which we do not control.",
      },
      {
        title: "6. Cookies",
        body: "We do not use advertising or analytics cookies. The only browser storage used is the localStorage described in section 3.",
      },
      {
        title: "7. Data Security",
        body: "Because this Service stores no personal data on our servers, the risk to you is minimal. Please also keep your own device safe and secure.",
      },
      {
        title: "8. Children's Privacy",
        body: "This Service does not require account sign-in or collect personal data from any user, including children under the age of 13.",
      },
      {
        title: "9. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. The latest version will always be published on this page.",
      },
      {
        title: "10. Contact",
        body: "If you have any questions about this Privacy Policy, please contact us at {email}.",
      },
    ],
    legalOwnerNote: "Owned and maintained by {owner}. Questions? Email {email}.",
  },
  bn: {
    appName: "StatusBox",
    tagline: "সকল প্ল্যাটফর্মের জন্য সুন্দর স্ট্যাটাস — কপি করুন, শেয়ার করুন, নিজেকে প্রকাশ করুন",
    tabAll: "সকল স্ট্যাটাস",
    tabFavorites: "পছন্দের",
    searchPlaceholder: "স্ট্যাটাস বা বিভাগ খুঁজুন...",
    categoriesLabel: "বিভাগ",
    all: "সব",
    copy: "কপি",
    copied: "কপি হয়েছে!",
    copiedHint: "স্ট্যাটাস ক্লিপবোর্ডে কপি হয়েছে",
    addFavorite: "পছন্দে যোগ করুন",
    removeFavorite: "পছন্দ থেকে মুছুন",
    noResults: "কোনো স্ট্যাটাস পাওয়া যায়নি",
    noResultsHint: "অন্য কোনো শব্দ বা বিভাগ দিয়ে খোঁজার চেষ্টা করুন।",
    noFavorites: "এখনো কোনো পছন্দ নেই",
    noFavoritesHint: "যেকোনো স্ট্যাটাসে হার্ট আইকনে চাপ দিয়ে এখানে সংরক্ষণ করুন।",
    statusCount: "{count}টি স্ট্যাটাস",
    favoritesCount: "{count}টি পছন্দ",
    switchToLight: "লাইট মোডে যান",
    switchToDark: "ডার্ক মোডে যান",
    searchLanguage: "ভাষা খুঁজুন...",
    loadMore: "আরও দেখুন",
    backToAll: "সকল স্ট্যাটাস",
    navHome: "হোম",
    navCategories: "বিভাগসমূহ",
    navCountries: "দেশসমূহ",
    navAbout: "আমাদের সম্পর্কে",
    navContact: "যোগাযোগ",
    navTerms: "শর্তাবলী ও নিয়মাবলী",
    navPrivacy: "গোপনীয়তা নীতি",
    searchCountry: "দেশ খুঁজুন...",
    countryStatusesTitle: "{country} স্ট্যাটাস",
    countryStatusesDesc:
      "{country} এর জন্য সেরা স্ট্যাটাসগুলো ব্রাউজ করুন ও কপি করুন — সব {language} ভাষায়।",
    footerTagline: "সকল প্ল্যাটফর্মের জন্য সুন্দর স্ট্যাটাস — কপি করুন, শেয়ার করুন, নিজেকে প্রকাশ করুন।",
    footerQuickLinks: "দ্রুত লিংক",
    footerCategories: "বিভাগ",
    footerDeveloper: "নির্মাণ করেছেন",
    footerRights: "সর্বস্বত্ব সংরক্ষিত।",
    aboutTitle: "StatusBox সম্পর্কে",
    aboutLead: "সকল প্ল্যাটফর্মের জন্য সুন্দর স্ট্যাটাস।",
    aboutParagraph:
      "StatusBox হলো ইংরেজি ও বাংলা ভাষায় মৌলিক স্ট্যাটাসের একটি ফ্রি সংগ্রহ — ফেসবুক, হোয়াটসঅ্যাপ, ইনস্টাগ্রাম, টেলিগ্রাম বা নিজেকে প্রকাশ করার মতো যেকোনো জায়গার জন্য। বিভাগ অনুযায়ী ব্রাউজ করুন, দুই ভাষায় খুঁজুন, এক ট্যাপে কপি করুন এবং পছন্দের স্ট্যাটাসগুলো আপনার ডিভাইসে সেভ করে রাখুন।",
    aboutFeaturesTitle: "StatusBox-কে বিশেষ করে তোলে যা",
    aboutFeatures: [
      "২৫৫০+ মৌলিক স্ট্যাটাস ইংরেজি ও বাংলায় — স্বয়ংক্রিয়ভাবে আরও ৭০টি ভাষায় অনূদিত",
      "১৭টি বিভাগ: ভালোবাসা, বন্ধুত্ব, কষ্ট, অনুপ্রেরণা, ইসলামিক, মজার, জীবন, অ্যাটিটিউড, সফলতা, ব্রেকআপ, আনন্দ, একাকীত্ব, প্রকৃতি, জন্মদিন, রাজনীতি, খাবার ও ভ্রমণ",
      "স্বয়ংক্রিয় ভাষা সনাক্তকরণ — আপনার দেশের ভাষা ডিফল্ট হিসেবে সেট হয় (৭২টি ভাষা)",
      "ক্লিপবোর্ড API দিয়ে এক ট্যাপে কপি এবং তাৎক্ষণিক ফলাফল",
      "পছন্দের তালিকা লোকালি সেভ হয় — কোনো অ্যাকাউন্ট লাগে না",
      "লাইট ও ডার্ক থিম এবং ভাষা পরিবর্তনের সুবিধা",
      "১৯৫টি দেশের জন্য আলাদা পেজ — প্রতিটি দেশের নিজস্ব ভাষায় ডেডিকেটেড পেজ",
      "সম্পূর্ণ responsive — মোবাইল, ট্যাবলেট ও ডেস্কটপে চমৎকার কাজ করে",
    ],
    aboutDeveloperTitle: "ডেভেলপার",
    aboutDeveloperRole: "ফুল-স্ট্যাক ওয়েব ডেভেলপার ও StatusBox-এর প্রতিষ্ঠাতা",
    aboutCta: "মতামত বা অনুরোধ আছে?",
    aboutCtaLink: "যোগাযোগ করুন",
    contactTitle: "যোগাযোগ করুন",
    contactLead: "আপনার কথা শুনতে আমরা চাই!",
    contactParagraph:
      "প্রশ্ন, মতামত বা স্ট্যাটাস সাজেশন — মেসেজ পাঠান, আমরা যত দ্রুত সম্ভব উত্তর দেব।",
    contactEmailLabel: "সরাসরি ইমেইল করুন",
    contactFormTitle: "মেসেজ পাঠান",
    contactName: "আপনার নাম",
    contactMessage: "আপনার মেসেজ",
    contactSend: "ইমেইল অ্যাপ খুলুন",
    contactNote: "আপনার মেসেজ সহ আপনার ইমেইল অ্যাপ খুলবে।",
    contactResponseTitle: "উত্তরের সময়",
    contactResponseText: "আমরা সাধারণত ২৪–৪৮ ঘণ্টার মধ্যে উত্তর দিই।",
    developerName: "পাবেল ইসলাম",
    catBrowse: "আপনার ভাষায় সেরা {category} স্ট্যাটাসগুলো ব্রাউজ করুন ও কপি করুন।",
    cat_love: "ভালোবাসা",
    cat_friendship: "বন্ধুত্ব",
    cat_sad: "কষ্ট",
    cat_motivation: "অনুপ্রেরণা",
    cat_islamic: "ইসলামিক",
    cat_funny: "মজার",
    cat_life: "জীবন",
    cat_attitude: "অ্যাটিটিউড",
    cat_success: "সফলতা ও পরিশ্রম",
    cat_breakup: "ব্রেকআপ",
    cat_happy: "আনন্দ ও ইতিবাচকতা",
    cat_alone: "একাকীত্ব",
    cat_nature: "প্রকৃতি ও নান্দনিকতা",
    cat_birthday: "জন্মদিন ও বিশেষ দিন",
    cat_political: "রাজনীতি ও সামাজিক",
    cat_foodie: "খাবারপ্রেমী",
    cat_travel: "ভ্রমণ",
    termsTitle: "শর্তাবলী ও নিয়মাবলী",
    termsUpdated: "সর্বশেষ আপডেট: {date}",
    termsSections: [
      {
        title: "১. শর্তাবলীর স্বীকৃতি",
        body: "Social Status-এ প্রবেশ করলে আপনি এই শর্তাবলী ও নিয়মাবলী মেনে নিতে রাজি হচ্ছেন। এই শর্তাবলীর কোনো অংশে আপত্তি থাকলে অনুগ্রহ করে পরিষেবাটি ব্যবহার করবেন না। পরিবর্তন প্রকাশের পর পরিষেবা ব্যবহার চালিয়ে গেলে তা আপডেট করা শর্তাবলী গ্রহণের সম্মতি হিসেবে গণ্য হবে।",
      },
      {
        title: "২. পরিষেবার বর্ণনা",
        body: "Social Status হলো ১৭টি বিভাগে মৌলিক স্ট্যাটাসের একটি ফ্রি ও সাজানো সংগ্রহ, যা ১৯৫টি দেশের জন্য ৭২টি ভাষায় স্বয়ংক্রিয়ভাবে অনূদিত। স্ট্যাটাসগুলো নিজ দায়িত্বে কপি করে সোশ্যাল প্ল্যাটফর্মে শেয়ার করা যাবে।",
      },
      {
        title: "৩. ব্যবহারকারীর দায়িত্ব",
        body: "এই পরিষেবা থেকে নেওয়া কন্টেন্ট ব্যবহারের জন্য আপনি নিজে দায়ী। আপনি সম্মত হচ্ছেন যে পরিষেবাটি অবৈধ, ক্ষতিকর বা আপত্তিকর উদ্দেশ্যে ব্যবহার করবেন না এবং যেকোনো তৃতীয়-পক্ষের প্ল্যাটফর্মের নিয়ম মেনে চলবেন।",
      },
      {
        title: "৪. বৌদ্ধিক সম্পত্তি",
        body: "এই পরিষেবায় প্রদর্শিত স্ট্যাটাস, অনুবাদ ও ব্র্যান্ড ব্যক্তিগত, অ-বাণিজ্যিক ব্যবহারের জন্য। আগে থেকে লিখিত অনুমতি ব্যতীত কন্টেন্ট বড় পরিমাণে পুনঃপ্রকাশ বা পুনরায় বিতরণের অনুমতি নেই।",
      },
      {
        title: "৫. ওয়ারেন্টি অস্বীকৃতি",
        body: "পরিষেবাটি কোনো ধরনের ওয়ারেন্টি ছাড়া “যেমন আছে” তেমনভাবে প্রদান করা হয়। স্বয়ংক্রিয়ভাবে তৈরি অনুবাদ সবসময় নির্ভুল নাও হতে পারে, তাই কন্টেন্ট নিজ দায়িত্বে ব্যবহার করুন।",
      },
      {
        title: "৬. দায়বদ্ধতার সীমাবদ্ধতা",
        body: "আইন যতটা অনুমোদন দেয়, Social Status-এর পক্ষ থেকে আপনার পরিষেবা ব্যবহার বা ব্যবহারে ব্যর্থতার ফলে সৃষ্ট কোনো পরোক্ষা, আনুষঙ্গিক বা ফলস্বরূপ ক্ষতির দায় থাকবে না।",
      },
      {
        title: "৭. শর্তাবলীর পরিবর্তন",
        body: "আমরা যেকোনো সময় এই শর্তাবলী ও নিয়মাবলী আপডেট করতে পারি। সর্বশেষ সংস্করণটি সবসময় এই পেজেই পাওয়া যাবে।",
      },
      {
        title: "৮. যোগাযোগ",
        body: "এই শর্তাবলী সম্পর্কে কোনো প্রশ্ন থাকলে {email}-এ আমাদের সাথে যোগাযোগ করুন।",
      },
    ],
    privacyTitle: "গোপনীয়তা নীতি",
    privacyUpdated: "সর্বশেষ আপডেট: {date}",
    privacySections: [
      {
        title: "১. সাধারণ পরিচিতি",
        body: "Social Status (https://status.p9x9.online) একটি ফ্রি, ব্রাউজারভিত্তিক স্ট্যাটাস সংগ্রহ টুল। অ্যাকাউন্ট খোলা, সাইন-ইন বা কোনো ব্যক্তিগত তথ্য দেওয়া ছাড়াই আপনি স্ট্যাটাস ব্রাউজ, খুঁজে, কপি ও পছন্দ করতে পারবেন।",
      },
      {
        title: "২. আমরা যে তথ্য সংগ্রহ করি না",
        body: "আমরা আপনার নাম, ইমেইল ঠিকানা, ফোন নম্বর বা আইপি ঠিকানা সংগ্রহ করি না। কোনো ব্যবহারকারী অ্যাকাউন্ট নেই এবং আপনি কোন পেজ দেখছেন তা আমরা সার্ভারে ট্র্যাক করি না।",
      },
      {
        title: "৩. আপনার ডিভাইসে সংরক্ষিত তথ্য",
        body: "আপনার অভিজ্ঞতা ব্যক্তিগত করতে আমরা আপনার ব্রাউজারে অল্প ডেটা সংরক্ষণ করি: আপনার থিম, ভাষা ও পছন্দের স্ট্যাটাস। এই ডেটা কখনো আপনার ডিভাইস ছাড়ে না এবং ব্রাউজার ডেটা মুছে দিলেই সাফ হয়ে যায়।",
      },
      {
        title: "৪. স্বয়ংক্রিয় ভাষা ও দেশ সনাক্তকরণ",
        body: "প্রতিটি ভিজিটে আমরা আপনার ব্রাউজার সেটিংস থেকে একটি ভাষা বেছে নেই এবং প্রয়োজনে ipwho.is দিয়ে এককালীন আইপি জিওলোকেশন ব্যবহার করে ডিফল্ট দেশ/ভাষা ঠিক করি। আইপি ঠিকানা শুধু সেই একক অনুরোধের জন্য ব্যবহৃত হয় এবং আমাদের কাছে কখনো সংরক্ষিত হয় না।",
      },
      {
        title: "৫. তৃতীয়-পক্ষের পরিষেবা",
        body: "সাইটটি দেশের পতাকার ছবি একটি তৃতীয়-পক্ষের CDN থেকে লোড করে এবং কপি বাটনের শেয়ার লিংক একটি বাইরের পরিষেবা খুলতে পারে। এই বাইরের পরিষেবাগুলোর নিজস্ব নিয়ম রয়েছে, যা আমাদের নিয়ন্ত্রণে নয়।",
      },
      {
        title: "৬. কুকি",
        body: "আমরা কোনো বিজ্ঞাপন বা বিশ্লেষণ কুকি ব্যবহার করি না। একমাত্র ব্যবহৃত ব্রাউজার স্টোরেজ হলো ধারা ৩-এ বর্ণিত localStorage।",
      },
      {
        title: "৭. ডেটা সুরক্ষা",
        body: "যেহেতু এই পরিষেবা আমাদের সার্ভারে কোনো ব্যক্তিগত ডেটা সংরক্ষণ করে না, তাই আপনার জন্য ঝুঁকি ন্যূনতম। দয়া করে আপনার নিজের ডিভাইসটিও নিরাপদ রাখুন।",
      },
      {
        title: "৮. শিশুদের গোপনীয়তা",
        body: "এই পরিষেবা অ্যাকাউন্ট সাইন-ইন চায় না এবং ১৩ বছরের কম বয়সী শিশুসহ কোনো ব্যবহারকারীর কাছ থেকে ব্যক্তিগত ডেটা সংগ্রহ করে না।",
      },
      {
        title: "৯. নীতিমালার পরিবর্তন",
        body: "আমরা যেকোনো সময় এই গোপনীয়তা নীতিটি আপডেট করতে পারি। সর্বশেষ সংস্করণটি সর্বদা এই পেজেই প্রকাশিত হবে।",
      },
      {
        title: "১০. যোগাযোগ",
        body: "এই গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন থাকলে {email}-এ আমাদের সাথে যোগাযোগ করুন।",
      },
    ],
    legalOwnerNote: "{owner} এর মালিকানায় পরিচালিত ও রক্ষণাবেক্ষিত। যেকোনো প্রশ্নের জন্য {email}-এ ইমেইল করুন।",
  },
};

// Country names as UI strings (country_XX keys). Bangla deliberately keeps
// the English names, so callers should fall back to COUNTRIES name when the
// current translation does not define a key.
for (const c of COUNTRIES) {
  translations.en[`country_${c.code}`] = c.name;
}

export function countryName(t, code, fallback) {
  return t[`country_${code}`] || fallback;
}

// getTranslation returns the EN/Bn base dictionary merged with the lazily
// loaded per-language extras (see data/i18n/). Callers that run on the
// client should pass the loaded extras; server-side callers get the base.
export function getTranslation(lang, extras = null) {
  const base = translations[lang] || translations.en;
  return { ...base, ...(extras || {}), appName: "Social Status" };
}

// Placeholders like {count} are machine-translated too ({count} -> {गिनती}),
// so interpolate any single {..} token with the given value.
export function interpolate(template, value) {
  return String(template).replace(/\{[^}]+\}/, String(value));
}
