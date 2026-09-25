import Link from "next/link";
import { logoutAction } from "@/app/auth/actions";
import { BrandMark } from "@/components/brand-mark";
import { requireAdmin } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/submissions", label: "Resource submissions" },
  { href: "/admin/feedback", label: "Feedback" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/import", label: "Bulk import" },
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/admin" className="flex items-center gap-2.5 font-bold text-emerald-800">
            <BrandMark className="h-8 w-8" />
            Resource Admin
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="hidden sm:inline">{session.email}</span>
            <form action={logoutAction}><button className="rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 hover:bg-slate-50">Sign out</button></form>
          </div>
        </div>
        <nav aria-label="Admin navigation" className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 sm:px-8">
          {links.map((link) => <Link key={link.href} href={link.href} className="whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-semibold text-slate-600 hover:border-emerald-700 hover:text-emerald-900">{link.label}</Link>)}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
