import { constructMetadata, getBreadcrumbSchema, getReviewSchema } from "@/lib/seo";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

export const metadata = constructMetadata({
  title: "Traveler Reviews",
  description: "Read what our travelers have to say about their experiences with Best Travel Sri Lanka.",
  canonicalUrl: "/reviews",
});

export default async function ReviewsLayout({ children }) {
  let reviewsData = [];
  try {
    await dbConnect();
    reviewsData = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).limit(10);
  } catch (error) {
    console.error("Error fetching reviews for SEO:", error);
  }

  const jsonLd = [
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Reviews", url: "/reviews" },
    ]),
    ...getReviewSchema(reviewsData),
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
