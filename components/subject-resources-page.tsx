import { HandoutCard } from "@/components/handout-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicResources } from "@/lib/resources/storage";
import { RESOURCE_LEVELS, type ApprovedResourceRecord, type SubjectSlug } from "@/lib/resources/types";

const trackNames: Record<(typeof RESOURCE_LEVELS)[number], string> = {
  "AIME Qualifying Handouts": "AIME Qualifier",
  "Advanced Handouts": "Advanced Contest",
};

function TopicSection({ topic, resources }: { topic: string; resources: ApprovedResourceRecord[] }) {
  const topicResources = resources.filter((resource) => resource.topic === topic);
  const id = `topic-${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="text-lg font-semibold tracking-tight text-slate-950">{topic}</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicResources.map((resource) => (
          <HandoutCard key={resource.id} title={resource.title} topic={resource.topic} level={resource.level} url={resource.url} solutionUrl={resource.solution} />
        ))}
      </div>
    </section>
  );
}

export async function SubjectResourcesPage({
  subject,
  title,
}: {
  subject: SubjectSlug;
  title: string;
}) {
  const resources = await getPublicResources(subject);

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-slate-200 py-12 sm:py-16">
          <div className="site-container max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">SMC Resources</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{title} Handouts</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Approved contest-math resources organized by track and topic.</p>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-slate-50/75 py-12 sm:py-16">
          <div className="site-container space-y-16">
            {RESOURCE_LEVELS.map((level) => {
              const trackResources = resources.filter((resource) => resource.level === level);
              const topics = Array.from(new Set(trackResources.map((resource) => resource.topic)));
              if (trackResources.length === 0) return null;
              return (
                <section key={level} aria-labelledby={`${subject}-${level}`}>
                  <div className="border-b border-emerald-800/20 pb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Track</p>
                    <h2 id={`${subject}-${level}`} className="mt-2 text-3xl font-bold tracking-tight">{trackNames[level]}</h2>
                  </div>
                  <div className="mt-8 space-y-10">
                    {topics.map((topic) => <TopicSection key={topic} topic={topic} resources={trackResources} />)}
                  </div>
                </section>
              );
            })}
            {resources.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                <h2 className="text-xl font-semibold">Curated resources are coming next.</h2>
                <p className="mt-2 text-slate-600">Approved community submissions will appear here.</p>
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
