import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";

const footerGroups = [
  {
    title: "Subjects",
    links: [
      { label: "Number Theory", href: "/number-theory" },
      { label: "Geometry", href: "/geometry" },
      { label: "Combinatorics", href: "/combinatorics" },
      { label: "Algebra", href: "/algebra" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Official Past Contests", href: "/practice-contests/official" },
      { label: "Mock Test Filter", href: "/practice-contests/mock-recommender" },
      { label: "Study Resources", href: "/study-resources" },
      { label: "Practice Tools", href: "/practice-tools" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Submit Resources/Feedback", href: "/submit-resource" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="site-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.7fr_1fr_0.8fr] lg:gap-14">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-sm text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3"
          >
            <BrandMark className="h-12 w-12" />
            <span className="sr-only">WWP South Math Club Resources home</span>
          </Link>
          <p className="mt-4 max-w-52 text-sm leading-6 text-slate-600">
            Created and maintained by Sparsh Vermani.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-bold text-slate-950">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-slate-600 transition-colors hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
