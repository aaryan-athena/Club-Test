import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  id?: string;
};

export function SectionHeading({ children, id }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight text-slate-950">
      {children}
    </h2>
  );
}
