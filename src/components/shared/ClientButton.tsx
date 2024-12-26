"use client";

import { forwardRef } from "react";

import type { ButtonProps } from "./Button";
import { Button } from "./Button";

export const ClientButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    );
  },
);

ClientButton.displayName = "ClientButton";
