"use client";

import { useMemo, useState } from "react";
import { ExternalLink } from "@/components/external-link";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, FilterIcon } from "@/components/icons";
import {
  EMPTY_MOCK_FILTERS,
  MOCK_YEARS,
  RELATIVE_DIFFICULTIES,
  SOLUTION_QUALITIES,
  TARGET_COMPETITIONS,
  filterMockContests,
  type MockContest,
  type MockFilters,
} from "@/lib/mock-contests";

type FilterKey = keyof MockFilters;

type FilterGroupProps<T extends string | number> = {
  id: string;
  label: string;
  options: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
  onSelectAll: () => void;
  compact?: boolean;
};

function FilterGroup<T extends string | number>({
  id,
  label,
  options,
  selected,
  onToggle,
  onSelectAll,
  compact = false,
}: FilterGroupProps<T>) {
  const allSelected = selected.length === options.length;

  return (
    <fieldset className="border-t border-slate-200 pt-5 first:border-0 first:pt-0">
      <div className="flex items-center justify-between gap-3">
        <legend className="text-sm font-bold text-slate-950">{label}</legend>
        <button
          type="button"
          aria-pressed={allSelected}
          onClick={onSelectAll}
          className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none ${
            allSelected
              ? "bg-emerald-100 text-emerald-900"
              : "text-emerald-800 hover:bg-emerald-50"
          }`}
        >
          All
        </button>
      </div>
      <div className={`mt-3 ${compact ? "grid grid-cols-3 gap-2" : "space-y-2"}`}>
        {options.map((option) => {
          const inputId = `${id}-${String(option).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          return (
            <label
              key={option}
              htmlFor={inputId}
              className={`flex min-h-9 cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-sm transition-colors motion-reduce:transition-none ${
                selected.includes(option)
                  ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950"
                  : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <input
                id={inputId}
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="h-4 w-4 shrink-0 accent-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const competitionBadgeStyles: Record<MockContest["targetCompetition"], string> = {
  "AMC 10": "bg-emerald-100 text-emerald-900",
  "AMC 12": "bg-sky-100 text-sky-900",
  AIME: "bg-amber-100 text-amber-950",
};

function MockContestCard({ contest }: { contest: MockContest }) {
  return (
    <article className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.045)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-800/25 hover:shadow-[0_10px_26px_rgba(15,23,42,0.07)] focus-within:border-emerald-800/30 motion-reduce:transform-none motion-reduce:transition-none">
      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${competitionBadgeStyles[contest.targetCompetition]}`}>
          {contest.targetCompetition}
        </span>
        <span className="text-sm font-semibold tabular-nums text-slate-500">{contest.year}</span>
      </div>

      <h2 className="mt-4 text-lg font-semibold leading-7 tracking-tight text-slate-950">{contest.name}</h2>

      <dl className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
        <div>
          <dt className="sr-only">Relative difficulty</dt>
          <dd className="rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-700">{contest.relativeDifficulty}</dd>
        </div>
        <div>
          <dt className="sr-only">Solution quality</dt>
          <dd className="rounded-md bg-slate-100 px-2.5 py-1.5 text-slate-700">{contest.solutionQuality}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap gap-2 pt-6">
        <ExternalLink
          href={contest.url}
          className="group/link inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none"
        >
          View Contest
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
        </ExternalLink>
        {contest.solutionUrl ? (
          <ExternalLink
            href={contest.solutionUrl}
            className="group/link inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            View Solutions
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
          </ExternalLink>
        ) : null}
      </div>
    </article>
  );
}

function toggleValue<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function MockContestBrowser({ contests }: { contests: MockContest[] }) {
  const [filters, setFilters] = useState<MockFilters>(EMPTY_MOCK_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const matchingContests = useMemo(
    () => filterMockContests(contests, filters, searchQuery),
    [contests, filters, searchQuery],
  );
  const activeFilterCount = Object.values(filters).reduce((count, values) => count + values.length, 0);
  const hasActiveSearch = searchQuery.trim().length > 0;
  const activeCriteriaCount = activeFilterCount + (hasActiveSearch ? 1 : 0);
  const hasActiveFilters = activeCriteriaCount > 0;

  function toggleFilter<K extends FilterKey>(key: K, value: MockFilters[K][number]) {
    setFilters((current) => ({
      ...current,
      [key]: toggleValue(current[key] as MockFilters[K][number][], value),
    }));
  }

  function selectAll<K extends FilterKey>(key: K, values: MockFilters[K]) {
    setFilters((current) => ({ ...current, [key]: [...values] }));
  }

  function clearFilters() {
    setFilters(EMPTY_MOCK_FILTERS);
    setSearchQuery("");
  }

  const activeChips = [
    ...filters.targetCompetition.map((value) => ({ key: "targetCompetition" as const, value, label: value })),
    ...filters.relativeDifficulty.map((value) => ({ key: "relativeDifficulty" as const, value, label: value })),
    ...filters.year.map((value) => ({ key: "year" as const, value, label: String(value) })),
    ...filters.solutionQuality.map((value) => ({ key: "solutionQuality" as const, value, label: value })),
  ];

  return (
    <main className="flex-1">
      <header className="border-b border-slate-200 py-12 sm:py-16">
        <div className="site-container max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">Practice Contests</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Mock Contests</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Find a practice contest that matches your target competition, preferred difficulty, year, and solution needs.
          </p>
        </div>
      </header>

      <div className="border-b border-slate-200 bg-slate-50/75 py-8 sm:py-12">
        <div className="site-container">
          <button
            type="button"
            aria-expanded={filtersOpen}
            aria-controls="mock-filter-panel"
            onClick={() => setFiltersOpen((open) => !open)}
            className="flex min-h-11 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 lg:hidden"
          >
            <span className="flex items-center gap-2">
              <FilterIcon className="h-5 w-5 text-emerald-800" />
              Filters {hasActiveFilters ? `(${activeCriteriaCount})` : ""}
            </span>
            <ChevronDownIcon className={`h-5 w-5 transition-transform motion-reduce:transition-none ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          <div className="mt-5 grid items-start gap-7 lg:mt-0 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
            <aside
              id="mock-filter-panel"
              aria-label="Mock contest filters"
              tabIndex={0}
              className={`${filtersOpen ? "block" : "hidden"} max-h-[70vh] overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.045)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)]`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-lg font-bold tracking-tight text-slate-950">Filter mocks</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="rounded-md px-2 py-1 text-xs font-semibold text-emerald-800 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline"
                >
                  Clear Filters
                </button>
              </div>

              <div className="space-y-5">
                <FilterGroup
                  id="competition"
                  label="Target Competition"
                  options={TARGET_COMPETITIONS}
                  selected={filters.targetCompetition}
                  onToggle={(value) => toggleFilter("targetCompetition", value)}
                  onSelectAll={() => selectAll("targetCompetition", [...TARGET_COMPETITIONS])}
                />
                <FilterGroup
                  id="difficulty"
                  label="Relative Difficulty"
                  options={RELATIVE_DIFFICULTIES}
                  selected={filters.relativeDifficulty}
                  onToggle={(value) => toggleFilter("relativeDifficulty", value)}
                  onSelectAll={() => selectAll("relativeDifficulty", [...RELATIVE_DIFFICULTIES])}
                />
                <FilterGroup
                  id="year"
                  label="Year"
                  options={MOCK_YEARS}
                  selected={filters.year}
                  onToggle={(value) => toggleFilter("year", value)}
                  onSelectAll={() => selectAll("year", [...MOCK_YEARS])}
                  compact
                />
                <FilterGroup
                  id="solutions"
                  label="Solution Quality"
                  options={SOLUTION_QUALITIES}
                  selected={filters.solutionQuality}
                  onToggle={(value) => toggleFilter("solutionQuality", value)}
                  onSelectAll={() => selectAll("solutionQuality", [...SOLUTION_QUALITIES])}
                />
              </div>
            </aside>

            <section aria-labelledby="mock-results-heading" className="min-w-0">
              <div>
                <label htmlFor="mock-name-search" className="sr-only">
                  Search mock contests by name
                </label>
                <input
                  id="mock-name-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search mocks by name…"
                  className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20 motion-reduce:transition-none"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <h2 id="mock-results-heading" aria-live="polite" className="text-lg font-bold tracking-tight text-slate-950">
                  Showing {matchingContests.length} {matchingContests.length === 1 ? "mock" : "mocks"}
                </h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex min-h-10 items-center rounded-lg border border-emerald-800 px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 motion-reduce:transition-none"
                >
                  Browse All Mocks
                </button>
              </div>

              {activeChips.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
                  {activeChips.map((chip) => (
                    <button
                      key={`${chip.key}-${chip.value}`}
                      type="button"
                      onClick={() => toggleFilter(chip.key, chip.value)}
                      aria-label={`Remove ${chip.label} filter`}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-950 hover:border-emerald-400 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                      {chip.label}
                      <CloseIcon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              ) : null}

              {matchingContests.length > 0 ? (
                <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {matchingContests.map((contest) => (
                    <MockContestCard key={`${contest.targetCompetition}-${contest.year}-${contest.name}`} contest={contest} />
                  ))}
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                    <FilterIcon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">No mock contests match these filters.</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">Try removing a filter, or reset the page to browse the complete collection.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-emerald-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                  >
                    Browse All Mocks
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
