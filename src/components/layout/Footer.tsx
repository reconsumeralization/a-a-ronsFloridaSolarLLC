import Link from "next/link";

import { SunIcon } from "../Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SunIcon className="w-8 h-8 text-secondary" />
              <span className="text-xl font-bold">A-A-RON&apos;s Solar</span>
            </div>
            <p className="text-gray-400">
              Leading solar installation services across Florida. Transform your
              home with sustainable energy solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-gray-400 hover:text-white"
                >
                  Solar Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#residential"
                  className="text-gray-400 hover:text-white"
                >
                  Residential Solar
                </Link>
              </li>
              <li>
                <Link
                  href="/services#commercial"
                  className="text-gray-400 hover:text-white"
                >
                  Commercial Solar
                </Link>
              </li>
              <li>
                <Link
                  href="/services#battery"
                  className="text-gray-400 hover:text-white"
                >
                  Battery Storage
                </Link>
              </li>
              <li>
                <Link
                  href="/services#maintenance"
                  className="text-gray-400 hover:text-white"
                >
                  Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Solar Street</li>
              <li>Tampa, FL 33601</li>
              <li>Phone: (813) 555-0123</li>
              <li>Email: info@aaronsolar.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {currentYear} A-A-RON&apos;s Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
