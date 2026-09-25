import { OfficialContestCard } from "@/components/official-contest-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  officialContests,
  type OfficialContest,
} from "@/lib/official-contests";

const sections: OfficialContest["section"][] = [
  "MAA Competitions",
  "College Hosted",
];

export function OfficialContestsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-slate-200 py-12 sm:py-16">
          <div className="site-container max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">
              Practice Contests
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Official Past Contests
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Past contests from the most prestigious national and
              college-hosted mathematics competitions.
            </p>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-slate-50/75 py-12 sm:py-16">
          <div className="site-container space-y-16">
            {sections.map((section) => {
              const contests = officialContests.filter(
                (contest) => contest.section === section,
              );
              const sectionId = section.toLowerCase().replaceAll(" ", "-");

              return (
                <section key={section} aria-labelledby={sectionId}>
                  <div className="flex items-center gap-4 border-b border-emerald-800/20 pb-4">
                    <span
                      aria-hidden="true"
                      className="h-8 w-1 rounded-full bg-amber-400"
                    />
                    <h2
                      id={sectionId}
                      className="text-2xl font-bold tracking-tight sm:text-3xl"
                    >
                      {section}
                    </h2>
                  </div>
                  <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {contests.map((contest) => (
                      <OfficialContestCard key={contest.title} {...contest} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
