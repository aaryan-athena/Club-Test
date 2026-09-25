import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningResourcesPage } from "@/components/learning-resources-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PracticeToolsPage } from "@/components/practice-tools-page";
import { SubjectResourcesPage } from "@/components/subject-resources-page";
import { CombinatoricsHandoutsPage } from "@/handouts/combinatorics";
import { NumberTheoryHandoutsPage } from "@/handouts/number-theory";
import { SUBJECTS, type SubjectSlug } from "@/lib/resources/types";

const pages = {
  "number-theory": {
    title: "Number Theory",
    description: "Curated number theory materials are coming next.",
  },
  geometry: {
    title: "Geometry",
    description: "Curated geometry materials are coming next.",
  },
  combinatorics: {
    title: "Combinatorics",
    description: "Curated combinatorics materials are coming next.",
  },
  algebra: {
    title: "Algebra",
    description: "Curated algebra materials are coming next.",
  },
  "study-resources": {
    title: "Study Resources",
    description: "The study resource library is coming next.",
  },
  "practice-tools": {
    title: "Practice Tools",
    description: "Contest practice tools are coming next.",
  },
} as const;

type PageSlug = keyof typeof pages;

// Render per request so resources approved in the admin (or edited in the Firebase
// console) appear immediately, and builds don't need Firestore access.
export const dynamic = "force-dynamic";

export default async function PlaceholderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug as PageSlug];

  if (!page) notFound();

  if (slug === "combinatorics") {
    return <CombinatoricsHandoutsPage />;
  }

  if (slug === "number-theory") {
    return <NumberTheoryHandoutsPage />;
  }

  if (slug === "practice-tools") {
    return <PracticeToolsPage />;
  }

  if (slug === "study-resources") {
    return <LearningResourcesPage />;
  }

  const subject = SUBJECTS.find((entry) => entry.value === slug);
  if (subject) {
    return <SubjectResourcesPage subject={slug as SubjectSlug} title={subject.label} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="site-container flex flex-1 items-center py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">SMC Resources</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{page.description}</p>
          <Link href="/" className="mt-8 inline-flex rounded-lg bg-emerald-800 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3">
            Return home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
