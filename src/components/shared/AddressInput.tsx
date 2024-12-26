"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

import { useLoadScript } from "@react-google-maps/api";

interface AddressInputProps {
  label: string;
  error?: string;
  className?: string;
  onSelect?: (address: string) => void;
}

export const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ label, error, className = "", onSelect, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(
      null,
    );
    const inputRef = useRef<HTMLInputElement | null>(null);

    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      libraries: ["places"],
    });

    useEffect(() => {
      if (isLoaded && inputRef.current && !loaded) {
        autocompleteRef.current = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: { country: "us" },
            fields: ["formatted_address"],
          },
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current?.getPlace();
          if (place?.formatted_address) {
            onSelect?.(place.formatted_address);
          }
        });

        setLoaded(true);
      }
    }, [isLoaded, loaded, onSelect]);

    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          {...props}
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-300 focus:ring-primary/20"
          }`}
          placeholder="Enter your address"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

AddressInput.displayName = "AddressInput";
