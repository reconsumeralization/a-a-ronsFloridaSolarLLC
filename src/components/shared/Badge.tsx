"use client";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary/10 text-secondary",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
      },
      interactive: {
        true: "cursor-pointer hover:opacity-80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Badge({
  children,
  variant,
  interactive,
  className,
  onClick,
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, interactive, className }))}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
