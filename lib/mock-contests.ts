import mockContestData from "@/data/mocks.json";

export const TARGET_COMPETITIONS = ["AMC 10", "AMC 12", "AIME"] as const;
export const RELATIVE_DIFFICULTIES = [
  "Easier than Official",
  "Accurate Difficulty",
  "Harder than Official",
] as const;
export const MOCK_YEARS = Array.from({ length: 15 }, (_, index) => 2024 - index);
export const SOLUTION_QUALITIES = [
  "Not Included",
  "Answer Key Only",
  "Brief Solutions",
  "High Quality Solutions",
] as const;

export type TargetCompetition = (typeof TARGET_COMPETITIONS)[number];
export type RelativeDifficulty = (typeof RELATIVE_DIFFICULTIES)[number];
export type SolutionQuality = (typeof SOLUTION_QUALITIES)[number];

export type MockContest = {
  name: string;
  targetCompetition: TargetCompetition;
  relativeDifficulty: RelativeDifficulty;
  year: number;
  solutionQuality: SolutionQuality;
  url: string;
  solutionUrl?: string;
};

export type MockFilters = {
  targetCompetition: TargetCompetition[];
  relativeDifficulty: RelativeDifficulty[];
  year: number[];
  solutionQuality: SolutionQuality[];
};

export const EMPTY_MOCK_FILTERS: MockFilters = {
  targetCompetition: [],
  relativeDifficulty: [],
  year: [],
  solutionQuality: [],
};

export const mockContests = mockContestData as MockContest[];

function allows<T>(selected: T[], value: T) {
  return selected.length === 0 || selected.includes(value);
}

export function filterMockContests(
  contests: MockContest[],
  filters: MockFilters,
  searchQuery = "",
) {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return contests.filter(
    (contest) =>
      contest.name.toLowerCase().includes(normalizedSearch) &&
      allows(filters.targetCompetition, contest.targetCompetition) &&
      allows(filters.relativeDifficulty, contest.relativeDifficulty) &&
      allows(filters.year, contest.year) &&
      allows(filters.solutionQuality, contest.solutionQuality),
  );
}
