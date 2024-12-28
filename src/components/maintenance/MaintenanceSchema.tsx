export function MaintenanceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Solar Panel Maintenance & Cleaning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "A-A-RON Florida Solar",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Florida",
        "addressCountry": "US",
      },
    },
    "areaServed": {
      "@type": "State",
      "name": "Florida",
    },
    "serviceType": "Solar Panel Maintenance",
    "offers": {
      "@type": "Offer",
      "description":
        "Professional solar panel cleaning and maintenance services",
      "availability": "https://schema.org/InStock",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
        },
        "author": {
          "@type": "Person",
          "name": "John Smith",
        },
        "reviewBody":
          "Excellent maintenance service. My panels are performing better than ever!",
      },
    ],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.aaronfloridasolar.com/maintenance",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
