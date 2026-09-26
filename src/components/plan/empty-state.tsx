import Link from "next/link";

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-6 py-20 text-center">
      <h3 className="display text-2xl">Nothing here yet</h3>
      <p className="mt-2 text-sm text-muted">{message}</p>

      <Link
        href="/"
        className="mt-6 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}
