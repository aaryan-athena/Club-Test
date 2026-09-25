import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRightIcon } from "@/components/icons";

type NavigationCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function NavigationCard({ title, description, href, icon: Icon }: NavigationCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-44 gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-6 shadow-[0_5px_18px_rgba(15,23,42,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-800/25 hover:shadow-[0_10px_26px_rgba(15,23,42,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="shrink-0 text-emerald-800">
        <Icon className="h-14 w-14" />
      </div>
      <div className="min-w-0 pr-2">
        <h3 className="text-base font-semibold leading-6 text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <ArrowRightIcon className="absolute bottom-5 right-5 h-5 w-5 text-emerald-700 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
    </Link>
  );
}
