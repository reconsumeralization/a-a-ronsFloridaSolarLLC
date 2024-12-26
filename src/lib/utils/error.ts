export class FormSubmissionError extends Error {
  constructor(
    message: string,
    public code: string,
    public field?: string,
    public status?: number
  ) {
    super(message);
    this.name = "FormSubmissionError";
  }
}

export function isFormSubmissionError(
  error: unknown
): error is FormSubmissionError {
  return error instanceof FormSubmissionError;
}

export function toErrorWithMessage(error: unknown): FormSubmissionError {
  if (isFormSubmissionError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new FormSubmissionError(error.message, "UNKNOWN_ERROR");
  }

  return new FormSubmissionError(
    "An unexpected error occurred",
    "UNKNOWN_ERROR"
  );
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
