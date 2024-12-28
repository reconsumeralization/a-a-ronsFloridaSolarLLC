import Link from "next/link"
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-blue-950 border-t border-blue-800">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">About Us</h3>
            <p className="text-blue-100">
              Professional solar maintenance and cleaning services in Florida. Licensed, insured, and experienced.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-blue-400" />
                <a href="tel:3215062981" className="hover:text-blue-300">(321) 506-2981</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-blue-400" />
                <a href="mailto:A.A.RonsHomeImprovement321@gmail.com" className="hover:text-blue-300">A.A.RonsHomeImprovement321@gmail.com</a>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-blue-400" />
                <span>Serving all of Florida</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Services</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/services/solar-panel-cleaning" className="hover:text-blue-300">Solar Panel Cleaning</Link>
              </li>
              <li>
                <Link href="/services/pool-solar-maintenance" className="hover:text-blue-300">Pool Solar Maintenance</Link>
              </li>
              <li>
                <Link href="/services/pv-solar-repair" className="hover:text-blue-300">PV Solar Repair</Link>
              </li>
              <li>
                <Link href="/services/system-inspections" className="hover:text-blue-300">System Inspections</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/" className="hover:text-blue-300">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-300">About</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-blue-300">Services</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-300">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-800 pt-8 text-center">
          <p className="text-sm text-blue-400">
            © 2024 A-A-RONS Florida Solar LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

