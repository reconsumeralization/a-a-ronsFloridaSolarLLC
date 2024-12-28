"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  FileCheck,
  HandshakeIcon,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";

const trustFactors = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "NABCEP certified technicians with $2M liability coverage",
    link: "/licensing",
  },
  {
    icon: Calendar,
    title: "25+ Years Experience",
    description: "Serving Florida homeowners since 1998",
    link: "/about",
  },
  {
    icon: Users,
    title: "5,000+ Installations",
    description: "Trusted by homeowners across Florida",
    link: "/projects",
  },
  {
    icon: Star,
    title: "4.9/5 Rating",
    description: "Based on 500+ verified customer reviews",
    link: "/reviews",
  },
];

const guarantees = [
  {
    icon: CheckCircle,
    title: "100% Satisfaction Guarantee",
    description: "Not happy? We'll make it right or your money back",
  },
  {
    icon: FileCheck,
    title: "25-Year Warranty",
    description: "Comprehensive coverage on parts and labor",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assurance",
    description: "Regular inspections and maintenance reports",
  },
  {
    icon: HandshakeIcon,
    title: "24/7 Support",
    description: "Emergency assistance whenever you need it",
  },
];

const certifications = [
  {
    name: "NABCEP",
    logo: "/logos/nabcep.svg",
    link: "https://www.nabcep.org/",
  },
  {
    name: "Florida Solar Energy Industries Association",
    logo: "/logos/fseia.svg",
    link: "https://www.flaseia.org/",
  },
  {
    name: "Better Business Bureau",
    logo: "/logos/bbb.svg",
    link: "https://www.bbb.org/",
    rating: "A+",
  },
];

const financingOptions = [
  {
    icon: CreditCard,
    title: "0% APR Financing",
    description: "For qualified buyers",
  },
  {
    icon: Building2,
    title: "PACE Program",
    description: "Property Assessed Clean Energy",
  },
];

export function TrustIndicators() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold mb-4">
            Florida's Most Trusted Solar Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With decades of experience and thousands of successful
            installations, we're committed to providing the highest quality
            solar solutions.
          </p>
        </motion.div>

        {/* Trust Factors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustFactors.map((factor, index) => (
            <Link key={factor.title} href={factor.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full group"
              >
                <Card className="h-full transition duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="p-6 text-center">
                    <div className="relative inline-flex mb-4">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                      <factor.icon className="relative w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {factor.title}
                    </h3>
                    <p className="text-gray-600">{factor.description}</p>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Guarantee Section with Enhanced Design */}
        <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl shadow-sm border p-8 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6">
                Our Triple Guarantee
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {guarantees.map((guarantee, index) => (
                  <motion.div
                    key={guarantee.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/10 rounded-full blur group-hover:blur-xl transition-all" />
                      <guarantee.icon className="relative w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{guarantee.title}</h4>
                      <p className="text-sm text-gray-600">
                        {guarantee.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button className="mt-8 relative z-10">
                View Full Warranty Details
              </Button>
            </div>

            <div className="relative h-64">
              <Image
                src="/images/guarantee-badge.png"
                alt="100% Satisfaction Guaranteed"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Certifications & Financing */}
        <div className="grid md:grid-cols-2 gap-16">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-center">
              Certifications & Partnerships
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certifications.map((cert) => (
                <Link
                  key={cert.name}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="grayscale group-hover:grayscale-0 transition-all">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      width={120}
                      height={60}
                      className="h-12 w-auto"
                    />
                  </div>
                  {cert.rating && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cert.rating}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Financing Options */}
          <div>
            <h3 className="text-xl font-semibold mb-8 text-center">
              Flexible Financing Available
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {financingOptions.map((option) => (
                <Card key={option.title} className="p-6">
                  <div className="flex items-start">
                    <option.icon className="w-8 h-8 text-primary mr-4" />
                    <div>
                      <h4 className="font-semibold mb-1">{option.title}</h4>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline">
                Learn More About Financing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
