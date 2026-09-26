import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-28 text-center">
      <p className="display text-7xl text-accent sm:text-8xl">404</p>
      <h1 className="display mt-4 text-3xl">This lift is not in the rack</h1>
      <p className="mt-3 text-sm text-muted">
        The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
      >
        Back to the library
      </Link>
    </div>
  );
}
