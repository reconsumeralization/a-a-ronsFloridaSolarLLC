import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Basic Maintenance",
      price: "149",
      description: "Essential solar panel maintenance",
      features: [
        "Solar panel cleaning",
        "Visual inspection",
        "Basic performance check",
        "Written report"
      ]
    },
    {
      name: "Comprehensive Care",
      price: "299",
      description: "Complete solar system maintenance",
      features: [
        "Everything in Basic",
        "Detailed system inspection",
        "Connection check",
        "Performance optimization",
        "Preventive maintenance",
        "Priority support"
      ]
    },
    {
      name: "Pool Solar Package",
      price: "199",
      description: "Specialized pool solar maintenance",
      features: [
        "Pool solar panel cleaning",
        "System pressure check",
        "Leak detection",
        "Flow optimization",
        "Performance report"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="container px-4 py-16 md:px-6">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-yellow-400 sm:text-5xl">
              Maintenance Packages
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
              Choose the perfect maintenance package for your solar system
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan, i) => (
              <Card key={i} className="bg-zinc-800 border-yellow-400/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-yellow-200">{plan.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-yellow-400">${plan.price}</span>
                    <span className="ml-1 text-zinc-400">per visit</span>
                  </div>
                  <p className="text-zinc-300">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-zinc-200">
                        <Check className="w-4 h-4 mr-2 text-yellow-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-yellow-400 text-zinc-900 hover:bg-yellow-500">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-yellow-200">Custom Solutions Available</h2>
            <p className="text-zinc-300">
              Need a customized maintenance plan? Contact us to discuss your specific requirements.
            </p>
            <Button asChild variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
              <Link href="/contact">Contact for Custom Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

