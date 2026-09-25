import { BulkImportForm } from "@/components/bulk-import-form";

export default function AdminImportPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Bulk import</h1>
      <p className="mt-2 max-w-3xl leading-7 text-slate-600">
        Paste or upload a JSON array, review it, then import every valid row as pending or approved. Missing URLs are rejected rather than invented.
      </p>
      <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <BulkImportForm />
      </div>
    </div>
  );
}
