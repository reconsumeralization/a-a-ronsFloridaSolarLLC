import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: "1",
    name: "Michael Thompson",
    location: "Melbourne, FL",
    image: "/testimonials/michael.jpg",
    rating: 5,
    text:
      "The maintenance team at A-A-RON Solar is exceptional. My panels are performing better than ever after their thorough cleaning and inspection.",
    date: "2024-02-15",
  },
  {
    id: "2",
    name: "Sarah Rodriguez",
    location: "Palm Bay, FL",
    image: "/testimonials/sarah.jpg",
    rating: 5,
    text:
      "Regular maintenance has made a huge difference in our system's performance. Professional, punctual, and thorough service every time.",
    date: "2024-02-10",
  },
  {
    id: "3",
    name: "David Chen",
    location: "Cocoa, FL",
    image: "/testimonials/david.jpg",
    rating: 5,
    text:
      "I've noticed a significant increase in energy production since starting regular maintenance. The team is knowledgeable and efficient.",
    date: "2024-01-28",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="text-lg text-gray-600">
            Join hundreds of satisfied customers who trust us with their solar
            maintenance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "A-A-RON Florida Solar",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": testimonials.length.toString(),
              },
              "review": testimonials.map((t) => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": t.name,
                },
                "datePublished": t.date,
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": t.rating.toString(),
                },
                "reviewBody": t.text,
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
