import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn more about Best Travel Sri Lanka, our history, and our dedicated team.",
  canonicalUrl: "/about",
});

export default function AboutLayout({ children }) {
  const jsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" },
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
