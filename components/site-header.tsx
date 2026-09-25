"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "@/components/icons";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "Number Theory", href: "/number-theory" },
  { label: "Geometry", href: "/geometry" },
  { label: "Combinatorics", href: "/combinatorics" },
  { label: "Algebra", href: "/algebra" },
];

const trailingLinks = [
  { label: "Study Resources", href: "/study-resources" },
  { label: "Practice Tools", href: "/practice-tools" },
  { label: "Submit Resources/Feedback", href: "/submit-resource" },
];

const contestLinks = [
  { label: "Official Contests", href: "/practice-contests/official" },
  { label: "Mock Test Filter", href: "/practice-contests/mock-recommender" },
];

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const desktopLinkClass = (href: string) =>
    `relative whitespace-nowrap px-1 py-5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none ${
      isCurrent(pathname, href)
        ? "text-emerald-800 after:absolute after:inset-x-0 after:bottom-2.5 after:h-0.5 after:bg-emerald-700"
        : "text-slate-800 hover:text-emerald-800"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-[0_2px_10px_rgba(15,23,42,0.035)] backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between gap-5 px-5 sm:px-7">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-sm text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark className="h-8 w-8 shrink-0" />
          <span className="truncate text-sm font-bold tracking-tight sm:text-base">
            WWP South Math Club Resources
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden min-[1180px]:flex min-[1180px]:items-center min-[1180px]:gap-4">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}

          <div className="group relative">
            <button
              type="button"
              aria-haspopup="true"
              className={`${desktopLinkClass("/practice-contests")} flex items-center gap-1`}
            >
              Practice Contests
              <ChevronDownIcon className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute left-1/2 top-[51px] w-52 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 motion-reduce:transition-none">
              {contestLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {trailingLinks.map((link) => (
            <Link key={link.href} href={link.href} className={desktopLinkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 min-[1180px]:hidden"
        >
          {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-slate-200 bg-white px-5 py-4 shadow-lg min-[1180px]:hidden">
          <div className="mx-auto grid max-w-3xl gap-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                  isCurrent(pathname, link.href)
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Practice Contests
            </p>
            {contestLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                {link.label}
              </Link>
            ))}
            {trailingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                  isCurrent(pathname, link.href)
                    ? "bg-emerald-50 text-emerald-900"
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
