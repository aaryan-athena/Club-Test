import { HandoutCard } from "@/components/handout-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicResources } from "@/lib/resources/storage";

type HandoutResource = {
  title: string;
  topic: string;
  level: "AIME Qualifying Handouts" | "Advanced Handouts";
  url: string;
  solution?: string;
};

const hardcodedResources: HandoutResource[] = [
  {
    title: "Permutations and Combinations: Notes and Practice Problems",
    topic: "Permutations and Combinations",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4855-5110.pdf",
  },
  {
    title: "Permutations, Combinations, and Introductory Counting Problems",
    topic: "Permutations and Combinations",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2015/lecture/BMC_Beg1_Sep29.pdf",
  },
  {
    title: "More Permutations and Combinations Problems",
    topic: "Permutations and Combinations",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2019/BMC-beg-2019-April-ocean-combinatorics%20%281%29_0.pdf",
  },
  {
    title: "Selected AMC/AIME Counting and Probability Problems",
    topic: "Permutations and Combinations",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2019/BerkeleyMathCircle11Dec2019IntermediateII.pdf%20%281%29_0.pdf",
  },
  {
    title: "Pigeonhole Principle: Introductory Through Challenging Problems",
    topic: "Pigeonhole Principle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2010_2011/lectures/1011lecturespdf/pigeonholePrinciple.pdf",
  },
  {
    title: "Pigeonhole Principle: Advanced Applications and Proof Problems",
    topic: "Pigeonhole Principle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2013_2014/lecture/1314lecturespdf/BMC-Intermediate%20March%2018th,%202014%20(1).pdf",
  },
  {
    title: "Pigeonhole Principle and Strong Pigeonhole Principle",
    topic: "Pigeonhole Principle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2017/BMChandout.pdf",
  },
  {
    title: "Pigeonhole Principle: Practice Problems",
    topic: "Pigeonhole Principle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2024/BMC_Int_I_handout_10-02-2024.pdf",
  },
  {
    title: "Stars and Bars with Challenge Problems",
    topic: "Stars and Bars",
    level: "AIME Qualifying Handouts",
    url: "https://pleasantonmathcircle.org/assets/mat/Stars_Bars.pdf",
  },
  {
    title: "Stars and Bars Practice Problems with Solutions",
    topic: "Stars and Bars",
    level: "AIME Qualifying Handouts",
    url: "https://iowacitymathcircle.wordpress.com/wp-content/uploads/2018/08/stars-and-bars-handout1.pdf",
    solution: "https://iowacitymathcircle.wordpress.com/wp-content/uploads/2018/08/stars-and-bars-answer-key.pdf",
  },
  {
    title: "Complementary Counting and Stars and Bars",
    topic: "Complementary Counting",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4868-5128.pdf",
  },
  {
    title: "Fundamental Counting Techniques, Part I: Notes and Problems",
    topic: "Complementary Counting",
    level: "AIME Qualifying Handouts",
    url: "http://3.13.180.153/wp-content/uploads/2019/07/Counting_Part1_v2.pdf",
    solution: "http://3.13.180.153/wp-content/uploads/2019/07/Counting_Part1_Solutions.pdf",
  },
  {
    title: "Inclusion-Exclusion Practice Problems with Solutions",
    topic: "Principle of Inclusion-Exclusion",
    level: "AIME Qualifying Handouts",
    url: "https://math.berkeley.edu/~pglutz/10Bsp18/disc2sol.pdf",
  },
  {
    title: "Principle of Inclusion-Exclusion: Notes and Examples",
    topic: "Principle of Inclusion-Exclusion",
    level: "AIME Qualifying Handouts",
    url: "https://burnettecd.wordpress.com/wp-content/uploads/2015/06/principle-of-inclusion-exclusion-notes.pdf",
  },
  {
    title: "Principle of Inclusion-Exclusion: Notes and Practice Problems",
    topic: "Principle of Inclusion-Exclusion",
    level: "AIME Qualifying Handouts",
    url: "http://3.13.180.153/wp-content/uploads/2019/07/PIE.pdf",
    solution: "http://3.13.180.153/wp-content/uploads/2019/07/PIE_Solutions.pdf",
  },
  {
    title: "Introductory Contest Probability: Problems",
    topic: "Probability",
    level: "AIME Qualifying Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/combinatorics-12-06-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/combinatorics-12-06-15-solutions.pdf",
  },
  {
    title: "Fundamental Probability: Notes and Practice Problems",
    topic: "Probability",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4796-4987.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-4797-4987.pdf",
  },
  {
    title: "Different types of probability and walkthroughs",
    topic: "Probability",
    level: "AIME Qualifying Handouts",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2023/07/2023_2024_Probability___Expected_Value_Handout.pdf",
  },
  {
    title: "Pascal’s Triangle and Binomial Coefficients",
    topic: "Pascal’s Triangle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/BMC6/pdf0607/pascal.pdf",
  },
  {
    title: "Pascal’s Triangle Practice Problems",
    topic: "Pascal’s Triangle",
    level: "AIME Qualifying Handouts",
    url: "https://chapelhillmathcircle.org/wp-content/uploads/2019/05/int20190413pascalstriangleprolems.pdf",
  },
  {
    title: "Pascal’s Triangle, Binomial Coefficients, and Counting",
    topic: "Pascal’s Triangle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2016/BMC_IntII_9_27_16.pdf",
  },
  {
    title: "Pascal’s Triangle and Mixed Counting Problems",
    topic: "Pascal’s Triangle",
    level: "AIME Qualifying Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2019/CountingProblems_BMC_Sep2019.pdf",
  },
  {
    title: "Counting, Casework, and Pascal’s Triangle Applications",
    topic: "Pascal’s Triangle",
    level: "AIME Qualifying Handouts",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2023/06/2023-2024-Counting-and-Casework-Handout.pdf",
  },
  {
    title: "Mixed Counting Techniques: Notes and Contest Problems",
    topic: "All Counting Techniques",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4883-5150.pdf",
  },
  {
    title: "Fundamental Counting Techniques and Applications",
    topic: "All Counting Techniques",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-3716-3316.pdf",
  },
  {
    title: "Mixed Combinatorics and Counting Problems",
    topic: "All Counting Techniques",
    level: "AIME Qualifying Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4963-5309.pdf",
  },
  {
    title: "Counting and Casework: Comprehensive Practice Handout",
    topic: "All Counting Techniques",
    level: "AIME Qualifying Handouts",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2023/06/2023-2024-Counting-and-Casework-Handout.pdf",
  },
  {
    title: "Counting Identities, Expected Value and Markov Chains",
    topic: "Counting Identities",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4882-5145.pdf",
  },
  {
    title: "Geometric Probability: Notes and Problems",
    topic: "Geometric Probability",
    level: "Advanced Handouts",
    url: "https://bpb-us-e2.wpmucdn.com/sites.wustl.edu/dist/b/4012/files/2023/02/20171015-geometric-probability.pdf",
  },
  {
    title: "Geometric Probability and Area-Based Probability",
    topic: "Geometric Probability",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2016/GeometricProbability.pdf",
  },
  {
    title: "Unusual and Challenging Geometric Probability Problems",
    topic: "Geometric Probability",
    level: "Advanced Handouts",
    url: "https://webpages.charlotte.edu/~hbreiter/Exotic/GeomProb.pdf",
  },
  {
    title: "Geometric, Conditional, and Expected-Value Probability",
    topic: "Geometric Probability",
    level: "Advanced Handouts",
    url: "http://3.13.180.153/wp-content/uploads/2019/07/Probability_v2.pdf",
    solution: "http://3.13.180.153/wp-content/uploads/2019/07/Probability-Solutions.pdf",
  },
  {
    title: "Geometric Combinatorics and Polyhedral Counting",
    topic: "Geometric Combinatorics",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2007_2008/lectures/0708lecturespdf/BMC_Ardila.pdf",
  },
  {
    title: "Geometric Combinatorics Problems",
    topic: "Geometric Combinatorics",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/BMC6/pdf0607/bamo06.pdf",
  },
  {
    title: "Advanced Geometric Counting Problems",
    topic: "Geometric Combinatorics",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4457-4294.pdf",
  },
  {
    title: "Counting Review and Challenging Combinatorics Problems",
    topic: "Counting Identities",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/combinatorics-02-19-17.pdf",
  },
  {
    title: "Combinatorial Identities and Challenging Problems",
    topic: "Counting Identities",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4819-5025.pdf",
    solution: "https://circles.math.ucla.edu/circles/lib/data/Handout-4821-5025.pdf",
  },
  {
    title: "Advanced Counting Techniques, Notes and Problems",
    topic: "Counting Identities",
    level: "Advanced Handouts",
    url: "http://3.13.180.153/wp-content/uploads/2019/07/Counting_Part2_v2.pdf",
    solution: "http://3.13.180.153/wp-content/uploads/2019/07/Counting_Part2_Solutions.pdf",
  },
  {
    title: "Advanced Combinatorial Identities and Applications",
    topic: "Counting Identities",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4147-3885.pdf",
  },
  {
    title: "Advanced Probability Problem Set",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2021/handout.pdf",
  },
  {
    title: "Challenging Contest Probability Problems",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4976-5335.pdf",
  },
  {
    title: "Advanced Probability and Combinatorial Probability",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/combinatorics-02-26-17.pdf",
  },
  {
    title: "AIME-Style Probability Problems",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4994-5374.pdf",
  },
  {
    title: "Advanced Contest Probability: Problems and Solutions",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/probability-04-03-16.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/probability-04-03-16-solutions.pdf",
  },
  {
    title: "Advanced Probability Notes",
    topic: "Advanced Probability",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2010_2011/lectures/1011lecturespdf/bmc_probability.pdf",
  },
  {
    title: "Introduction to Recursion: Problems and Solutions",
    topic: "Recursion",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/15-16/combinatorics-12-13-15.pdf",
    solution: "https://www.math.cmu.edu/~mlavrov/arml/15-16/combinatorics-12-13-15-solutions.pdf",
  },
  {
    title: "Catalan Numbers and Recursive Counting",
    topic: "Recursion",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/BMC6/ps/catalan.pdf",
  },
  {
    title: "Recurrence Relations and Recursive Problem Solving",
    topic: "Recursion",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2013_2014/lecture/1314lecturespdf/BMC-Intermediate%20Dec.%203rd,%202013.pdf",
  },
  {
    title: "Recursive Sequences and Combinatorial Recurrences",
    topic: "Recursion",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2014_2015/lectures/1415lecturespdf/Int%20I%20-%202015.02.03.pdf",
  },
  {
    title: "Recursion and Recurrence Relations: Notes and Problems",
    topic: "Recursion",
    level: "Advanced Handouts",
    url: "http://3.13.180.153/wp-content/uploads/2020/07/Recursion.pdf",
  },
  {
    title: "Expected Value and Random Walks",
    topic: "Expected Value",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2015/lecture/BMC-advanced-random-walk-4-26-16.pdf",
  },
  {
    title: "Introduction to Expected Value",
    topic: "Expected Value",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2015/lecture/BMC-beg1-expected-value-2.pdf",
  },
  {
    title: "Expected Value in Contest Problems",
    topic: "Expected Value",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/combinatorics-03-05-17.pdf",
  },
  {
    title: "Probability and Expected Value Practice Handout",
    topic: "Expected Value",
    level: "Advanced Handouts",
    url: "https://iowacitymathcircle.org/wp-content/uploads/2023/07/2023_2024_Probability___Expected_Value_Handout.pdf",
  },
  {
    title: "Probability States and Markov Chains",
    topic: "Probability States/Markov Chains",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/16-17/combinatorics-03-12-17.pdf",
  },
  {
    title: "State-Based Probability and Random Processes",
    topic: "Probability States/Markov Chains",
    level: "Advanced Handouts",
    url: "https://www.math.cmu.edu/~mlavrov/arml/14-15/combinatorics-09-14-14.pdf",
  },
  {
    title: "Markov Chains and Transition-State Probability Problems",
    topic: "Probability States/Markov Chains",
    level: "Advanced Handouts",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4987-5357.pdf",
  },
  {
    title: "Introduction to Generating Functions",
    topic: "Generating Functions",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/BMC6/ps0405/genfunct.pdf",
  },
  {
    title: "Generating Functions and Advanced Counting Applications",
    topic: "Generating Functions",
    level: "Advanced Handouts",
    url: "http://mathcircle.berkeley.edu/sites/default/files/archivedocs/2013_2014/lecture/1314lecturespdf/BMC-Advanced%20Nov.%2012th,%202013.pdf",
  },
  {
    title: "Generating Functions: Notes and Contest Problems",
    topic: "Generating Functions",
    level: "Advanced Handouts",
    url: "https://mathcircle.berkeley.edu/sites/default/files/handouts/2024/bmc-genfun240918.pdf",
  },
];

