import StatusBox from "@/components/StatusBox";

export const metadata = {
  title: "Social Status",
  description:
    "2550+ original Facebook, WhatsApp and social media statuses auto-translated into 72 languages. Browse 17 categories, search, copy with one tap and save your favorites.",
  keywords: [
    "statusbox",
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
  openGraph: {
    title: "Social Status",
    description:
      "2550+ original statuses for every platform, auto-translated into 72 languages. Copy and share with one tap.",
    type: "website",
  },
};

export default function Home() {
  return <StatusBox />;
}
