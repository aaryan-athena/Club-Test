import "server-only";

import type { DocumentReference, DocumentSnapshot, Transaction } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";
import type {
  ApprovedResourceRecord,
  ResourceFields,
  SubmissionRecord,
  SubmissionStatus,
  SubjectSlug,
} from "@/lib/resources/types";

const submissions = () => db().collection("submissions");
const resources = () => db().collection("approvedResources");

function fromDoc<T extends { id: string }>(doc: DocumentSnapshot): T {
  return { ...doc.data(), id: doc.id } as T;
}

// Apply resource fields over an existing record. A cleared solution URL is removed
// rather than silently keeping the old value.
function withFields<T extends Partial<ResourceFields>>(record: T, fields: ResourceFields, now: string) {
  const next: Record<string, unknown> = { ...record, ...fields, updatedAt: now };
  if (!fields.solution) delete next.solution;
  delete next.id;
  return next;
}

async function patchDoc<T extends { id: string }>(
  ref: DocumentReference,
  patch: (current: T) => Record<string, unknown>,
): Promise<T | null> {
  return db().runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) return null;
    const next = patch(fromDoc<T>(snapshot));
    tx.set(ref, next);
    return { ...next, id: ref.id } as T;
  });
}

export async function getSubmissions() {
  const snapshot = await submissions().get();
  return snapshot.docs.map((doc) => fromDoc<SubmissionRecord>(doc));
}

export async function createSubmission(
  fields: ResourceFields & Pick<SubmissionRecord, "submitterName" | "submitterEmail" | "notes">,
) {
  const now = new Date().toISOString();
  const ref = submissions().doc();
  const record: Omit<SubmissionRecord, "id"> = {
    ...fields,
    status: "pending",
    submittedAt: now,
    updatedAt: now,
  };
  await ref.set(record);
  return { ...record, id: ref.id } as SubmissionRecord;
}

export function updateSubmission(id: string, fields: ResourceFields) {
  return patchDoc<SubmissionRecord>(submissions().doc(id), (current) =>
    withFields(current, fields, new Date().toISOString()),
  );
}

export function setSubmissionStatus(id: string, status: SubmissionStatus) {
  return patchDoc<SubmissionRecord>(submissions().doc(id), (current) => {
    const next: Record<string, unknown> = { ...current, status, updatedAt: new Date().toISOString() };
    delete next.id;
    return next;
  });
}

export async function deleteSubmission(id: string) {
  const ref = submissions().doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) return false;
  await ref.delete();
  return true;
}

export async function getApprovedResources(subject?: SubjectSlug) {
  const query = subject ? resources().where("subject", "==", subject) : resources();
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => fromDoc<ApprovedResourceRecord>(doc));
}

// Public pages should still render their hardcoded handouts if Firestore is unreachable.
export async function getPublicResources(subject: SubjectSlug) {
  try {
    return await getApprovedResources(subject);
  } catch (error) {
    console.error(`Could not load approved ${subject} resources from Firestore`, error);
    return [];
  }
}

// Inserts a published resource, or updates the one already published from the same
// submission so re-approving never creates duplicates.
async function upsertApprovedResource(
  tx: Transaction,
  fields: ResourceFields,
  now: string,
  sourceSubmissionId?: string,
): Promise<ApprovedResourceRecord> {
  if (sourceSubmissionId) {
    const existing = await tx.get(resources().where("sourceSubmissionId", "==", sourceSubmissionId).limit(1));
    const doc = existing.docs[0];
    if (doc) {
      const next = withFields(fromDoc<ApprovedResourceRecord>(doc), fields, now);
      tx.set(doc.ref, next);
      return { ...next, id: doc.id } as ApprovedResourceRecord;
    }
  }

  const ref = resources().doc();
  const record: Omit<ApprovedResourceRecord, "id"> = {
    ...fields,
    ...(sourceSubmissionId ? { sourceSubmissionId } : {}),
    createdAt: now,
    updatedAt: now,
  };
  tx.set(ref, record);
  return { ...record, id: ref.id };
}

export function createApprovedResource(fields: ResourceFields, sourceSubmissionId?: string) {
  return db().runTransaction((tx) =>
    upsertApprovedResource(tx, fields, new Date().toISOString(), sourceSubmissionId),
  );
}

// Saves the admin's edits, publishes the resource and marks the submission approved in
// one atomic write, so the resource is live the moment this resolves.
export function approveSubmission(id: string, fields: ResourceFields) {
  return db().runTransaction(async (tx) => {
    const ref = submissions().doc(id);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) return null;

    const now = new Date().toISOString();
    const resource = await upsertApprovedResource(tx, fields, now, id);
    tx.set(ref, { ...withFields(fromDoc<SubmissionRecord>(snapshot), fields, now), status: "approved" });
    return resource;
  });
}

export function updateApprovedResource(id: string, fields: ResourceFields) {
  return patchDoc<ApprovedResourceRecord>(resources().doc(id), (current) =>
    withFields(current, fields, new Date().toISOString()),
  );
}

export function deleteApprovedResource(id: string) {
  return db().runTransaction(async (tx) => {
    const ref = resources().doc(id);
    const snapshot = await tx.get(ref);
    if (!snapshot.exists) return null;
    tx.delete(ref);
    return fromDoc<ApprovedResourceRecord>(snapshot);
  });
}

export async function createManyResources(
  entries: ResourceFields[],
  status: "pending" | "approved",
) {
  const now = new Date().toISOString();
  const writer = db().bulkWriter();

  for (const entry of entries) {
    if (status === "approved") {
      writer.create(resources().doc(), { ...entry, createdAt: now, updatedAt: now });
    } else {
      writer.create(submissions().doc(), { ...entry, status: "pending", submittedAt: now, updatedAt: now });
    }
  }

  await writer.close();
  return entries.length;
}
