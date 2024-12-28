"use client";

import { useCallback, useState } from "react";

import { z } from "zod";

interface ValidationOptions<T> {
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (error: z.ZodError) => void;
}

export function useFormValidation<T>({
  schema,
  onSuccess,
  onError,
}: ValidationOptions<T>) {
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const validate = useCallback(
    async (data: unknown) => {
      try {
        const validData = await schema.parseAsync(data);
        setErrors(null);
        await onSuccess?.(validData);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(error);
          onError?.(error);
        }
        return false;
      }
    },
    [schema, onSuccess, onError]
  );

  return {
    errors,
    validate,
    clearErrors: () => setErrors(null),
  };
}
