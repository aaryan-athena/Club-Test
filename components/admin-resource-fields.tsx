import { RESOURCE_LEVELS, RESOURCE_TYPES, SUBJECTS, type ResourceFields } from "@/lib/resources/types";

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20";
const labelClass = "block text-xs font-bold uppercase tracking-wide text-slate-600";

export function AdminResourceFields({ values, idPrefix }: { values?: Partial<ResourceFields>; idPrefix: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-title`} className={labelClass}>Title</label>
        <input id={`${idPrefix}-title`} name="title" required defaultValue={values?.title} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-subject`} className={labelClass}>Subject</label>
        <select id={`${idPrefix}-subject`} name="subject" required defaultValue={values?.subject ?? ""} className={inputClass}>
          <option value="" disabled>Choose subject</option>
          {SUBJECTS.map((subject) => <option key={subject.value} value={subject.value}>{subject.label}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-topic`} className={labelClass}>Topic</label>
        <input id={`${idPrefix}-topic`} name="topic" required defaultValue={values?.topic} className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-level`} className={labelClass}>Level</label>
        <input id={`${idPrefix}-level`} name="level" required list={`${idPrefix}-levels`} defaultValue={values?.level} className={inputClass} />
        <datalist id={`${idPrefix}-levels`}>{RESOURCE_LEVELS.map((level) => <option key={level} value={level} />)}</datalist>
      </div>
      <div>
        <label htmlFor={`${idPrefix}-type`} className={labelClass}>Type</label>
        <input id={`${idPrefix}-type`} name="type" required list={`${idPrefix}-types`} defaultValue={values?.type} className={inputClass} />
        <datalist id={`${idPrefix}-types`}>{RESOURCE_TYPES.map((type) => <option key={type} value={type} />)}</datalist>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-url`} className={labelClass}>URL</label>
        <input id={`${idPrefix}-url`} name="url" type="url" required defaultValue={values?.url} className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-solution`} className={labelClass}>Solution URL</label>
        <input id={`${idPrefix}-solution`} name="solution" type="url" defaultValue={values?.solution} className={inputClass} />
      </div>
    </div>
  );
}
