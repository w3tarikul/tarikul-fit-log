export function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24" role="status">
      <span className="size-10 animate-spin rounded-full border-2 border-line border-t-accent" />
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
