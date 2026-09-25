export const FEEDBACK_TYPES = [
  "General Feedback",
  "Bug / Website Issue",
  "Broken or Incorrect Resource",
  "Feature Suggestion",
  "Other",
] as const;

export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export type FeedbackFields = {
  feedbackType: FeedbackType;
  feedback: string;
  pageSection?: string;
  email?: string;
};

export type FeedbackRecord = FeedbackFields & {
  id: string;
  submittedAt: string;
};
