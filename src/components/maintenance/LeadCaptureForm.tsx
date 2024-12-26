"use client";

import { useEffect, useRef, useState } from "react";

import { CheckCircle, Gift, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/shared/Button";
import { ClientButton } from "@/components/shared/ClientButton";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { trackError, trackEvent } from "@/lib/utils/analytics";
import { getErrorMessage } from "@/lib/utils/error";
import { ExperimentManager } from "@/lib/utils/experiment";
import { trackPerformanceMetrics } from "@/lib/utils/performance";
import { retry } from "@/lib/utils/retry";
import { type LeadFormData, leadFormSchema } from "@/lib/validations/lead";
import { zodResolver } from "@hookform/resolvers/zod";

const specialOffers = [
  {
    id: "spring2024",
    title: "Spring Cleaning Special",
    discount: "20% Off",
    description: "First-time maintenance service",
    expiry: "Limited time offer",
  },
  {
    id: "annual",
    title: "Annual Plan Discount",
    discount: "Save $200",
    description: "Annual maintenance package",
    expiry: "When you prepay annually",
  },
  {
    id: "referral",
    title: "Referral Bonus",
    discount: "$100 Credit",
    description: "For you and your referral",
    expiry: "Ongoing program",
  },
];

type SubmissionError = {
  code: string;
  message: string;
  field?: keyof LeadFormData;
};

async function submitLeadForm(data: LeadFormData) {
  return retry(
    async () => {
      try {
        // Simulate API call
        await new Promise((resolve, reject) => {
          const random = Math.random();
          if (random < 0.1) {
            reject(new Error("Network error"));
          } else if (random < 0.2) {
            reject({
              code: "DUPLICATE_EMAIL",
              message: "This email is already registered for an offer",
              field: "email",
            });
          } else if (random < 0.3) {
            reject({
              code: "INVALID_PHONE",
              message: "Unable to verify phone number",
              field: "phone",
            });
          }

          console.log("Form submission:", data);
          setTimeout(resolve, 1000);
        });

        return { success: true };
      } catch (error) {
        const errorMessage = getErrorMessage(error);

        // Track the error
        trackError(error, {
          formData: data,
          timestamp: new Date().toISOString(),
        });

        throw {
          code: (error as SubmissionError)?.code || "SUBMISSION_ERROR",
          message: errorMessage,
          field: (error as SubmissionError)?.field,
        };
      }
    },
    {
      maxAttempts: 3,
      delayMs: 1000,
      backoff: true,
      onRetry: (attempt, error) => {
        trackEvent("form_retry", {
          attempt,
          error: getErrorMessage(error),
        });

        toast.error(`Retrying submission (${attempt}/3)`, {
          description: "Please wait while we try again...",
        });
      },
    },
  );
}

export function LeadCaptureForm() {
  const [selectedOffer, setSelectedOffer] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const formStartTime = useRef<number | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  const experimentManager = ExperimentManager.getInstance();
  const formLayout = experimentManager.getVariant("maintenance-form-layout");
  const offerDisplay = experimentManager.getVariant("offer-display");

  useEffect(() => {
    // Track initial performance metrics
    const performanceData = trackPerformanceMetrics();
    trackEvent("form_performance", {
      metrics: performanceData.metrics,
      experimentVariants: {
        formLayout,
        offerDisplay,
      },
    });
  }, [formLayout, offerDisplay]);

  useEffect(() => {
    // Report form render performance
    if (window.performance) {
      const navigationEntry = performance.getEntriesByType(
        "navigation",
      )[0] as PerformanceNavigationTiming;
      const formRenderTime = performance.now() - navigationEntry.startTime;

      trackEvent("form_render_performance", {
        renderTime: formRenderTime,
        navigationTime: navigationEntry.duration,
      });
    }
  }, []);

  const handleOfferSelect = (offerId: string) => {
    setSelectedOffer(offerId);
    setValue("offer", offerId, { shouldValidate: true });

    trackEvent("maintenance_offer_selected", {
      offerId,
      offerType: specialOffers.find((o) => o.id === offerId)?.title,
    });
  };

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      formStartTime.current = Date.now();
      trackEvent("maintenance_form_started", {});
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    const completionTime = formStartTime.current
      ? Date.now() - formStartTime.current
      : null;

    trackEvent("form_submit", {
      offerType: data.offer,
      systemSize: data.systemSize,
      completionTime,
    });

    try {
      await submitLeadForm(data);

      trackEvent("maintenance_form_completed", {
        offerType: data.offer,
        systemSize: data.systemSize,
        timeToComplete: Date.now() - formStartTime.current,
      });

      trackEvent("form_success", {
        offerType: data.offer,
      });

      toast.success("Thank you! We'll contact you shortly.", {
        description: "One of our specialists will reach out within 24 hours.",
      });
      reset();
      setSelectedOffer("");
    } catch (error) {
      const submissionError = error as SubmissionError;

      trackEvent("form_error", {
        errorCode: submissionError.code,
        errorField: submissionError.field,
        errorMessage: submissionError.message,
      });

      // Handle field-specific errors
      if (submissionError.field) {
        setError(submissionError.field, {
          type: "server",
          message: submissionError.message,
        });
        toast.error("Please check the form", {
          description: submissionError.message,
        });
        return;
      }

      // Handle general errors
      switch (submissionError.code) {
        case "NETWORK_ERROR":
          toast.error("Connection error", {
            description: "Please check your internet connection and try again.",
          });
          break;
        case "RATE_LIMIT":
          toast.error("Too many attempts", {
            description: "Please wait a few minutes before trying again.",
          });
          break;
        default:
          toast.error("Failed to submit form", {
            description: "Please try again or contact us directly.",
          });
      }
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
        formLayout === "variant-a"
          ? "layout-a"
          : formLayout === "variant-b"
          ? "layout-b"
          : ""
      }`}
    >
      <div
        className={`bg-primary/5 p-6 ${
          offerDisplay === "variant-a" ? "offer-layout-a" : ""
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Gift className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold">Exclusive Maintenance Offers</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {specialOffers.map((offer) => (
            <div key={offer.id}>
              <ClientButton
                onClick={() => handleOfferSelect(offer.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedOffer === offer.id
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-transparent bg-white hover:border-primary/30"
                }`}
              >
                <div className="font-bold text-primary mb-1">{offer.title}</div>
                <div className="text-2xl font-bold mb-2">{offer.discount}</div>
                <p className="text-sm text-gray-600">{offer.description}</p>
                <p className="text-xs text-gray-500 mt-2">{offer.expiry}</p>
              </ClientButton>
            </div>
          ))}
        </div>
        {errors.offer && (
          <p className="mt-2 text-sm text-red-500">{errors.offer.message}</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 space-y-4"
        onFocus={handleFormFocus}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            error={errors.name?.message}
            {...register("name")}
            placeholder="John Smith"
          />
          <Input
            type="email"
            label="Email"
            error={errors.email?.message}
            {...register("email")}
            placeholder="john@example.com"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="tel"
            label="Phone"
            error={errors.phone?.message}
            {...register("phone")}
            placeholder="(555) 123-4567"
          />
          <Select
            label="System Size"
            error={errors.systemSize?.message}
            {...register("systemSize")}
            options={[
              { label: "1-10 panels", value: "small" },
              { label: "11-20 panels", value: "medium" },
              { label: "21+ panels", value: "large" },
            ]}
          />
        </div>

        <input type="hidden" {...register("offer")} />

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || !selectedOffer}
        >
          {isSubmitting
            ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span className="animate-pulse">Processing...</span>
              </>
            )
            : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Claim Special Offer
              </>
            )}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          By submitting this form, you agree to receive communications about our
          services. We respect your privacy and will never share your
          information.
        </p>
      </form>
    </div>
  );
}
