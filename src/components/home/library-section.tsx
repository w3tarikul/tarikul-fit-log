"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { WorkoutCard } from "@/components/home/workout-card";
import type { Workout } from "@/lib/types";

export function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return workouts;

    return workouts.filter(
      (workout) =>
        workout.name.toLowerCase().includes(term) ||
        workout.muscleGroups.some((group) => group.toLowerCase().includes(term)),
    );
  }, [workouts, query]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display text-3xl sm:text-4xl">The Library</h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <label className="flex w-full items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 sm:w-72">
          <Search className="size-4 shrink-0 text-faint" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or tag"
            aria-label="Search workouts by name or tag"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      {results.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted">
          No lifts match &ldquo;{query}&rdquo;. Try another name or muscle group.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
