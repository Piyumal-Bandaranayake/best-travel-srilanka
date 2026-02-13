import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Tour Packages",
  description: "Browse our curated travel packages including safari tours, beach activities, and all-island trips.",
  canonicalUrl: "/packages",
});

export default function PackagesLayout({ children }) {
  const jsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tour Packages", url: "/packages" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
