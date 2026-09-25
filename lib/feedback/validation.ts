import { FEEDBACK_TYPES, type FeedbackFields, type FeedbackType } from "@/lib/feedback/types";
import { countWords } from "@/lib/word-count";

export type FeedbackFieldErrors = Record<string, string>;

type FeedbackValidationResult =
  | { success: true; data: FeedbackFields; errors: FeedbackFieldErrors }
  | { success: false; errors: FeedbackFieldErrors };

const feedbackTypeValues = new Set<string>(FEEDBACK_TYPES);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function validateFeedbackInput(
  input: Record<string, unknown>,
): FeedbackValidationResult {
  const feedbackType = text(input.feedbackType, 80);
  const feedback = text(input.feedback, 10_000);
  const pageSection = text(input.pageSection, 200);
  const email = text(input.email, 254).toLowerCase();
  const feedbackWordCount = countWords(feedback);
  const errors: FeedbackFieldErrors = {};

  if (!feedbackTypeValues.has(feedbackType)) {
    errors.feedbackType = "Choose a feedback type.";
  }
  if (!feedback) {
    errors.feedback = "Enter your feedback.";
  } else if (feedbackWordCount > 100) {
    errors.feedback = "Feedback must contain no more than 100 words.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    errors,
    data: {
      feedbackType: feedbackType as FeedbackType,
      feedback,
      ...(pageSection ? { pageSection } : {}),
      ...(email ? { email } : {}),
    },
  };
}
