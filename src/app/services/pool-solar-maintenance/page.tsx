import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight, Droplet } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function PoolSolarMaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-primary py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Pool Solar Maintenance</h1>
            <p className="mt-4 text-xl text-secondary max-w-3xl mx-auto">
              Keep your pool warm and energy-efficient with our expert solar maintenance services
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Benefits of Regular Maintenance</h2>
              <ul className="space-y-2">
                {[
                  "Ensure optimal heating performance",
                  "Extend the lifespan of your pool solar system",
                  "Reduce energy costs",
                  "Prevent leaks and damage",
                  "Maintain consistent water temperature"
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
                alt="Pool Solar System"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          <Card className="bg-card-primary border-highlight">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Our Maintenance Services</h2>
              <ul className="space-y-4">
                {[
                  {
                    title: "System Inspection",
                    description: "Thorough check of all components, including panels, pumps, and valves"
                  },
                  {
                    title: "Leak Detection and Repair",
                    description: "Identify and fix any leaks in the system to prevent water and heat loss"
                  },
                  {
                    title: "Performance Optimization",
                    description: "Adjust flow rates and settings for maximum efficiency"
                  },
                  {
                    title: "Cleaning",
                    description: "Remove debris and mineral buildup from panels and pipes"
                  }
                ].map((service, index) => (
                  <li key={index} className="flex items-start">
                    <Droplet className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white">{service.title}</h3>
                      <p className="text-secondary">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Optimize Your Pool Solar System?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="button-primary"
                onClick={() => window.location.href = 'tel:3215062981'}
              >
                Call Now for a Consultation
              </Button>
              <Button asChild variant="outline" className="button-secondary">
                <Link href="/contact">
                  Schedule Maintenance
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

