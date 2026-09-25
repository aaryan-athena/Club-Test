import {
  RESOURCE_LEVELS,
  RESOURCE_TYPES,
  SUBJECTS,
  type ResourceFields,
  type SubjectSlug,
} from "@/lib/resources/types";
import { countWords } from "@/lib/word-count";

export type FieldErrors = Record<string, string>;

type ValidationResult<T> =
  | { success: true; data: T; errors: FieldErrors }
  | { success: false; errors: FieldErrors };

const subjectValues = new Set<string>(SUBJECTS.map((subject) => subject.value));
const levelValues = new Set<string>(RESOURCE_LEVELS);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateResourceFields(input: Record<string, unknown>): ValidationResult<ResourceFields> {
  const title = text(input.title, 180);
  const subject = text(input.subject, 40);
  const topic = text(input.topic, 100);
  const level = text(input.level, 100);
  const url = text(input.url, 2_000);
  const solution = text(input.solution, 2_000);
  const type = text(input.type, 80);
  const errors: FieldErrors = {};

  if (!title) errors.title = "Enter a title.";
  if (!subjectValues.has(subject)) errors.subject = "Choose a valid subject.";
  if (!topic) errors.topic = "Enter a topic.";
  if (!levelValues.has(level)) errors.level = "Choose a valid level.";
  if (!url) errors.url = "Enter a resource URL.";
  else if (!validHttpUrl(url)) errors.url = "Enter a valid http:// or https:// URL.";
  if (solution && !validHttpUrl(solution)) {
    errors.solution = "Enter a valid http:// or https:// solution URL.";
  }
  if (!type) errors.type = "Choose or enter a resource type.";

  if (Object.keys(errors).length > 0) return { success: false, errors };

  return {
    success: true,
    errors,
    data: {
      title,
      subject: subject as SubjectSlug,
      topic,
      level,
      url,
      ...(solution ? { solution } : {}),
      type,
    },
  };
}

export function validateSubmissionInput(input: Record<string, unknown>) {
  const resource = validateResourceFields(input);
  const submitterName = text(input.submitterName, 120);
  const submitterEmail = text(input.submitterEmail, 254).toLowerCase();
  const notes = text(input.notes, 2_000);
  const errors = { ...resource.errors };

  if (submitterEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitterEmail)) {
    errors.submitterEmail = "Enter a valid email address.";
  }
  if (countWords(notes) > 50) {
    errors.notes = "Notes must contain no more than 50 words.";
  }

  if (!resource.success || Object.keys(errors).length > 0) {
    return { success: false as const, errors };
  }

  return {
    success: true as const,
    errors,
    data: {
      ...resource.data,
      ...(submitterName ? { submitterName } : {}),
      ...(submitterEmail ? { submitterEmail } : {}),
      ...(notes ? { notes } : {}),
    },
  };
}

export function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

export const resourceFieldOptions = {
  levels: RESOURCE_LEVELS,
  types: RESOURCE_TYPES,
};
