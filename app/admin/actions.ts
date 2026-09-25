"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/admin";
import { deleteFeedback } from "@/lib/feedback/storage";
import {
  approveSubmission,
  createApprovedResource,
  createManyResources,
  deleteApprovedResource,
  deleteSubmission,
  getApprovedResources,
  setSubmissionStatus,
  updateApprovedResource,
  updateSubmission,
} from "@/lib/resources/storage";
import { SUBJECTS, type ResourceFields } from "@/lib/resources/types";
import { formDataToObject, validateResourceFields } from "@/lib/resources/validation";

function idFrom(formData: FormData) {
  return String(formData.get("id") ?? "");
}

function revalidatePublicSubject(subject: string) {
  if (SUBJECTS.some((entry) => entry.value === subject)) revalidatePath(`/${subject}`);
}

function validationMessage(errors: Record<string, string>) {
  return Object.values(errors)[0] ?? "Invalid resource data.";
}

export async function saveSubmissionAction(formData: FormData) {
  await requireAdmin();
  const validation = validateResourceFields(formDataToObject(formData));
  if (!validation.success) redirect(`/admin/submissions?error=${encodeURIComponent(validationMessage(validation.errors))}`);
  await updateSubmission(idFrom(formData), validation.data);
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?saved=1");
}

export async function approveSubmissionAction(formData: FormData) {
  await requireAdmin();
  const validation = validateResourceFields(formDataToObject(formData));
  if (!validation.success) redirect(`/admin/submissions?error=${encodeURIComponent(validationMessage(validation.errors))}`);

  const approved = await approveSubmission(idFrom(formData), validation.data);
  if (!approved) redirect(`/admin/submissions?error=${encodeURIComponent("That submission no longer exists.")}`);
  revalidatePublicSubject(validation.data.subject);
  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  revalidatePath("/admin/resources");
  redirect("/admin/submissions?approved=1");
}

export async function rejectSubmissionAction(formData: FormData) {
  await requireAdmin();
  await setSubmissionStatus(idFrom(formData), "rejected");
  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?rejected=1");
}

export async function deleteSubmissionAction(formData: FormData) {
  await requireAdmin();
  await deleteSubmission(idFrom(formData));
  revalidatePath("/admin");
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions?deleted=1");
}

export async function deleteFeedbackAction(formData: FormData) {
  await requireAdmin();
  await deleteFeedback(idFrom(formData));
  revalidatePath("/admin");
  revalidatePath("/admin/feedback");
  redirect("/admin/feedback?deleted=1");
}

export async function addResourceAction(formData: FormData) {
  await requireAdmin();
  const validation = validateResourceFields(formDataToObject(formData));
  if (!validation.success) redirect(`/admin/resources?error=${encodeURIComponent(validationMessage(validation.errors))}`);
  await createApprovedResource(validation.data);
  revalidatePublicSubject(validation.data.subject);
  revalidatePath("/admin");
  revalidatePath("/admin/resources");
  redirect("/admin/resources?added=1");
}

export async function updateResourceAction(formData: FormData) {
  await requireAdmin();
  const validation = validateResourceFields(formDataToObject(formData));
  if (!validation.success) redirect(`/admin/resources?error=${encodeURIComponent(validationMessage(validation.errors))}`);
  const id = idFrom(formData);
  const previous = (await getApprovedResources()).find((resource) => resource.id === id);
  const updated = await updateApprovedResource(id, validation.data);
  if (previous) revalidatePublicSubject(previous.subject);
  if (updated) revalidatePublicSubject(updated.subject);
  revalidatePath("/admin/resources");
  redirect("/admin/resources?saved=1");
}

export async function deleteResourceAction(formData: FormData) {
  await requireAdmin();
  const removed = await deleteApprovedResource(idFrom(formData));
  if (removed) {
    revalidatePublicSubject(removed.subject);
    if (removed.sourceSubmissionId) {
      await setSubmissionStatus(removed.sourceSubmissionId, "rejected");
      revalidatePath("/admin/submissions");
    }
  }
  revalidatePath("/admin");
  revalidatePath("/admin/resources");
  redirect("/admin/resources?deleted=1");
}

export type BulkImportState = { success: boolean; message: string; errors: string[] };

export async function bulkImportAction(
  _state: BulkImportState,
  formData: FormData,
): Promise<BulkImportState> {
  await requireAdmin();
  const payload = String(formData.get("payload") ?? "");
  const status = formData.get("status") === "approved" ? "approved" : "pending";
  let parsed: unknown;

  try {
    parsed = JSON.parse(payload);
  } catch {
    return { success: false, message: "The import is not valid JSON.", errors: [] };
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return { success: false, message: "Provide a non-empty JSON array.", errors: [] };
  }
  if (parsed.length > 500) {
    return { success: false, message: "Import at most 500 resources at a time.", errors: [] };
  }

  const validEntries: ResourceFields[] = [];
  const errors: string[] = [];
  parsed.forEach((entry, index) => {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      errors.push(`Row ${index + 1}: expected an object.`);
      return;
    }
    const validation = validateResourceFields(entry as Record<string, unknown>);
    if (validation.success) validEntries.push(validation.data);
    else errors.push(`Row ${index + 1}: ${Object.values(validation.errors).join(" ")}`);
  });

  if (errors.length > 0) {
    return { success: false, message: "Fix the invalid rows before importing.", errors };
  }

  await createManyResources(validEntries, status);
  for (const subject of new Set(validEntries.map((entry) => entry.subject))) {
    revalidatePublicSubject(subject);
  }
  revalidatePath("/admin");
  revalidatePath("/admin/resources");
  revalidatePath("/admin/submissions");
  return {
    success: true,
    message: `${validEntries.length} resource${validEntries.length === 1 ? "" : "s"} imported as ${status}.`,
    errors: [],
  };
}
