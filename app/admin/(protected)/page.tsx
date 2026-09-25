import Link from "next/link";
import { getFeedback } from "@/lib/feedback/storage";
import { getApprovedResources, getSubmissions } from "@/lib/resources/storage";

export default async function AdminDashboardPage() {
  const [submissions, resources, feedback] = await Promise.all([
    getSubmissions(),
    getApprovedResources(),
    getFeedback(),
  ]);
  const pending = submissions.filter((item) => item.status === "pending").length;
  const rejected = submissions.filter((item) => item.status === "rejected").length;

  const cards = [
    { label: "Pending submissions", value: pending, href: "/admin/submissions" },
    { label: "Approved resources", value: resources.length, href: "/admin/resources" },
    { label: "Rejected submissions", value: rejected, href: "/admin/submissions" },
    { label: "Feedback", value: feedback.length, href: "/admin/feedback" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Admin overview</h1>
      <p className="mt-2 text-slate-600">Review community submissions and maintain approved resources.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-700/30">
            <p className="text-sm font-semibold text-slate-600">{card.label}</p>
            <p className="mt-3 text-4xl font-bold text-emerald-900">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/resources#add-resource" className="rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Add resource</Link>
        <Link href="/admin/import" className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Bulk import</Link>
      </div>
    </div>
  );
}
