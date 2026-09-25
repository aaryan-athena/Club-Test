export type PracticeToolsSection =
  | "AMC 10 Preparation"
  | "Advanced AMC Preparation"
  | "AIME Preparation"
  | "Problem Generators";

export type PracticeResource = {
  title: string;
  url: string;
  section: PracticeToolsSection;
  description: string;
  type: "problem-set" | "generator";
};

export const practiceResources: PracticeResource[] = [
  {
    title: "Contest Math Foundations",
    url: "http://mathcircle.berkeley.edu/sites/default/files/archivedocs/2010_2011/lectures/1011lecturespdf/AMCPrepBMC.pdf",
    section: "AMC 10 Preparation",
    description:
      "A 58 problem collection concentrated on AMC 8 foundations through AMC 10/12 with some AIME questions towards the end.",
    type: "problem-set",
  },
  {
    title: "AMC 10 Core Skills",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2015/lecture/AMC%2010%20Contest%20Problems.pdf",
    section: "AMC 10 Preparation",
    description:
      "A 22 problem introductory AMC 10 set covering core algebra, geometry, number theory, counting, and probability skills.",
    type: "problem-set",
  },
  {
    title: "Comprehensive AMC 10 Practice",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2012_2013/lectures/1213lecturespdf/BMC_Int_Jan29_2013_AMC10Prep.pdf",
    section: "AMC 10 Preparation",
    description:
      "An AMC 10 collection with 60+ problems progressing from standard topic practice to difficult late-contest questions.",
    type: "problem-set",
  },
  {
    title: "AMC 10/12 Summer Practice Course",
    url: "https://www.morningstarinstitute.org/2020-summer-practice-amc10-12/",
    section: "AMC 10 Preparation",
    description:
      "A 160 problem intermediate AMC 10/12 practice course divided into eight sets with accompanying video solutions.",
    type: "problem-set",
  },
  {
    title: "AMC 10/12 Mixed Review",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4298-4083.pdf",
    section: "Advanced AMC Preparation",
    description:
      "A 40 problem intermediate AMC 10/12 review combining algebra, geometry, counting, number theory, and probability.",
    type: "problem-set",
  },
  {
    title: "Advanced AMC 12 Topic Practice",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2011_2012/lectures/1112lecturespdf/BMC_Adv_Jan31_2012_AMC12Prep.pdf",
    section: "Advanced AMC Preparation",
    description:
      "A 31 problem advanced AMC 12 collection emphasizing challenging second-half problems across several major contest subjects.",
    type: "problem-set",
  },
  {
    title: "Beyond the AMC 12",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2012_2013/lectures/1213lecturespdf/BMC_Adv_Jan29_2013_AMC12Prep.pdf",
    section: "Advanced AMC Preparation",
    description:
      "An advanced AMC 12 set with 28 problems progressing toward AIME-level algebra, geometry, combinatorics, and number theory.",
    type: "problem-set",
  },
  {
    title: "Advanced AMC to AIME Progression",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4932-5254.pdf",
    section: "Advanced AMC Preparation",
    description:
      "A 22 problem progression from middle AMC 10/12 questions through advanced upper AIME problems.",
    type: "problem-set",
  },
  {
    title: "AIME Difficulty Sampler",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2010_2011/lectures/1011lecturespdf/AIMEprac.pdf",
    section: "AIME Preparation",
    description:
      "An eight-problem AIME sampler divided into warm-up, intermediate, and advanced questions from past examinations.",
    type: "problem-set",
  },
  {
    title: "AIME Training Problems",
    url: "https://circles.math.ucla.edu/circles/lib/data/Handout-4947-5266.pdf",
    section: "AIME Preparation",
    description:
      "A 14 problem intermediate AIME set emphasizing multi-step algebra, combinatorics, number theory, and probability.",
    type: "problem-set",
  },
  {
    title: "Advanced AIME and Combinatorics",
    url: "https://mathcircle.berkeley.edu/sites/default/files/archivedocs/2009_2010/lectures/0910lecturespdf/IvanAIMEPrep.pdf",
    section: "AIME Preparation",
    description:
      "A 19-problem advanced AIME collection progressing into difficult combinatorics, probability, constructions, and proof-oriented reasoning.",
    type: "problem-set",
  },
  {
    title: "Forty AIME-Style Challenges",
    url: "https://cdn.artofproblemsolving.com/attachments/9/3/9ed002bb3307e38c2e626fc7354d1fc28f231a.pdf",
    section: "AIME Preparation",
    description:
      "A 40-problem advanced AIME-style collection with ten problems each in algebra, geometry, number theory, and combinatorics.",
    type: "problem-set",
  },
  {
    title: "AMC Trivial",
    url: "https://amctrivial.com/",
    section: "Problem Generators",
    description:
      "Generate customized practice sets and mock tests using problems from AMC 8, AMC 10, AMC 12, and AIME.",
    type: "generator",
  },
  {
    title: "AMC Trainer Structured Practice",
    url: "https://amctrainer.org/",
    section: "Problem Generators",
    description:
      "Practice AMC 8, AMC 10, and AMC 12 problems through structured training, full contests, progress tracking, and solutions.",
    type: "generator",
  },
  {
    title: "AMC Trainer Custom Problem Generator",
    url: "https://www.amctrainer.com/play",
    section: "Problem Generators",
    description:
      "Generate individual AMC 8, AMC 10, AMC 12, or AIME problems based on selected difficulty and contest level.",
    type: "generator",
  },
  {
    title: "AoPS Alcumus",
    url: "https://artofproblemsolving.com/alcumus",
    section: "Problem Generators",
    description:
      "An adaptive problem generator that has adjustable problem difficulty and topic selection.",
    type: "generator",
  },
  {
    title: "AoPS MATHCOUNTS Trainer",
    url: "https://artofproblemsolving.com/mathcounts_trainer",
    section: "Problem Generators",
    description:
      "Practice thousands of past MATHCOUNTS problems from school through national levels, perfect for introductory AMC 10 practice.",
    type: "generator",
  },
  {
    title: "AoPS For the Win!",
    url: "https://artofproblemsolving.com/ftw",
    section: "Problem Generators",
    description:
      "Compete in fast-paced multiplayer rounds using more than 15,000 problems from MATHCOUNTS, AMC, and other competitions.",
    type: "generator",
  },
];
