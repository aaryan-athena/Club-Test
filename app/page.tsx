import type { ComponentType, SVGProps } from "react";
import { HeroSection } from "@/components/hero-section";
import {
  AlgebraIcon,
  BookIcon,
  CalendarIcon,
  CombinatoricsIcon,
  FilterIcon,
  GeometryIcon,
  NumberTheoryIcon,
  ToolsIcon,
} from "@/components/icons";
import { NavigationCard } from "@/components/navigation-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export type NavigationCardData = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const subjectCards: NavigationCardData[] = [
  { title: "Number Theory", description: "Divisibility, congruences, number properties, and more.", href: "/number-theory", icon: NumberTheoryIcon },
  { title: "Geometry", description: "Triangles, circles, angles, area, and more.", href: "/geometry", icon: GeometryIcon },
  { title: "Combinatorics", description: "Counting, probability, recursion, and more.", href: "/combinatorics", icon: CombinatoricsIcon },
  { title: "Algebra", description: "Polynomials, inequalities, sequences, and more.", href: "/algebra", icon: AlgebraIcon },
];

const practiceCards: NavigationCardData[] = [
  { title: "Official Contests", description: "AMC, AIME, and other official archives.", href: "/practice-contests/official", icon: CalendarIcon },
  { title: "Mock Test Filter", description: "Find practice contests by difficulty and style.", href: "/practice-contests/mock-recommender", icon: FilterIcon },
  { title: "Study Resources", description: "Textbooks, video lessons, and more.", href: "/study-resources", icon: BookIcon },
  { title: "Practice Tools", description: "Problem sets, generators, and more.", href: "/practice-tools", icon: ToolsIcon },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <HeroSection />
        <div className="border-y border-slate-200/80 bg-slate-50/75">
          <section id="subjects" aria-labelledby="subjects-heading" className="scroll-mt-24 py-12 sm:py-14">
            <div className="site-container">
              <SectionHeading id="subjects-heading">Browse by Subject</SectionHeading>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {subjectCards.map((card) => <NavigationCard key={card.href} {...card} />)}
              </div>
            </div>
          </section>
          <section id="practice-resources" aria-labelledby="practice-heading" className="scroll-mt-24 pb-14 sm:pb-16">
            <div className="site-container">
              <SectionHeading id="practice-heading">Practice Resources</SectionHeading>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
                {practiceCards.map((card) => <NavigationCard key={card.href} {...card} />)}
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
