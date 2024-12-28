"use client";

import { useCallback, useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuIcon, XIcon } from "@/components/Icons";
import { ClientButton } from "@/components/shared/ClientButton";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { AppError } from "@/utils/errors";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Plans", href: "/#maintenance-plans" },
  { name: "About", href: "/#about" },
  { name: "Blog", href: "/blog" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { error, handleError, clearError } = useErrorHandler();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    try {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } catch (err) {
      handleError(err);
    }
  }, [handleScroll, handleError]);

  const handleNavigation = async (href: string) => {
    try {
      setIsOpen(false);

      if (href.startsWith("/#")) {
        const element = document.querySelector(href.substring(1));
        if (!element) {
          throw new AppError("Section not found");
        }

        element.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {error.message && (
        <ErrorAlert
          message={error.message}
          type={error.type}
          onClose={clearError}
        />
      )}

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            A-A-RON Solar
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => handleNavigation(item.href)}
                className={`text-sm font-medium ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}

            <ClientButton
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })}
              variant="primary"
              size="sm"
            >
              Contact Us
            </ClientButton>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {isOpen
              ? <XIcon className="w-6 h-6" />
              : <MenuIcon className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`text-sm font-medium ${
                      pathname === item.href
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    } transition-colors`}
                  >
                    {item.name}
                  </Link>
                ))}

                <ClientButton
                  onClick={() => {
                    setIsOpen(false);
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Contact Us
                </ClientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
