import "server-only";

import { db } from "@/lib/firebase/admin";
import type { FeedbackFields, FeedbackRecord } from "@/lib/feedback/types";

const feedback = () => db().collection("feedback");

export async function getFeedback() {
  const snapshot = await feedback().get();
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as FeedbackRecord);
}

export async function createFeedback(fields: FeedbackFields) {
  const ref = feedback().doc();
  const record: Omit<FeedbackRecord, "id"> = {
    ...fields,
    submittedAt: new Date().toISOString(),
  };
  await ref.set(record);
  return { ...record, id: ref.id } as FeedbackRecord;
}

export async function deleteFeedback(id: string) {
  const ref = feedback().doc(id);
  const snapshot = await ref.get();
  if (!snapshot.exists) return false;
  await ref.delete();
  return true;
}
