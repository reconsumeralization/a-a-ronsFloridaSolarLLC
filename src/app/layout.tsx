import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import { ClarityAnalytics } from "@/components/analytics/ClarityAnalytics";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NotificationProvider } from "@/contexts/NotificationContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "A-A-RON Florida Solar | Professional Solar Installation",
  description:
    "Leading solar panel installation in Florida. Get professional solar solutions with guaranteed quality and excellent service.",
  keywords:
    "solar panels, Florida solar, solar installation, renewable energy, solar power",
  authors: [{ name: "A-A-RON's Solar" }],
  openGraph: {
    title: "A-A-RON's Solar - Florida's Premier Solar Energy Solutions",
    description: "Transform your home with sustainable solar energy solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A-A-RON's Solar - Florida's Premier Solar Energy Solutions",
    description: "Transform your home with sustainable solar energy solutions.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={poppins.className}>
        <NotificationProvider>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
            <ClarityAnalytics />
          </ErrorBoundary>
        </NotificationProvider>
      </body>
    </html>
  );
}
