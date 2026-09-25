import {
  addResourceAction,
  deleteResourceAction,
  updateResourceAction,
} from "@/app/admin/actions";
import { AdminResourceFields } from "@/components/admin-resource-fields";
import { getApprovedResources } from "@/lib/resources/storage";

function notice(params: Record<string, string | undefined>) {
  if (params.error) return { error: true, text: params.error };
  if (params.added) return { error: false, text: "Resource added and published." };
  if (params.saved) return { error: false, text: "Resource changes saved." };
  if (params.deleted) return { error: false, text: "Resource deleted." };
  return null;
}

export default async function AdminResourcesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const [resources, params] = await Promise.all([getApprovedResources(), searchParams]);
  const message = notice(params);
  resources.sort((a, b) => a.subject.localeCompare(b.subject) || a.topic.localeCompare(b.topic) || a.title.localeCompare(b.title));

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Approved resources</h1>
      <p className="mt-2 text-slate-600">Resources here are public. Hardcoded page resources remain in their existing source files.</p>
      {message ? <p role={message.error ? "alert" : "status"} className={`mt-5 rounded-lg border px-4 py-3 text-sm ${message.error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-900"}`}>{message.text}</p> : null}

      <section id="add-resource" className="mt-7 scroll-mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
        <h2 className="text-xl font-bold">Add a resource manually</h2>
        <form action={addResourceAction} className="mt-5">
          <AdminResourceFields idPrefix="new-resource" />
          <button className="mt-5 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Add and publish</button>
        </form>
      </section>

      <div className="mt-8 grid gap-5 xl:grid-cols-2">
        {resources.map((resource) => (
          <article key={resource.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <form>
              <input type="hidden" name="id" value={resource.id} />
              <AdminResourceFields values={resource} idPrefix={`resource-${resource.id}`} />
              <div className="mt-5 flex gap-2 border-t border-slate-200 pt-4">
                <button formAction={updateResourceAction} className="rounded-lg bg-emerald-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-900">Save changes</button>
                <button formAction={deleteResourceAction} className="ml-auto rounded-lg border border-red-300 px-3.5 py-2 text-sm font-semibold text-red-800 hover:bg-red-50">Delete</button>
              </div>
            </form>
          </article>
        ))}
      </div>
      {resources.length === 0 ? <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No stored approved resources yet.</div> : null}
    </div>
  );
}
