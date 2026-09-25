import { HandoutCard } from "@/components/handout-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicResources } from "@/lib/resources/storage";

type NumberTheoryTrack = "AIME Qualifier" | "Advanced Contest";

type NumberTheoryResource = {
  title: string;
  topic: string;
  level: NumberTheoryTrack;
  url: string;
  solution?: string;
};

const hardcodedResources: NumberTheoryResource[] = [
  {
    title: "GCD and LCM: Notes and Practice Problems",
    topic: "GCD and LCM",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-2848-2458.pdf",
  },
  {
    title: "GCD and LCM Using Prime Factorization",
    topic: "GCD and LCM",
    level: "AIME Qualifier",
    url: "https://online.math.uh.edu/MiddleSchool/Modules/Module_1_Number_Operations/Content/Section_3p.pdf",
  },
  {
    title: "Divisibility, GCD, LCM, and Remainders",
    topic: "GCD and LCM",
    level: "AIME Qualifier",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2017/BMC-beg-divisibility-gcd-lcm.pdf",
  },
  {
    title: "Divisibility, Factors, and Contest Problems",
    topic: "Divisibility and Factors",
    level: "AIME Qualifier",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2019/06/Divisibility.pdf",
    solution: "https://iowacitymathcircle.org/wp-content/uploads/2019/06/Divisibility_Solutions_v2.pdf",
  },
  {
    title: "Divisor Counting and Factorization Problems",
    topic: "Divisibility and Factors",
    level: "AIME Qualifier",
    url: "https://www.math.cmu.edu/~mlavrov/arml/14-15/number-theory-01-25-15.pdf",
  },
  {
    title: "Divisibility and Factorization Practice Problems",
    topic: "Divisibility and Factors",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-1342-1359.pdf",
  },
  {
    title: "Divisibility Basics: Notes and Problems",
    topic: "Divisibility and Factors",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-886-969.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-887-969.pdf",
  },
  {
    title: "Divisibility and Integer Problem Solving",
    topic: "Divisibility and Factors",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-280-346.pdf",
  },
  {
    title: "Prime Factorization: Problems and Applications",
    topic: "Primes and Prime Factorization",
    level: "AIME Qualifier",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2010_2011/lectures/1011lecturespdf/PrimeFactPSBMC.pdf",
  },
  {
    title: "Prime Numbers and Factorization Problems",
    topic: "Primes and Prime Factorization",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4140-3870.pdf",
  },
  {
    title: "Primes and Factorizations: Practice Problems",
    topic: "Primes and Prime Factorization",
    level: "AIME Qualifier",
    url: "https://iowacitymathcircle.wordpress.com/wp-content/uploads/2018/08/primes-and-factorizations-handout.pdf",
    solution: "https://iowacitymathcircle.wordpress.com/wp-content/uploads/2018/08/primes-and-factorizations-answer-key.pdf",
  },
  {
    title: "Prime Numbers and Factorization Practice",
    topic: "Primes and Prime Factorization",
    level: "AIME Qualifier",
    url: "https://pleasantonmathcircle.org/assets/mat/2_9_2022_PMC_Elementary.pdf",
  },
  {
    title: "Number Bases: Notes and Problems",
    topic: "Bases",
    level: "AIME Qualifier",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2021/BMC_Int%20II_Bases.pdf",
  },
  {
    title: "Number Bases: Advanced Practice Problems",
    topic: "Bases",
    level: "AIME Qualifier",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2021/BasesBMCIntII3Mar2021Part2.pdf",
  },
  {
    title: "Challenging Number Bases Problems",
    topic: "Bases",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-419-516.pdf",
  },
  {
    title: "Digits and Bases: Contest Problems",
    topic: "Bases",
    level: "AIME Qualifier",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2023/05/Digits_and_Bases_Handout.pdf",
  },
  {
    title: "Divisibility and Number Base Applications",
    topic: "Bases",
    level: "AIME Qualifier",
    url: "https://www.nycmathteam.org/wp-content/uploads/2020/11/Divisibility_and_Bases_Lesson-2.pdf",
  },
  {
    title: "Modular Arithmetic: Notes and Practice Problems",
    topic: "Basic Modular Arithmetic",
    level: "AIME Qualifier",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2023/BMC_beginners_II_modular_arithmetic_11-8-23%20%281%29.pdf",
  },
  {
    title: "Modular Arithmetic and Number Theory Practice",
    topic: "Basic Modular Arithmetic",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3695-3278.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-3712-3278.pdf",
  },
  {
    title: "Modular Arithmetic: Contest Applications and Problems",
    topic: "Basic Modular Arithmetic",
    level: "AIME Qualifier",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/number-theory-09-11-16.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/16-17/number-theory-09-11-16-solutions.pdf",
  },
  {
    title: "Modular Arithmetic and Challenging Contest Problems",
    topic: "Basic Modular Arithmetic",
    level: "AIME Qualifier",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-13-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-13-15-solutions.pdf",
  },
  {
    title: "Modular Arithmetic: Notes, Problems, and Applications",
    topic: "Basic Modular Arithmetic",
    level: "AIME Qualifier",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2019/06/Modular_Arithmetic_v2.pdf",
    solution: "https://iowacitymathcircle.org/wp-content/uploads/2019/06/Modular_Arithmetic_Solutions_v2.pdf",
  },
  {
    title: "AMC Number Theory Problems in Increasing Difficulty",
    topic: "Mixed Level Number Theory Practice Sets",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4813-5008.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-4815-5008.pdf",
  },
  {
    title: "Prime Numbers and Mixed Number Theory",
    topic: "Mixed Level Number Theory Practice Sets",
    level: "AIME Qualifier",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2020/07/Prime_Numbers_2020.pdf",
  },
  {
    title: "Advanced Number Theory: Problems and Techniques",
    topic: "Mixed Level Number Theory Practice Sets",
    level: "AIME Qualifier",
    url: "https://holdenlee.github.io/high_school/Number%20Theory%20Part%20Two.pdf",
  },
  {
    title: "General Number Theory Practice Problems",
    topic: "Mixed Level Number Theory Practice Sets",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3695-3278.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-3712-3278.pdf",
  },
  {
    title: "Basic and Advanced Number Theory Techniques",
    topic: "Mixed Level Number Theory Practice Sets",
    level: "AIME Qualifier",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3694-3295.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-3713-3295.pdf",
  },
  {
    title: "Advanced Divisibility and Divisor Applications",
    topic: "Advanced Applications of Divisibility",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-20-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-20-15-solutions.pdf",
  },
  {
    title: "Advanced Divisibility and Number Theory Problems",
    topic: "Advanced Applications of Divisibility",
    level: "Advanced Contest",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3969-3634.pdf",
  },
  {
    title: "Euler Totient and Modular Exponentiation",
    topic: "Euler's Totient Theorem + Fermat's Little Theorem",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/number-theory-09-18-16.pdf",
  },
  {
    title: "Fermat's Little Theorem: Practice Problems",
    topic: "Euler's Totient Theorem + Fermat's Little Theorem",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-27-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-09-27-15-solutions.pdf",
  },
  {
    title: "Fermat and Euler Theorem Applications",
    topic: "Euler's Totient Theorem + Fermat's Little Theorem",
    level: "Advanced Contest",
    url: "https://programs.mcs.cmu.edu/arml/wp-content/uploads/sites/3/2023/09/numtheory-03-24-19.pdf",
  },
  {
    title: "Diophantine Equations Using Modular Arithmetic",
    topic: "Diophantine Equations",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-10-04-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/number-theory-10-04-15-solutions.pdf",
  },
  {
    title: "Diophantine Equations: Techniques and Problems",
    topic: "Diophantine Equations",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/number-theory-09-25-16.pdf",
  },
  {
    title: "Diophantine Equations: Contest Practice Problems",
    topic: "Diophantine Equations",
    level: "Advanced Contest",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3968-3633.pdf",
  },
  {
    title: "Chinese Remainder Theorem: Practice Problems",
    topic: "Chinese Remainder Theorem",
    level: "Advanced Contest",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-2821-2428.pdf",
  },
  {
    title: "Chinese Remainder Theorem and Applications",
    topic: "Chinese Remainder Theorem",
    level: "Advanced Contest",
    url: "https://bpb-us-e2.wpmucdn.com/sites.wustl.edu/dist/b/4012/files/2023/02/2009-04-19-min-chineseremainder.pdf",
  },
  {
    title: "Chinese Remainder Theorem: Notes and Examples",
    topic: "Chinese Remainder Theorem",
    level: "Advanced Contest",
    url: "https://www.math.cmu.edu/~mradclif/teaching/127S19/Notes/ChineseRemainderTheorem.pdf",
  },
  {
    title: "P-adic Valuations: Examples and Applications",
    topic: "P-adic Valuations",
    level: "Advanced Contest",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2019/p-adicexamples.pdf",
  },
  {
    title: "P-adic Valuations: Notes and Problems",
    topic: "P-adic Valuations",
    level: "Advanced Contest",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4556-4530.pdf",
  },
  {
    title: "P-adic Numbers and Valuation Problems",
    topic: "P-adic Valuations",
    level: "Advanced Contest",
    url: "https://chapelhillmathcircle.org/wp-content/uploads/2024/02/adv20240217padicnumbers.pdf",
  },
  {
    title: "Euclidean Algorithm: Introductory Problems and Applications",
    topic: "Euclidean Algorithm",
    level: "Advanced Contest",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2013_2014/lecture/1314lecturespdf/BMC-Beginners%20April%208th,%202014.pdf",
  },
  {
    title: "Euclidean Algorithm: Notes and Problems",
    topic: "Euclidean Algorithm",
    level: "Advanced Contest",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2019/Euclidean%20Algorithm%20I.pdf",
  },
  {
    title: "Euclidean Algorithm Review and Practice",
    topic: "Euclidean Algorithm",
    level: "Advanced Contest",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-1067-1096.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-1068-1096.pdf",
  },
];

