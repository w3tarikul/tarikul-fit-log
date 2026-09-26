"use client";

export default function ErrorBoundary({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <h1 className="display text-3xl">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted">
        {error.message || "We could not load this page. Please try again."}
      </p>

      <button
        type="button"
        onClick={() => retry()}
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
