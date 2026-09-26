const metrics = ["Exercises", "Minutes", "Calories"] as const;

type MetricsSummaryProps = {
  exercises: number;
  minutes: number;
  calories: number;
};

export function MetricsSummary({ exercises, minutes, calories }: MetricsSummaryProps) {
  const values: Record<(typeof metrics)[number], number> = {
    Exercises: exercises,
    Minutes: minutes,
    Calories: calories,
  };

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={metric}
          className={`px-6 py-6 ${
            index === 0 ? "" : "border-t border-line sm:border-t-0 sm:border-l"
          }`}
        >
          <p className="text-sm text-muted">{metric}</p>
          <p className="display mt-2 text-4xl text-accent">{values[metric]}</p>
        </div>
      ))}
    </div>
  );
}
