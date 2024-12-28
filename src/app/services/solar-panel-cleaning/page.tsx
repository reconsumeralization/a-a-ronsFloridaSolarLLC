import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function SolarPanelCleaningPage() {
  return (
    <div className="min-h-screen bg-gradient-primary py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Solar Panel Cleaning</h1>
            <p className="mt-4 text-xl text-secondary max-w-3xl mx-auto">
              Professional cleaning services to maintain optimal efficiency of your solar panels
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Why Clean Your Solar Panels?</h2>
              <ul className="space-y-2">
                {[
                  "Increase energy production by up to 30%",
                  "Remove dirt, dust, pollen, and bird droppings",
                  "Extend the lifespan of your solar system",
                  "Maintain warranty compliance",
                  "Identify potential issues early"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-full">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Solar Panel Cleaning"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          <Card className="bg-card-primary border-highlight">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Our Cleaning Process</h2>
              <ol className="space-y-2">
                {[
                  "Inspect panels for damage or issues",
                  "Use specialized, non-abrasive cleaning solutions",
                  "Gently remove dirt and debris with soft brushes",
                  "Rinse with purified water to prevent spotting",
                  "Perform post-cleaning inspection and performance check"
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold text-primary mr-2">{index + 1}.</span>
                    <span className="text-secondary">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Boost Your Solar Efficiency?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="button-primary"
                onClick={() => window.location.href = 'tel:3215062981'}
              >
                Call Now for a Free Quote
              </Button>
              <Button asChild variant="outline" className="button-secondary">
                <Link href="/contact">
                  Schedule a Cleaning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

