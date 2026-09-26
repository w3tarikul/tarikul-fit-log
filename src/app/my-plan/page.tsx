"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/plan/empty-state";
import { MetricsSummary } from "@/components/plan/metrics-summary";
import { PlanRow } from "@/components/plan/plan-row";
import { PlanTabs, type PlanTab } from "@/components/plan/plan-tabs";
import { SortDropdown, type SortKey } from "@/components/plan/sort-dropdown";
import { Spinner } from "@/components/ui/spinner";
import { usePlan } from "@/context/plan-context";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/lib/types";

const sortValue: Record<SortKey, (workout: Workout) => number> = {
  duration: (workout) => workout.duration,
  calories: (workout) => workout.caloriesBurned,
  rating: (workout) => workout.rating,
};

export default function MyPlanPage() {
  const { planIds, savedIds, isDone, toggleDone, removeFromPlan, removeFromSaved, hydrated } =
    usePlan();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<PlanTab>("today");
  const [sort, setSort] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;

    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const byId = useMemo(
    () => new Map(workouts.map((workout) => [workout.id, workout])),
    [workouts],
  );

  const pickWorkouts = (ids: number[]) =>
    ids.map((id) => byId.get(id)).filter((workout): workout is Workout => Boolean(workout));

  const planWorkouts = pickWorkouts(planIds);
  const savedWorkouts = pickWorkouts(savedIds);

  const metrics = planWorkouts.reduce(
    (totals, workout) => ({
      exercises: totals.exercises + 1,
      minutes: totals.minutes + workout.duration,
      calories: totals.calories + workout.caloriesBurned,
    }),
    { exercises: 0, minutes: 0, calories: 0 },
  );

  const term = query.trim().toLowerCase();
  const visible = (tab === "today" ? planWorkouts : savedWorkouts)
    .filter(
      (workout) =>
        !term ||
        workout.name.toLowerCase().includes(term) ||
        workout.muscleGroups.some((group) => group.toLowerCase().includes(term)),
    )
    .sort((a, b) => sortValue[sort](b) - sortValue[sort](a));

  const ready = hydrated && !loading;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="display text-4xl sm:text-5xl">My Plan</h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8">
        <MetricsSummary
          exercises={metrics.exercises}
          minutes={metrics.minutes}
          calories={metrics.calories}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <PlanTabs active={tab} onChange={setTab} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2">
            <Search className="size-4 shrink-0 text-faint" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or tag"
              aria-label="Search your workouts by name or tag"
              className="w-full bg-transparent text-sm outline-none sm:w-44"
            />
          </label>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      <div className="mt-6">
        {!ready && <Spinner label="Loading workouts…" />}

        {ready && error && (
          <p className="py-16 text-center text-sm text-muted">
            We could not load your workouts. Please refresh the page.
          </p>
        )}

        {ready && !error && visible.length === 0 && (
          <EmptyState
            message={
              term
                ? "No lifts match that search. Try another name or muscle group."
                : "Browse the library and add a lift to get today moving."
            }
          />
        )}

        {ready && !error && visible.length > 0 && (
          <ul className="flex flex-col gap-4">
            {visible.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                showDoneAction={tab === "today"}
                done={isDone(workout.id)}
                onToggleDone={() => toggleDone(workout)}
                onRemove={() =>
                  tab === "today" ? removeFromPlan(workout) : removeFromSaved(workout)
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
