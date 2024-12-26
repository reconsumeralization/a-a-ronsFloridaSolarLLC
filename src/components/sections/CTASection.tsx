import { Button } from "../shared/Button";

export function CTASection() {
  return (
    <section className="bg-primary py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Switch to Solar?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Get a free consultation and find out how much you can save with
            solar energy. Our experts are ready to help you make the switch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Calculate Savings
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
