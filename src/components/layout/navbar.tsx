"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "@/components/ui/brand";
import { usePlan } from "@/context/plan-context";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds, hydrated } = usePlan();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/workouts") : pathname === href;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:h-16 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0">
        <div className="flex items-center justify-between md:justify-start">
          <Link href="/" aria-label="FitLog home">
            <Brand />
          </Link>

          <div className="flex items-center gap-3 md:hidden">
            <Counters planCount={planIds.length} savedCount={savedIds.length} hydrated={hydrated} />
          </div>
        </div>

        <ul className="flex items-center justify-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  isActive(link.href)
                    ? "bg-raised font-medium text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Counters planCount={planIds.length} savedCount={savedIds.length} hydrated={hydrated} />
        </div>
      </nav>
    </header>
  );
}

function Counters({
  planCount,
  savedCount,
  hydrated,
}: {
  planCount: number;
  savedCount: number;
  hydrated: boolean;
}) {
  return (
    <>
      <Link
        href="/my-plan"
        className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
      >
        Plan
        <span className="flex min-w-6 items-center justify-center rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-ink">
          {hydrated ? planCount : 0}
        </span>
      </Link>

      <Link
        href="/my-plan"
        className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
      >
        Saved
        <span className="flex min-w-6 items-center justify-center rounded-full border border-line px-2 py-0.5 text-xs font-semibold text-white">
          {hydrated ? savedCount : 0}
        </span>
      </Link>
    </>
  );
}
