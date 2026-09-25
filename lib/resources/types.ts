export const SUBJECTS = [
  { value: "number-theory", label: "Number Theory" },
  { value: "geometry", label: "Geometry" },
  { value: "combinatorics", label: "Combinatorics" },
  { value: "algebra", label: "Algebra" },
] as const;

export const RESOURCE_LEVELS = [
  "AIME Qualifying Handouts",
  "Advanced Handouts",
] as const;

export const RESOURCE_TYPES = [
  "Handout",
  "Problem Set",
  "Lecture Notes",
  "Worksheet",
  "Book Chapter",
  "Video",
  "Other",
] as const;

export type SubjectSlug = (typeof SUBJECTS)[number]["value"];
export type SubmissionStatus = "pending" | "approved" | "rejected";

export type ResourceFields = {
  title: string;
  subject: SubjectSlug;
  topic: string;
  level: string;
  url: string;
  solution?: string;
  type: string;
};

export type SubmissionRecord = ResourceFields & {
  id: string;
  status: SubmissionStatus;
  submitterName?: string;
  submitterEmail?: string;
  notes?: string;
  submittedAt: string;
  updatedAt: string;
};

export type ApprovedResourceRecord = ResourceFields & {
  id: string;
  sourceSubmissionId?: string;
  createdAt: string;
  updatedAt: string;
};
