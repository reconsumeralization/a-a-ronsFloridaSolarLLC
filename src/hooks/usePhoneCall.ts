"use client";

export function usePhoneCall() {
  const phoneNumber = "1-800-SOLAR-FL"; // Replace with actual number

  const handlePhoneCall = () => {
    if (typeof window !== "undefined") {
      window.location.href = `tel:${phoneNumber.replace(/\D/g, "")}`;
    }
  };

  return { handlePhoneCall, phoneNumber };
}
