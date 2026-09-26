import Image from "next/image";
import { Dumbbell } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="flex flex-col items-center gap-8 px-6 py-10 sm:px-10 md:flex-row md:justify-between md:py-14 lg:px-16">
          <div className="max-w-xl text-center md:text-left">
            <p className="display text-xs tracking-[0.2em] text-accent">Workout Library</p>

            <h1 className="display mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              Train with intent. Log every set.
            </h1>

            <p className="mt-5 text-base leading-relaxed text-muted">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
              plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="display mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-ink transition-opacity hover:opacity-90"
            >
              <Dumbbell className="size-4" aria-hidden />
              Browse Workouts
            </a>
          </div>

          <Image
            src="/banner.png"
            alt="Athlete training on a seated gym machine"
            width={334}
            height={334}
            loading="eager"
            fetchPriority="high"
            className="w-48 shrink-0 sm:w-64 md:w-72 lg:w-80"
          />
        </div>
      </div>
    </section>
  );
}
