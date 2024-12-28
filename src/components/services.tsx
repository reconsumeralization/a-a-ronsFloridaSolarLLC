import {
  Home,
  PenToolIcon as Tool,
  Sun,
  Wrench,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function Services() {
  const services = [
    {
      title: "Pool Solar Maintenance",
      description: "Expert maintenance and repair of pool solar systems",
      icon: Sun,
    },
    {
      title: "PV Solar Cleaning",
      description: "Professional cleaning and repair of photovoltaic solar panels",
      icon: Tool,
    },
    {
      title: "Carpentry",
      description: "Finish carpentry, doors, trim, and cabinet installation",
      icon: Wrench,
    },
    {
      title: "Home Repairs",
      description: "Complete interior and exterior repairs and renovations",
      icon: Home,
    },
  ]

  return (
    <section className="py-20 bg-zinc-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">Our Services</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card key={service.title} className="bg-zinc-900 border-yellow-400/20">
              <CardHeader>
                <service.icon className="w-12 h-12 text-yellow-400 mb-4" />
                <CardTitle className="text-yellow-200">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-300">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
