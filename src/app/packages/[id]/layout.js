import { packages } from "@/data/packages";
import { hotelPackages } from "@/data/hotelPackages";
import { constructMetadata, getProductSchema, getBreadcrumbSchema, getHotelSchema } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pkg = packages.find((p) => p.id === parseInt(id));

  if (!pkg) return constructMetadata({ title: "Package Not Found" });

  return constructMetadata({
    title: pkg.title,
    description: pkg.description,
    image: pkg.image,
    canonicalUrl: `/packages/${id}`,
  });
}

export default async function PackageLayout({ children, params }) {
  const { id } = await params;
  const pkg = packages.find((p) => p.id === parseInt(id));

  const jsonLd = pkg ? [
    getProductSchema(pkg),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Tour Packages", url: "/packages" },
      { name: pkg.title, url: `/packages/${id}` },
    ]),
  ] : [];

  if (pkg?.id === 5) {
    hotelPackages.forEach(hotel => {
      jsonLd.push(getHotelSchema({
        name: hotel.title,
        description: hotel.description,
        image: hotel.image,
        location: hotel.location
      }));
    });
  }

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
