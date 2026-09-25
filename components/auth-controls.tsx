"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAction } from "@/app/auth/actions";

type Viewer = { email: string; name: string | null; isAdmin: boolean };

// undefined = still loading; null = signed out.
function useViewer() {
  const pathname = usePathname();
  const [viewer, setViewer] = useState<Viewer | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/session", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { user: null }))
      .then((data: { user: Viewer | null }) => {
        if (!cancelled) setViewer(data.user);
      })
      .catch(() => {
        if (!cancelled) setViewer(null);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return viewer;
}

const outlineButton = "inline-flex shrink-0 items-center whitespace-nowrap justify-center rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-700/40 hover:bg-emerald-50/60 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";
const solidButton = "inline-flex shrink-0 items-center whitespace-nowrap justify-center rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2";

export function AuthControls({ layout, onNavigate }: { layout: "bar" | "menu"; onNavigate?: () => void }) {
  const viewer = useViewer();
  const isMenu = layout === "menu";
  const wrapperClass = isMenu ? "grid grid-cols-2 gap-2" : "flex items-center gap-2";
  const sizing = isMenu ? " py-2.5 text-sm" : "";

  // Reserve space while loading so the header doesn't jump.
  if (viewer === undefined) return <div aria-hidden="true" className={isMenu ? "h-10" : "h-8 w-40"} />;

  if (!viewer) {
    return (
      <div className={wrapperClass}>
        <Link href="/login" onClick={onNavigate} className={outlineButton + sizing}>Log in</Link>
        <Link href="/signup" onClick={onNavigate} className={solidButton + sizing}>Sign up</Link>
      </div>
    );
  }

  const label = viewer.name || viewer.email;

  return (
    <div className={isMenu ? "grid gap-2" : "flex items-center gap-2"}>
      <span title={viewer.email} className={`truncate text-xs font-medium text-slate-600 ${isMenu ? "px-3 text-sm" : "max-w-40"}`}>
        {isMenu ? `Signed in as ${label}` : label}
      </span>
      <div className={wrapperClass}>
        {viewer.isAdmin ? <Link href="/admin" onClick={onNavigate} className={solidButton + sizing}>Admin</Link> : null}
        <form action={logoutAction} className={viewer.isAdmin ? "" : "col-span-2"}>
          <button type="submit" className={`${outlineButton}${sizing} w-full`}>Sign out</button>
        </form>
      </div>
    </div>
  );
}
