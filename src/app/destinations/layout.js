import { constructMetadata, getBreadcrumbSchema, getTouristDestinationSchema } from "@/lib/seo";
import { destinations } from "@/data/destinations";

export const metadata = constructMetadata({
  title: "Destinations",
  description: "Explore the most beautiful destinations in Sri Lanka, from Sigiriya to Mirissa.",
  canonicalUrl: "/destinations",
});

export default function DestinationsLayout({ children }) {
  const jsonLd = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Destinations", url: "/destinations" },
    ]),
    ...destinations.map(dest => getTouristDestinationSchema(dest))
  ];

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
