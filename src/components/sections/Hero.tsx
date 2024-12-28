import Image from "next/image";

import { Button } from "../shared/Button";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-white">
      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              Power Your Home With{" "}
              <span className="text-primary">Solar Energy</span>
            </h1>
            <p className="text-lg text-gray-600">
              Transform your home with sustainable solar solutions. Save money
              and the environment with Florida&apos;s leading solar installation
              company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">Get Free Quote</Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-gray-600">Installations</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-gray-600">Satisfied Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">25yr</p>
                <p className="text-gray-600">Warranty</p>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px]">
            <Image
              src="/solar-home.jpg"
              alt="Solar panels on a modern home"
              fill
              className="object-cover rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
