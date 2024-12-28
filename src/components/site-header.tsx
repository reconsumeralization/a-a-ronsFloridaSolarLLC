import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone } from 'lucide-react'

export function SiteHeader() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Benefits", href: "/benefits" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-800 bg-blue-950/95 backdrop-blur supports-[backdrop-filter]:bg-blue-950/75">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">A-A-RONS Florida Solar LLC</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-blue-100 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
          <Button 
            className="button-primary"
            onClick={() => window.location.href = 'tel:3215062981'}
          >
            <Phone className="mr-2 h-4 w-4" />
            (321) 506-2981
          </Button>
        </nav>
        <Button
          variant="ghost"
          className="inline-flex items-center justify-center md:hidden text-blue-100 hover:text-white"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </header>
  )
}

