import { siteConfig } from "@/lib/seo";
import { packages } from "@/data/packages";

export default function sitemap() {
  const baseUrl = siteConfig.url;

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/destinations",
    "/gallery",
    "/packages",
    "/reviews",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Package dynamic routes
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...packageRoutes];
}
