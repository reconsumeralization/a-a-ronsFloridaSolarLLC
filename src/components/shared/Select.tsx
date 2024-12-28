"use client";

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { ChevronDownIcon } from "@/components/Icons";

const selectVariants = cva(
  "w-full rounded-lg border bg-white pl-3 pr-10 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
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
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

interface SelectProps
  extends
    React.SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {
  error?: string;
  options?: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, error, children, options, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={selectVariants({
            variant: error ? "error" : variant,
            size,
            className,
          })}
          {...props}
        >
          {options
            ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
            : children}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDownIcon
            className={`w-5 h-5 ${error ? "text-red-500" : "text-gray-400"}`}
          />
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
