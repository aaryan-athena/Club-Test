"use server";

import { createFeedback } from "@/lib/feedback/storage";
import { validateFeedbackInput } from "@/lib/feedback/validation";
import { formDataToObject } from "@/lib/resources/validation";

export type FeedbackFormState = {
  success: boolean;
  message: string;
  errors: Record<string, string>;
  values: Record<string, string>;
};

export async function submitFeedbackAction(
  _previousState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const input = formDataToObject(formData);
  const values = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value : ""]),
  );

  // Quietly accept bot-filled honeypot submissions without writing them.
  if (typeof input.feedbackWebsite === "string" && input.feedbackWebsite) {
    return {
      success: true,
      message: "Thanks! Your feedback was submitted.",
      errors: {},
      values: {},
    };
  }

  const validation = validateFeedbackInput(input);
  if (!validation.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      errors: validation.errors,
      values,
    };
  }

  try {
    await createFeedback(validation.data);
    return {
      success: true,
      message: "Thanks! Your feedback was submitted successfully.",
      errors: {},
      values: {},
    };
  } catch {
    return {
      success: false,
      message: "We could not save your feedback. Please try again later.",
      errors: {},
      values,
    };
  }
}
