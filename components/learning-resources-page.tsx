import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { YouTubeChannelCard } from "@/components/youtube-channel-card";
import { mathYouTubeChannels } from "@/lib/learning-resources";

export function LearningResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-slate-200 py-12 sm:py-16">
          <div className="site-container max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">
              SMC Resources
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Learning Resources
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Learn contest mathematics through trusted lessons, explanations,
              and guided problem solving.
            </p>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-slate-50/75 py-12 sm:py-16">
          <section
            aria-labelledby="math-youtube-channels"
            className="site-container"
          >
            <div className="flex items-center gap-4 border-b border-emerald-800/20 pb-4">
              <span
                aria-hidden="true"
                className="h-8 w-1 rounded-full bg-amber-400"
              />
              <h2
                id="math-youtube-channels"
                className="text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Math YouTube Channels
              </h2>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {mathYouTubeChannels.map((channel) => (
                <YouTubeChannelCard key={channel.url} {...channel} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
