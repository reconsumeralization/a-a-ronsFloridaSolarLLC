import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight, Search } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function SystemInspectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-primary py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">System Inspections</h1>
            <p className="mt-4 text-xl text-secondary max-w-3xl mx-auto">
              Comprehensive solar system inspections to ensure optimal performance and longevity
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Why Regular Inspections Matter</h2>
              <ul className="space-y-2">
                {[
                  "Identify potential issues before they become major problems",
                  "Ensure your system is operating at peak efficiency",
                  "Extend the lifespan of your solar investment",
                  "Maintain compliance with warranty requirements",
                  "Peace of mind knowing your system is in top condition"
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
                alt="Solar System Inspection"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          <Card className="bg-card-primary border-highlight">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Our Inspection Process</h2>
              <ol className="space-y-4">
                {[
                  {
                    title: "Visual Inspection",
                    description: "Thorough examination of all system components for visible damage or wear"
                  },
                  {
                    title: "Performance Analysis",
                    description: "Review of system output and efficiency metrics"
                  },
                  {
                    title: "Electrical Testing",
                    description: "Comprehensive checks of wiring, connections, and electrical components"
                  },
                  {
                    title: "Thermal Imaging",
                    description: "Use of infrared cameras to detect hot spots or potential issues"
                  },
                  {
                    title: "Detailed Reporting",
                    description: "Provide a comprehensive report with findings and recommendations"
                  }
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <Search className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white">{step.title}</h3>
                      <p className="text-secondary">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready for a Comprehensive System Inspection?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="button-primary"
                onClick={() => window.location.href = 'tel:3215062981'}
              >
                Call Now to Schedule
              </Button>
              <Button asChild variant="outline" className="button-secondary">
                <Link href="/contact">
                  Request an Inspection
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

