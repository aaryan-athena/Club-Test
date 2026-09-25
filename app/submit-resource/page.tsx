import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SubmissionFormSelector } from "@/components/submission-form-selector";

const pageDescription = "Share a useful contest-math resource or some feedback. Every resource submission is reviewed before publication.";

export const metadata: Metadata = {
  title: "Submit Resources/Feedback | WWP South Math Club",
  description: pageDescription,
};

export default function SubmitResourcesFeedbackPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex-1 bg-slate-50/75 py-12 sm:py-16">
        <div className="site-container max-w-3xl">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">Community submissions</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Submit Resources/Feedback</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              {pageDescription}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_5px_18px_rgba(15,23,42,0.045)] sm:p-8">
            <SubmissionFormSelector />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
