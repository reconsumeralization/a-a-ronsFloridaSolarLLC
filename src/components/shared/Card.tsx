"use client";

import type { ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white shadow-sm hover:shadow-md",
        outline: "border border-gray-200 hover:border-gray-300",
        ghost: "hover:bg-gray-50",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  children,
  variant,
  padding,
  className,
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, className }))}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
