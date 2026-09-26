import Image from "next/image";
import Link from "next/link";
import { StatRow } from "@/components/ui/stat-row";
import { TagPill } from "@/components/ui/tag-pill";
import type { Workout } from "@/lib/types";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-raised">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <TagPill key={group} label={group} />
          ))}
        </div>

        <h3 className="display mt-3 text-lg leading-tight">{workout.name}</h3>
        <p className="mt-1 text-sm text-faint">{workout.equipment}</p>

        <StatRow workout={workout} className="mt-4 border-t border-line pt-3" />
      </div>
    </Link>
  );
}