const topicOrder = [
  "GCD and LCM",
  "Divisibility and Factors",
  "Primes and Prime Factorization",
  "Bases",
  "Basic Modular Arithmetic",
  "Mixed Level Number Theory Practice Sets",
  "Advanced Applications of Divisibility",
  "Euler's Totient Theorem + Fermat's Little Theorem",
  "Diophantine Equations",
  "Chinese Remainder Theorem",
  "P-adic Valuations",
  "Euclidean Algorithm",
] as const;

const tracks: NumberTheoryTrack[] = ["AIME Qualifier", "Advanced Contest"];

function topicId(track: NumberTheoryTrack, topic: string) {
  return `${track}-${topic}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function TopicGroup({
  topic,
  track,
  resources,
}: {
  topic: string;
  track: NumberTheoryTrack;
  resources: NumberTheoryResource[];
}) {
  const topicResources = resources.filter(
    (resource) => resource.topic === topic && resource.level === track,
  );
  const id = topicId(track, topic);

  return (
    <section aria-labelledby={id}>
      <h3 id={id} className="text-lg font-semibold tracking-tight text-slate-950">
        {topic}
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicResources.map((resource) => (
          <HandoutCard
            key={`${resource.level}-${resource.topic}-${resource.title}`}
            title={resource.title}
            topic={resource.topic}
            level={resource.level}
            url={resource.url}
            solutionUrl={resource.solution}
          />
        ))}
      </div>
    </section>
  );
}

export async function NumberTheoryHandoutsPage() {
  const approvedResources = await getPublicResources("number-theory");
  const resources: NumberTheoryResource[] = [
    ...hardcodedResources,
    ...approvedResources.map((resource) => ({
      title: resource.title,
      topic: resource.topic,
      level: resource.level === "Advanced Handouts" ? "Advanced Contest" as const : "AIME Qualifier" as const,
      url: resource.url,
      solution: resource.solution,
    })),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <SiteHeader />
      <main className="flex-1">
        <header className="border-b border-slate-200 bg-white py-12 sm:py-16">
          <div className="site-container max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">
              SMC Resources
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Number Theory Handouts
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Curated notes, practice sets, and solutions organized by contest track and topic.
            </p>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-slate-50/75 py-12 sm:py-16">
          <div className="site-container space-y-16">
            {tracks.map((track) => {
              const trackResources = resources.filter((resource) => resource.level === track);
              if (trackResources.length === 0) return null;

              const orderedTopics = [
                ...topicOrder.filter((topic) =>
                  trackResources.some((resource) => resource.topic === topic),
                ),
                ...Array.from(
                  new Set(
                    trackResources
                      .map((resource) => resource.topic)
                      .filter(
                        (topic) =>
                          !topicOrder.includes(topic as (typeof topicOrder)[number]),
                      ),
                  ),
                ),
              ];

              return (
                <section key={track} aria-labelledby={`${topicId(track, "track")}-heading`}>
                  <div className="border-b border-emerald-800/20 pb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                      Track
                    </p>
                    <h2
                      id={`${topicId(track, "track")}-heading`}
                      className="mt-2 text-3xl font-bold tracking-tight"
                    >
                      {track}
                    </h2>
                  </div>
                  <div className="mt-8 space-y-10">
                    {orderedTopics.map((topic) => (
                      <TopicGroup
                        key={topic}
                        topic={topic}
                        track={track}
                        resources={resources}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
