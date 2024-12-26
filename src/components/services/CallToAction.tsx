"use client";

import { useState } from "react";

import { Phone } from "lucide-react";

import { usePhoneCall } from "@/hooks/usePhoneCall";

import { SchedulingModal } from "../modals/SchedulingModal";
import { Button } from "../shared/Button";

export function CallToAction() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handlePhoneCall } = usePhoneCall();

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Experiencing Issues with Your Solar System?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our expert team is ready to help diagnose and repair your solar
            system. Don't let issues affect your energy production.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
              onClick={handlePhoneCall}
            >
              <Phone className="w-5 h-5" />
              Call Now for Emergency Repairs
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              Schedule an Inspection
            </Button>
          </div>
        </div>
      </div>
      <SchedulingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
