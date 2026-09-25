"use client";

import { useState } from "react";
import { FeedbackForm } from "@/components/feedback-form";
import { ResourceSubmissionForm } from "@/components/resource-submission-form";

type SubmissionFormType = "resource" | "feedback";

export function SubmissionFormSelector() {
  const [formType, setFormType] = useState<SubmissionFormType>("resource");

  return (
    <div>
      <div className="border-b border-slate-200 pb-6">
        <label htmlFor="submission-form-type" className="block text-sm font-semibold text-slate-800">
          What would you like to submit?
        </label>
        <select
          id="submission-form-type"
          value={formType}
          onChange={(event) => setFormType(event.target.value as SubmissionFormType)}
          className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 sm:max-w-sm"
        >
          <option value="resource">Submit a Resource</option>
          <option value="feedback">Submit Feedback</option>
        </select>
      </div>

      <div className="pt-6">
        {formType === "resource" ? <ResourceSubmissionForm /> : <FeedbackForm />}
      </div>
    </div>
  );
}
