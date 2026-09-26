import Image from "next/image";
import { notFound } from "next/navigation";
import { DetailActions } from "@/components/workout/detail-actions";
import { TagPill } from "@/components/ui/tag-pill";
import { getWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";

export default async function WorkoutDetailPage(props: PageProps<"/workouts/[id]">) {
  const { id } = await props.params;
  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  const specs: Array<[string, string | number]> = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    <article className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line bg-surface">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="display text-4xl leading-tight sm:text-5xl">{workout.name}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">{workout.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <TagPill key={group} label={group} />
          ))}
        </div>

        <dl className="mt-7 overflow-hidden rounded-2xl border border-line bg-surface">
          {specs.map(([label, value], index) => (
            <div
              key={label}
              className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
                index === 0 ? "" : "border-t border-line"
              }`}
            >
              <dt className="display text-xs tracking-wider text-faint">{label}</dt>
              <dd className="text-right text-sm text-white">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="display mt-8 text-xl">Instructions</h2>
        <ol className="mt-4 space-y-3">
          {workout.instructions.map((step: string, index: number) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="font-medium text-accent">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <DetailActions workout={workout as Workout} />
      </div>
    </article>
  );
}
