"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  submitResourceAction,
  type SubmissionFormState,
} from "@/app/actions/submissions";
import { RESOURCE_LEVELS, RESOURCE_TYPES, SUBJECTS } from "@/lib/resources/types";

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";
const labelClass = "block text-sm font-semibold text-slate-800";
const initialSubmissionFormState: SubmissionFormState = {
  success: false,
  message: "",
  errors: {},
  values: {},
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-sm text-red-700">{message}</p> : null;
}

export function ResourceSubmissionForm() {
  const [state, formAction, pending] = useActionState(
    submitResourceAction,
    initialSubmissionFormState,
  );

  if (state.success) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-950">Submission received</h2>
        <p className="mt-2 leading-7 text-emerald-900">{state.message}</p>
        <Link
          href="/submit-resource"
          className="mt-5 inline-flex rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          Submit another resource
        </Link>
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
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>Title <span aria-hidden="true">*</span></label>
        <input id="title" name="title" required defaultValue={state.values.title} className={inputClass} aria-invalid={Boolean(state.errors.title)} aria-describedby={state.errors.title ? "title-error" : undefined} />
        <div id="title-error"><FieldError message={state.errors.title} /></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="subject" className={labelClass}>Subject <span aria-hidden="true">*</span></label>
          <select id="subject" name="subject" required defaultValue={state.values.subject ?? ""} className={inputClass} aria-invalid={Boolean(state.errors.subject)}>
            <option value="" disabled>Choose a subject</option>
            {SUBJECTS.map((subject) => <option key={subject.value} value={subject.value}>{subject.label}</option>)}
          </select>
          <FieldError message={state.errors.subject} />
        </div>
        <div>
          <label htmlFor="topic" className={labelClass}>Topic <span aria-hidden="true">*</span></label>
          <input id="topic" name="topic" required defaultValue={state.values.topic} placeholder="e.g. Pigeonhole Principle" className={inputClass} aria-invalid={Boolean(state.errors.topic)} />
          <FieldError message={state.errors.topic} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className={labelClass}>Level <span aria-hidden="true">*</span></label>
          <select id="level" name="level" required defaultValue={state.values.level ?? ""} className={inputClass} aria-invalid={Boolean(state.errors.level)}>
            <option value="" disabled>Choose a level</option>
            {RESOURCE_LEVELS.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
          <FieldError message={state.errors.level} />
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>Type <span aria-hidden="true">*</span></label>
          <select id="type" name="type" required defaultValue={state.values.type ?? ""} className={inputClass} aria-invalid={Boolean(state.errors.type)}>
            <option value="" disabled>Choose a type</option>
            {RESOURCE_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          <FieldError message={state.errors.type} />
        </div>
      </div>

      <div>
        <label htmlFor="url" className={labelClass}>Resource URL <span aria-hidden="true">*</span></label>
        <input id="url" name="url" type="url" inputMode="url" required defaultValue={state.values.url} placeholder="https://example.com/resource.pdf" className={inputClass} aria-invalid={Boolean(state.errors.url)} />
        <FieldError message={state.errors.url} />
      </div>

      <div>
        <label htmlFor="solution" className={labelClass}>Solution link <span className="font-normal text-slate-500">(optional)</span></label>
        <input id="solution" name="solution" type="url" inputMode="url" defaultValue={state.values.solution} placeholder="https://example.com/solutions.pdf" className={inputClass} aria-invalid={Boolean(state.errors.solution)} />
        <FieldError message={state.errors.solution} />
      </div>

      <fieldset className="rounded-xl border border-slate-200 p-5">
        <legend className="px-2 text-sm font-semibold text-slate-800">About you <span className="font-normal text-slate-500">(optional)</span></legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="submitterName" className={labelClass}>Name</label>
            <input id="submitterName" name="submitterName" autoComplete="name" defaultValue={state.values.submitterName} className={inputClass} />
          </div>
          <div>
            <label htmlFor="submitterEmail" className={labelClass}>Email</label>
            <input id="submitterEmail" name="submitterEmail" type="email" autoComplete="email" defaultValue={state.values.submitterEmail} className={inputClass} aria-invalid={Boolean(state.errors.submitterEmail)} />
            <FieldError message={state.errors.submitterEmail} />
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="notes" className={labelClass}>Notes or context</label>
          <textarea id="notes" name="notes" rows={4} defaultValue={state.values.notes} placeholder="Why is this resource useful? Is there anything an admin should know?" className={inputClass} aria-invalid={Boolean(state.errors.notes)} aria-describedby="resource-notes-guidance" />
          <p id="resource-notes-guidance" className="mt-1.5 text-xs text-slate-500">Maximum 50 words.</p>
          <FieldError message={state.errors.notes} />
        </div>
      </fieldset>

      <p className="text-sm leading-6 text-slate-600">
        Submitted resources are reviewed by an administrator before they can appear publicly.
      </p>

      <button type="submit" disabled={pending} className="inline-flex min-w-40 justify-center rounded-lg bg-emerald-800 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Submitting…" : "Submit resource"}
      </button>
    </form>
  );
}
