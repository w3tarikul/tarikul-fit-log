import { Brand } from "@/components/ui/brand";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <Brand />
        <p className="text-sm text-faint">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
