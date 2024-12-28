"use client";

import { useState } from "react";

import Image, { ImageProps } from "next/image";

import { Placeholder } from "./Placeholder";

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackWidth?: number;
  fallbackHeight?: number;
}

const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="0%" />
        <stop stop-color="#edeef1" offset="20%" />
        <stop stop-color="#f6f7f8" offset="40%" />
        <stop stop-color="#f6f7f8" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f6f7f8" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>
`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackWidth,
  fallbackHeight,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <Placeholder
        width={fallbackWidth || width || 300}
        height={fallbackHeight || height || 200}
        text={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      {...props}
    />
  );
}
