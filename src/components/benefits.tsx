import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function Benefits() {
  const benefits = [
    {
      number: "01",
      title: "Regular Maintenance",
      description: "Keep your solar panels clean and efficient, just like maintaining your car",
    },
    {
      number: "02",
      title: "Gentle Cleaning Process",
      description: "Professional cleaning solution and careful handling for optimal results",
    },
    {
      number: "03",
      title: "Maximum Performance",
      description: "Ensure your system operates at 100% capacity to maximize power generation",
    },
    {
      number: "04",
      title: "Roof Protection",
      description: "Comprehensive inspection and maintenance of your roof and solar system",
    },
  ]

  return (
    <section className="py-20 bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-yellow-400">The Benefits of Solar Cleaning</h2>
            <div className="grid gap-4">
              {benefits.map((benefit) => (
                <Card key={benefit.number} className="bg-zinc-800 border-yellow-400/20">
                  <CardContent className="flex gap-4 p-4">
                    <span className="text-2xl font-bold text-yellow-400">{benefit.number}</span>
                    <div>
                      <h3 className="font-bold text-yellow-200">{benefit.title}</h3>
                      <p className="text-zinc-300">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative h-[600px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Solar Panels"
              className="object-cover"
              fill
            />
          </div>
        </div>
      </div>
    </section>
  )
}

