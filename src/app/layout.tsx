import './globals.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/contexts/theme-context';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "A-A-RON's Florida Solar LLC",
  description: "Professional solar solutions for Florida homes and businesses",
  keywords: [
    "solar",
    "florida",
    "renewable energy",
    "solar panels",
    "solar installation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
