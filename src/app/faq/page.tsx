import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "How often should I clean my solar panels?",
      answer: "In Florida's climate, we recommend professional cleaning every 6 months to maintain optimal efficiency. However, this may vary based on your location and environmental conditions."
    },
    {
      question: "Why is regular solar maintenance important?",
      answer: "Regular maintenance ensures maximum energy production, extends system lifespan, prevents costly repairs, and maintains warranty compliance. It's essential for protecting your solar investment."
    },
    {
      question: "What's included in your maintenance service?",
      answer: "Our maintenance service includes thorough panel cleaning, system inspection, performance testing, connection checks, and a detailed report with recommendations."
    },
    {
      question: "How long does a cleaning service take?",
      answer: "A typical residential solar panel cleaning service takes 2-3 hours, depending on system size and accessibility. We work efficiently while ensuring thorough cleaning."
    },
    {
      question: "Do you service pool solar systems?",
      answer: "Yes, we specialize in pool solar system maintenance, including leak detection, repair, and optimization for maximum heating efficiency."
    },
    {
      question: "What cleaning methods do you use?",
      answer: "We use specialized solar panel cleaning solutions and soft-bristled equipment to safely remove dirt and debris without damaging the panels or their protective coating."
    },
    {
      question: "How much can dirty solar panels affect performance?",
      answer: "Dirty solar panels can reduce energy production by 15-25%. Regular cleaning helps maintain optimal performance and return on investment."
    },
    {
      question: "Do you offer emergency repair services?",
      answer: "Yes, we provide emergency repair services for both PV and pool solar systems. Contact us immediately if you notice any issues with your system."
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container px-4 py-16 md:px-6">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-yellow-400 sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
              Find answers to common questions about solar maintenance and our services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-yellow-400/20">
                <AccordionTrigger className="text-yellow-200 hover:text-yellow-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center space-y-4">
            <p className="text-zinc-200">Still have questions?</p>
            <Button asChild className="bg-yellow-400 text-zinc-900 hover:bg-yellow-500">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

