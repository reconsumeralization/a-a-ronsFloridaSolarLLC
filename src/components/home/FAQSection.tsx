"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ChevronDownIcon, QuestionMarkIcon } from "@/components/Icons";

const faqs = [
  {
    question: "How often should I maintain my solar panels?",
    answer:
      "We recommend professional maintenance every 6-12 months, depending on your location and environmental conditions. Regular maintenance ensures optimal performance and extends the life of your solar system.",
  },
  {
    question: "What does solar panel maintenance include?",
    answer:
      "Our maintenance service includes thorough cleaning, inspection of electrical components, performance testing, checking for damage or wear, and a detailed report with recommendations for optimal system performance.",
  },
  {
    question: "How much can maintenance improve panel efficiency?",
    answer:
      "Regular maintenance can improve panel efficiency by 15-25%. Dirty or damaged panels can lose up to 30% of their energy production capacity, making maintenance crucial for optimal return on investment.",
  },
  {
    question: "Do you offer emergency maintenance services?",
    answer:
      "Yes, we provide 24/7 emergency maintenance services for urgent issues. Our team typically responds within 2-4 hours to minimize system downtime and protect your investment.",
  },
  {
    question: "Are your technicians certified?",
    answer:
      "All our technicians are NABCEP certified and undergo regular training to stay current with the latest solar technologies and maintenance techniques. We're fully licensed and insured in Florida.",
  },
  {
    question: "What maintenance plans do you offer?",
    answer:
      "We offer three maintenance plans: Basic (annual inspection), Premium (bi-annual service), and Pro (quarterly maintenance + priority support). Each plan can be customized to your specific needs.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <QuestionMarkIcon className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about solar panel maintenance and
            our services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-medium text-left">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white border-t">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
