import AboutPage from "@/components/AboutPage";

export const metadata = {
  title: "About — StatusBox",
  description:
    "Learn about StatusBox — a free collection of 1050+ original statuses auto-translated into 72 languages, built by developer Pabel Islam.",
  openGraph: {
    title: "About StatusBox",
    description: "1050+ original statuses auto-translated into 72 languages for every platform.",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