const qualifyingTopics = [
  "Permutations and Combinations",
  "Pigeonhole Principle",
] as const;

const basicCountingTopics = [
  "Stars and Bars",
  "Complementary Counting",
  "Principle of Inclusion-Exclusion",
  "Probability",
  "Pascal’s Triangle",
  "All Counting Techniques",
] as const;

const advancedTopics = [
  "Counting Identities",
  "Geometric Probability",
  "Geometric Combinatorics",
  "Advanced Probability",
  "Recursion",
  "Expected Value",
  "Probability States/Markov Chains",
  "Generating Functions",
] as const;

function TopicGroup({
  topic,
  level,
  resources,
}: {
  topic: string;
  level: HandoutResource["level"];
  resources: HandoutResource[];
}) {
  const topicResources = resources.filter(
    (resource) => resource.topic === topic && resource.level === level,
  );

  return (
    <section aria-labelledby={`${level}-${topic}`.replaceAll(" ", "-").toLowerCase()}>
      <h3
        id={`${level}-${topic}`.replaceAll(" ", "-").toLowerCase()}
        className="text-lg font-semibold tracking-tight text-slate-950"
      >
        {topic}
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topicResources.map((resource) => (
          <HandoutCard
            key={`${resource.topic}-${resource.title}`}
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

export async function CombinatoricsHandoutsPage() {
  const approvedResources = await getPublicResources("combinatorics");
  const resources: HandoutResource[] = [
    ...hardcodedResources,
    ...approvedResources.map((resource) => ({
      title: resource.title,
      topic: resource.topic,
      level: resource.level as HandoutResource["level"],
      url: resource.url,
      solution: resource.solution,
    })),
  ];
  const knownQualifyingTopics = [...qualifyingTopics, ...basicCountingTopics];
  const extraQualifyingTopics = Array.from(
    new Set(
      resources
        .filter(
          (resource) =>
            resource.level === "AIME Qualifying Handouts" &&
            !knownQualifyingTopics.includes(resource.topic as (typeof knownQualifyingTopics)[number]),
        )
        .map((resource) => resource.topic),
    ),
  );
  const extraAdvancedTopics = Array.from(
    new Set(
      resources
        .filter(
          (resource) =>
            resource.level === "Advanced Handouts" &&
            !advancedTopics.includes(resource.topic as (typeof advancedTopics)[number]),
        )
        .map((resource) => resource.topic),
    ),
  );

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
              Combinatorics Handouts
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Curated notes, practice sets, and solutions organized by contest track and topic.
            </p>
          </div>
        </header>

        <div className="border-b border-slate-200 bg-slate-50/75 py-12 sm:py-16">
          <div className="site-container space-y-16">
            <section aria-labelledby="aime-qualifier-heading">
              <div className="border-b border-emerald-800/20 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                  Track
                </p>
                <h2 id="aime-qualifier-heading" className="mt-2 text-3xl font-bold tracking-tight">
                  AIME Qualifier
                </h2>
              </div>

              <div className="mt-8 space-y-10">
                {qualifyingTopics.map((topic) => (
                  <TopicGroup key={topic} topic={topic} level="AIME Qualifying Handouts" resources={resources} />
                ))}

                <div className="pt-2">
                  <h3 className="text-2xl font-bold tracking-tight text-emerald-900">
                    Basic Counting Techniques
                  </h3>
                </div>

                {basicCountingTopics.map((topic) => (
                  <TopicGroup key={topic} topic={topic} level="AIME Qualifying Handouts" resources={resources} />
                ))}
                {extraQualifyingTopics.map((topic) => (
                  <TopicGroup key={topic} topic={topic} level="AIME Qualifying Handouts" resources={resources} />
                ))}
              </div>
            </section>

            <section aria-labelledby="advanced-contest-heading">
              <div className="border-b border-emerald-800/20 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                  Track
                </p>
                <h2 id="advanced-contest-heading" className="mt-2 text-3xl font-bold tracking-tight">
                  Advanced Contest
                </h2>
              </div>

              <div className="mt-8 space-y-10">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-emerald-900">
                    Advanced Combinatorics
                  </h3>
                </div>

                {advancedTopics.map((topic) => (
                  <TopicGroup key={topic} topic={topic} level="Advanced Handouts" resources={resources} />
                ))}
                {extraAdvancedTopics.map((topic) => (
                  <TopicGroup key={topic} topic={topic} level="Advanced Handouts" resources={resources} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
