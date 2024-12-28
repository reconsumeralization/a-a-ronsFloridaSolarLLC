"use client";

import { ClientButton } from "./shared/ClientButton";

export function ExampleComponent() {
  const handleClick = () => {
    // handle click
  };

  return (
    <ClientButton onClick={handleClick}>
      Click Me
    </ClientButton>
  );
}
