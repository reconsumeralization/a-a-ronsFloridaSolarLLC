import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, ArrowRight, PenToolIcon as Tool } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function PVSolarRepairPage() {
  return (
    <div className="min-h-screen bg-gradient-primary py-12">
      <div className="container px-4 md:px-6">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">PV Solar Repair</h1>
            <p className="mt-4 text-xl text-secondary max-w-3xl mx-auto">
              Expert repair services to keep your photovoltaic solar system running at peak performance
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Common PV Solar Issues We Repair</h2>
              <ul className="space-y-2">
                {[
                  "Inverter malfunctions",
                  "Wiring and connection problems",
                  "Panel damage or degradation",
                  "Monitoring system failures",
                  "Efficiency drops and power output issues"
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
                alt="PV Solar Repair"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          <Card className="bg-card-primary border-highlight">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Our Repair Process</h2>
              <ol className="space-y-4">
                {[
                  {
                    title: "Diagnostic Assessment",
                    description: "Thorough evaluation of your system to identify the root cause of issues"
                  },
                  {
                    title: "Detailed Report",
                    description: "Provide a comprehensive report of findings and recommended repairs"
                  },
                  {
                    title: "Expert Repairs",
                    description: "Skilled technicians perform necessary repairs using quality parts"
                  },
                  {
                    title: "Performance Verification",
                    description: "Post-repair testing to ensure optimal system performance"
                  },
                  {
                    title: "Follow-up Support",
                    description: "Ongoing support and advice to maintain your system's efficiency"
                  }
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <Tool className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
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
            <h2 className="text-2xl font-bold text-white mb-4">Experiencing Issues with Your Solar System?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="button-primary"
                onClick={() => window.location.href = 'tel:3215062981'}
              >
                Call Now for Emergency Repairs
              </Button>
              <Button asChild variant="outline" className="button-secondary">
                <Link href="/contact">
                  Schedule an Inspection
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

