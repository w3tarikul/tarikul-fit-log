export function TagPill({ label }: { label: string }) {
  return (
    <span className="display rounded-full bg-accent px-2.5 py-1 text-[11px] leading-none text-ink">
      {label}
    </span>
  );
}
