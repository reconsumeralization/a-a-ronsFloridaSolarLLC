"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { ClientButton } from "@/components/shared/ClientButton";
import { cn } from "@/utils/cn";

const faqs = [
  {
    question: "How often should I clean my solar panels?",
    answer:
      "We recommend professional cleaning every 6-12 months, depending on your location and environmental conditions. Areas with high pollen, dust, or bird activity may require more frequent cleaning.",
  },
  {
    question: "What maintenance do solar panels need?",
    answer:
      "Regular maintenance includes cleaning, inspection of mounting hardware, checking electrical connections, and monitoring system performance. We recommend quarterly inspections to ensure optimal operation.",
  },
  {
    question: "Will cleaning improve panel efficiency?",
    answer:
      "Yes! Clean panels can improve system efficiency by 5-10%. Regular cleaning removes dirt, debris, and other materials that can reduce solar absorption and power output.",
  },
  {
    question: "Do you offer emergency maintenance services?",
    answer:
      "Yes, we provide 24/7 emergency maintenance services for our customers. Our team can quickly respond to issues like storm damage or unexpected system shutdowns.",
  },
  {
    question: "What's included in your maintenance plans?",
    answer:
      "Our maintenance plans include regular cleaning, system inspections, performance monitoring, and priority service. We also provide detailed reports and recommendations for optimizing your system.",
  },
];

export function MaintenanceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg bg-white overflow-hidden"
          >
            <ClientButton
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-gray-500 transition-transform",
                  openIndex === index && "rotate-180",
                )}
              />
            </ClientButton>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                openIndex === index ? "max-h-40" : "max-h-0",
              )}
            >
              <p className="p-4 pt-0 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
