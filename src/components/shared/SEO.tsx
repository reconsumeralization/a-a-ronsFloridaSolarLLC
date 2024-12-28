"use client";

import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  date?: string;
  author?: string;
}

export function SEO({
  title,
  description,
  image = "/images/og-image.jpg",
  type = "website",
  date,
  author,
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aaronsolar.com";
  const url = `${siteUrl}${pathname}`;
  const siteName = "A-A-RON Florida Solar";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article specific */}
      {type === "article" && date && (
        <>
          <meta property="article:published_time" content={date} />
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
}
