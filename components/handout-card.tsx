import { ArrowRightIcon } from "@/components/icons";
import { ExternalLink } from "@/components/external-link";

export type HandoutCardProps = {
  title: string;
  topic: string;
  level: string;
  url: string;
  solutionUrl?: string;
};

export function HandoutCard({ title, url, solutionUrl }: HandoutCardProps) {
  return (
    <article className="flex min-h-40 flex-col rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_5px_18px_rgba(15,23,42,0.045)]">
      <h3 className="text-base font-semibold leading-6 text-slate-950">
        {title}
      </h3>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
        <ExternalLink
          href={url}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          View handout
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </ExternalLink>

        {solutionUrl ? (
          <ExternalLink
            href={solutionUrl}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 underline-offset-4 hover:text-emerald-800 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            View solution
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}
