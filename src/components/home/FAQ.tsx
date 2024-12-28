"use client";

import { motion } from "framer-motion";

import { ChevronDownIcon, QuestionMarkIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";

const faqs = [
  {
    question: "How often should I maintain my solar panels?",
    answer:
      "We recommend professional maintenance every 6 months for optimal performance. Florida's climate can lead to faster dirt and debris accumulation, affecting system efficiency. Regular maintenance helps maintain peak performance and extends system life.",
  },
  {
    question: "What's included in your maintenance service?",
    answer:
      "Our maintenance service includes thorough panel cleaning, system performance check, electrical connection inspection, mounting hardware verification, and a detailed report. We also provide recommendations for optimizing your system's output.",
  },
  {
    question: "Do you offer emergency maintenance services?",
    answer:
      "Yes, we provide 24/7 emergency maintenance services for our customers. Our team can quickly respond to issues like storm damage, unexpected system shutdowns, or performance problems.",
  },
  {
    question: "How much can maintenance improve system efficiency?",
    answer:
      "Regular maintenance can improve system efficiency by 15-25%. In Florida's environment, panels can accumulate dirt, pollen, and salt (in coastal areas), which significantly impacts performance. Professional cleaning and maintenance restore optimal energy production.",
  },
  {
    question: "Are maintenance services covered under warranty?",
    answer:
      "While regular maintenance is not typically covered under warranty, it's often required to maintain warranty validity. Our maintenance services are designed to comply with manufacturer warranty requirements and document all service records.",
  },
  {
    question: "What makes your maintenance service different?",
    answer:
      "We offer Florida-specific expertise, use specialized cleaning solutions safe for panels, provide detailed performance reports, and offer exclusive discounts for existing customers. Our certified technicians understand local environmental challenges and how to address them.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 bg-white">
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
            >
              <details className="group mb-4">
                <summary className="flex items-center justify-between gap-6 p-6 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50">
                  <h3 className="text-lg font-semibold pr-6">{faq.question}</h3>
                  <ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </details>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-6">
            Still have questions about our maintenance services?
          </p>
          <ClientButton
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth" })}
            variant="outline"
            size="lg"
          >
            Contact Our Experts
          </ClientButton>
        </motion.div>
      </div>
    </section>
  );
}
