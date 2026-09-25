import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="site-container grid items-center gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-10 lg:gap-20">
        <div className="max-w-2xl">
          <h1 className="max-w-xl text-[1.35rem] font-bold leading-[1.08] tracking-[-0.04em] text-slate-950 min-[360px]:text-2xl sm:text-4xl md:text-[2rem] lg:text-[2.75rem] xl:text-[3.45rem]">
            <span className="block whitespace-nowrap">The best math resources.</span>
            <span className="block whitespace-nowrap">All in one place.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Made by Sparsh Vermani to help you find free resources and practice efficiently.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="#practice-resources"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-emerald-800 px-7 text-sm font-semibold text-white shadow-[0_5px_14px_rgba(6,95,70,0.2)] transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 motion-reduce:transition-none"
            >
              Explore Resources
            </Link>
            <Link
              href="#subjects"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-7 text-sm font-semibold text-emerald-800 transition hover:border-emerald-700/40 hover:bg-emerald-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-3 motion-reduce:transition-none"
            >
              Browse Subjects
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-5 rounded-full bg-emerald-100/70 blur-3xl" aria-hidden="true" />
            <div className="relative h-52 w-52 drop-shadow-[0_12px_22px_rgba(15,23,42,0.12)] sm:h-60 sm:w-60 lg:h-[270px] lg:w-[270px]">
              <Image
                src="/south-math-club-cutout.png"
                alt="South Math Club logo"
                fill
                sizes="(min-width: 1024px) 270px, (min-width: 640px) 240px, 208px"
                priority
                unoptimized
                className="scale-[1.2] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
