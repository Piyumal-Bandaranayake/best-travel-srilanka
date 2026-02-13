/**
 * SEO Utility for Best Travel Sri Lanka
 * Contains helper functions for generating metadata and structured data (JSON-LD)
 */

export const siteConfig = {
  name: "Best Travel Sri Lanka",
  description: "Experience the best of Sri Lanka with our curated travel packages, iconic destinations, and premium hotel stays.",
  url: "https://besttravelsrilanka.com", // Replace with actual production URL
  ogImage: "https://besttravelsrilanka.com/sigirya.jpg", // Default OG image
  keywords: [
    "Sri Lanka Travel",
    "Sri Lanka Tours",
    "Best Travel Sri Lanka",
    "Sri Lanka Vacation",
    "Luxury Tours Sri Lanka",
    "Sri Lanka Tour Packages",
    "Sri Lanka Hotels",
    "Visit Sri Lanka",
  ],
  links: {
    whatsapp: "https://wa.me/94701000148",
  },
};

/**
 * Generates metadata for a page
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/logo.svg",
  noIndex = false,
  canonicalUrl,
} = {}) {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;

  return {
    title: fullTitle,
    description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@besttravelsl",
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
      languages: {
        'en-US': '/en-US',
        'en-GB': '/en-GB',
        'fr-FR': '/fr-FR',
      },
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

/**
 * Generates Structured Data (JSON-LD) for Travel Agency
 */
export function getTravelAgencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": siteConfig.name,
    "image": siteConfig.ogImage,
    "@id": siteConfig.url,
    "url": siteConfig.url,
    "telephone": "+94701000148",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Main Street",
      "addressLocality": "Badulla",
      "addressRegion": "Uva",
      "postalCode": "90000",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.9847,
      "longitude": 81.0565
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://facebook.com/besttravelsrilanka",
      "https://instagram.com/besttravelsrilanka"
    ]
  };
}

/**
 * Generates Structured Data for a Tour Package
 */
export function getProductSchema(pkg) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg.title,
    "image": pkg.image,
    "description": pkg.description,
    "brand": {
      "@type": "Brand",
      "name": siteConfig.name
    },
    "offers": {
      "@type": "Offer",
      "url": `${siteConfig.url}/packages/${pkg.id}`,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
}

/**
 * Generates BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`
    }))
  };
}

/**
 * Generates Review Schema
 */
export function getReviewSchema(reviews) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating || 5,
      "bestRating": "5"
    },
    "reviewBody": review.feedback,
    "datePublished": review.createdAt,
    "itemReviewed": {
      "@type": "TravelAgency",
      "name": siteConfig.name
    }
  }));
}

/**
 * Generates Structured Data for a Tourist Destination
 */
export function getTouristDestinationSchema(dest) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": dest.title,
    "description": dest.description,
    "image": dest.image,
    "location": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": dest.location,
        "addressCountry": "LK"
      }
    }
  };
}

/**
 * Generates Structured Data for a Hotel
 */
export function getHotelSchema(hotel) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": hotel.name,
    "description": hotel.description,
    "image": hotel.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": hotel.location || "Sri Lanka",
      "addressCountry": "LK"
    }
  };
}
