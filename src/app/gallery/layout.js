import { constructMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Photo Gallery",
  description: "Breathtaking photos of Sri Lanka captured during our tours. See the beauty of the pearl of the Indian Ocean.",
  canonicalUrl: "/gallery",
});

export default function GalleryLayout({ children }) {
  const jsonLd = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Gallery", url: "/gallery" },
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
