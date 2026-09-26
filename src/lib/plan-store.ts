export const PLAN_CAP = 5;

const STORAGE_KEY = "fitlog-state";

export type PlanState = {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
};

export const emptyState: PlanState = { planIds: [], savedIds: [], doneIds: [] };

let state: PlanState = emptyState;
let loaded = false;
const listeners = new Set<() => void>();

function numbersOnly(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((id): id is number => typeof id === "number") : [];
}

function readStoredState(): PlanState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;

    const parsed = JSON.parse(raw) as Partial<PlanState>;
    return {
      planIds: numbersOnly(parsed.planIds),
      savedIds: numbersOnly(parsed.savedIds),
      doneIds: numbersOnly(parsed.doneIds),
    };
  } catch {
    return emptyState;
  }
}

function load() {
  if (loaded) return;
  loaded = true;
  state = readStoredState();
}

export function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): PlanState {
  load();
  return state;
}

export function getServerSnapshot(): PlanState {
  return emptyState;
}

export function setState(next: PlanState) {
  state = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private browsing; the app still works in memory.
  }

  listeners.forEach((listener) => listener());
}
