import type { Workout } from "./types";

const BASE_URL = "https://api.api-store.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Could not load the workout library.");
  }

  return res.json();
}

export async function getWorkout(id: string): Promise<Workout | null> {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Could not load this workout.");
  }

  return res.json();
}
