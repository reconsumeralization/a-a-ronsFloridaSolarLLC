'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, Sun, Droplets, Zap, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function BenefitsPage() {
  const [activeStep, setActiveStep] = useState(0)

  const benefits = [
    {
      number: "01",
      title: "Regular Maintenance is Key",
      description: "Just like your car needs regular maintenance, your solar panels collect dirt, dust, and other pollutants from the air. Regular cleaning ensures optimal performance.",
      icon: Sun,
      details: [
        "Increases energy production by up to 30%",
        "Prevents long-term damage from debris buildup",
        "Recommended cleaning frequency: 2-4 times per year"
      ]
    },
    {
      number: "02",
      title: "Gentle Cleaning Process",
      description: "We use proprietary solar panel cleaning solutions and processes to quickly and gently cut through grime, leaving your panels streak-free and spotless.",
      icon: Droplets,
      details: [
        "pH-neutral, biodegradable cleaning solutions",
        "Soft-bristle brushes to prevent scratching",
        "Deionized water for a spot-free finish"
      ]
    },
    {
      number: "03",
      title: "Peak Performance Guaranteed",
      description: "With regular maintenance, your solar panels will always be giving you 100% of their ability to produce your power and reduce your power bill.",
      icon: Zap,
      details: [
        "Up to 25% increase in energy production",
        "Longer lifespan for your solar investment",
        "Consistent power output throughout the year"
      ]
    },
    {
      number: "04",
      title: "Comprehensive Inspection",
      description: "On top of cleaning service, we offer a 'tune up' maintenance program checking connections and operations of your system - repair or replace any parts needed.",
      icon: Shield,
      details: [
        "Thorough check of all electrical connections",
        "Inspection of panel mounting and structural integrity",
        "Performance analysis and optimization recommendations"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-950 py-12">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
            Benefits of Professional Solar Maintenance
          </h1>
          <p className="mt-4 text-xl text-blue-200 max-w-3xl mx-auto">
            Discover why regular maintenance and cleaning are crucial for maximizing your solar investment
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: activeStep === index ? 1 : 0.7,
                  x: 0,
                  scale: activeStep === index ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className={`cursor-pointer transition-all ${
                    activeStep === index 
                      ? 'bg-blue-800 border-blue-400 shadow-lg shadow-blue-500/20' 
                      : 'bg-blue-900/50 border-blue-700 hover:bg-blue-800/50'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500">
                      {<benefit.icon className="h-6 w-6 text-white" />}
                    </div>
                    <div className="space-y-1">
                      <h2 className="font-bold text-white text-lg">
                        <span className="text-blue-300 mr-2">{benefit.number}</span>
                        {benefit.title}
                      </h2>
                      <p className="text-blue-100">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <div className="sticky top-6 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-blue-800 border-blue-400">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">{benefits[activeStep].title}</h3>
                      <ul className="space-y-2">
                        {benefits[activeStep].details.map((detail, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <Check className="h-5 w-5 text-blue-300 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-blue-100">{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Solar Panel Maintenance"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Ready to optimize your solar investment?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => window.location.href = 'tel:3215062981'}
            >
              Call Now for a Free Consultation
            </Button>
            <Button asChild variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-700">
              <Link href="/contact">
                Schedule a Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

