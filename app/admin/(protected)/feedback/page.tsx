import { deleteFeedbackAction } from "@/app/admin/actions";
import { getFeedback } from "@/lib/feedback/storage";
import type { FeedbackRecord } from "@/lib/feedback/types";

function FeedbackCard({ item }: { item: FeedbackRecord }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-900">
            {item.feedbackType}
          </span>
          <p className="mt-2 text-xs text-slate-500">
            Submitted {new Date(item.submittedAt).toLocaleString()}
          </p>
        </div>
        {item.email ? (
          <a href={`mailto:${item.email}`} className="text-sm font-semibold text-emerald-800 hover:underline">
            Reply by email
          </a>
        ) : null}
      </div>

      <p className="mt-5 whitespace-pre-wrap leading-7 text-slate-800">{item.feedback}</p>

      {(item.pageSection || item.email) ? (
        <dl className="mt-5 space-y-2 rounded-lg bg-slate-50 p-4 text-sm">
          {item.pageSection ? (
            <div>
              <dt className="font-semibold text-slate-900">Page / Section</dt>
              <dd className="mt-0.5 text-slate-600">{item.pageSection}</dd>
            </div>
          ) : null}
          {item.email ? (
            <div>
              <dt className="font-semibold text-slate-900">Email</dt>
              <dd className="mt-0.5 text-slate-600">{item.email}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      <form action={deleteFeedbackAction} className="mt-5 border-t border-slate-200 pt-4">
        <input type="hidden" name="id" value={item.id} />
        <button className="rounded-lg border border-red-300 px-3.5 py-2 text-sm font-semibold text-red-800 hover:bg-red-50">
          Delete feedback
        </button>
      </form>
    </article>
  );
}

export default async function AdminFeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  const [feedback, params] = await Promise.all([getFeedback(), searchParams]);
  feedback.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
      <p className="mt-2 text-slate-600">
        Review website feedback separately from resource submissions.
      </p>
      {params.deleted ? (
        <p role="status" className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          Feedback deleted.
        </p>
      ) : null}
      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        {feedback.map((item) => <FeedbackCard key={item.id} item={item} />)}
      </div>
      {feedback.length === 0 ? (
        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No feedback has been submitted yet.
        </div>
      ) : null}
    </div>
  );
}
