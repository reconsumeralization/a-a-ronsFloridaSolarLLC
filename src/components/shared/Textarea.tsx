"use client";

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "w-full rounded-lg border bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary focus:ring-primary/50",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/50",
        success:
          "border-green-500 focus:border-green-500 focus:ring-green-500/50",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      variant: "default",
      resize: "vertical",
    },
  },
);

interface TextareaProps
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, resize, error, ...props }, ref) => {
    return (
      <div className="relative">
        <textarea
          ref={ref}
          className={textareaVariants({
            variant: error ? "error" : variant,
            resize,
            className,
          })}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
