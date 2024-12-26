"use client";

import { usePhoneCall } from "@/hooks/usePhoneCall";
import { useScheduling } from "@/hooks/useScheduling";

import { Button } from "../shared/Button";

interface ServiceHeroProps {
  title: string;
  description: string;
}

export function ServiceHero({ title, description }: ServiceHeroProps) {
  const { handlePhoneCall } = usePhoneCall();
  const { handleScheduling, isLoading } = useScheduling();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 text-white max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleScheduling}
              disabled={isLoading}
            >
              {isLoading ? "Scheduling..." : "Schedule an Inspection"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10"
              onClick={handlePhoneCall}
            >
              Call Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
