export type OfficialContest = {
  title: string;
  url: string;
  section: "MAA Competitions" | "College Hosted";
  description: string;
};

export const officialContests: OfficialContest[] = [
  {
    title: "AMC 10",
    url: "https://artofproblemsolving.com/wiki/index.php?title=AMC_10_Problems_and_Solutions",
    section: "MAA Competitions",
    description:
      "A 25-question competition for students in grade 10 or below, covering algebra, number theory, geometry, and combinatorics.",
  },
  {
    title: "AMC 12",
    url: "https://artofproblemsolving.com/wiki/index.php?title=AMC_12_Problems_and_Solutions",
    section: "MAA Competitions",
    description:
      "A 25-question competition for high school students, covering AMC 10 topics plus trigonometry, complex numbers, and logarithms.",
  },
  {
    title: "AIME",
    url: "https://artofproblemsolving.com/wiki/index.php?title=AIME_Problems_and_Solutions",
    section: "MAA Competitions",
    description:
      "A 15-question invitational competition for high-scoring AMC 10 and AMC 12 participants.",
  },
  {
    title: "CMIMC",
    url: "https://cmimc.math.cmu.edu/math/past-problems",
    section: "College Hosted",
    description:
      "A Carnegie Mellon-hosted competition featuring individual and team rounds for high school students.",
  },
  {
    title: "MMATHS",
    url: "https://www.mmaths.org/archive",
    section: "College Hosted",
    description:
      "A tournament hosted at Yale with individual, team, and collaborative problem-solving rounds.",
  },
  {
    title: "Girls in Math",
    url: "https://www.mmaths.org/archive",
    section: "College Hosted",
    description:
      "A tournament hosted at Yale with a format similar to MMATHS, specifically for female students interested in mathematics.",
  },
  {
    title: "PUMaC",
    url: "https://jason-shi-f9dm.squarespace.com/archives",
    section: "College Hosted",
    description:
      "A competition hosted at Princeton featuring subject-specific individual tests and team rounds.",
  },
  {
    title: "Stanford Math Tournament",
    url: "https://www.stanfordmathtournament.org/past-tests/problems",
    section: "College Hosted",
    description:
      "A competition hosted at Stanford with individual subject tests, a general test, and team-based rounds.",
  },
  {
    title: "ARML",
    url: "https://arml3.com/arml-books/",
    section: "College Hosted",
    description:
      "A national team-based mathematics competition featuring individual, team, relay, and power rounds.",
  },
  {
    title: "HMMT",
    url: "https://www.hmmt.org/www/archive/problems",
    section: "College Hosted",
    description:
      "A tournament hosted at MIT and Harvard featuring individual subject tests and team-based rounds.",
  },
];
