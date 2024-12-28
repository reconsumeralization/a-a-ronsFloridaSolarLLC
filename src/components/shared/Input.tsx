"use client";

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "w-full rounded-lg border bg-white px-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary focus:ring-primary/50",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/50",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500/50",
      },
      size: {
        sm: "h-8 text-sm",
        md: "h-10",
        lg: "h-12 text-lg",
        xl: "h-14 text-xl",
      },
      icon: {
        true: "pl-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface InputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, icon, error, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          className={inputVariants({
            variant: error ? "error" : variant,
            size,
            icon: !!icon,
            className,
          })}
          {...props}
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
