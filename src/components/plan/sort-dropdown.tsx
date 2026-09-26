import { ChevronDown } from "lucide-react";

export type SortKey = "duration" | "calories" | "rating";

const options: Array<{ value: SortKey; label: string }> = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

type SortDropdownProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Sort By</span>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as SortKey)}
          aria-label="Sort workouts by"
          className="appearance-none rounded-lg border border-line bg-surface py-2 pl-4 pr-9 text-sm text-white outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-raised">
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
      </div>
    </div>
  );
}
