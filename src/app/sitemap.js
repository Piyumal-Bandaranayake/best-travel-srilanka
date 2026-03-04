import { siteConfig } from "@/lib/seo";
import { packages } from "@/data/packages";
import { destinations } from "@/data/destinations";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  // Static routes with fine-tuned priorities and change frequencies
  const staticRoutes = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/packages", changeFrequency: "weekly", priority: 0.9 },
    { path: "/destinations", changeFrequency: "monthly", priority: 0.8 },
    { path: "/gallery", changeFrequency: "monthly", priority: 0.7 },
    { path: "/reviews", changeFrequency: "monthly", priority: 0.7 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Dynamic package routes
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Dynamic destination routes (if individual destination pages exist)
  const destinationRoutes = destinations.map((dest) => ({
    url: `${baseUrl}/destinations/${dest.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...packageRoutes, ...destinationRoutes];
}
