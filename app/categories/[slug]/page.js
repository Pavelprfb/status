import CategoryPage from "@/components/CategoryPage";
import { categories } from "@/data/categories";
import { statuses } from "@/data/statuses";

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cat = categories[slug];
  if (!cat) return { title: "Category Not Found" };

  const count = statuses.filter((s) => s.category === slug).length;

  return {
    title: `${cat.en} Statuses — English & Bangla`,
    description: `${count} original ${cat.en.toLowerCase()} statuses in English and Bangla with emojis. Copy your favorite ${cat.en.toLowerCase()} status and share it on any platform.`,
    keywords: [
      `${cat.en.toLowerCase()} status`,
      `${cat.bn} স্ট্যাটাস`,
      "statusbox",
      "status bangla",
      "english status",
    ],
    openGraph: {
      title: `${cat.en} Statuses — StatusBox`,
      description: `${count} original ${cat.en.toLowerCase()} statuses in English and Bangla. Copy and share with one tap.`,
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <CategoryPage slug={slug} />;
}
