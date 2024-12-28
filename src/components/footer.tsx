"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  FacebookIcon,
  LinkedinIcon,
  SunIcon,
  TwitterIcon,
} from "@/components/Icons";
import { siteConfig } from "@/config/site";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Maintenance Plans", href: "/#maintenance-plans" },
      { label: "Emergency Service", href: "/#contact-form" },
      { label: "System Inspection", href: "/#features" },
      { label: "Performance Analysis", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/#contact-form" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Maintenance Tips", href: "/blog" },
      { label: "FAQs", href: "/faq" },
      { label: "Support", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: siteConfig.links.facebook,
    icon: FacebookIcon,
  },
  {
    label: "Twitter",
    href: siteConfig.links.twitter,
    icon: TwitterIcon,
  },
  {
    label: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: LinkedinIcon,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Link href="/" className="flex items-center gap-2 mb-6">
                <SunIcon className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold text-white">
                  {siteConfig.name}
                </span>
              </Link>
              <p className="text-gray-400 mb-6">
                Florida&apos;s leading solar maintenance provider. Keeping your
                solar investment performing at its peak since 2010.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="lg:col-span-1"
              >
                <h3 className="text-white font-semibold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <p>123 Solar Street</p>
                <p>Tampa, FL 33601</p>
                <p>
                  <a
                    href="tel:+18135555555"
                    className="hover:text-primary transition-colors"
                  >
                    (813) 555-5555
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:info@aaronsolar.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@aaronsolar.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
