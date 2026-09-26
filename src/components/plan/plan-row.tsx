import Image from "next/image";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { StatRow } from "@/components/ui/stat-row";
import type { Workout } from "@/lib/types";

type PlanRowProps = {
  workout: Workout;
  showDoneAction: boolean;
  done: boolean;
  onToggleDone: () => void;
  onRemove: () => void;
};

export function PlanRow({
  workout,
  showDoneAction,
  done,
  onToggleDone,
  onRemove,
}: PlanRowProps) {
  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-4 sm:flex-row sm:items-center">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-raised">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className={`display text-lg leading-tight ${done ? "text-faint line-through" : ""}`}>
          {workout.name}
        </h3>
        <p className="mt-0.5 text-sm text-faint">{workout.equipment}</p>
        <StatRow workout={workout} className="mt-2" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-line px-4 py-2 text-sm text-white transition-colors hover:border-accent/60"
        >
          View Details
        </Link>

        {showDoneAction && (
          <button
            type="button"
            onClick={onToggleDone}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              done
                ? "border border-accent text-accent"
                : "bg-accent text-ink hover:opacity-90"
            }`}
          >
            <Check className="size-4" aria-hidden />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="rounded-full p-2 text-faint transition-colors hover:text-white"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </li>
  );
}
