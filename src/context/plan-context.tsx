"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import {
  PLAN_CAP,
  getServerSnapshot,
  getSnapshot,
  setState,
  subscribe,
  type PlanState,
} from "@/lib/plan-store";
import type { Workout } from "@/lib/types";

export { PLAN_CAP };

type WorkoutRef = Pick<Workout, "id" | "name">;

type PlanContextValue = PlanState & {
  hydrated: boolean;
  planFull: boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  addToPlan: (workout: WorkoutRef) => void;
  saveForLater: (workout: WorkoutRef) => void;
  removeFromPlan: (workout: WorkoutRef) => void;
  removeFromSaved: (workout: WorkoutRef) => void;
  toggleDone: (workout: WorkoutRef) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const value = useMemo<PlanContextValue>(() => {
    const addToPlan = (workout: WorkoutRef) => {
      const current = getSnapshot();

      if (current.planIds.includes(workout.id)) {
        toast(`${workout.name} is already in today's plan.`);
        return;
      }

      if (current.planIds.length >= PLAN_CAP) {
        toast.error(`Today's plan is full at ${PLAN_CAP} lifts.`);
        return;
      }

      setState({ ...current, planIds: [...current.planIds, workout.id] });
      toast.success("Added to today's plan");
    };

    const saveForLater = (workout: WorkoutRef) => {
      const current = getSnapshot();

      if (current.savedIds.includes(workout.id)) {
        toast(`${workout.name} is already saved.`);
        return;
      }

      setState({ ...current, savedIds: [...current.savedIds, workout.id] });
      toast.success("Saved for later");
    };

    const removeFromPlan = (workout: WorkoutRef) => {
      const current = getSnapshot();

      setState({
        ...current,
        planIds: current.planIds.filter((id) => id !== workout.id),
        doneIds: current.doneIds.filter((id) => id !== workout.id),
      });
      toast.success(`${workout.name} removed from today's plan`);
    };

    const removeFromSaved = (workout: WorkoutRef) => {
      const current = getSnapshot();

      setState({
        ...current,
        savedIds: current.savedIds.filter((id) => id !== workout.id),
      });
      toast.success(`${workout.name} removed from saved`);
    };

    const toggleDone = (workout: WorkoutRef) => {
      const current = getSnapshot();

      if (current.doneIds.includes(workout.id)) {
        setState({ ...current, doneIds: current.doneIds.filter((id) => id !== workout.id) });
        toast(`${workout.name} moved back to not done`);
        return;
      }

      setState({ ...current, doneIds: [...current.doneIds, workout.id] });
      toast.success(`${workout.name} marked as done`);
    };

    return {
      ...state,
      hydrated,
      planFull: state.planIds.length >= PLAN_CAP,
      isInPlan: (id: number) => state.planIds.includes(id),
      isSaved: (id: number) => state.savedIds.includes(id),
      isDone: (id: number) => state.doneIds.includes(id),
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    };
  }, [state, hydrated]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside a PlanProvider.");
  }

  return context;
}
