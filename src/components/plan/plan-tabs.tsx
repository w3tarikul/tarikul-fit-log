export type PlanTab = "today" | "saved";

type PlanTabsProps = {
  active: PlanTab;
  onChange: (tab: PlanTab) => void;
};

const tabs: Array<{ id: PlanTab; label: string }> = [
  { id: "today", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

export function PlanTabs({ active, onChange }: PlanTabsProps) {
  return (
    <div role="tablist" className="inline-flex self-start rounded-xl border border-line bg-surface p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          type="button"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-5 py-2 text-sm transition-colors ${
            active === tab.id ? "bg-raised font-medium text-white" : "text-muted hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
