"use client";

import { useActionState, useState } from "react";
import { bulkImportAction, type BulkImportState } from "@/app/admin/actions";

const example = JSON.stringify([
  {
    title: "Example Counting Handout",
    subject: "combinatorics",
    topic: "Counting",
    level: "AIME Qualifying Handouts",
    url: "https://example.com/handout.pdf",
    solution: "https://example.com/solutions.pdf",
    type: "Handout",
  },
], null, 2);
const initialBulkImportState: BulkImportState = { success: false, message: "", errors: [] };

type PreviewRow = { title?: unknown; subject?: unknown; topic?: unknown; url?: unknown };

export function BulkImportForm() {
  const [state, action, pending] = useActionState(bulkImportAction, initialBulkImportState);
  const [payload, setPayload] = useState(example);
  const [preview, setPreview] = useState<PreviewRow[] | null>(null);
  const [previewError, setPreviewError] = useState("");

  function review() {
    try {
      const parsed: unknown = JSON.parse(payload);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Use a non-empty JSON array.");
      setPreview(parsed as PreviewRow[]);
      setPreviewError("");
    } catch (error) {
      setPreview(null);
      setPreviewError(error instanceof Error ? error.message : "Invalid JSON.");
    }
  }

  async function loadFile(file?: File) {
    if (!file) return;
    setPayload(await file.text());
    setPreview(null);
    setPreviewError("");
  }

  return (
    <form action={action} className="space-y-5">
      {state.message ? <p role={state.success ? "status" : "alert"} className={`rounded-lg border px-4 py-3 text-sm ${state.success ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-800"}`}>{state.message}</p> : null}
      {state.errors.length > 0 ? <ul className="list-disc space-y-1 rounded-lg border border-red-200 bg-red-50 px-8 py-4 text-sm text-red-800">{state.errors.map((error) => <li key={error}>{error}</li>)}</ul> : null}

      <div>
        <label htmlFor="import-file" className="text-sm font-semibold text-slate-800">Upload JSON file <span className="font-normal text-slate-500">(optional)</span></label>
        <input id="import-file" type="file" accept="application/json,.json" onChange={(event) => loadFile(event.target.files?.[0])} className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:font-semibold file:text-slate-700 hover:file:bg-slate-200" />
      </div>
      <div>
        <label htmlFor="payload" className="text-sm font-semibold text-slate-800">JSON entries</label>
        <textarea id="payload" name="payload" rows={18} required value={payload} onChange={(event) => { setPayload(event.target.value); setPreview(null); }} className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-100 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/30" />
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-slate-800">Import as</label>
          <select id="status" name="status" className="mt-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm">
            <option value="pending">Pending review</option>
            <option value="approved">Approved and public</option>
          </select>
        </div>
        <button type="button" onClick={review} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Review entries</button>
        <button type="submit" disabled={pending || !preview} className="rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50">{pending ? "Importing…" : "Import reviewed entries"}</button>
      </div>

      {previewError ? <p role="alert" className="text-sm text-red-700">{previewError}</p> : null}
      {preview ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600"><tr><th className="px-4 py-3">#</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Topic</th><th className="px-4 py-3">URL</th></tr></thead>
            <tbody className="divide-y divide-slate-200 bg-white">{preview.map((row, index) => <tr key={index}><td className="px-4 py-3">{index + 1}</td><td className="px-4 py-3 font-medium">{String(row.title ?? "")}</td><td className="px-4 py-3">{String(row.subject ?? "")}</td><td className="px-4 py-3">{String(row.topic ?? "")}</td><td className="max-w-xs truncate px-4 py-3">{String(row.url ?? "")}</td></tr>)}</tbody>
          </table>
        </div>
      ) : null}
    </form>
  );
}
