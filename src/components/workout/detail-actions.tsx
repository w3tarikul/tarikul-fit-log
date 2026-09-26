"use client";

import { BookmarkPlus, CalendarPlus } from "lucide-react";
import { PLAN_CAP, usePlan } from "@/context/plan-context";
import type { Workout } from "@/lib/types";

export function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, planFull, hydrated } = usePlan();

  const alreadyPlanned = hydrated && isInPlan(workout.id);
  const capReached = hydrated && planFull && !alreadyPlanned;
  const addDisabled = capReached || alreadyPlanned;

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => addToPlan(workout)}
          disabled={addDisabled}
          className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CalendarPlus className="size-4" aria-hidden />
          {alreadyPlanned ? "Already in today's plan" : "Add to today's plan"}
        </button>

        <button
          type="button"
          onClick={() => saveForLater(workout)}
          className="flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-white transition-colors hover:border-accent/60"
        >
          <BookmarkPlus className="size-4" aria-hidden />
          Save for later
        </button>
      </div>

      {capReached && (
        <p className="mt-3 text-xs text-faint">
          Today&apos;s plan is full at {PLAN_CAP} lifts. Finish one or remove it to add another.
        </p>
      )}
    </div>
  );
}
