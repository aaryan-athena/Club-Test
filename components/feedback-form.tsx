"use client";

import { useActionState, useState } from "react";
import { submitFeedbackAction, type FeedbackFormState } from "@/app/actions/feedback";
import { FEEDBACK_TYPES } from "@/lib/feedback/types";
import { countWords } from "@/lib/word-count";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";
const labelClass = "block text-sm font-semibold text-slate-800";
const initialFeedbackFormState: FeedbackFormState = {
  success: false,
  message: "",
  errors: {},
  values: {},
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-sm text-red-700">{message}</p> : null;
}

export function FeedbackForm() {
  const [state, formAction, pending] = useActionState(
    submitFeedbackAction,
    initialFeedbackFormState,
  );
  const [feedbackText, setFeedbackText] = useState("");
  const feedbackWordCount = countWords(feedbackText);

  if (state.success) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-950">Feedback received</h2>
        <p className="mt-2 leading-7 text-emerald-900">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {state.message ? (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </div>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="feedbackWebsite">Website</label>
        <input id="feedbackWebsite" name="feedbackWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="feedbackType" className={labelClass}>
          Feedback Type <span aria-hidden="true">*</span>
        </label>
        <select
          id="feedbackType"
          name="feedbackType"
          required
          defaultValue={state.values.feedbackType ?? FEEDBACK_TYPES[0]}
          className={inputClass}
          aria-invalid={Boolean(state.errors.feedbackType)}
        >
          {FEEDBACK_TYPES.map((feedbackType) => (
            <option key={feedbackType} value={feedbackType}>{feedbackType}</option>
          ))}
        </select>
        <FieldError message={state.errors.feedbackType} />
      </div>

      <div>
        <label htmlFor="feedback" className={labelClass}>
          Feedback <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="feedback"
          name="feedback"
          rows={7}
          required
          value={feedbackText}
          onChange={(event) => setFeedbackText(event.target.value)}
          placeholder="Tell us what you think…"
          className={inputClass}
          aria-invalid={Boolean(state.errors.feedback)}
          aria-describedby="feedback-guidance feedback-word-count"
        />
        <div className="mt-1.5 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
          <p id="feedback-guidance">Maximum 100 words.</p>
          <p id="feedback-word-count" className={feedbackWordCount > 100 ? "font-semibold text-red-700" : ""}>
            {feedbackWordCount}/100 words
          </p>
        </div>
        <FieldError message={state.errors.feedback} />
      </div>

      <div>
        <label htmlFor="pageSection" className={labelClass}>
          Page / Section <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="pageSection"
          name="pageSection"
          defaultValue={state.values.pageSection}
          placeholder="Which page or section is this about?"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="feedbackEmail" className={labelClass}>
          Email <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          id="feedbackEmail"
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={state.values.email}
          className={inputClass}
          aria-invalid={Boolean(state.errors.email)}
          aria-describedby="feedback-email-guidance"
        />
        <p id="feedback-email-guidance" className="mt-1.5 text-xs text-slate-500">
          Only include your email if you would like a response.
        </p>
        <FieldError message={state.errors.email} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-w-40 justify-center rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Submit Feedback"}
      </button>
    </form>
  );
}
