import { useState } from "react";

import { validateElectricityInput } from "@/utils/validation";

interface FormState {
  monthlyBill: string;
  monthlyUsage: string;
}

interface FormErrors {
  monthlyBill?: string;
  monthlyUsage?: string;
}

export function useCalculatorForm() {
  const [formData, setFormData] = useState<FormState>({
    monthlyBill: "",
    monthlyUsage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateElectricityInput(formData.monthlyBill)) {
      newErrors.monthlyBill = "Please enter a valid monthly bill amount";
    }

    if (!validateElectricityInput(formData.monthlyUsage)) {
      newErrors.monthlyUsage = "Please enter a valid monthly usage";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    formData,
    errors,
    handleChange,
    validateForm,
  };
}
