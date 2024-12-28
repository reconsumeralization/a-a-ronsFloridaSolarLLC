"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import Image from "next/image";

import { ClientButton } from "@/components/shared/ClientButton";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Tampa, FL",
    image: "/testimonials/sarah.jpg",
    role: "Homeowner",
    quote:
      "My energy bills dropped by 40% after their maintenance service. The team was professional and thorough.",
    rating: 5,
    savings: "40%",
    beforeImage: "/testimonials/before1.jpg",
    afterImage: "/testimonials/after1.jpg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Orlando, FL",
    image: "/testimonials/michael.jpg",
    role: "Business Owner",
    quote:
      "They restored our commercial solar array to peak efficiency. Outstanding service!",
    rating: 5,
    savings: "35%",
    beforeImage: "/testimonials/before2.jpg",
    afterImage: "/testimonials/after2.jpg",
  },
  // Add more testimonials...
];

export function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => (
      (prev + newDirection + testimonials.length) % testimonials.length
    ));
  };

  const active = testimonials[activeIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">
            Real results from real Florida homeowners
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="relative"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-yellow-400">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-2xl font-medium text-gray-900">
                    <Quote className="w-8 h-8 text-primary/20 mb-4" />
                    {active.quote}
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">{active.name}</div>
                      <div className="text-gray-600">{active.location}</div>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {active.savings}
                    </div>
                    <div className="text-gray-600">Energy Bill Reduction</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">
                        Before
                      </div>
                      <Image
                        src={active.beforeImage}
                        alt="Before maintenance"
                        width={300}
                        height={400}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">
                        After
                      </div>
                      <Image
                        src={active.afterImage}
                        alt="After maintenance"
                        width={300}
                        height={400}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <ClientButton
              onClick={() => navigate(-1)}
              variant="outline"
              className="p-2"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="w-5 h-5" />
            </ClientButton>
            <ClientButton
              onClick={() => navigate(1)}
              variant="outline"
              className="p-2"
              aria-label="Next testimonial"
            >
              <ArrowRight className="w-5 h-5" />
            </ClientButton>
          </div>
        </div>
      </div>
    </section>
  );
}
