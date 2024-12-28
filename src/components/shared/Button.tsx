"use client";

import { forwardRef } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

import { LoadingSpinner } from "./LoadingSpinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "loading">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  loadingVariant?: "spinner" | "dots";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      loadingVariant = "spinner",
      icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const loadingContent = loadingVariant === "spinner"
      ? <LoadingSpinner size="sm" className="mr-2" />
      : (
        <span className="flex items-center">
          <span className="animate-bounce">•</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            •
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
            •
          </span>
        </span>
      );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading
          ? (
            <>
              {loadingContent}
              {loadingText || children}
            </>
          )
          : (
            <>
              {icon && iconPosition === "left" && (
                <span className="mr-2">{icon}</span>
              )}
              {children}
              {icon && iconPosition === "right" && (
                <span className="ml-2">{icon}</span>
              )}
            </>
          )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
