"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { OptimizedImage } from "../shared/OptimizedImage";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  location: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel(
  { testimonials }: TestimonialCarouselProps,
) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative bg-white rounded-xl shadow-sm p-8">
      <div className="absolute top-4 right-4 text-primary">
        <Quote size={40} />
      </div>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <OptimizedImage
            src={testimonials[currentIndex].image}
            alt={testimonials[currentIndex].name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-lg">
              {testimonials[currentIndex].name}
            </h3>
            <p className="text-gray-600">
              {testimonials[currentIndex].location}
            </p>
          </div>
        </div>

        <p className="text-lg italic text-gray-700">
          {testimonials[currentIndex].quote}
        </p>
      </motion.div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? testimonials.length - 1 : prev - 1
            )}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === testimonials.length - 1 ? 0 : prev + 1
            )}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
