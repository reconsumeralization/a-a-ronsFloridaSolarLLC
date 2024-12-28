import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-yellow-400">
              A A-Ron&apos;s Home Improvement
            </h1>
            <h2 className="text-xl font-medium sm:text-2xl md:text-3xl text-yellow-200">
              Professional, Efficient, and Insured
            </h2>
            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
              Your trusted partner for solar maintenance, home improvement, and professional repairs in Florida
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-yellow-400 text-zinc-900 hover:bg-yellow-500">
              Get a Quote
            </Button>
            <Button variant="outline" className="text-yellow-400 border-yellow-400 hover:bg-yellow-400/10">
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

