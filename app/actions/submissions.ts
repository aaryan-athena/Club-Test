"use server";

import { createSubmission } from "@/lib/resources/storage";
import { formDataToObject, validateSubmissionInput } from "@/lib/resources/validation";

export type SubmissionFormState = {
  success: boolean;
  message: string;
  errors: Record<string, string>;
  values: Record<string, string>;
};

export async function submitResourceAction(
  _previousState: SubmissionFormState,
  formData: FormData,
): Promise<SubmissionFormState> {
  const input = formDataToObject(formData);
  const values = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  );

  // Quietly accept bot-filled honeypot submissions without writing them.
  if (typeof input.website === "string" && input.website) {
    return { success: true, message: "Thanks! Your resource was submitted for review.", errors: {}, values: {} };
  }

  const validation = validateSubmissionInput(input);
  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: validation.errors,
      values,
    };
  }

  try {
    await createSubmission(validation.data);
    return {
      success: true,
      message: "Thanks! Your resource was submitted for review and is not public yet.",
      errors: {},
      values: {},
    };
  } catch {
    return {
      success: false,
      message: "We could not save your submission. Please try again later.",
      errors: {},
      values,
    };
  }
}
