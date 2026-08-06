import { SITE_URL } from "@/lib/site";
import { COUNTRIES } from "@/data/countries";
import { categories } from "@/data/categories";

export default function sitemap() {
  const now = new Date();

  const staticPages = ["", "/about", "/contact", "/terms", "/privacy"].map(
    (path, i) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: i === 0 ? 1 : i <= 2 ? 0.8 : 0.4,
    })
  );

  const categoryPages = Object.keys(categories).map((slug) => ({
    url: `${SITE_URL}/categories/${slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.9,
  }));

  const countryPages = COUNTRIES.map((c) => ({
    url: `${SITE_URL}/country/${c.slug}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...countryPages];
}