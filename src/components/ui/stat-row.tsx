import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

type StatRowProps = {
  workout: Pick<Workout, "duration" | "caloriesBurned" | "rating">;
  className?: string;
};

export function StatRow({ workout, className = "" }: StatRowProps) {
  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted ${className}`}>
      <span className="flex items-center gap-1.5">
        <Clock className="size-3.5 text-accent" aria-hidden />
        {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className="size-3.5 text-orange-400" aria-hidden />
        {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className="size-3.5 text-accent" aria-hidden />
        {workout.rating}
      </span>
    </div>
  );
}
