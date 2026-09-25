import { ExternalLink } from "@/components/external-link";
import { ArrowRightIcon } from "@/components/icons";
import type { MathYouTubeChannel } from "@/lib/learning-resources";

type YouTubeChannelCardProps = MathYouTubeChannel;

export function YouTubeChannelCard({
  title,
  url,
  description,
}: YouTubeChannelCardProps) {
  return (
    <ExternalLink
      href={url}
      aria-label={`Visit ${title} on YouTube (opens in a new tab)`}
      className="group flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_5px_18px_rgba(15,23,42,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-800/25 hover:shadow-[0_10px_26px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <h3 className="text-xl font-bold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-lg bg-emerald-800 px-1.5 py-2.5 text-xs font-semibold text-white transition-colors group-hover:bg-emerald-900">
        Visit Channel
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
      </span>
    </ExternalLink>
  );
}
