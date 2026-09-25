import { notFound } from "next/navigation";
import { MockContestBrowser } from "@/components/mock-contest-browser";
import { OfficialContestsPage } from "@/components/official-contests-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { mockContests } from "@/lib/mock-contests";

const contestPages = {
  official: {
    title: "Official Past Contests",
  },
  "mock-recommender": {
    title: "Mock Contests",
  },
} as const;

type ContestView = keyof typeof contestPages;

export function generateStaticParams() {
  return Object.keys(contestPages).map((view) => ({ view }));
}

export default async function ContestPlaceholderPage({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const page = contestPages[view as ContestView];

  if (!page) notFound();

  if (view === "official") {
    return <OfficialContestsPage />;
  }

  if (view === "mock-recommender") {
    return (
      <div className="flex min-h-screen flex-col bg-white text-slate-950">
        <SiteHeader />
        <MockContestBrowser contests={mockContests} />
        <SiteFooter />
      </div>
    );
  }

  notFound();
}
