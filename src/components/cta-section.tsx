"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Solar Investment?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get in touch today for a free consultation and quote
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.location.href = "tel:3215062981"}
            >
              Call Now
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-700"
            >
              <Link href="/contact">
                Schedule Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
