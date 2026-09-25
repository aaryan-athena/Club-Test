import Link from "next/link";
import {
  approveSubmissionAction,
  deleteSubmissionAction,
  rejectSubmissionAction,
  saveSubmissionAction,
} from "@/app/admin/actions";
import { AdminResourceFields } from "@/components/admin-resource-fields";
import { ExternalLink } from "@/components/external-link";
import { getSubmissions } from "@/lib/resources/storage";
import type { SubmissionRecord } from "@/lib/resources/types";

const statusStyles = {
  pending: "bg-amber-100 text-amber-900",
  approved: "bg-emerald-100 text-emerald-900",
  rejected: "bg-red-100 text-red-900",
};

function notice(params: Record<string, string | undefined>) {
  if (params.error) return { error: true, text: params.error };
  if (params.approved) return { error: false, text: "Submission approved and published." };
  if (params.rejected) return { error: false, text: "Submission rejected." };
  if (params.deleted) return { error: false, text: "Submission deleted." };
  if (params.saved) return { error: false, text: "Submission changes saved." };
  return null;
}

function SubmissionCard({ submission }: { submission: SubmissionRecord }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold capitalize ${statusStyles[submission.status]}`}>{submission.status}</span>
          <p className="mt-2 text-xs text-slate-500">Submitted {new Date(submission.submittedAt).toLocaleString()}</p>
        </div>
        <ExternalLink href={submission.url} className="text-sm font-semibold text-emerald-800 hover:underline">Open resource ↗</ExternalLink>
      </div>

      <form>
        <input type="hidden" name="id" value={submission.id} />
        <AdminResourceFields values={submission} idPrefix={`submission-${submission.id}`} />

        {(submission.submitterName || submission.submitterEmail || submission.notes) ? (
          <div className="mt-5 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Submitter context</p>
            {submission.submitterName ? <p className="mt-1">Name: {submission.submitterName}</p> : null}
            {submission.submitterEmail ? <p>Email: <a className="text-emerald-800 hover:underline" href={`mailto:${submission.submitterEmail}`}>{submission.submitterEmail}</a></p> : null}
            {submission.notes ? <p className="mt-2 whitespace-pre-wrap">{submission.notes}</p> : null}
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          {submission.status !== "approved" ? (
            <>
              <button formAction={saveSubmissionAction} className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Save changes</button>
              <button formAction={approveSubmissionAction} className="rounded-lg bg-emerald-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-900">Approve</button>
            </>
          ) : (
            <Link href="/admin/resources" className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Edit published resource</Link>
          )}
          {submission.status === "pending" ? <button formAction={rejectSubmissionAction} className="rounded-lg border border-amber-300 px-3.5 py-2 text-sm font-semibold text-amber-900 hover:bg-amber-50">Reject</button> : null}
          <button formAction={deleteSubmissionAction} className="ml-auto rounded-lg border border-red-300 px-3.5 py-2 text-sm font-semibold text-red-800 hover:bg-red-50">Delete</button>
        </div>
      </form>
    </article>
  );
}

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [submissions, params] = await Promise.all([getSubmissions(), searchParams]);
  const message = notice(params);
  const statusOrder = { pending: 0, rejected: 1, approved: 2 };
  submissions.sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.submittedAt.localeCompare(a.submittedAt));

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Resource submissions</h1>
      <p className="mt-2 text-slate-600">Edit metadata, then approve or reject submitted resources.</p>
      {message ? <p role={message.error ? "alert" : "status"} className={`mt-5 rounded-lg border px-4 py-3 text-sm ${message.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p> : null}
      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        {submissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)}
      </div>
      {submissions.length === 0 ? <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No resource submissions yet.</div> : null}
    </div>
  );
}
